export type SpineRegion = 'cervical' | 'thoracic' | 'lumbar' | 'sacrum';

export type SpineLevel = 
  | 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6' | 'C7'
  | 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8' | 'T9' | 'T10' | 'T11' | 'T12'
  | 'L1' | 'L2' | 'L3' | 'L4' | 'L5'
  | 'S1' | 'S2' | 'S3' | 'S4' | 'S5';

export type PatientStage = 
  | 'OPD Evaluation'
  | 'Pre-Op PAC Clearance'
  | 'Intra-Op OT'
  | 'HDU Stabilization'
  | 'Inpatient Floor Care'
  | 'Spine Rehab & Ambulation'
  | 'Discharge Ready'
  | 'Post-Op Follow-up';

export interface StaffMember {
  id: string;
  code: string;
  name: string;
  unit: string;
  desig: string;
  reports: string;
  mobile: string;
  email: string;
  blood: string;
  shift: string;
  skill: string;
  dept_master: string;
  note?: string;
  other?: string;
  omail?: string;
  gender?: string;
  marital?: string;
  dob?: string;
  join?: string;
  worker?: string;
  emp?: string;
  edu1?: string;
  exp1?: string;
  branch?: string;
  [key: string]: any;
}

export interface NeuroExam {
  motorPower: {
    l2_hipFlexion: number; // 0-5
    l3_kneeExtension: number;
    l4_ankleDorsiflexion: number;
    l5_greatToeExtension: number;
    s1_anklePlantarflexion: number;
    c5_shoulderAbduction?: number;
    c6_wristExtension?: number;
    c7_elbowExtension?: number;
    c8_fingerFlexion?: number;
    t1_fingerAbduction?: number;
  };
  sensoryDermatomes: {
    l3_anteriorThigh: 'Intact' | 'Hypoesthetic' | 'Absent';
    l4_medialMalleolus: 'Intact' | 'Hypoesthetic' | 'Absent';
    l5_dorsumFoot: 'Intact' | 'Hypoesthetic' | 'Absent';
    s1_lateralHeel: 'Intact' | 'Hypoesthetic' | 'Absent';
    s3s5_perianal: 'Intact' | 'Impaired' | 'Absent';
  };
  reflexes: {
    kneeJerkL4: '0 (Absent)' | '1+ (Hypo)' | '2+ (Normal)' | '3+ (Brisk)' | '4+ (Clonus)';
    ankleJerkS1: '0 (Absent)' | '1+ (Hypo)' | '2+ (Normal)' | '3+ (Brisk)' | '4+ (Clonus)';
    babinski: 'Negative (Plantar)' | 'Positive (Extensor)';
    hoffman?: 'Negative' | 'Positive';
  };
  redFlags: {
    caudaEquina: boolean;
    progressiveMotorLoss: boolean;
    feverWithSpinePain: boolean;
    bowelBladderIncontinence: boolean;
  };
}

export interface SagittalBalance {
  pelvicIncidence: number; // degrees e.g. 54
  pelvicTilt: number; // e.g. 18
  sacralSlope: number; // e.g. 36
  lumbarLordosis: number; // e.g. 52
  piLlMismatch: number; // PI - LL e.g. 2
  sagittalVerticalAxis: number; // SVA in mm e.g. 24
  cobbAngle?: number; // for scoliosis
}

export interface SurgeryPlan {
  procedureName: string;
  approach: 'Posterior' | 'Anterior' | 'Transforaminal (TLIF)' | 'Lateral (OLIF/XLIF)' | 'Endoscopic' | 'Percutaneous';
  levels: SpineLevel[];
  implantRequisition: {
    pedicleScrews: string;
    interbodyCage: string;
    boneGraft: string;
    rodLength: string;
  };
  estimatedDurationMins: number;
  plannedDate: string;
  primarySurgeon: string;
  assistingSurgeons: string[];
  sapGiven?: boolean;
  sapTiming?: string;
  procedure?: string;
}

export interface AnesthesiaData {
  anesthetistHead: string;
  assignedAnesthetist: string;
  asaGrade: 'I' | 'II' | 'III' | 'IV';
  mallampatiClass: 'I' | 'II' | 'III' | 'IV';
  pronePositioningClearance: boolean;
  ionmRequired: boolean;
  ionmStatus: 'Baseline Normal' | 'Signal Drop Alert' | 'Monitoring Active' | 'Completed';
  postOpAnalgesiaPlan: 'Epidural PCEA' | 'IV PCA Tramadol' | 'Multimodal Oral + IV Paracetamol' | 'Erector Spinae Plane Block';
  npoStatus: string;
}

