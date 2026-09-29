import { create } from 'zustand';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  service: string;
  type: 'CREDIT' | 'DEBIT';
}

export interface MedicalRecord {
  id: string;
  date: string;
  type: 'NOTE' | 'LAB' | 'PRESCRIPTION' | 'VITALS' | 'RADIOLOGY' | 'SURGERY';
  details: string;
  provider: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DISPENSED';
  orderId?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup?: string;
  genotype?: string;
  walletBalance: number;
  walletHistory: Transaction[];
  medicalHistory: MedicalRecord[];
}

export interface QueueItem {
  patientId: string;
  patientName: string;
  timeAdded: string;
  status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED';
  vitals?: any;
  department?: string;
  priority?: string;
}

export interface LabOrder {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  status: 'PENDING' | 'COMPLETED';
  result?: string;
  date: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  medication: string;
  status: 'PENDING' | 'DISPENSED';
  date: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  department: string;
  type: 'IN_PERSON' | 'TELEMEDICINE';
  date: string;
  time: string;
  reason: string;
  status: 'SCHEDULED' | 'CANCELLED' | 'COMPLETED';
}

interface HospitalState {
  patients: Record<string, Patient>;
  triageQueue: QueueItem[];
  consultationQueue: QueueItem[];
  labOrders: LabOrder[];
  prescriptions: Prescription[];
  appointments: Appointment[];
  
  // Actions
  registerPatient: (patient: Patient) => void;
  chargeWallet: (patientId: string, amount: number, service: string) => boolean;
  fundWallet: (patientId: string, amount: number) => void;
  
  addToTriage: (patientId: string, department?: string) => boolean; // Returns true if successful (wallet charged)
  addToConsultation: (patientId: string, vitals: any) => void;
  removeFromQueue: (queueType: 'triage' | 'consultation', patientId: string) => void;
  
  addLabOrder: (patientId: string, testNames: string[]) => boolean;
  addPrescription: (patientId: string, medication: string) => boolean;
  
  completeLabOrder: (orderId: string, result: string) => void;
  dispensePrescription: (prescriptionId: string) => void;
  
  addClinicalNote: (patientId: string, note: string, provider: string) => void;
  admitPatient: (patientId: string, ward: string, doctorName: string) => void;
  bookAppointment: (patientId: string, department: string, type: 'IN_PERSON' | 'TELEMEDICINE', date: string, time: string, reason: string) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);
const now = () => new Date().toISOString();

