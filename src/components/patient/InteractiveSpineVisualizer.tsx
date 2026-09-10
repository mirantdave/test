import React, { useState } from 'react';
import { 
  Activity, 
  Layers, 
  Info, 
  Eye, 
  Zap
} from 'lucide-react';
import type { PatientDossier, SpineLevel, SpineRegion } from '../../types';

interface InteractiveSpineVisualizerProps {
  patient: PatientDossier;
  onLevelSelect?: (level: SpineLevel) => void;
}

interface VertebraDef {
  level: SpineLevel;
  region: SpineRegion;
  label: string;
  nerveRoot: string;
  myotome: string;
  dermatome: string;
  reflex?: string;
  commonPathology: string;
}

const VERTEBRAE: VertebraDef[] = [
  // Cervical
  { level: 'C1', region: 'cervical', label: 'Atlas (C1)', nerveRoot: 'C1 Suboccipital', myotome: 'Suboccipital neck muscles', dermatome: 'Vertex of skull', commonPathology: 'Jefferson burst fracture, atlanto-axial instability' },
  { level: 'C2', region: 'cervical', label: 'Axis (C2)', nerveRoot: 'C2 Greater Occipital', myotome: 'Cervical rotators', dermatome: 'Occiput & angle of mandible', commonPathology: 'Odontoid peg fracture, Hangman fracture' },
  { level: 'C3', region: 'cervical', label: 'C3 Vertebra', nerveRoot: 'C3', myotome: 'Trapezius, splenius', dermatome: 'Supraclavicular fossa', commonPathology: 'High cervical spondylosis' },
  { level: 'C4', region: 'cervical', label: 'C4 Vertebra', nerveRoot: 'C4 Phrenic', myotome: 'Diaphragm & shoulder shrug', dermatome: 'Acromioclavicular joint', commonPathology: 'Phrenic nerve risk, high canal stenosis' },
  { level: 'C5', region: 'cervical', label: 'C5 Vertebra', nerveRoot: 'C5', myotome: 'Deltoid, Biceps (Shoulder Abduction)', dermatome: 'Lateral arm / Deltoid area', reflex: 'Biceps Jerk', commonPathology: 'C4-C5 disc protrusion, deltoid paresis' },
  { level: 'C6', region: 'cervical', label: 'C6 Vertebra', nerveRoot: 'C6', myotome: 'Wrist Extensors, Biceps', dermatome: 'Lateral forearm, thumb & index finger', reflex: 'Brachioradialis Jerk', commonPathology: 'C5-C6 soft disc extrusion (Common ACDF site)' },
  { level: 'C7', region: 'cervical', label: 'C7 Vertebra', nerveRoot: 'C7', myotome: 'Triceps, Wrist Flexors, Finger Extensors', dermatome: 'Middle finger', reflex: 'Triceps Jerk', commonPathology: 'C6-C7 disc herniation, triceps weakness' },

  // Thoracic
  { level: 'T1', region: 'thoracic', label: 'T1 Vertebra', nerveRoot: 'T1', myotome: 'Hand Intrinsics (Finger Abduction)', dermatome: 'Medial forearm', commonPathology: 'Thoracic outlet, apical lung relations' },
  { level: 'T4', region: 'thoracic', label: 'T4 Vertebra', nerveRoot: 'T4', myotome: 'Intercostal muscles', dermatome: 'Nipple line (T4)', commonPathology: 'Mid-thoracic compression fracture, apex of scoliosis' },
  { level: 'T6', region: 'thoracic', label: 'T6 Vertebra', nerveRoot: 'T6', myotome: 'Thoraco-abdominal musculature', dermatome: 'Xiphisternum', commonPathology: 'Thoracic kyphosis apex, myelopathy cord compression' },
  { level: 'T8', region: 'thoracic', label: 'T8 Vertebra', nerveRoot: 'T8', myotome: 'Intercostal muscles', dermatome: 'Lower ribs', commonPathology: 'Adolescent idiopathic scoliosis main curve' },
  { level: 'T10', region: 'thoracic', label: 'T10 Vertebra', nerveRoot: 'T10', myotome: 'Abdominal wall tension (Beevor sign)', dermatome: 'Umbilicus (T10)', commonPathology: 'Thoracic disc herniation, Brown-Séquard syndrome' },
  { level: 'T12', region: 'thoracic', label: 'T12 Vertebra', nerveRoot: 'T12', myotome: 'Lower abdominal muscles', dermatome: 'Groin & iliac crest', commonPathology: 'Thoracolumbar junction burst fracture (T12-L1)' },

  // Lumbar
  { level: 'L1', region: 'lumbar', label: 'L1 Vertebra', nerveRoot: 'L1', myotome: 'Psoas, Iliacus', dermatome: 'Upper thigh / Inguinal ligament', commonPathology: 'Conus medullaris termination zone, osteoporotic fracture' },
  { level: 'L2', region: 'lumbar', label: 'L2 Vertebra', nerveRoot: 'L2', myotome: 'Hip Flexion (Iliopsoas)', dermatome: 'Mid-anterior thigh', commonPathology: 'Vertebral compression fracture (Kyphoplasty candidate)' },
  { level: 'L3', region: 'lumbar', label: 'L3 Vertebra', nerveRoot: 'L3', myotome: 'Knee Extension (Quadriceps)', dermatome: 'Lower anterior thigh & medial knee', reflex: 'Adductor reflex', commonPathology: 'L2-L3 foraminal stenosis, quadriceps wasting' },
  { level: 'L4', region: 'lumbar', label: 'L4 Vertebra', nerveRoot: 'L4', myotome: 'Ankle Dorsiflexion (Tibialis Anterior)', dermatome: 'Medial lower leg & medial malleolus', reflex: 'Knee Jerk (Patellar)', commonPathology: 'L3-L4 / L4-L5 degenerative canal stenosis' },
  { level: 'L5', region: 'lumbar', label: 'L5 Vertebra', nerveRoot: 'L5', myotome: 'Great Toe Extension (Extensor Hallucis Longus)', dermatome: 'Dorsum of foot & 1st web space', commonPathology: 'L4-L5 disc herniation, L5 spondylolisthesis, foot drop' },

  // Sacrum
  { level: 'S1', region: 'sacrum', label: 'S1 Sacral Segment', nerveRoot: 'S1', myotome: 'Ankle Plantarflexion (Gastrocnemius / Soleus)', dermatome: 'Lateral foot, sole & little toe', reflex: 'Ankle Jerk (Achilles)', commonPathology: 'L5-S1 isthmic spondylolisthesis, classic sciatica' },
  { level: 'S2', region: 'sacrum', label: 'S2–S5 Cauda Equina', nerveRoot: 'S2–S5', myotome: 'Anal Sphincter Tone & Perineal control', dermatome: 'Saddle area / Perianal region', reflex: 'Bulbocavernosus & Anal Wink', commonPathology: 'Cauda Equina Syndrome (SURGICAL EMERGENCY)' }
];

