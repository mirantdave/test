import React from 'react';
import { 
  Activity, 
  Droplet, 
  CheckCircle2, 
  Stethoscope,
  HeartPulse,
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
    if (score <= 3) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score <= 6) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  return (
    <div className="w-full bg-white rounded-xl p-4 sm:p-5 border border-slate-200/80 mb-6 text-slate-900">
      {/* Top Section: Patient Identity & Primary Team */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex flex-col items-center justify-center font-heading font-bold text-blue-800 shrink-0">
            <span className="text-lg leading-none">{patient.name.charAt(0)}</span>
            <span className="text-[9px] text-blue-600 font-semibold">{patient.bloodGroup}</span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-heading font-bold text-slate-900">
                {patient.name}
              </h1>
              <span className="text-xs px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                {patient.uhid}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {patient.age}y · {patient.gender} · <strong className="text-blue-700 font-semibold">{patient.roomBed}</strong>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-xs text-slate-500">
              <span className="flex items-center gap-1 text-slate-700">
                <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
                <span>Surgeon: <strong className="text-slate-900">{patient.primarySpineConsultant}</strong></span>
              </span>
              <span>·</span>
              <span>Floor: {patient.floor}</span>
              <span>·</span>
              <span>Admitted: {patient.admitDate}</span>
            </div>
          </div>
        </div>

        {/* Primary Diagnosis & Segments */}
        <div className="flex items-center gap-2 lg:text-right">
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-1.5 text-left lg:text-right">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">
              Diagnosis & Target Levels
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex gap-1">
                {patient.primarySpineLevels.map(lvl => (
                  <span key={lvl} className="px-1.5 py-0.2 rounded bg-blue-600 text-white text-xs font-bold font-mono">
                    {lvl}
                  </span>
                ))}
              </div>
              <span className="text-xs text-slate-800 font-medium max-w-xs truncate">
                {patient.chiefDiagnosis}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Linear Spine Care Continuum Stepper */}
      <div className="py-3.5 border-b border-slate-100">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
          <span className="font-semibold text-slate-700">Spine Care Pathway</span>
          <span className="text-blue-700 font-semibold">Active: {patient.currentStage}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
          {STAGES.map((stg, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div
                key={stg}
                className={`px-2 py-1.5 rounded-lg text-center border text-xs transition ${
                  isCurrent
                    ? 'bg-blue-600 text-white border-blue-600 font-medium'
                    : isCompleted
                    ? 'bg-blue-50/70 border-blue-100 text-blue-800'
                    : 'bg-slate-50 border-slate-100 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0" />
                  ) : (
                    <span className="text-[10px] font-mono opacity-75">{idx + 1}.</span>
                  )}
                  <span className="truncate text-[11px]">{stg}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: 4 Minimalist Clinical Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3.5">
        {/* Pain VAS */}
        <div 
          onClick={() => onNavigateToService && onNavigateToService('pharmacy-sap')}
          className="p-3 rounded-lg bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Pain Score</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${getVasColor(patient.vasPainScore)}`}>
              VAS {patient.vasPainScore}/10
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-800 mt-1">
            {patient.pharmacy.multimodalPainRegimen[0]}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Analgesia Active</div>
        </div>

        {/* Neuro Examination */}
        <div 
          onClick={() => onNavigateToService && onNavigateToService('patient-360')}
          className="p-3 rounded-lg bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Motor Power</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
              EHL {patient.neuroExam.motorPower.l5_greatToeExtension}/5
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-800 mt-1">
            DF: {patient.neuroExam.motorPower.l4_ankleDorsiflexion}/5 · PF: {patient.neuroExam.motorPower.s1_anklePlantarflexion}/5
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Perianal S3-S5 Normal</div>
        </div>

        {/* Surgical Drain */}
        <div 
          onClick={() => onNavigateToService && onNavigateToService('nursing-floor')}
          className="p-3 rounded-lg bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Drain Output</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
              {patient.nursing.drainOutputMl24h} mL/24h
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-800 mt-1">
            {patient.nursing.drainOutputMl24h < 50 ? 'Cleared for Removal' : 'Active Negative Suction'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Dressing Intact</div>
        </div>

        {/* Ambulation & Physio */}
        <div 
          onClick={() => onNavigateToService && onNavigateToService('physio-rehab')}
          className="p-3 rounded-lg bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Ambulation</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
              SLR {patient.physioRehab.slrRightDegrees}°
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-800 mt-1 truncate">
            {patient.physioRehab.ambulationMilestone}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{patient.physioRehab.bracePrescribed}</div>
        </div>
      </div>
    </div>
  );
};
