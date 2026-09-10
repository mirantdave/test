import React, { useState } from 'react';
import { 
  Heart, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  User, 
  BellRing
} from 'lucide-react';
import type { PatientDossier } from '../../types';

interface PatientFamilyPortalProps {
  patient: PatientDossier;
  onUpdatePainScore?: (newScore: number) => void;
}

export const PatientFamilyPortal: React.FC<PatientFamilyPortalProps> = ({ patient, onUpdatePainScore }) => {
  const [reportedPain, setReportedPain] = useState<number>(patient.vasPainScore);
  const [painReportedSuccess, setPainReportedSuccess] = useState(false);
  const [assistanceRequested, setAssistanceRequested] = useState(false);

  const handleSendPainReport = (val: number) => {
    setReportedPain(val);
    if (onUpdatePainScore) onUpdatePainScore(val);
    setPainReportedSuccess(true);
    setTimeout(() => setPainReportedSuccess(false), 3000);
  };

  const handleCallNurse = () => {
    setAssistanceRequested(true);
    setTimeout(() => setAssistanceRequested(false), 4000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5 animate-in fade-in duration-200 text-slate-900">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mb-1">
            Patient & Family Companion
          </span>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
            Welcome, {patient.name}
          </h1>
          <p className="text-slate-500 text-xs mt-1 max-w-xl">
            Staying in <strong className="text-slate-900 font-semibold">{patient.roomBed}</strong> ({patient.floor}). 
            Your spine care team is monitoring your comfort and recovery 24/7.
          </p>
        </div>

        <button
          onClick={handleCallNurse}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition shrink-0 ${
            assistanceRequested
              ? 'bg-emerald-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
          }`}
        >
          <BellRing className="w-4 h-4" />
          {assistanceRequested ? 'Nurse Notified' : 'Call Bedside Nurse'}
        </button>
      </div>

      {/* Bedside Pain Reporting Console */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-heading font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              How is your spine pain right now?
            </h2>
            <p className="text-xs text-slate-500">
              Tap a number from 0 (no pain) to 10 (severe) to notify Nurse {patient.nursing.primaryNurse}.
            </p>
          </div>
          {painReportedSuccess && (
            <div className="text-xs font-medium px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Recorded
            </div>
          )}
        </div>

        {/* 0 to 10 visual pain scale */}
        <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5 pt-1">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => {
            const isSelected = reportedPain === val;
            let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700';
            if (isSelected) {
              btnStyle = 'bg-blue-600 text-white border-blue-600 font-bold';
            }

            return (
              <button
                key={val}
                onClick={() => handleSendPainReport(val)}
                className={`py-2 rounded-lg border text-center transition ${btnStyle}`}
              >
                <span className="text-sm font-mono block">{val}</span>
                <span className="text-[9px] uppercase tracking-wider block opacity-75">
                  {val === 0 ? 'None' : val <= 3 ? 'Mild' : val <= 6 ? 'Mod' : 'Sev'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recovery Milestones Checklist & Care Team */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Milestones Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-3">
          <h3 className="font-heading font-bold text-slate-900 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Your Recovery Milestones
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-semibold block text-emerald-950">Surgical Alignment Complete</span>
                <span className="text-[11px] text-slate-500">Nerve compression decompressed in OR</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-semibold block text-emerald-950">Log-Roll Technique Mastered</span>
                <span className="text-[11px] text-slate-500">Turning in bed keeping your spine aligned</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 text-blue-950">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="font-semibold block text-blue-950">Bedside Sitting & Standing</span>
                <span className="text-[11px] text-blue-700">With {patient.physioRehab.bracePrescribed}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
              <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] shrink-0 font-mono text-slate-500">
                4
              </div>
              <div>
                <span className="font-medium block text-slate-800">Surgical Drain Removal (&lt;50 mL)</span>
                <span className="text-[11px] text-slate-400">Once drainage minimizes</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
              <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] shrink-0 font-mono text-slate-500">
                5
              </div>
              <div>
                <span className="font-medium block text-slate-800">Safe Home Discharge</span>
                <span className="text-[11px] text-slate-400">Medications reconciled with discharge instructions</span>
              </div>
            </div>
          </div>
        </div>

        {/* My Care Team Today Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-3">
          <h3 className="font-heading font-bold text-slate-900 text-sm flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            Your Care Team Today
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">{patient.primarySpineConsultant}</div>
                <div className="text-[11px] text-blue-700 font-medium">Chief Spine Surgeon</div>
              </div>
              <span className="text-[10px] text-slate-400">Clinical Lead</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">{patient.nursing.primaryNurse}</div>
                <div className="text-[11px] text-emerald-700 font-medium">Dedicated Floor Nurse</div>
              </div>
              <span className="text-[10px] text-slate-400">Bedside Care</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">{patient.physioRehab.assignedPhysio}</div>
                <div className="text-[11px] text-purple-700 font-medium">Spine Physiotherapist</div>
              </div>
              <span className="text-[10px] text-slate-400">Rehabilitation</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">{patient.assignedPro}</div>
                <div className="text-[11px] text-amber-700 font-medium">Patient Relations Officer</div>
              </div>
              <span className="text-[10px] text-slate-400">Family Care</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spine Safety Rules */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-3">
        <h3 className="font-heading font-bold text-slate-900 text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          Recovery Principles for Spine Protection
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-900 block">1. The Log-Roll</span>
            <p className="leading-relaxed">
              Never twist your spine. Turn your shoulders and hips together before getting out of bed.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-900 block">2. Wear Your Spine Brace</span>
            <p className="leading-relaxed">
              Fasten your {patient.physioRehab.bracePrescribed} securely before standing or walking.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-900 block">3. Avoid Heavy Loads</span>
            <p className="leading-relaxed">
              Do not lift heavy weights or bend from the waist for the first 6 weeks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
