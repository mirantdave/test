import React, { useState } from 'react';
import { 
  Heart, 
  Smile, 
  Meh, 
  Frown, 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
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
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 text-slate-900">
      {/* Warm Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 border border-blue-300 shadow-lg relative overflow-hidden text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-2 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" /> Patient & Family Companion Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              Namaste, {patient.name}
            </h1>
            <p className="text-blue-100 text-sm mt-1 max-w-xl">
              You are staying in <strong className="text-white font-bold">{patient.roomBed}</strong> on the {patient.floor}. 
              Your spine care team is monitoring your comfort, pain relief, and recovery 24 hours a day.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleCallNurse}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm shadow-md transition active:scale-95 ${
                assistanceRequested
                  ? 'bg-emerald-500 text-white animate-bounce'
                  : 'bg-white hover:bg-slate-100 text-blue-900 shadow-blue-900/20'
              }`}
            >
              <BellRing className={`w-5 h-5 ${assistanceRequested ? 'text-white' : 'text-rose-600'}`} />
              {assistanceRequested ? 'Nurse Alerted! On the way' : 'Call Bedside Nurse'}
            </button>
          </div>
        </div>
      </div>

      {/* Bedside Pain Reporting Console */}
      <div className="p-6 rounded-3xl bg-white border border-blue-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              How is your spine pain right now?
            </h2>
            <p className="text-xs text-slate-500">
              Tap a number below to let Nurse {patient.nursing.primaryNurse} know immediately.
            </p>
          </div>
          {painReportedSuccess && (
            <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-300 animate-in fade-in flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Recorded & Notified Station!
            </div>
          )}
        </div>

        {/* 0 to 10 visual emoji pain scale */}
        <div className="grid grid-cols-6 sm:grid-cols-11 gap-2 pt-2">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => {
            const isSelected = reportedPain === val;
            let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700';
            let label = 'No Pain';
            if (val >= 1 && val <= 3) {
              label = 'Mild';
              if (isSelected) btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md font-extrabold';
            } else if (val >= 4 && val <= 6) {
              label = 'Moderate';
              if (isSelected) btnStyle = 'bg-amber-500 text-white border-amber-600 shadow-md font-extrabold';
            } else if (val >= 7) {
              label = 'Severe';
              if (isSelected) btnStyle = 'bg-rose-500 text-white border-rose-600 shadow-md font-extrabold animate-pulse';
            } else {
              if (isSelected) btnStyle = 'bg-blue-600 text-white border-blue-700 shadow-md font-extrabold';
            }

            return (
              <button
                key={val}
                onClick={() => handleSendPainReport(val)}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition active:scale-95 ${btnStyle}`}
              >
                <span className="text-xl font-mono font-black">{val}</span>
                <span className="text-[9px] uppercase tracking-wider mt-0.5 opacity-90">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recovery Milestones Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Milestones Card */}
        <div className="p-6 rounded-3xl bg-white border border-blue-200 shadow-sm space-y-4">
          <h3 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Your Spine Recovery Milestones
          </h3>
          <p className="text-xs text-slate-500">
            Every step is planned to ensure safe bone healing and spinal stability.
          </p>

          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block">Surgical Decompression & Alignment Complete</span>
                <span className="text-[11px] text-emerald-700">Pinching on spinal nerves successfully relieved in OT</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block">Log-Roll Technique Mastered</span>
                <span className="text-[11px] text-emerald-700">Turning in bed keeping your spine straight without twisting</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 text-xs">
              <Clock className="w-5 h-5 text-blue-600 shrink-0 animate-spin" />
              <div>
                <span className="font-bold block">First Bedside Sitting & Standing</span>
                <span className="text-[11px] text-blue-800">With {patient.physioRehab.bracePrescribed} and Physio Dr. Shreya</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-xs">
              <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px] shrink-0 font-mono text-slate-700 font-bold">
                4
              </div>
              <div>
                <span className="font-bold block text-slate-800">Surgical Drain Removal (&lt;50 mL)</span>
                <span className="text-[11px] text-slate-500">Once fluid minimizes, drain is removed comfortably</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-xs">
              <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px] shrink-0 font-mono text-slate-700 font-bold">
                5
              </div>
              <div>
                <span className="font-bold block text-slate-800">Safe Home Discharge</span>
                <span className="text-[11px] text-slate-500">Medications reconciled, ergonomic guide given to family</span>
              </div>
            </div>
          </div>
        </div>

        {/* My Care Team Today Card */}
        <div className="p-6 rounded-3xl bg-white border border-blue-200 shadow-sm space-y-4">
          <h3 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Your Stavya Care Team Today
          </h3>
          <p className="text-xs text-slate-500">
            These dedicated doctors, nurses, and specialists are directly looking after you.
          </p>

          <div className="space-y-3 pt-1">
            {/* Operating Spine Surgeon */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-sm">
                  BD
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">{patient.primarySpineConsultant}</div>
                  <div className="text-[11px] text-blue-700 font-bold">Chief Spine Surgeon</div>
                  <div className="text-[10px] text-slate-500">Lead Surgeon & Clinical Director</div>
                </div>
              </div>
            </div>

            {/* Inpatient Floor Nurse */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold text-sm">
                  EC
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">{patient.nursing.primaryNurse}</div>
                  <div className="text-[11px] text-emerald-700 font-bold">Dedicated Inpatient Nurse</div>
                  <div className="text-[10px] text-slate-500">Morning Shift (Bedside Care & Vitals)</div>
                </div>
              </div>
            </div>

            {/* Spine Physiotherapist */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 border border-purple-200 flex items-center justify-center font-bold text-sm">
                  SH
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">{patient.physioRehab.assignedPhysio}</div>
                  <div className="text-[11px] text-purple-700 font-bold">Spine Rehabilitation Specialist</div>
                  <div className="text-[10px] text-slate-500">Prescribed: {patient.physioRehab.bracePrescribed}</div>
                </div>
              </div>
            </div>

            {/* Patient Relationship Officer */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 border border-amber-200 flex items-center justify-center font-bold text-sm">
                  KN
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">{patient.assignedPro}</div>
                  <div className="text-[11px] text-amber-700 font-bold">Patient Experience & Family Liaison</div>
                  <div className="text-[10px] text-slate-500">Available to answer family questions anytime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spine Safety & Ergonomic Rules for Home */}
      <div className="p-6 rounded-3xl bg-blue-50/60 border border-blue-200 space-y-4">
        <h3 className="font-heading font-bold text-blue-950 text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          Golden Rules for Your Spine Recovery
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-2xs space-y-2">
            <span className="font-bold text-blue-800 text-sm block">1. The Log-Roll</span>
            <p className="text-slate-600 leading-relaxed">
              Never twist your torso. Bend your knees and roll your entire body like a log before swinging your legs over the bed edge.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-2xs space-y-2">
            <span className="font-bold text-blue-800 text-sm block">2. Wear Your Spine Belt</span>
            <p className="text-slate-600 leading-relaxed">
              Always fasten your {patient.physioRehab.bracePrescribed} securely while lying flat in bed before standing up.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-2xs space-y-2">
            <span className="font-bold text-blue-800 text-sm block">3. No Heavy Lifting</span>
            <p className="text-slate-600 leading-relaxed">
              Do not lift objects heavier than 2 kg (like a milk carton) or bend from your waist for the first 4 to 6 weeks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
