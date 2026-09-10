import { PatientDossier } from '../types';

export const MOCK_PATIENTS: PatientDossier[] = [
  {
    id: 'pat-001',
    uhid: 'STV-2026-0891',
    ipdNumber: 'IPD-8821',
    name: 'Rameshchandra K. Patel',
    age: 58,
    gender: 'Male',
    bloodGroup: 'B+',
    contactNumber: '+91 98254 11209',
    roomBed: 'Bed 402 (Semi-Private)',
    floor: '4th Floor Ward',
    admitDate: '2026-09-08',
    primarySpineConsultant: 'Dr. Bharat Rajendraprasad Dave',
    associateDoctor: 'Dr. Mirant Bharat Dave',
    chiefDiagnosis: 'L4-L5 Severe Lumbar Canal Stenosis with Degenerative Spondylolisthesis (Grade I) & Left Foot EHL Weakness',
    affectedSpineRegion: 'lumbar',
    primarySpineLevels: ['L4', 'L5'],
    currentStage: 'Inpatient Floor Care',
    vasPainScore: 3, // down from 9 pre-op
    oswestryDisabilityIndex: 42, // down from 68%
    eq5dHealthScore: 78,
    
    neuroExam: {
      motorPower: {
        l2_hipFlexion: 5,
        l3_kneeExtension: 5,
        l4_ankleDorsiflexion: 4,
        l5_greatToeExtension: 4, // recovering from 2/5
        s1_anklePlantarflexion: 5
      },
      sensoryDermatomes: {
        l3_anteriorThigh: 'Intact',
        l4_medialMalleolus: 'Intact',
        l5_dorsumFoot: 'Hypoesthetic',
        s1_lateralHeel: 'Intact',
        s3s5_perianal: 'Intact'
      },
      reflexes: {
        kneeJerkL4: '2+ (Normal)',
        ankleJerkS1: '1+ (Hypo)',
        babinski: 'Negative (Plantar)'
      },
      redFlags: {
        caudaEquina: false,
        progressiveMotorLoss: false,
        feverWithSpinePain: false,
        bowelBladderIncontinence: false
      }
    },

    sagittalBalance: {
      pelvicIncidence: 56,
      pelvicTilt: 18,
      sacralSlope: 38,
      lumbarLordosis: 54,
      piLlMismatch: 2,
      sagittalVerticalAxis: 26
    },

    surgeryPlan: {
      procedureName: 'Minimally Invasive Transforaminal Lumbar Interbody Fusion (MIS-TLIF) L4-L5 + Decompression',
      approach: 'Transforaminal (TLIF)',
      levels: ['L4', 'L5'],
      implantRequisition: {
        pedicleScrews: '4x Cannulated Polyaxial Ti Screws (6.5mm x 45mm)',
        interbodyCage: '1x PEEK Bullet TLIF Cage (11mm x 28mm, 4° Lordosis)',
        boneGraft: 'Demineralized Bone Matrix (DBM) Putty 5cc + Autograft',
        rodLength: '2x Pre-contoured Ti Rods (45mm)'
      },
      estimatedDurationMins: 135,
      plannedDate: '2026-09-09',
      primarySurgeon: 'Dr. Bharat Rajendraprasad Dave',
      assistingSurgeons: ['Dr. Mirant Bharat Dave', 'Dr. Saurabh Shrikant Kulkarni']
    },

    anesthesia: {
      anesthetistHead: 'Dr. Kashyap Rameshchandra Shah',
      assignedAnesthetist: 'Dr. Paresh Arvindbhai Mehta',
      asaGrade: 'II',
      mallampatiClass: 'II',
      pronePositioningClearance: true,
      ionmRequired: true,
      ionmStatus: 'Completed',
      postOpAnalgesiaPlan: 'Multimodal Oral + IV Paracetamol',
      npoStatus: 'Regular Soft Diet Resumed'
    },

    radiology: {
      headRadiologist: 'Dr. Preety Ajay Krishnan',
      reportingDate: '2026-09-07',
      mriFindings: 'Severe circumferential canal narrowing at L4-L5 (AP diameter 6.2 mm). Hypertrophied ligamentum flavum, bilateral facet arthropathy, Grade 1 anterolisthesis of L4 on L5.',
      pfirrmannGrade: 'Grade IV',
      canalStenosisGrade: 'Severe Schizas D',
      listhesisType: 'Grade 1 Anterolisthesis',
      dynamicInstabilityXray: '>3mm Translation on Flexion'
    },

    nursing: {
      cnoLead: 'Brijesh Hasmukhkumar Bhatt',
      floorInCharge: 'Anita Sunilbhai Gohel',
      primaryNurse: 'Emerald Rocky Christrian',
      shift: 'Morning Shift (08:00 - 14:00)',
      vitals: {
        bp: '128/78 mmHg',
        pulse: 74,
        spo2: 99,
        temp: 98.4,
        respiratoryRate: 16,
        recordedAt: '10:30 AM'
      },
      drainOutputMl24h: 45, // below 50ml threshold for removal
      foleyCatheterStatus: 'Removed',
      logRollSchedule: {
        lastTurnedTime: '08:00 AM',
        nextTurnDue: '12:00 PM',
        twoNursesVerified: true
      },
      fallRiskScoreMorse: 35,
      surgicalDressingStatus: 'Clean & Dry'
    },

    physioRehab: {
      headPhysio: 'Dr. Parth Janakbhai Joshi',
      assignedPhysio: 'Dr. Shreya Pravinbhai Hirpara',
      bracePrescribed: 'Lumbosacral (LS) Contoured Belt',
      ambulationMilestone: 'Day 1 Bedside Sitting & Stand',
      slrRightDegrees: 70,
      slrLeftDegrees: 60,
      functionalGoals: ['Bed mobility via log-roll', 'High-chair sitting for 20 mins', 'Walker ambulation 30 meters']
    },

    pharmacy: {
      hodPharmacy: 'Jatin Jayantilal Pathak',
      clinicalPharmacist: 'Preena',
      surgicalAntibioticProphylaxis: {
        drug: 'Inj. Cefuroxime 1.5g IV',
        timingGiven: '08:15 AM (Pre-incision 35 min)',
        status: 'Compliant (<60 min)'
      },
      dvtProphylaxis: {
        agent: 'Inj. Enoxaparin 40mg SC OD',
        timing: 'Started 20:00 Post-Op Day 0',
        startedPostOp: true
      },
      multimodalPainRegimen: [
        'Tab. Pregabalin 75mg HS',
        'Tab. Paracetamol 1000mg TID',
        'Inj. Tramadol 50mg SOS with Ondansetron'
      ],
      allergyAlerts: ['No Known Drug Allergies (NKDA)']
    },

    otStatus: {
      theatreNumber: 'OT 2',
      scrubNurse: 'Gopalbhai Hareshbhai Prajapati',
      circulatingNurse: 'Smith Rakeshbhai Kalamkar',
      otTechnician: 'Himanshu Babubhai Solanki',
      biomedicalLead: 'Meet Jatinkumar Pathak',
      surgicalStage: 'PACU Recovery',
      whoChecklist: {
        signInCompleted: true,
        timeOutCompleted: true,
        signOutCompleted: true
      },
      swabCountStatus: 'All Correct 40/40',
      fluoroscopyDoseDap: 142
    },

    assignedPro: 'Khushbu Miteshkumar Nagar',
    escortStatus: 'At Bedside',
    familyContactName: 'Bhavnaben Patel (Wife)',
    familyContactPhone: '+91 98254 99120'
  },
  {
    id: 'pat-002',
    uhid: 'STV-2026-0904',
    ipdNumber: 'IPD-8840',
    name: 'Sunita Manoj Sharma',
    age: 46,
    gender: 'Female',
    bloodGroup: 'O+',
    contactNumber: '+91 97241 88390',
    roomBed: 'Bed 504 (Special Room)',
    floor: '5th Floor Special',
    admitDate: '2026-09-09',
    primarySpineConsultant: 'Dr. Ajay Krishnan',
    associateDoctor: 'Dr. Birju Kishorbhai Vyas',
    chiefDiagnosis: 'C5-C6 Large Extruded Disc Herniation with Cervical Myelopathy & Right Arm C6 Radiculopathy',
    affectedSpineRegion: 'cervical',
    primarySpineLevels: ['C5', 'C6'],
    currentStage: 'Pre-Op PAC Clearance',
    vasPainScore: 8,
    oswestryDisabilityIndex: 58,
    eq5dHealthScore: 52,

    neuroExam: {
      motorPower: {
        l2_hipFlexion: 5,
        l3_kneeExtension: 5,
        l4_ankleDorsiflexion: 5,
        l5_greatToeExtension: 5,
        s1_anklePlantarflexion: 5,
        c5_shoulderAbduction: 4,
        c6_wristExtension: 3, // weakness in wrist extensors
        c7_elbowExtension: 5,
        c8_fingerFlexion: 4,
        t1_fingerAbduction: 4
      },
      sensoryDermatomes: {
        l3_anteriorThigh: 'Intact',
        l4_medialMalleolus: 'Intact',
        l5_dorsumFoot: 'Intact',
        s1_lateralHeel: 'Intact',
        s3s5_perianal: 'Intact'
      },
      reflexes: {
        kneeJerkL4: '3+ (Brisk)',
        ankleJerkS1: '2+ (Normal)',
        babinski: 'Positive (Extensor)',
        hoffman: 'Positive'
      },
      redFlags: {
        caudaEquina: false,
        progressiveMotorLoss: true, // myelopathy indicator
        feverWithSpinePain: false,
        bowelBladderIncontinence: false
      }
    },

    sagittalBalance: {
      pelvicIncidence: 50,
      pelvicTilt: 14,
      sacralSlope: 36,
      lumbarLordosis: 48,
      piLlMismatch: 2,
      sagittalVerticalAxis: 18
    },

    surgeryPlan: {
      procedureName: 'Anterior Cervical Discectomy and Fusion (ACDF) C5-C6 with Zero-Profile PEEK Standalone Cage',
      approach: 'Anterior',
      levels: ['C5', 'C6'],
      implantRequisition: {
        pedicleScrews: 'N/A (Anterior Cervical)',
        interbodyCage: '1x Zero-Profile Integrated Cervical Plate-Cage (14x12x6mm)',
        boneGraft: 'Synthes ChronOS synthetic beta-TCP + DBM',
        rodLength: 'N/A'
      },
      estimatedDurationMins: 90,
      plannedDate: '2026-09-11',
      primarySurgeon: 'Dr. Ajay Krishnan',
      assistingSurgeons: ['Dr. Amritesh Singh']
    },

    anesthesia: {
      anesthetistHead: 'Dr. Kashyap Rameshchandra Shah',
      assignedAnesthetist: 'Dr. Ketul Balkrishna Patel',
      asaGrade: 'I',
      mallampatiClass: 'I',
      pronePositioningClearance: true,
      ionmRequired: true,
      ionmStatus: 'Baseline Normal',
      postOpAnalgesiaPlan: 'Multimodal Oral + IV Paracetamol',
      npoStatus: 'NPO from 24:00 Tonight'
    },

    radiology: {
      headRadiologist: 'Dr. Preety Ajay Krishnan',
      reportingDate: '2026-09-08',
      mriFindings: 'Right paracentral extruded disc at C5-C6 causing severe canal stenosis (residual AP diameter 5.8 mm) with cord compression and hyperintense T2 cord signal (myelomalacia).',
      pfirrmannGrade: 'Grade V',
      canalStenosisGrade: 'Severe Schizas D',
      listhesisType: 'None',
      dynamicInstabilityXray: 'Stable'
    },

    nursing: {
      cnoLead: 'Brijesh Hasmukhkumar Bhatt',
      floorInCharge: 'Trupti Dayabhai Asari',
      primaryNurse: 'Harsha Susantsinh Solanki',
      shift: 'Morning Shift (08:00 - 14:00)',
      vitals: {
        bp: '120/76 mmHg',
        pulse: 78,
        spo2: 99,
        temp: 98.2,
        respiratoryRate: 14,
        recordedAt: '09:45 AM'
      },
      drainOutputMl24h: 0,
      foleyCatheterStatus: 'Removed',
      logRollSchedule: {
        lastTurnedTime: 'N/A (Independent Bed Mobility)',
        nextTurnDue: 'N/A',
        twoNursesVerified: false
      },
      fallRiskScoreMorse: 40,
      surgicalDressingStatus: 'Clean & Dry'
    },

    physioRehab: {
      headPhysio: 'Dr. Parth Janakbhai Joshi',
      assignedPhysio: 'Dr. Khushi Dhirenkumar Jani',
      bracePrescribed: 'Miami-J Rigid Collar',
      ambulationMilestone: 'Day 0 Log-roll Supine Core',
      slrRightDegrees: 80,
      slrLeftDegrees: 80,
      functionalGoals: ['Pre-op collar fitting and acclimatization', 'Isometric neck muscle education', 'Post-op dysphagia swallowing precautions']
    },

    pharmacy: {
      hodPharmacy: 'Jatin Jayantilal Pathak',
      clinicalPharmacist: 'Preena',
      surgicalAntibioticProphylaxis: {
        drug: 'Inj. Cefuroxime 1.5g IV scheduled for OR',
        timingGiven: 'Scheduled for OT Sign-in',
        status: 'Post-Op Dose Due'
      },
      dvtProphylaxis: {
        agent: 'Graduated Compression Stockings + Early Mobilization',
        timing: 'Applied',
        startedPostOp: false
      },
      multimodalPainRegimen: [
        'Tab. Gabapentin 300mg TID',
        'Tab. Aceclofenac 100mg + Paracetamol 325mg BD',
        'Tab. Pantoprazole 40mg OD'
      ],
      allergyAlerts: ['NKDA']
    },

    otStatus: {
      theatreNumber: 'OT 3',
      scrubNurse: 'Priyanka Hemantbhai Jadhav',
      circulatingNurse: 'Dimpalben Lalubhai Katara',
      otTechnician: 'Anandkumar Jitendrabhai Harijn',
      biomedicalLead: 'Meet Jatinkumar Pathak',
      surgicalStage: 'Pre-Induction',
      whoChecklist: {
        signInCompleted: false,
        timeOutCompleted: false,
        signOutCompleted: false
      },
      swabCountStatus: 'In Progress',
      fluoroscopyDoseDap: 0
    },

    assignedPro: 'Hetal Revabhai Solanki',
    escortStatus: 'Transferring to Radiology',
    familyContactName: 'Manoj Sharma (Husband)',
    familyContactPhone: '+91 97241 22910'
  },
  {
    id: 'pat-003',
    uhid: 'STV-2026-0872',
    ipdNumber: 'IPD-8815',
    name: 'Master Aarav D. Mehta',
    age: 15,
    gender: 'Male',
    bloodGroup: 'A+',
    contactNumber: '+91 98982 77102',
    roomBed: 'Bed 601 (Deluxe Suite)',
    floor: '6th Floor Deluxe',
    admitDate: '2026-09-08',
    primarySpineConsultant: 'Dr. Bharat Rajendraprasad Dave',
    associateDoctor: 'Dr. Ravi Ranjan Rai',
    chiefDiagnosis: 'Adolescent Idiopathic Scoliosis (Lenke Type 1A) with Main Thoracic Curve 49°',
    affectedSpineRegion: 'thoracic',
    primarySpineLevels: ['T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'L1'],
    currentStage: 'OPD Evaluation',
    vasPainScore: 2,
    oswestryDisabilityIndex: 22,
    eq5dHealthScore: 84,

    neuroExam: {
      motorPower: {
        l2_hipFlexion: 5,
        l3_kneeExtension: 5,
        l4_ankleDorsiflexion: 5,
        l5_greatToeExtension: 5,
        s1_anklePlantarflexion: 5
      },
      sensoryDermatomes: {
        l3_anteriorThigh: 'Intact',
        l4_medialMalleolus: 'Intact',
        l5_dorsumFoot: 'Intact',
        s1_lateralHeel: 'Intact',
        s3s5_perianal: 'Intact'
      },
      reflexes: {
        kneeJerkL4: '2+ (Normal)',
        ankleJerkS1: '2+ (Normal)',
        babinski: 'Negative (Plantar)'
      },
      redFlags: {
        caudaEquina: false,
        progressiveMotorLoss: false,
        feverWithSpinePain: false,
        bowelBladderIncontinence: false
      }
    },

    sagittalBalance: {
      pelvicIncidence: 48,
      pelvicTilt: 12,
      sacralSlope: 36,
      lumbarLordosis: 52,
      piLlMismatch: 4,
      sagittalVerticalAxis: 8,
      cobbAngle: 49
    },

    surgeryPlan: {
      procedureName: 'Posterior Spinal Deformity Correction & Instrumented Fusion T4–L1 with Multi-Rod Derotation',
      approach: 'Posterior',
      levels: ['T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'L1'],
      implantRequisition: {
        pedicleScrews: '16x Uniplanar & Polyaxial CoCr Screws (5.5mm / 6.0mm)',
        interbodyCage: 'None (Posterior Onlay Fusion)',
        boneGraft: 'Local Bone Graft + 20cc Allograft Chips + BMP Matrix',
        rodLength: '2x 5.5mm Cobalt-Chromium High-Stiffness Rods (420mm)'
      },
      estimatedDurationMins: 260,
      plannedDate: '2026-09-14',
      primarySurgeon: 'Dr. Bharat Rajendraprasad Dave',
      assistingSurgeons: ['Dr. Ravi Ranjan Rai', 'Dr. Arijit Vashishtha']
    },

    anesthesia: {
      anesthetistHead: 'Dr. Kashyap Rameshchandra Shah',
      assignedAnesthetist: 'Dr. Rishita Doshi',
      asaGrade: 'I',
      mallampatiClass: 'I',
      pronePositioningClearance: true,
      ionmRequired: true,
      ionmStatus: 'Monitoring Active',
      postOpAnalgesiaPlan: 'Epidural PCEA',
      npoStatus: 'Regular Diet'
    },

    radiology: {
      headRadiologist: 'Dr. Preety Ajay Krishnan',
      reportingDate: '2026-09-08',
      mriFindings: 'Full spine MRI confirms no Chiari malformation, no syrinx, no tethered cord. Right thoracic structural curve T5-T12 measuring 49° Cobb angle. Compensatory lumbar curve 26° correcting on lateral bending.',
      pfirrmannGrade: 'Grade I',
      canalStenosisGrade: 'None',
      listhesisType: 'None',
      dynamicInstabilityXray: 'Severe Angulation'
    },

    nursing: {
      cnoLead: 'Brijesh Hasmukhkumar Bhatt',
      floorInCharge: 'Dilipkumar Sankarlal Labana',
      primaryNurse: 'Jalpaben Bhanubhai Rohit',
      shift: 'Morning Shift',
      vitals: {
        bp: '110/70 mmHg',
        pulse: 72,
        spo2: 100,
        temp: 98.0,
        respiratoryRate: 16,
        recordedAt: '10:00 AM'
      },
      drainOutputMl24h: 0,
      foleyCatheterStatus: 'Removed',
      logRollSchedule: {
        lastTurnedTime: 'N/A',
        nextTurnDue: 'N/A',
        twoNursesVerified: false
      },
      fallRiskScoreMorse: 10,
      surgicalDressingStatus: 'Clean & Dry'
    },

    physioRehab: {
      headPhysio: 'Dr. Parth Joshi',
      assignedPhysio: 'Dr. Labheshkumar Narendrabhai Makwana',
      bracePrescribed: 'Taylor Dorsolumbar Brace',
      ambulationMilestone: 'Day 0 Log-roll Supine Core',
      slrRightDegrees: 85,
      slrLeftDegrees: 85,
      functionalGoals: ['Scoliosis specific exercises (Schroth Method)', 'Post-op spinal rotation safety', 'Deep breathing incentive spirometry']
    },

    pharmacy: {
      hodPharmacy: 'Jatin Jayantilal Pathak',
      clinicalPharmacist: 'Preena',
      surgicalAntibioticProphylaxis: {
        drug: 'Inj. Cefuroxime 1.5g + Inj. Amikacin 500mg (planned)',
        timingGiven: 'Pre-Op',
        status: 'Post-Op Dose Due'
      },
      dvtProphylaxis: {
        agent: 'Pneumatic Compression Devices (IPC) Intra & Post-Op',
        timing: 'Planned',
        startedPostOp: false
      },
      multimodalPainRegimen: [
        'Tab. Paracetamol 500mg PRN'
      ],
      allergyAlerts: ['NKDA']
    },

    otStatus: {
      theatreNumber: 'OT 1',
      scrubNurse: 'Bansari Sandipkumar Patel',
      circulatingNurse: 'Sanjana Maheshbhai Gohel',
      otTechnician: 'Vijaybhai Kalubhai Sevta',
      biomedicalLead: 'Meet Jatinkumar Pathak',
      surgicalStage: 'Pre-Induction',
      whoChecklist: {
        signInCompleted: false,
        timeOutCompleted: false,
        signOutCompleted: false
      },
      swabCountStatus: 'In Progress',
      fluoroscopyDoseDap: 0
    },

    assignedPro: 'Khushbu Miteshkumar Nagar',
    escortStatus: 'Idle',
    familyContactName: 'Dharmesh Mehta (Father)',
    familyContactPhone: '+91 98982 44321'
  },
  {
    id: 'pat-004',
    uhid: 'STV-2026-0923',
    ipdNumber: 'IPD-8854',
    name: 'Champaben Natwarlal Shah',
    age: 74,
    gender: 'Female',
    bloodGroup: 'AB+',
    contactNumber: '+91 98240 55182',
    roomBed: 'Bed 303 (Spine HDU)',
    floor: '3rd Floor HDU',
    admitDate: '2026-09-09',
    primarySpineConsultant: 'Dr. Shivanand Mayi',
    associateDoctor: 'Dr. Priyank Vitthalbhai Kapadiya',
    chiefDiagnosis: 'Acute L2 Osteoporotic Vertebral Compression Fracture (50% Height Loss) with Intractable Axial Back Pain',
    affectedSpineRegion: 'lumbar',
    primarySpineLevels: ['L2'],
    currentStage: 'HDU Stabilization',
    vasPainScore: 9,
    oswestryDisabilityIndex: 82,
    eq5dHealthScore: 30,

    neuroExam: {
      motorPower: {
        l2_hipFlexion: 4, // pain limited
        l3_kneeExtension: 4,
        l4_ankleDorsiflexion: 5,
        l5_greatToeExtension: 5,
        s1_anklePlantarflexion: 5
      },
      sensoryDermatomes: {
        l3_anteriorThigh: 'Intact',
        l4_medialMalleolus: 'Intact',
        l5_dorsumFoot: 'Intact',
        s1_lateralHeel: 'Intact',
        s3s5_perianal: 'Intact'
      },
      reflexes: {
        kneeJerkL4: '1+ (Hypo)',
        ankleJerkS1: '1+ (Hypo)',
        babinski: 'Negative (Plantar)'
      },
      redFlags: {
        caudaEquina: false,
        progressiveMotorLoss: false,
        feverWithSpinePain: false,
        bowelBladderIncontinence: false
      }
    },

    sagittalBalance: {
      pelvicIncidence: 62,
      pelvicTilt: 28,
      sacralSlope: 34,
      lumbarLordosis: 38,
      piLlMismatch: 24, // severe mismatch due to collapse
      sagittalVerticalAxis: 58
    },

    surgeryPlan: {
      procedureName: 'Percutaneous Balloon Kyphoplasty L2 with High-Viscosity Radiopaque PMMA Bone Cement',
      approach: 'Percutaneous',
      levels: ['L2'],
      implantRequisition: {
        pedicleScrews: 'N/A (Cement Augmentation)',
        interbodyCage: 'N/A',
        boneGraft: 'High-Viscosity PMMA Bone Cement Kit (6cc)',
        rodLength: 'N/A'
      },
      estimatedDurationMins: 45,
      plannedDate: '2026-09-10',
      primarySurgeon: 'Dr. Shivanand Mayi',
      assistingSurgeons: ['Dr. Kishan Naresh Panjwani']
    },

    anesthesia: {
      anesthetistHead: 'Dr. Kashyap Rameshchandra Shah',
      assignedAnesthetist: 'Dr. Paresh Arvindbhai Mehta',
      asaGrade: 'III',
      mallampatiClass: 'II',
      pronePositioningClearance: true,
      ionmRequired: false,
      ionmStatus: 'Completed',
      postOpAnalgesiaPlan: 'Multimodal Oral + IV Paracetamol',
      npoStatus: 'NPO for Kyphoplasty'
    },

    radiology: {
      headRadiologist: 'Dr. Preety Ajay Krishnan',
      reportingDate: '2026-09-09',
      mriFindings: 'Acute L2 compression fracture with prominent bone marrow edema on STIR sequences. Posterior cortex intact. Retropulsion < 15%. Dual-energy X-ray absorptiometry (DEXA) T-score: -3.4 (Severe Osteoporosis).',
      pfirrmannGrade: 'Grade III',
      canalStenosisGrade: 'Mild',
      listhesisType: 'None',
      dynamicInstabilityXray: 'Stable'
    },

    nursing: {
      cnoLead: 'Brijesh Hasmukhkumar Bhatt',
      floorInCharge: 'Anita Sunilbhai Gohel',
      primaryNurse: 'Saraswati Amitbhai Makwana',
      shift: 'Morning Shift',
      vitals: {
        bp: '142/88 mmHg',
        pulse: 82,
        spo2: 97,
        temp: 98.6,
        respiratoryRate: 18,
        recordedAt: '11:00 AM'
      },
      drainOutputMl24h: 0,
      foleyCatheterStatus: 'In Situ - Clear',
      logRollSchedule: {
        lastTurnedTime: '09:00 AM',
        nextTurnDue: '01:00 PM',
        twoNursesVerified: true
      },
      fallRiskScoreMorse: 75, // High fall risk
      surgicalDressingStatus: 'Clean & Dry'
    },

    physioRehab: {
      headPhysio: 'Dr. Parth Joshi',
      assignedPhysio: 'Dr. Priya Mohanbhai Chudasama',
      bracePrescribed: 'Taylor Dorsolumbar Brace',
      ambulationMilestone: 'Day 0 Log-roll Supine Core',
      slrRightDegrees: 70,
      slrLeftDegrees: 70,
      functionalGoals: ['Taylor brace application prior to sit-to-stand', 'Safe log-rolling technique', 'Fall prevention counseling']
    },

    pharmacy: {
      hodPharmacy: 'Jatin Jayantilal Pathak',
      clinicalPharmacist: 'Preena',
      surgicalAntibioticProphylaxis: {
        drug: 'Inj. Cefazolin 1g IV',
        timingGiven: 'Scheduled',
        status: 'Post-Op Dose Due'
      },
      dvtProphylaxis: {
        agent: 'IPC Booties + Inj. Enoxaparin 20mg SC',
        timing: 'Active',
        startedPostOp: true
      },
      multimodalPainRegimen: [
        'Inj. Fentanyl Patch 25mcg/hr',
        'Tab. Paracetamol 650mg QID',
        'Inj. Teriparatide 20mcg SC OD (Anabolic Bone Builder)'
      ],
      allergyAlerts: ['NKDA']
    },

    otStatus: {
      theatreNumber: 'OT 5',
      scrubNurse: 'Dhruvi Bharatbhai Solanki',
      circulatingNurse: 'Shah Prince Rameshbhai',
      otTechnician: 'Shailesh Dahyabhai Parmar',
      biomedicalLead: 'Meet Jatinkumar Pathak',
      surgicalStage: 'Prone Positioning',
      whoChecklist: {
        signInCompleted: true,
        timeOutCompleted: false,
        signOutCompleted: false
      },
      swabCountStatus: 'In Progress',
      fluoroscopyDoseDap: 45
    },

    assignedPro: 'Hetal Revabhai Solanki',
    escortStatus: 'At Bedside',
    familyContactName: 'Kirit Shah (Son)',
    familyContactPhone: '+91 98240 77334'
  },
  {
    id: 'pat-005',
    uhid: 'STV-2026-0855',
    ipdNumber: 'IPD-8798',
    name: 'Devendrabhai R. Joshi',
    age: 51,
    gender: 'Male',
    bloodGroup: 'O-',
    contactNumber: '+91 98251 33401',
    roomBed: 'OT 2 (Intra-Operative)',
    floor: '4th Floor Ward',
    admitDate: '2026-09-08',
    primarySpineConsultant: 'Dr. Ravi Ranjan Rai',
    associateDoctor: 'Dr. Saurabh Shrikant Kulkarni',
    chiefDiagnosis: 'L5-S1 High-Grade Isthmic Spondylolisthesis (Grade II) with Severe Foraminal Stenosis and Right Foot Drop (EHL 1/5)',
    affectedSpineRegion: 'lumbar',
    primarySpineLevels: ['L5', 'S1'],
    currentStage: 'Intra-Op OT',
    vasPainScore: 7,
    oswestryDisabilityIndex: 74,
    eq5dHealthScore: 40,

    neuroExam: {
      motorPower: {
        l2_hipFlexion: 5,
        l3_kneeExtension: 5,
        l4_ankleDorsiflexion: 4,
        l5_greatToeExtension: 1, // severe foot drop
        s1_anklePlantarflexion: 4
      },
      sensoryDermatomes: {
        l3_anteriorThigh: 'Intact',
        l4_medialMalleolus: 'Intact',
        l5_dorsumFoot: 'Hypoesthetic',
        s1_lateralHeel: 'Hypoesthetic',
        s3s5_perianal: 'Intact'
      },
      reflexes: {
        kneeJerkL4: '2+ (Normal)',
        ankleJerkS1: '0 (Absent)',
        babinski: 'Negative (Plantar)'
      },
      redFlags: {
        caudaEquina: false,
        progressiveMotorLoss: true,
        feverWithSpinePain: false,
        bowelBladderIncontinence: false
      }
    },

    sagittalBalance: {
      pelvicIncidence: 68,
      pelvicTilt: 26,
      sacralSlope: 42,
      lumbarLordosis: 44,
      piLlMismatch: 24,
      sagittalVerticalAxis: 42
    },

    surgeryPlan: {
      procedureName: 'Open Reduction & Instrument-Assisted Spondylolisthesis Realignment + L5-S1 TLIF + Bilateral Gill Laminectomy',
      approach: 'Transforaminal (TLIF)',
      levels: ['L5', 'S1'],
      implantRequisition: {
        pedicleScrews: '4x Reduction Screws + 2x S2 Alar Iliac (S2AI) Screws',
        interbodyCage: '1x Hyperlordotic 12° PEEK Cage (12mm)',
        boneGraft: 'Autologous Spinous Process Bone + DBX Putty',
        rodLength: '2x Dual Contoured Ti Rods (65mm)'
      },
      estimatedDurationMins: 180,
      plannedDate: '2026-09-10',
      primarySurgeon: 'Dr. Ravi Ranjan Rai',
      assistingSurgeons: ['Dr. Saurabh Shrikant Kulkarni', 'Dr. Yogenkumar Amrutlal Adodariya']
    },

    anesthesia: {
      anesthetistHead: 'Dr. Kashyap Rameshchandra Shah',
      assignedAnesthetist: 'Dr. Kashyap Rameshchandra Shah',
      asaGrade: 'II',
      mallampatiClass: 'II',
      pronePositioningClearance: true,
      ionmRequired: true,
      ionmStatus: 'Monitoring Active',
      postOpAnalgesiaPlan: 'Epidural PCEA',
      npoStatus: 'Intra-Op'
    },

    radiology: {
      headRadiologist: 'Dr. Preety Ajay Krishnan',
      reportingDate: '2026-09-08',
      mriFindings: 'Bilateral pars interarticularis defect (spondylolysis) at L5 with 38% anterior slip of L5 over S1. Severe compression of exiting L5 nerve roots bilaterally within the foramina.',
      pfirrmannGrade: 'Grade V',
      canalStenosisGrade: 'Severe Schizas D',
      listhesisType: 'Grade 2 Anterolisthesis',
      dynamicInstabilityXray: '>3mm Translation on Flexion'
    },

    nursing: {
      cnoLead: 'Brijesh Hasmukhkumar Bhatt',
      floorInCharge: 'Anita Sunilbhai Gohel',
      primaryNurse: 'Emerald Rocky Christrian',
      shift: 'Morning Shift',
      vitals: {
        bp: '118/72 mmHg',
        pulse: 68,
        spo2: 100,
        temp: 97.9,
        respiratoryRate: 14,
        recordedAt: '11:15 AM'
      },
      drainOutputMl24h: 0,
      foleyCatheterStatus: 'In Situ - Clear',
      logRollSchedule: {
        lastTurnedTime: 'Prone in OT',
        nextTurnDue: 'Post-Op HDU',
        twoNursesVerified: true
      },
      fallRiskScoreMorse: 50,
      surgicalDressingStatus: 'Clean & Dry'
    },

    physioRehab: {
      headPhysio: 'Dr. Parth Joshi',
      assignedPhysio: 'Dr. Shreya Pravinbhai Hirpara',
      bracePrescribed: 'Lumbosacral (LS) Contoured Belt',
      ambulationMilestone: 'Day 0 Log-roll Supine Core',
      slrRightDegrees: 35,
      slrLeftDegrees: 65,
      functionalGoals: ['Ankle foot orthosis (AFO) fitting for foot drop', 'EHL muscle electrical stimulation', 'Safe spine alignment recovery']
    },

    pharmacy: {
      hodPharmacy: 'Jatin Jayantilal Pathak',
      clinicalPharmacist: 'Preena',
      surgicalAntibioticProphylaxis: {
        drug: 'Inj. Cefuroxime 1.5g IV given at 09:10',
        timingGiven: '09:10 AM (Incision 09:35 AM)',
        status: 'Compliant (<60 min)'
      },
      dvtProphylaxis: {
        agent: 'Enoxaparin 40mg SC OD planned 12h post-op',
        timing: 'Planned',
        startedPostOp: false
      },
      multimodalPainRegimen: [
        'Inj. Paracetamol 1g IV Q8H',
        'Tab. Pregabalin 75mg BD',
        'Epidural Bupivacaine 0.1% + Fentanyl 2mcg/ml'
      ],
      allergyAlerts: ['NKDA']
    },

    otStatus: {
      theatreNumber: 'OT 2',
      scrubNurse: 'Gopalbhai Hareshbhai Prajapati',
      circulatingNurse: 'Smith Rakeshbhai Kalamkar',
      otTechnician: 'Himanshu Babubhai Solanki',
      biomedicalLead: 'Meet Jatinkumar Pathak',
      surgicalStage: 'Decompression & Implantation',
      whoChecklist: {
        signInCompleted: true,
        timeOutCompleted: true,
        signOutCompleted: false
      },
      swabCountStatus: 'In Progress',
      fluoroscopyDoseDap: 210
    },

    assignedPro: 'Khushbu Miteshkumar Nagar',
    escortStatus: 'Returning from OT',
    familyContactName: 'Geetaben Joshi (Wife)',
    familyContactPhone: '+91 98251 44099'
  },
  {
    id: 'pat-006',
    uhid: 'STV-2026-0940',
    ipdNumber: 'IPD-8869',
    name: 'Pooja J. Solanki',
    age: 34,
    gender: 'Female',
    bloodGroup: 'A+',
    contactNumber: '+91 99042 11984',
    roomBed: 'Bed 408 (Day Care Spine)',
    floor: '4th Floor Ward',
    admitDate: '2026-09-10',
    primarySpineConsultant: 'Dr. Mirant Bharat Dave',
    associateDoctor: 'Dr. Kesha Hiteshbhai Shah',
    chiefDiagnosis: 'Acute Right L5-S1 Paracentral Soft Disc Prolapse with Severe Sciatica (Failed 6 Weeks Conservative Care)',
    affectedSpineRegion: 'lumbar',
    primarySpineLevels: ['L5', 'S1'],
    currentStage: 'Discharge Ready',
    vasPainScore: 1, // down from 9!
    oswestryDisabilityIndex: 14,
    eq5dHealthScore: 92,

    neuroExam: {
      motorPower: {
        l2_hipFlexion: 5,
        l3_kneeExtension: 5,
        l4_ankleDorsiflexion: 5,
        l5_greatToeExtension: 5,
        s1_anklePlantarflexion: 5
      },
      sensoryDermatomes: {
        l3_anteriorThigh: 'Intact',
        l4_medialMalleolus: 'Intact',
        l5_dorsumFoot: 'Intact',
        s1_lateralHeel: 'Intact',
        s3s5_perianal: 'Intact'
      },
      reflexes: {
        kneeJerkL4: '2+ (Normal)',
        ankleJerkS1: '2+ (Normal)',
        babinski: 'Negative (Plantar)'
      },
      redFlags: {
        caudaEquina: false,
        progressiveMotorLoss: false,
        feverWithSpinePain: false,
        bowelBladderIncontinence: false
      }
    },

    sagittalBalance: {
      pelvicIncidence: 52,
      pelvicTilt: 16,
      sacralSlope: 36,
      lumbarLordosis: 50,
      piLlMismatch: 2,
      sagittalVerticalAxis: 14
    },

    surgeryPlan: {
      procedureName: 'Full-Endoscopic Lumbar Interlaminar Discectomy (FE-LD) L5-S1 (Day Care)',
      approach: 'Endoscopic',
      levels: ['L5', 'S1'],
      implantRequisition: {
        pedicleScrews: 'N/A (Full Endoscopic)',
        interbodyCage: 'N/A',
        boneGraft: 'N/A',
        rodLength: 'N/A'
      },
      estimatedDurationMins: 45,
      plannedDate: '2026-09-10',
      primarySurgeon: 'Dr. Mirant Bharat Dave',
      assistingSurgeons: ['Dr. Het Jigneshkumar Parikh']
    },

    anesthesia: {
      anesthetistHead: 'Dr. Kashyap Rameshchandra Shah',
      assignedAnesthetist: 'Dr. Ketul Balkrishna Patel',
      asaGrade: 'I',
      mallampatiClass: 'I',
      pronePositioningClearance: true,
      ionmRequired: false,
      ionmStatus: 'Completed',
      postOpAnalgesiaPlan: 'Multimodal Oral + IV Paracetamol',
      npoStatus: 'Regular Diet'
    },

    radiology: {
      headRadiologist: 'Dr. Preety Ajay Krishnan',
      reportingDate: '2026-09-09',
      mriFindings: 'Focal right paracentral extruded disc fragment compressing the traversing S1 nerve root at L5-S1. No canal stenosis elsewhere.',
      pfirrmannGrade: 'Grade III',
      canalStenosisGrade: 'Moderate',
      listhesisType: 'None',
      dynamicInstabilityXray: 'Stable'
    },

    nursing: {
      cnoLead: 'Brijesh Hasmukhkumar Bhatt',
      floorInCharge: 'Anita Sunilbhai Gohel',
      primaryNurse: 'Emerald Rocky Christrian',
      shift: 'Morning Shift',
      vitals: {
        bp: '116/74 mmHg',
        pulse: 70,
        spo2: 99,
        temp: 98.4,
        respiratoryRate: 14,
        recordedAt: '11:30 AM'
      },
      drainOutputMl24h: 0, // no drain required for endoscopic discectomy
      foleyCatheterStatus: 'Removed',
      logRollSchedule: {
        lastTurnedTime: 'N/A (Independent)',
        nextTurnDue: 'N/A',
        twoNursesVerified: false
      },
      fallRiskScoreMorse: 15,
      surgicalDressingStatus: 'Clean & Dry'
    },

    physioRehab: {
      headPhysio: 'Dr. Parth Joshi',
      assignedPhysio: 'Dr. Shreya Pravinbhai Hirpara',
      bracePrescribed: 'Lumbosacral (LS) Contoured Belt',
      ambulationMilestone: 'Day 3 Independent Ambulation & Stairs',
      slrRightDegrees: 80, // dramatically improved from 30°
      slrLeftDegrees: 85,
      functionalGoals: ['Ergonomic bending instructions', 'No twisting or heavy lifting >5kg for 4 weeks', 'Return to desk work in 10 days']
    },

    pharmacy: {
      hodPharmacy: 'Jatin Jayantilal Pathak',
      clinicalPharmacist: 'Preena',
      surgicalAntibioticProphylaxis: {
        drug: 'Inj. Cefuroxime 1.5g IV single dose',
        timingGiven: '07:45 AM',
        status: 'Compliant (<60 min)'
      },
      dvtProphylaxis: {
        agent: 'Early full ambulation within 3 hours',
        timing: 'Completed',
        startedPostOp: true
      },
      multimodalPainRegimen: [
        'Tab. Paracetamol 650mg PRN',
        'Tab. Pantoprazole 40mg OD x 5 days'
      ],
      allergyAlerts: ['NKDA']
    },

    otStatus: {
      theatreNumber: 'OT 4 (Endoscopy)',
      scrubNurse: 'Anandkumar Jitendrabhai Harijn',
      circulatingNurse: 'Vidhi Sandeepkumar Patel',
      otTechnician: 'Anandkumar Jitendrabhai Harijn',
      biomedicalLead: 'Meet Jatinkumar Pathak',
      surgicalStage: 'PACU Recovery',
      whoChecklist: {
        signInCompleted: true,
        timeOutCompleted: true,
        signOutCompleted: true
      },
      swabCountStatus: 'All Correct 40/40',
      fluoroscopyDoseDap: 28
    },

    assignedPro: 'Khushbu Miteshkumar Nagar',
    escortStatus: 'Idle',
    familyContactName: 'Jatin Solanki (Brother)',
    familyContactPhone: '+91 99042 33451'
  }
];