export interface RadiologyData {
  headRadiologist: string;
  reportingDate: string;
  mriFindings: string;
  pfirrmannGrade: 'Grade I' | 'Grade II' | 'Grade III' | 'Grade IV' | 'Grade V';
  canalStenosisGrade: 'None' | 'Mild' | 'Moderate' | 'Severe Schizas D';
  listhesisType: 'None' | 'Grade 1 Anterolisthesis' | 'Grade 2 Anterolisthesis' | 'Retrolisthesis';
  dynamicInstabilityXray: 'Stable' | '>3mm Translation on Flexion' | 'Severe Angulation';
  mriThumbnailUrl?: string;
}

export interface NursingData {
  cnoLead: string;
  floorInCharge: string;
  primaryNurse: string;
  shift: string;
  vitals: {
    bp: string;
    pulse: number;
    spo2: number;
    temp: number;
    respiratoryRate: number;
    recordedAt: string;
  };
  drainOutputMl24h: number;
  foleyCatheterStatus: 'In Situ - Clear' | 'In Situ - Hematuria' | 'Trial of Voiding' | 'Removed';
  logRollSchedule: {
    lastTurnedTime: string;
    nextTurnDue: string;
    twoNursesVerified: boolean;
  };
  fallRiskScoreMorse: number; // 0-125
  surgicalDressingStatus: 'Clean & Dry' | 'Minimal Serosanguinous' | 'Strikethrough (Changed)' | 'Drain Site Intact';
}

export interface PhysioRehabData {
  headPhysio: string;
  assignedPhysio: string;
  bracePrescribed: 'Lumbosacral (LS) Contoured Belt' | 'Taylor Dorsolumbar Brace' | 'Miami-J Rigid Collar' | 'Soft Cervical Collar' | 'None';
  ambulationMilestone: 'Day 0 Log-roll Supine Core' | 'Day 1 Bedside Sitting & Stand' | 'Day 2 Walker Guided 50m' | 'Day 3 Independent Ambulation & Stairs';
  slrRightDegrees: number;
  slrLeftDegrees: number;
  functionalGoals: string[];
}

export interface PharmacyData {
  hodPharmacy: string;
  clinicalPharmacist: string;
  surgicalAntibioticProphylaxis: {
    drug: string;
    timingGiven: string; // e.g. 08:15 (within 60m of incision)
    status: 'Compliant (<60 min)' | 'Delayed' | 'Post-Op Dose Due';
  };
  dvtProphylaxis: {
    agent: string;
    timing: string;
    startedPostOp: boolean;
  };
  multimodalPainRegimen: string[];
  allergyAlerts: string[];
}

export interface OtStatusData {
  theatreNumber: 'OT 1' | 'OT 2' | 'OT 3' | 'OT 4 (Endoscopy)' | 'OT 5' | 'OT 6';
  scrubNurse: string;
  circulatingNurse: string;
  otTechnician: string;
  biomedicalLead: string;
  surgicalStage: 'Pre-Induction' | 'Prone Positioning' | 'Incision & Exposure' | 'Decompression & Implantation' | 'Closure' | 'Extubation' | 'PACU Recovery';
  whoChecklist: {
    signInCompleted: boolean;
    timeOutCompleted: boolean;
    signOutCompleted: boolean;
  };
  swabCountStatus: 'All Correct 40/40' | 'In Progress' | 'Discrepancy';
  fluoroscopyDoseDap: number; // mGy.cm2
}

export interface PatientDossier {
  id: string;
  uhid: string;
  ipdNumber: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  contactNumber: string;
  roomBed: string;
  floor: '3rd Floor HDU' | '4th Floor Ward' | '5th Floor Special' | '6th Floor Deluxe';
  admitDate: string;
  primarySpineConsultant: string;
  associateDoctor: string;
  chiefDiagnosis: string;
  affectedSpineRegion: SpineRegion;
  primarySpineLevels: SpineLevel[];
  currentStage: PatientStage;
  vasPainScore: number; // 0-10
  oswestryDisabilityIndex: number; // 0-100%
  eq5dHealthScore: number; // 0-100
  
  // Clinical service data
  neuroExam: NeuroExam;
  sagittalBalance: SagittalBalance;
  surgeryPlan: SurgeryPlan;
  anesthesia: AnesthesiaData;
  radiology: RadiologyData;
  nursing: NursingData;
  physioRehab: PhysioRehabData;
  pharmacy: PharmacyData;
  otStatus: OtStatusData;

  // Patient Experience
  assignedPro: string;
  escortStatus: 'At Bedside' | 'Transferring to Radiology' | 'Returning from OT' | 'Assisting Family' | 'Idle';
  familyContactName: string;
  familyContactPhone: string;

  // Additional Clinical Helpers
  medications?: { name: string; dose: string; route: string; frequency: string; status: 'active' | 'completed' | 'hold' }[];
  allergies?: string[];
  stage?: PatientStage;
  consultant?: string;
  room?: string;
}