export const useHospitalStore = create<HospitalState>((set, get) => ({
  patients: {
    'PT-9942': {
      id: 'PT-9942',
      name: 'Emily Chen',
      age: 32,
      gender: 'Female',
      bloodGroup: 'O+',
      genotype: 'AA',
      walletBalance: 45500,
      walletHistory: [
        { id: '1', date: now(), amount: 50000, service: 'Initial Deposit', type: 'CREDIT' },
        { id: '2', date: now(), amount: 4500, service: 'Registration Fee', type: 'DEBIT' }
      ],
      medicalHistory: []
    },
    'PT-1023': {
      id: 'PT-1023',
      name: 'Michael Smith',
      age: 45,
      gender: 'Male',
      bloodGroup: 'A+',
      genotype: 'AS',
      walletBalance: 12000,
      walletHistory: [
        { id: '3', date: now(), amount: 15000, service: 'Deposit', type: 'CREDIT' }
      ],
      medicalHistory: []
    },
    'PT-8831': {
      id: 'PT-8831',
      name: 'Sarah Johnson',
      age: 28,
      gender: 'Female',
      bloodGroup: 'B-',
      genotype: 'AA',
      walletBalance: 0,
      walletHistory: [],
      medicalHistory: []
    },
    'PT-1102': {
      id: 'PT-1102',
      name: 'Oluwaseun Adebayo',
      age: 41,
      gender: 'Male',
      bloodGroup: 'AB+',
      genotype: 'AA',
      walletBalance: 150000,
      walletHistory: [],
      medicalHistory: []
    },
    'PT-3321': {
      id: 'PT-3321',
      name: 'Ngozi Okafor',
      age: 29,
      gender: 'Female',
      bloodGroup: 'O+',
      genotype: 'AS',
      walletBalance: 20000,
      walletHistory: [],
      medicalHistory: []
    },
    'PT-7742': {
      id: 'PT-7742',
      name: 'Aminu Ibrahim',
      age: 55,
      gender: 'Male',
      bloodGroup: 'O-',
      genotype: 'SS',
      walletBalance: 80000,
      walletHistory: [],
      medicalHistory: []
    }
  },
  triageQueue: [],
  consultationQueue: [],
  labOrders: [],
  prescriptions: [],
  appointments: [],

  registerPatient: (patient) => {
    set((state) => ({
      patients: {
        ...state.patients,
        [patient.id]: patient
      }
    }));
  },

  chargeWallet: (patientId, amount, service) => {
    const { patients } = get();
    const patient = patients[patientId];
    if (!patient || patient.walletBalance < amount) return false;

    set((state) => ({
      patients: {
        ...state.patients,
        [patientId]: {
          ...patient,
          walletBalance: patient.walletBalance - amount,
          walletHistory: [
            { id: generateId(), date: now(), amount, service, type: 'DEBIT' },
            ...patient.walletHistory
          ]
        }
      }
    }));
    return true;
  },

  fundWallet: (patientId, amount) => {
    set((state) => {
      const patient = state.patients[patientId];
      if (!patient) return state;
      return {
        patients: {
          ...state.patients,
          [patientId]: {
            ...patient,
            walletBalance: patient.walletBalance + amount,
            walletHistory: [
              { id: generateId(), date: now(), amount, service: 'Wallet Funding', type: 'CREDIT' },
              ...patient.walletHistory
            ]
          }
        }
      };
    });
  },

  addToTriage: (patientId, department = 'General Practice') => {
    const { patients, chargeWallet } = get();
    const patient = patients[patientId];
    if (!patient) return false;

    // Charge standard consultation fee (e.g., 5000)
    const consultationFee = 5000;
    const charged = chargeWallet(patientId, consultationFee, `Consultation Fee: ${department}`);
    if (!charged) return false; // Cannot proceed if insufficient funds

    set((state) => ({
      triageQueue: [
        ...state.triageQueue,
        { patientId, patientName: patient.name, timeAdded: now(), status: 'WAITING', department, priority: 'NORMAL' }
      ]
    }));
    return true;
  },

  removeFromQueue: (queueType, patientId) => {
    set((state) => ({
      [queueType === 'triage' ? 'triageQueue' : 'consultationQueue']: state[queueType === 'triage' ? 'triageQueue' : 'consultationQueue'].filter(q => q.patientId !== patientId)
    }));
  },

  addToConsultation: (patientId, vitals) => {
    const { patients } = get();
    const patient = patients[patientId];
    if (!patient) return;

    set((state) => ({
      triageQueue: state.triageQueue.filter(q => q.patientId !== patientId), // Remove from triage
      consultationQueue: [
        ...state.consultationQueue,
        { patientId, patientName: patient.name, timeAdded: now(), status: 'WAITING', vitals, department: state.triageQueue.find(q => q.patientId === patientId)?.department || 'General Practice', priority: 'NORMAL' }
      ],
      patients: {
        ...state.patients,
        [patientId]: {
          ...patient,
          medicalHistory: [
            { id: generateId(), date: now(), type: 'VITALS', details: JSON.stringify(vitals), provider: 'Nurse' },
            ...patient.medicalHistory
          ]
        }
      }
    }));
  },

  addLabOrder: (patientId, testNames) => {
    const { patients } = get();
    const patient = patients[patientId];
    if (!patient) return false;

    // Billing is deferred to lab initiation/completion

    const orderId = generateId();

    set((state) => ({
      labOrders: [
        { id: orderId, patientId, patientName: patient.name, testName: testNames.join(', '), status: 'PENDING', date: now() },
        ...state.labOrders
      ],
      patients: {
        ...state.patients,
        [patientId]: {
          ...patient,
          medicalHistory: [
            { id: generateId(), date: now(), type: 'LAB', details: `Ordered: ${testNames.join(', ')}`, provider: 'Doctor', status: 'PENDING', orderId },
            ...patient.medicalHistory
          ]
        }
      }
    }));
    return true;
  },

  addPrescription: (patientId, medication) => {
    const { patients } = get();
    const patient = patients[patientId];
    if (!patient) return false;

    // Billing deferred to pharmacy dispensing

    const prescriptionId = generateId();

    set((state) => ({
      prescriptions: [
        { id: prescriptionId, patientId, patientName: patient.name, medication, status: 'PENDING', date: now() },
        ...state.prescriptions
      ],
      patients: {
        ...state.patients,
        [patientId]: {
          ...patient,
          medicalHistory: [
            { id: generateId(), date: now(), type: 'PRESCRIPTION', details: `Prescribed: ${medication}`, provider: 'Doctor', status: 'PENDING', orderId: prescriptionId },
            ...patient.medicalHistory
          ]
        }
      }
    }));
    return true;
  },

  completeLabOrder: (orderId, result) => {
    const { chargeWallet } = get();
    set((state) => {
      const order = state.labOrders.find(o => o.id === orderId);
      if (!order) return state;
      
      const patient = state.patients[order.patientId];
      
      // Debit patient now since test is completed (or initiated)
      chargeWallet(order.patientId, 15000, `Lab Testing Fee: ${order.testName}`);

      return {
        labOrders: state.labOrders.map(o => o.id === orderId ? { ...o, status: 'COMPLETED', result } : o),
        patients: patient ? {
          ...state.patients,
          [patient.id]: {
            ...patient,
            medicalHistory: patient.medicalHistory.map(record => 
              record.orderId === orderId 
                ? { ...record, status: 'COMPLETED', details: `${order.testName} Result: ${result}`, provider: 'Lab Technician' }
                : record
            )
          }
        } : state.patients
      };
    });
  },

  dispensePrescription: (prescriptionId) => {
    const { chargeWallet } = get();
    set((state) => {
       const prescription = state.prescriptions.find(p => p.id === prescriptionId);
       if (!prescription) return state;

       const patient = state.patients[prescription.patientId];
       
       // Debit patient for drugs
       chargeWallet(prescription.patientId, 5000, `Pharmacy Drug Fee: ${prescription.medication}`);

       return {
         prescriptions: state.prescriptions.map(p => p.id === prescriptionId ? { ...p, status: 'DISPENSED' } : p),
         patients: patient ? {
           ...state.patients,
           [patient.id]: {
             ...patient,
             medicalHistory: patient.medicalHistory.map(record => 
               record.orderId === prescriptionId 
                 ? { ...record, status: 'DISPENSED', details: `Dispensed: ${prescription.medication}`, provider: 'Pharmacist' }
                 : record
             )
           }
         } : state.patients
       }
    });
  },

  addClinicalNote: (patientId, note, provider) => {
    set((state) => {
      const patient = state.patients[patientId];
      if (!patient) return state;
      return {
        patients: {
          ...state.patients,
          [patientId]: {
            ...patient,
            medicalHistory: [
              { id: generateId(), date: now(), type: 'NOTE', details: note, provider },
              ...patient.medicalHistory
            ]
          }
        }
      };
    });
  },

  admitPatient: (patientId, ward, doctorName) => {
    set((state) => {
      const patient = state.patients[patientId];
      if (!patient) return state;
      return {
        patients: {
          ...state.patients,
          [patientId]: {
            ...patient,
            medicalHistory: [
              { id: generateId(), date: now(), type: 'NOTE', details: `ADMISSION: Patient admitted to ${ward}`, provider: doctorName },
              ...patient.medicalHistory
            ]
          }
        }
      };
    });
  },

  bookAppointment: (patientId, department, type, date, time, reason) => {
    set((state) => {
      const patient = state.patients[patientId];
      if (!patient) return state;
      return {
        appointments: [
          ...state.appointments,
          {
            id: generateId(),
            patientId,
            patientName: patient.name,
            department,
            type,
            date,
            time,
            reason,
            status: 'SCHEDULED'
          }
        ]
      };
    });
  }
}));
