import React from 'react';
import { 
  Activity, 
  ShieldAlert, 
  Flame, 
  Droplet, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Stethoscope,
  HeartPulse,
  Compass,
  FileCheck
} from 'lucide-react';
import type { PatientDossier, PatientStage } from '../../types';

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
    if (score <= 3) return 'text-emerald-700 bg-emerald-50 border-emerald-300';
    if (score <= 6) return 'text-amber-700 bg-amber-50 border-amber-300';
    return 'text-rose-700 bg-rose-50 border-rose-300 animate-pulse';
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-blue-200/90 shadow-sm mb-6 text-slate-900 relative overflow-hidden">
      {/* Top Section: Patient Identity & Primary Team */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-500 p-0.5 shadow-md shadow-blue-500/20 shrink-0">
            <div className="w-full h-full bg-blue-50 rounded-[14px] flex flex-col items-center justify-center font-heading font-extrabold text-blue-900">
              <span className="text-xl leading-none text-blue-700">{patient.name.charAt(0)}</span>
              <span className="text-[9px] text-blue-600 uppercase tracking-wider font-bold">{patient.bloodGroup}</span>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-xl font-heading font-bold text-slate-900 tracking-tight">
                {patient.name}
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 font-mono text-blue-700 font-semibold">
                {patient.uhid}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                {patient.ipdNumber}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {patient.age} yrs · {patient.gender} · Blood: <strong className="text-rose-600">{patient.bloodGroup}</strong>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-600">
              <span className="font-bold text-blue-700 flex items-center gap-1">
                📍 {patient.roomBed} ({patient.floor})
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
                Surgeon: <span className="text-slate-900 font-bold">{patient.primarySpineConsultant}</span>
              </span>
              <span className="text-slate-500 hidden sm:inline">
                Assoc: <span className="text-slate-800 font-medium">{patient.associateDoctor}</span>
              </span>
              <span className="text-slate-500 hidden md:inline">
                Admitted: {patient.admitDate}
              </span>
            </div>
          </div>
        </div>

        {/* Diagnosis & Affected Vertebra Badge */}
        <div className="flex flex-wrap items-center gap-2 lg:text-right">
          <div className="bg-slate-50 border border-blue-200/80 rounded-xl px-3 py-2">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
              Primary Spine Levels & Diagnosis
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex gap-1">
                {patient.primarySpineLevels.map(lvl => (
                  <span key={lvl} className="px-1.5 py-0.5 rounded bg-blue-600 text-white text-xs font-bold font-mono shadow-xs">
                    {lvl}
                  </span>
                ))}
              </div>
              <span className="text-xs text-slate-800 font-semibold max-w-xs truncate">
                {patient.chiefDiagnosis}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Longitudinal Spine Care Continuum Stepper */}
      <div className="py-4 border-b border-slate-100">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
          <span className="flex items-center gap-1 text-blue-700">
            <Compass className="w-3.5 h-3.5" /> Longitudinal Spine Pathway Tracker
          </span>
          <span className="text-slate-600 font-medium">
            Active Milestone: <strong className="text-blue-700 font-bold">{patient.currentStage}</strong>
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
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : isCompleted
                    ? 'bg-blue-50 border-blue-200 text-blue-800 font-medium'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  ) : isCurrent ? (
                    <Activity className="w-3.5 h-3.5 text-white animate-spin" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span className={`text-[10px] font-mono ${isCurrent ? 'text-blue-100' : ''}`}>
                    Stage {idx + 1}
                  </span>
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
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-white border border-slate-200 text-amber-600 shrink-0 shadow-2xs">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">VAS Pain Scale</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${getVasColor(patient.vasPainScore)}`}>
                {patient.vasPainScore} / 10
              </span>
              <span className="text-[10px] text-slate-600 font-medium">
                {patient.vasPainScore <= 3 ? 'Controlled' : patient.vasPainScore <= 6 ? 'Moderate' : 'Severe'}
              </span>
            </div>
          </div>
        </div>

        {/* Disability ODI */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-white border border-slate-200 text-blue-600 shrink-0 shadow-2xs">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">ODI Disability</span>
            <div className="flex items-center gap-1 mt-0.5 font-bold text-xs text-slate-900">
              <span>{patient.oswestryDisabilityIndex}%</span>
              <span className="text-[10px] text-slate-500 font-normal">(EQ-5D: {patient.eq5dHealthScore})</span>
            </div>
          </div>
        </div>

        {/* Surgical Drain Output */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-white border border-slate-200 text-sky-600 shrink-0 shadow-2xs">
            <Droplet className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Hemovac Drain</span>
            <div className="flex items-center gap-1 mt-0.5 font-bold text-xs">
              <span className={patient.nursing.drainOutputMl24h > 100 ? 'text-rose-600' : 'text-emerald-600'}>
                {patient.nursing.drainOutputMl24h} mL
              </span>
              <span className="text-[10px] text-slate-500 font-normal">/24h</span>
            </div>
          </div>
        </div>

        {/* Neuro Vitals & Motor */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-white border border-slate-200 text-emerald-600 shrink-0 shadow-2xs">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Vitals & Motor</span>
            <div className="text-xs font-bold text-slate-900 mt-0.5">
              BP: {patient.nursing.vitals.bp}
            </div>
            <span className="text-[10px] text-slate-500">
              Pulse: {patient.nursing.vitals.pulse} · SpO2: {patient.nursing.vitals.spo2}%
            </span>
          </div>
        </div>

        {/* Spine Brace & Mobilization */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-white border border-slate-200 text-blue-600 shrink-0 shadow-2xs">
            <FileCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Spine Orthosis</span>
            <div className="text-xs font-bold text-blue-700 truncate max-w-[130px] mt-0.5" title={patient.physioRehab.bracePrescribed}>
              {patient.physioRehab.bracePrescribed}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">
              {patient.physioRehab.ambulationMilestone}
            </span>
          </div>
        </div>

        {/* Red Flags / Safety Status */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
          <div className={`p-2 rounded-lg shrink-0 ${
            patient.neuroExam.redFlags.caudaEquina || patient.neuroExam.redFlags.progressiveMotorLoss
              ? 'bg-rose-100 text-rose-600'
              : 'bg-emerald-100 text-emerald-600'
          }`}>
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Spine Red Flags</span>
            <div className="text-xs font-bold mt-0.5">
              {patient.neuroExam.redFlags.progressiveMotorLoss ? (
                <span className="text-rose-600 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Motor Deficit
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold">No Red Flags</span>
              )}
            </div>
            <span className="text-[10px] text-slate-500">
              Fall Morse: {patient.nursing.fallRiskScoreMorse}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
