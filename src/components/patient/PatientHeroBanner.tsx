import React from 'react';
import { 
  User, 
  Activity, 
  ShieldAlert, 
  Flame, 
  Droplet, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Stethoscope,
  HeartPulse,
  Share2,
  Compass,
  FileCheck
} from 'lucide-react';
import { PatientDossier, PatientStage } from '../../types';

interface PatientHeroBannerProps {
  patient: PatientDossier;
  onUpdatePainScore?: (newScore: number) => void;
  onNavigateToService?: (serviceKey: string) => void;
}

const STAGES: PatientStage[] = [
  'OPD Evaluation',
  'Pre-Op PAC Clearance',
  'Intra-Op OT',
  'HDU Stabilization',
  'Inpatient Floor Care',
  'Spine Rehab & Ambulation',
  'Discharge Ready'
];

export const PatientHeroBanner: React.FC<PatientHeroBannerProps> = ({ 
  patient, 
  onNavigateToService 
}) => {
  const currentStageIndex = STAGES.indexOf(patient.currentStage);

  const getVasColor = (score: number) => {
    if (score <= 3) return 'text-emerald-400 bg-emerald-950/80 border-emerald-500/40';
    if (score <= 6) return 'text-amber-400 bg-amber-950/80 border-amber-500/40';
    return 'text-rose-400 bg-rose-950/80 border-rose-500/40 animate-pulse';
  };

  return (
    <div className="w-full glass-panel-glow rounded-2xl p-4 sm:p-5 border border-cyan-500/30 shadow-xl mb-6 text-slate-100 relative overflow-hidden">
      {/* Subtle background spine ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-teal-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Section: Patient Identity & Primary Team */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-500 p-0.5 shadow-lg shadow-cyan-500/20 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center font-heading font-extrabold text-white">
              <span className="text-xl leading-none text-cyan-300">{patient.name.charAt(0)}</span>
              <span className="text-[9px] text-slate-400 uppercase tracking-wider">{patient.bloodGroup}</span>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-xl font-heading font-bold text-white tracking-tight">
                {patient.name}
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 font-mono text-cyan-300">
                {patient.uhid}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300">
                {patient.ipdNumber}
              </span>
              <span className="text-xs font-medium text-slate-400">
                {patient.age} yrs · {patient.gender} · Blood: <strong className="text-rose-400">{patient.bloodGroup}</strong>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-300">
              <span className="font-semibold text-cyan-400 flex items-center gap-1">
                📍 {patient.roomBed} ({patient.floor})
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Stethoscope className="w-3.5 h-3.5 text-slate-400" />
                Surgeon: <span className="text-white font-medium">{patient.primarySpineConsultant}</span>
              </span>
              <span className="text-slate-400 hidden sm:inline">
                Assoc: <span className="text-slate-200">{patient.associateDoctor}</span>
              </span>
              <span className="text-slate-400 hidden md:inline">
                Admitted: {patient.admitDate}
              </span>
            </div>
          </div>
        </div>

        {/* Diagnosis & Affected Vertebra Badge */}
        <div className="flex flex-wrap items-center gap-2 lg:text-right">
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl px-3 py-2">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Primary Spine Levels & Diagnosis
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex gap-1">
                {patient.primarySpineLevels.map(lvl => (
                  <span key={lvl} className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-mono">
                    {lvl}
                  </span>
                ))}
              </div>
              <span className="text-xs text-slate-200 font-medium max-w-xs truncate">
                {patient.chiefDiagnosis}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Longitudinal Spine Care Continuum Stepper */}
      <div className="py-4 border-b border-slate-800/80">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
          <span className="flex items-center gap-1 text-cyan-400">
            <Compass className="w-3.5 h-3.5" /> Longitudinal Spine Pathway Tracker
          </span>
          <span className="text-slate-300 font-medium">
            Active Milestone: <strong className="text-emerald-400">{patient.currentStage}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {STAGES.map((stg, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div
                key={stg}
                className={`p-2 rounded-xl text-center border transition relative overflow-hidden ${
                  isCurrent
                    ? 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border-cyan-400 shadow-md shadow-cyan-500/20'
                    : isCompleted
                    ? 'bg-slate-900/60 border-emerald-500/30 text-emerald-300'
                    : 'bg-slate-950/40 border-slate-800/60 text-slate-500'
                }`}
              >
                {isCurrent && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400 animate-pulse" />
                )}
                <div className="flex items-center justify-center gap-1 mb-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isCurrent ? (
                    <Activity className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                  )}
                  <span className="text-[10px] font-mono">Stage {idx + 1}</span>
                </div>
                <div className={`text-[11px] font-bold leading-tight ${isCurrent ? 'text-white' : ''}`}>
                  {stg}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Live Spine Clinical Metrics Strip */}
      <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Pain VAS */}
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-800 text-slate-300 shrink-0">
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">VAS Pain Scale</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${getVasColor(patient.vasPainScore)}`}>
                {patient.vasPainScore} / 10
              </span>
              <span className="text-[10px] text-slate-400">
                {patient.vasPainScore <= 3 ? 'Controlled' : patient.vasPainScore <= 6 ? 'Moderate' : 'Severe'}
              </span>
            </div>
          </div>
        </div>

        {/* Disability ODI */}
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-800 text-slate-300 shrink-0">
            <HeartPulse className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">ODI Disability</span>
            <div className="flex items-center gap-1 mt-0.5 font-bold text-xs text-white">
              <span>{patient.oswestryDisabilityIndex}%</span>
              <span className="text-[10px] text-slate-400 font-normal">(EQ-5D: {patient.eq5dHealthScore})</span>
            </div>
          </div>
        </div>

        {/* Surgical Drain Output */}
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-800 text-slate-300 shrink-0">
            <Droplet className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Hemovac Drain</span>
            <div className="flex items-center gap-1 mt-0.5 font-bold text-xs">
              <span className={patient.nursing.drainOutputMl24h > 100 ? 'text-rose-400' : 'text-emerald-400'}>
                {patient.nursing.drainOutputMl24h} mL
              </span>
              <span className="text-[10px] text-slate-400 font-normal">/24h</span>
            </div>
          </div>
        </div>

        {/* Neuro Vitals & Motor */}
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-800 text-slate-300 shrink-0">
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Vitals & Motor</span>
            <div className="text-xs font-semibold text-white mt-0.5">
              BP: {patient.nursing.vitals.bp}
            </div>
            <span className="text-[10px] text-slate-400">
              Pulse: {patient.nursing.vitals.pulse} · SpO2: {patient.nursing.vitals.spo2}%
            </span>
          </div>
        </div>

        {/* Spine Brace & Mobilization */}
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-800 text-slate-300 shrink-0">
            <FileCheck className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Spine Orthosis</span>
            <div className="text-xs font-semibold text-teal-300 truncate max-w-[130px] mt-0.5" title={patient.physioRehab.bracePrescribed}>
              {patient.physioRehab.bracePrescribed}
            </div>
            <span className="text-[10px] text-slate-400">
              {patient.physioRehab.ambulationMilestone}
            </span>
          </div>
        </div>

        {/* Red Flags / Safety Status */}
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
          <div className={`p-2 rounded-lg shrink-0 ${
            patient.neuroExam.redFlags.caudaEquina || patient.neuroExam.redFlags.progressiveMotorLoss
              ? 'bg-rose-500/20 text-rose-400'
              : 'bg-emerald-500/20 text-emerald-400'
          }`}>
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Spine Red Flags</span>
            <div className="text-xs font-semibold mt-0.5">
              {patient.neuroExam.redFlags.progressiveMotorLoss ? (
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Motor Deficit
                </span>
              ) : (
                <span className="text-emerald-400">No Red Flags</span>
              )}
            </div>
            <span className="text-[10px] text-slate-400">
              Fall Morse: {patient.nursing.fallRiskScoreMorse}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
