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
  type: 'NOTE' | 'LAB' | 'PRESCRIPTION' | 'VITALS';
  details: string;
  provider: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
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

interface HospitalState {
  patients: Record<string, Patient>;
  triageQueue: QueueItem[];
  consultationQueue: QueueItem[];
  labOrders: LabOrder[];
  prescriptions: Prescription[];
  
  // Actions
  chargeWallet: (patientId: string, amount: number, service: string) => boolean;
  fundWallet: (patientId: string, amount: number) => void;
  
  addToTriage: (patientId: string) => boolean; // Returns true if successful (wallet charged)
  addToConsultation: (patientId: string, vitals: any) => void;
  removeFromQueue: (queueType: 'triage' | 'consultation', patientId: string) => void;
  
  addLabOrder: (patientId: string, testName: string, cost: number) => boolean;
  addPrescription: (patientId: string, medication: string, cost: number) => boolean;
  
  completeLabOrder: (orderId: string, result: string) => void;
  dispensePrescription: (prescriptionId: string) => void;
  
  addClinicalNote: (patientId: string, note: string, provider: string) => void;
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
      walletBalance: 0,
      walletHistory: [],
      medicalHistory: []
    }
  },
  triageQueue: [],
  consultationQueue: [],
  labOrders: [],
  prescriptions: [],

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

  addToTriage: (patientId) => {
    const { patients, chargeWallet } = get();
    const patient = patients[patientId];
    if (!patient) return false;

    // Charge standard consultation fee (e.g., 5000)
    const consultationFee = 5000;
    const charged = chargeWallet(patientId, consultationFee, 'Consultation & Triage Fee');
    if (!charged) return false; // Cannot proceed if insufficient funds

    set((state) => ({
      triageQueue: [
        ...state.triageQueue,
        { patientId, patientName: patient.name, timeAdded: now(), status: 'WAITING' }
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
        { patientId, patientName: patient.name, timeAdded: now(), status: 'WAITING', vitals }
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

  addLabOrder: (patientId, testName, cost) => {
    const { patients, chargeWallet } = get();
    const patient = patients[patientId];
    if (!patient) return false;

    const charged = chargeWallet(patientId, cost, `Lab Test: ${testName}`);
    if (!charged) return false;

    set((state) => ({
      labOrders: [
        { id: generateId(), patientId, patientName: patient.name, testName, status: 'PENDING', date: now() },
        ...state.labOrders
      ]
    }));
    return true;
  },

  addPrescription: (patientId, medication, cost) => {
    const { patients, chargeWallet } = get();
    const patient = patients[patientId];
    if (!patient) return false;

    const charged = chargeWallet(patientId, cost, `Prescription: ${medication}`);
    if (!charged) return false;

    set((state) => ({
      prescriptions: [
        { id: generateId(), patientId, patientName: patient.name, medication, status: 'PENDING', date: now() },
        ...state.prescriptions
      ]
    }));
    return true;
  },

  completeLabOrder: (orderId, result) => {
    set((state) => {
      const order = state.labOrders.find(o => o.id === orderId);
      if (!order) return state;
      
      const patient = state.patients[order.patientId];
      
      return {
        labOrders: state.labOrders.map(o => o.id === orderId ? { ...o, status: 'COMPLETED', result } : o),
        patients: patient ? {
          ...state.patients,
          [patient.id]: {
            ...patient,
            medicalHistory: [
              { id: generateId(), date: now(), type: 'LAB', details: `${order.testName} Result: ${result}`, provider: 'Lab Technician' },
              ...patient.medicalHistory
            ]
          }
        } : state.patients
      };
    });
  },

  dispensePrescription: (prescriptionId) => {
    set((state) => {
       const prescription = state.prescriptions.find(p => p.id === prescriptionId);
       if (!prescription) return state;

       const patient = state.patients[prescription.patientId];

       return {
         prescriptions: state.prescriptions.map(p => p.id === prescriptionId ? { ...p, status: 'DISPENSED' } : p),
         patients: patient ? {
           ...state.patients,
           [patient.id]: {
             ...patient,
             medicalHistory: [
               { id: generateId(), date: now(), type: 'PRESCRIPTION', details: `Dispensed: ${prescription.medication}`, provider: 'Pharmacist' },
               ...patient.medicalHistory
             ]
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
  }
}));