export const InteractiveSpineVisualizer: React.FC<InteractiveSpineVisualizerProps> = ({ 
  patient,
  onLevelSelect 
}) => {
  const [selectedLevel, setSelectedLevel] = useState<SpineLevel>(patient.primarySpineLevels[0] || 'L4');
  const [viewMode, setViewMode] = useState<'anatomy' | 'sagittal' | 'axial'>('anatomy');

  const activeVertebra = VERTEBRAE.find(v => v.level === selectedLevel) || VERTEBRAE[16];
  const isPatientAffectedLevel = patient.primarySpineLevels.includes(selectedLevel);

  const handleSelect = (level: SpineLevel) => {
    setSelectedLevel(level);
    if (onLevelSelect) onLevelSelect(level);
  };

  return (
    <div className="w-full bg-white rounded-xl p-5 border border-slate-200/80 space-y-5 text-slate-900">
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
        <div>
          <h2 className="text-base sm:text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
            <span className="p-1 rounded-md bg-blue-50 text-blue-600">
              <Layers className="w-4 h-4" />
            </span>
            3D Spinal Column & Nerve Root Explorer
          </h2>
          <p className="text-xs text-slate-500">
            Interactive correlation with {patient.name}’s MRI findings and surgical levels.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200/70">
          <button
            onClick={() => setViewMode('anatomy')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${
              viewMode === 'anatomy' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Spinal Column
          </button>
          <button
            onClick={() => setViewMode('sagittal')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${
              viewMode === 'sagittal' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sagittal Balance
          </button>
          <button
            onClick={() => setViewMode('axial')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${
              viewMode === 'axial' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Axial Canal
          </button>
        </div>
      </div>

      {viewMode === 'anatomy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Spinal Column Vertebrae Ladder */}
          <div className="lg:col-span-5 p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-2.5">
            <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-1">
              <span>Cranio-Caudal Column</span>
              <span>Region</span>
            </div>

            {/* Vertebral ladder with minimalist selection */}
            <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
              {VERTEBRAE.map(v => {
                const isSelected = v.level === selectedLevel;
                const isAffected = patient.primarySpineLevels.includes(v.level);

                return (
                  <div
                    key={v.level}
                    onClick={() => handleSelect(v.level)}
                    className={`w-full p-2 rounded-lg border flex items-center justify-between cursor-pointer transition text-xs ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/90 text-blue-900'
                        : isAffected
                        ? 'border-amber-200 bg-amber-50/70 text-amber-900'
                        : 'border-slate-200/60 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[11px] font-bold ${
                        isSelected 
                          ? 'bg-blue-600 text-white' 
                          : isAffected 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {v.level}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          {v.label}
                          {isAffected && (
                            <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-medium">
                              Target
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {v.nerveRoot}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-medium text-slate-400 capitalize">
                        {v.region}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Anatomical & Clinical Deep-Dive Card */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-xl bg-white border border-slate-200/80 space-y-4">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-heading font-bold text-slate-900">
                      {activeVertebra.label}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono font-medium">
                      {activeVertebra.nerveRoot}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Region: <span className="capitalize font-medium text-slate-700">{activeVertebra.region}</span>
                  </p>
                </div>

                {isPatientAffectedLevel ? (
                  <div className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-1.5 shrink-0">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    Target Level
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 font-medium shrink-0">
                    Adjacent Level
                  </div>
                )}
              </div>

              {/* Functional Neurological Mapping */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Myotome & Motor Power */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                    Myotome (Motor Power)
                  </span>
                  <div className="font-semibold text-slate-900 text-xs">
                    {activeVertebra.myotome}
                  </div>
                  <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-200">
                    {isPatientAffectedLevel ? (
                      <span className="text-amber-700 font-semibold">
                        Patient Status: {patient.neuroExam.motorPower.l5_greatToeExtension}/5 Power
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-medium">Normal 5/5</span>
                    )}
                  </div>
                </div>

                {/* Dermatome (Sensory) */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                    Dermatome (Sensory Territory)
                  </span>
                  <div className="font-semibold text-slate-900 text-xs">
                    {activeVertebra.dermatome}
                  </div>
                  <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-200">
                    {activeVertebra.reflex && (
                      <span className="text-slate-600">
                        Reflex: <strong>{activeVertebra.reflex}</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Patient Radiological Correlation */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-blue-600" /> Radiology Findings at {activeVertebra.level}
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {isPatientAffectedLevel ? (
                    patient.radiology.mriFindings
                  ) : (
                    `Normal vertebral height and disc signal at ${activeVertebra.level}. No foraminal stenosis detected.`
                  )}
                </p>

                {isPatientAffectedLevel && (
                  <div className="flex flex-wrap gap-2 pt-1.5 border-t border-slate-200 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                      Pfirrmann: <strong className="text-slate-900">{patient.radiology.pfirrmannGrade}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                      Canal Stenosis: <strong className="text-rose-600">{patient.radiology.canalStenosisGrade}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                      Listhesis: <strong className="text-blue-700">{patient.radiology.listhesisType}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Surgical Intervention at this level */}
              <div className="p-3.5 rounded-lg bg-blue-50/50 border border-blue-100 space-y-1.5">
                <span className="text-[10px] text-blue-800 uppercase font-semibold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> Surgical Approach & Hardware
                </span>
                {isPatientAffectedLevel ? (
                  <div className="space-y-1 text-xs">
                    <div className="font-semibold text-slate-900">
                      {patient.surgeryPlan.procedureName}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700 pt-1">
                      <div className="p-2 rounded bg-white border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Screws:</span>
                        <strong className="text-slate-900">{patient.surgeryPlan.implantRequisition.pedicleScrews}</strong>
                      </div>
                      <div className="p-2 rounded bg-white border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Cage:</span>
                        <strong className="text-slate-900">{patient.surgeryPlan.implantRequisition.interbodyCage}</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">
                    Preserved native segment. No instrumentation required at this level.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'sagittal' && (
        <div className="p-5 rounded-xl bg-white border border-slate-200/80 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base">
                Sagittal Alignment & Pelvic Balance
              </h3>
              <p className="text-xs text-slate-500">
                Formula: PI = PT + SS | Ideal PI–LL Mismatch: &lt;10°
              </p>
            </div>
            <div className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${
              patient.sagittalBalance.piLlMismatch <= 10
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              {patient.sagittalBalance.piLlMismatch <= 10 ? 'Balanced' : 'Sagittal Mismatch'}
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-medium">Pelvic Incidence</span>
              <div className="text-xl font-bold font-mono text-blue-700 mt-0.5">
                {patient.sagittalBalance.pelvicIncidence}°
              </div>
              <span className="text-[10px] text-slate-400">Fixed</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-medium">Pelvic Tilt</span>
              <div className="text-xl font-bold font-mono text-teal-700 mt-0.5">
                {patient.sagittalBalance.pelvicTilt}°
              </div>
              <span className="text-[10px] text-slate-400">Positional</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-medium">Sacral Slope</span>
              <div className="text-xl font-bold font-mono text-indigo-700 mt-0.5">
                {patient.sagittalBalance.sacralSlope}°
              </div>
              <span className="text-[10px] text-slate-400">Base</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-medium">Lumbar Lordosis</span>
              <div className="text-xl font-bold font-mono text-emerald-700 mt-0.5">
                {patient.sagittalBalance.lumbarLordosis}°
              </div>
              <span className="text-[10px] text-slate-400">L1–S1 Arc</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-medium">PI – LL Mismatch</span>
              <div className={`text-xl font-bold font-mono mt-0.5 ${
                patient.sagittalBalance.piLlMismatch > 10 ? 'text-rose-600' : 'text-blue-700'
              }`}>
                {patient.sagittalBalance.piLlMismatch}°
              </div>
              <span className="text-[10px] text-slate-400">Target &lt;10°</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-medium">Sagittal SVA</span>
              <div className="text-xl font-bold font-mono text-purple-700 mt-0.5">
                {patient.sagittalBalance.sagittalVerticalAxis} mm
              </div>
              <span className="text-[10px] text-slate-400">Plumbline</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              Pre-operative surgical planning by Dr. Bharat Dave restores {patient.sagittalBalance.pelvicIncidence}° of lumbar lordosis. 
              Cage angle and reduction maneuvers are calibrated to avoid adjacent segment breakdown.
            </p>
          </div>
        </div>
      )}

      {viewMode === 'axial' && (
        <div className="p-5 rounded-xl bg-white border border-slate-200/80 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base">
                Axial Canal Cross-Section & Thecal Sac Analyzer
              </h3>
              <p className="text-xs text-slate-500">
                Canal narrowing and thecal sac compression at {selectedLevel}
              </p>
            </div>
            <span className="text-xs font-mono text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200 font-semibold">
              Residual AP: 6.2 mm
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* SVG Axial representation */}
            <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
              <svg viewBox="0 0 300 240" className="w-64 h-52">
                <ellipse cx="150" cy="70" rx="90" ry="45" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                <text x="150" y="75" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">VERTEBRAL BODY (ANTERIOR)</text>
                
                <ellipse cx="150" cy="115" rx="75" ry="30" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
                <path d="M 135,125 Q 150,155 165,125 Z" fill="#ef4444" opacity="0.85" />

                <circle cx="150" cy="155" r="32" fill="#3b82f6" fillOpacity="0.1" stroke="#2563eb" strokeWidth="2" strokeDasharray="3,3" />
                
                <circle cx="145" cy="150" r="3" fill="#d97706" />
                <circle cx="155" cy="150" r="3" fill="#d97706" />
                <circle cx="142" cy="160" r="3" fill="#d97706" />
                <circle cx="158" cy="160" r="3" fill="#d97706" />

                <path d="M 75,100 Q 80,180 120,200 L 150,230 L 180,200 Q 220,180 225,100" fill="none" stroke="#94a3b8" strokeWidth="2" />
                <text x="150" y="235" textAnchor="middle" fill="#94a3b8" fontSize="10">Spinous Process (Posterior)</text>
              </svg>
              <div className="text-[11px] text-slate-500 mt-2 text-center">
                Red node indicates extruded disc fragment compressing the traversing nerve roots in the thecal sac.
              </div>
            </div>

            {/* Axial details */}
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Schizas Stenosis Grading</span>
                <div className="font-bold text-rose-600 text-sm mt-0.5">
                  {patient.radiology.canalStenosisGrade}
                </div>
                <p className="text-slate-600 mt-1">
                  Rootlet aggregation with severe circumferential pinching.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Decompression Plan</span>
                <div className="font-bold text-blue-700 text-sm mt-0.5">
                  Micro-Decompression & Subarticular Undercutting
                </div>
                <p className="text-slate-600 mt-1">
                  Preserving facet joint while releasing exiting and traversing nerve roots completely.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
