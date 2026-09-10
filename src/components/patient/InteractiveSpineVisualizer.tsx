import React, { useState } from 'react';
import { 
  Activity, 
  Layers, 
  AlertCircle, 
  Info, 
  Compass, 
  Check, 
  Sliders, 
  Eye, 
  Zap,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { PatientDossier, SpineLevel, SpineRegion } from '../../types';

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

  const activeVertebra = VERTEBRAE.find(v => v.level === selectedLevel) || VERTEBRAE[16]; // L4 default
  const isPatientAffectedLevel = patient.primarySpineLevels.includes(selectedLevel);

  const handleSelect = (level: SpineLevel) => {
    setSelectedLevel(level);
    if (onLevelSelect) onLevelSelect(level);
  };

  return (
    <div className="w-full glass-panel-glow rounded-2xl p-5 border border-cyan-500/30 shadow-2xl space-y-6">
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base sm:text-lg font-heading font-bold text-white flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Layers className="w-4 h-4" />
            </span>
            Interactive 3D Spinal Column & Nerve Root Explorer
          </h2>
          <p className="text-xs text-slate-400">
            Click any vertebra to correlate with {patient.name}’s MRI findings, nerve root compression, and surgical implants.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => setViewMode('anatomy')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              viewMode === 'anatomy' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Spinal Column
          </button>
          <button
            onClick={() => setViewMode('sagittal')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              viewMode === 'sagittal' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sagittal Balance (PI/LL)
          </button>
          <button
            onClick={() => setViewMode('axial')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              viewMode === 'axial' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Axial Canal Cross-Section
          </button>
        </div>
      </div>

      {viewMode === 'anatomy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive Spinal Column Vertebrae Ladder */}
          <div className="lg:col-span-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>Cranio-Caudal Column</span>
              <span>Regional Division</span>
            </div>

            {/* Vertebral ladder with color coding */}
            <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
              {VERTEBRAE.map(v => {
                const isSelected = v.level === selectedLevel;
                const isAffected = patient.primarySpineLevels.includes(v.level);

                let regionBg = 'border-slate-800 hover:border-slate-700 bg-slate-900/50';
                if (isSelected) {
                  regionBg = 'border-cyan-400 bg-gradient-to-r from-cyan-950/90 to-slate-900 shadow-lg shadow-cyan-500/20';
                } else if (isAffected) {
                  regionBg = 'border-amber-500/60 bg-amber-950/30 text-amber-200';
                }

                return (
                  <div
                    key={v.level}
                    onClick={() => handleSelect(v.level)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition text-xs ${regionBg} group`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                        isSelected 
                          ? 'bg-cyan-500 text-slate-950 shadow' 
                          : isAffected 
                          ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50 animate-pulse' 
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {v.level}
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-cyan-300 transition flex items-center gap-1.5">
                          {v.label}
                          {isAffected && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-bold uppercase tracking-wider">
                              Patient Site
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {v.nerveRoot} · {v.myotome.split('(')[0]}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                        v.region === 'cervical' ? 'bg-sky-950 text-sky-400 border border-sky-800/40' :
                        v.region === 'thoracic' ? 'bg-indigo-950 text-indigo-400 border border-indigo-800/40' :
                        v.region === 'lumbar' ? 'bg-teal-950 text-teal-400 border border-teal-800/40' :
                        'bg-purple-950 text-purple-400 border border-purple-800/40'
                      }`}>
                        {v.region}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Rich Anatomical & Clinical Deep-Dive Card */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-sky-950/30 border border-cyan-500/30 shadow-xl space-y-4">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-heading font-extrabold text-white">
                      {activeVertebra.label}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                      Nerve Root: {activeVertebra.nerveRoot}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Anatomical segment · Region: <span className="capitalize text-slate-200">{activeVertebra.region}</span>
                  </p>
                </div>

                {isPatientAffectedLevel ? (
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 shrink-0">
                    <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
                    Target Surgical Level
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 font-medium shrink-0">
                    Adjacent Intact Level
                  </div>
                )}
              </div>

              {/* Functional Neurological Mapping */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Myotome & Motor Power */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-cyan-400 uppercase tracking-wider font-semibold block">
                    Myotome (Motor Power)
                  </span>
                  <div className="font-bold text-white text-sm">
                    {activeVertebra.myotome}
                  </div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/80">
                    {isPatientAffectedLevel ? (
                      <span className="text-amber-400 font-semibold">
                        Patient Status: {patient.neuroExam.motorPower.l5_greatToeExtension}/5 Power
                      </span>
                    ) : (
                      <span className="text-emerald-400">Normal 5/5 Grade</span>
                    )}
                  </div>
                </div>

                {/* Dermatome (Sensory) */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-teal-400 uppercase tracking-wider font-semibold block">
                    Dermatome (Sensory Territory)
                  </span>
                  <div className="font-bold text-white text-sm">
                    {activeVertebra.dermatome}
                  </div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/80">
                    {activeVertebra.reflex && (
                      <span className="text-slate-300">
                        Reflex: <strong className="text-cyan-300">{activeVertebra.reflex}</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Patient Radiological Correlation */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-[10px] text-purple-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> Radiology & PACS Correlation at {activeVertebra.level}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isPatientAffectedLevel ? (
                    patient.radiology.mriFindings
                  ) : (
                    `Normal vertebral height and disc signal at ${activeVertebra.level}. No foraminal stenosis or nerve impingement detected.`
                  )}
                </p>

                {isPatientAffectedLevel && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Pfirrmann: <strong className="text-white">{patient.radiology.pfirrmannGrade}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Canal Stenosis: <strong className="text-amber-400">{patient.radiology.canalStenosisGrade}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Spondylolisthesis: <strong className="text-cyan-400">{patient.radiology.listhesisType}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Surgical Intervention at this level */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/20 space-y-2">
                <span className="text-[10px] text-cyan-300 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> Surgical Approach & Implants ({activeVertebra.level})
                </span>
                {isPatientAffectedLevel ? (
                  <div className="space-y-1.5 text-xs">
                    <div className="font-semibold text-white">
                      {patient.surgeryPlan.procedureName}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                      <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Fixation Screws:</span>
                        {patient.surgeryPlan.implantRequisition.pedicleScrews}
                      </div>
                      <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Interbody Cage:</span>
                        {patient.surgeryPlan.implantRequisition.interbodyCage}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">
                    Preserved native mobility segment. No surgical instrumentations planned at this level.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'sagittal' && (
        <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-heading font-bold text-white text-base">
                Sagittal Spinal Alignment & Pelvic Balance Calculator
              </h3>
              <p className="text-xs text-slate-400">
                Formula: $PI = PT + SS$ | Target: Lumbar Lordosis ($LL$) within $\pm 9^\circ$ of Pelvic Incidence ($PI$)
              </p>
            </div>
            <div className={`px-3 py-1 rounded-xl text-xs font-bold border ${
              patient.sagittalBalance.piLlMismatch <= 10
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
                : 'bg-rose-950/80 text-rose-400 border-rose-500/40 animate-pulse'
            }`}>
              {patient.sagittalBalance.piLlMismatch <= 10 ? 'Balanced Spine' : 'Severe Sagittal Mismatch'}
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Pelvic Incidence (PI)</span>
              <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                {patient.sagittalBalance.pelvicIncidence}°
              </div>
              <span className="text-[10px] text-slate-500">Fixed morphological</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Pelvic Tilt (PT)</span>
              <div className="text-2xl font-bold font-mono text-teal-400 mt-1">
                {patient.sagittalBalance.pelvicTilt}°
              </div>
              <span className="text-[10px] text-slate-500">{patient.sagittalBalance.pelvicTilt > 20 ? 'Retroverted' : 'Normal'}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Sacral Slope (SS)</span>
              <div className="text-2xl font-bold font-mono text-indigo-400 mt-1">
                {patient.sagittalBalance.sacralSlope}°
              </div>
              <span className="text-[10px] text-slate-500">Sacral plate angle</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Lumbar Lordosis (LL)</span>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                {patient.sagittalBalance.lumbarLordosis}°
              </div>
              <span className="text-[10px] text-slate-500">L1–S1 Cobb angle</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">PI – LL Mismatch</span>
              <div className={`text-2xl font-bold font-mono mt-1 ${
                patient.sagittalBalance.piLlMismatch > 10 ? 'text-rose-400' : 'text-cyan-400'
              }`}>
                {patient.sagittalBalance.piLlMismatch}°
              </div>
              <span className="text-[10px] text-slate-500">Ideal: &lt;10°</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Sagittal Axis (SVA)</span>
              <div className="text-2xl font-bold font-mono text-purple-400 mt-1">
                {patient.sagittalBalance.sagittalVerticalAxis} mm
              </div>
              <span className="text-[10px] text-slate-500">C7 plumbline offset</span>
            </div>
          </div>

          {/* Clinical interpretation banner */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-white">
                Surgical Sagittal Realignment Strategy for {patient.name}:
              </div>
              <p>
                Pre-operative planning by Dr. Bharat Dave targets restoring {patient.sagittalBalance.pelvicIncidence}° of lumbar lordosis. 
                With a current PI–LL mismatch of {patient.sagittalBalance.piLlMismatch}°, cage angle and reduction maneuver 
                are calibrated to prevent adjacent segment disease (ASD) and maintain erect painless posture.
              </p>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'axial' && (
        <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-heading font-bold text-white text-base">
                Axial Cross-Section & Thecal Sac Stenosis Analyzer
              </h3>
              <p className="text-xs text-slate-400">
                Cross-sectional view of spinal canal, traversing nerve roots, and disc extrusion at {selectedLevel}
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
              Residual AP Diameter: 6.2 mm
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* SVG Axial representation */}
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center relative">
              <svg viewBox="0 0 300 240" className="w-64 h-56">
                {/* Vertebral Body Anterior */}
                <ellipse cx="150" cy="70" rx="90" ry="45" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="150" y="75" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">VERTEBRAL BODY (ANTERIOR)</text>
                
                {/* Intervertebral Disc with Extrusion */}
                <ellipse cx="150" cy="115" rx="75" ry="30" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
                {/* Disc Herniation blob */}
                <path d="M 135,125 Q 150,155 165,125 Z" fill="#ef4444" opacity="0.85" className="animate-pulse" />

                {/* Spinal Canal / Thecal Sac */}
                <circle cx="150" cy="155" r="32" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7" strokeWidth="2" strokeDasharray="3,3" />
                
                {/* Compressed Cauda Equina Roots */}
                <circle cx="145" cy="150" r="3" fill="#facc15" />
                <circle cx="155" cy="150" r="3" fill="#facc15" />
                <circle cx="142" cy="160" r="3" fill="#facc15" />
                <circle cx="158" cy="160" r="3" fill="#facc15" />

                {/* Posterior Neural Arch & Facets */}
                <path d="M 75,100 Q 80,180 120,200 L 150,230 L 180,200 Q 220,180 225,100" fill="none" stroke="#64748b" strokeWidth="2" />
                <text x="150" y="235" textAnchor="middle" fill="#94a3b8" fontSize="10">Spinous Process (Posterior)</text>
              </svg>
              <div className="text-[11px] text-slate-400 mt-2 text-center">
                Red node indicates extruded disc fragment compressing the traversing nerve roots in the thecal sac.
              </div>
            </div>

            {/* Axial details */}
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Schizas Stenosis Grading</span>
                <div className="font-bold text-rose-400 text-sm mt-0.5">
                  {patient.radiology.canalStenosisGrade}
                </div>
                <p className="text-slate-400 mt-1">
                  Complete absence of CSF signal anterior and posterior to rootlets (rootlet aggregation with severe circumferential pinching).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Decompression Clearance Plan</span>
                <div className="font-bold text-cyan-300 text-sm mt-0.5">
                  Micro-Decompression & Bilateral Subarticular Undercutting
                </div>
                <p className="text-slate-400 mt-1">
                  Preserving contralateral facet joint while releasing exiting and traversing nerve roots completely.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
