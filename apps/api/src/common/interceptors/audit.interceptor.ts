import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // Determine action, entity, entityId (can be enriched by decorators or request metadata)
    const method = request.method;
    const url = request.url;
    let action = method;
    let entity = url.split('/')[1] || 'unknown';
    
    // To properly capture before/after values, the services should ideally handle this 
    // within Prisma middleware or interact closely with the interceptor. For MVP phase 0, 
    // we log basic request/response info as the 'after' value, and 'body' as 'before'.
    const beforeValue = request.body || {};
    const ipAddress = request.ip || request.connection?.remoteAddress;
    const device = request.headers['user-agent'];

    const logToDb = async (status: string, resultData?: any) => {
      try {
        await this.prisma.auditLog.create({
          data: {
            userId: user?.id || null,
            roleName: user?.staff?.role?.name || null,
            action,
            entity,
            entityId: resultData?.id || request.params?.id || 'N/A',
            beforeValue: beforeValue ? beforeValue : null,
            afterValue: resultData ? resultData : null,
            ipAddress,
            device,
            status,
          }
        });
      } catch (err) {
        console.error('Failed to write audit log', err);
      }
    };

    return next.handle().pipe(
      tap(async (data) => {
        if (method !== 'GET') {
          await logToDb('SUCCESS', data);
        }
      }),
      catchError((err) => {
        if (method !== 'GET') {
          logToDb('FAILED', { error: err.message });
        }
        return throwError(() => err);
      }),
    );
  }
}
