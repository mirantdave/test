import React, { useState } from 'react';
import { 
  Heart, 
  Smile, 
  Meh, 
  Frown, 
  AlertOctagon, 
  Phone, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  User, 
  BellRing,
  HelpCircle,
  Video,
  ChevronRight
} from 'lucide-react';
import { PatientDossier } from '../../types';

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
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Warm Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/80 via-indigo-900/60 to-slate-900 border border-cyan-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2 border border-cyan-500/40">
              <Sparkles className="w-3.5 h-3.5" /> Patient & Family Companion Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              Namaste, {patient.name}
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              You are staying in <strong className="text-cyan-300">{patient.roomBed}</strong> on the {patient.floor}. 
              Your spine care team is monitoring your comfort, pain relief, and recovery 24 hours a day.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleCallNurse}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm shadow-xl transition active:scale-95 ${
                assistanceRequested
                  ? 'bg-emerald-500 text-slate-950 animate-bounce'
                  : 'bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white shadow-rose-600/30'
              }`}
            >
              <BellRing className="w-5 h-5" />
              {assistanceRequested ? 'Nurse Alerted! On the way' : 'Call Bedside Nurse'}
            </button>
          </div>
        </div>
      </div>

      {/* Bedside Pain Reporting Console */}
      <div className="p-6 rounded-3xl glass-panel-glow border border-cyan-500/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400" />
              How is your spine pain right now?
            </h2>
            <p className="text-xs text-slate-400">
              Tap a number below to let Nurse {patient.nursing.primaryNurse} know immediately.
            </p>
          </div>
          {painReportedSuccess && (
            <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-in fade-in flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Recorded & Notified Station!
            </div>
          )}
        </div>

        {/* 0 to 10 visual emoji pain scale */}
        <div className="grid grid-cols-6 sm:grid-cols-11 gap-2 pt-2">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => {
            const isSelected = reportedPain === val;
            let btnStyle = 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-slate-300';
            let label = 'No Pain';
            if (val >= 1 && val <= 3) {
              label = 'Mild';
              if (isSelected) btnStyle = 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/30 font-extrabold';
            } else if (val >= 4 && val <= 6) {
              label = 'Moderate';
              if (isSelected) btnStyle = 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/30 font-extrabold';
            } else if (val >= 7) {
              label = 'Severe';
              if (isSelected) btnStyle = 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/40 font-extrabold animate-pulse';
            } else {
              if (isSelected) btnStyle = 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/30 font-extrabold';
            }

            return (
              <button
                key={val}
                onClick={() => handleSendPainReport(val)}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition active:scale-95 ${btnStyle}`}
              >
                <span className="text-xl font-mono font-black">{val}</span>
                <span className="text-[9px] uppercase tracking-wider mt-0.5 opacity-80">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recovery Milestones Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Milestones Card */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Your Spine Recovery Milestones
          </h3>
          <p className="text-xs text-slate-400">
            Every step is planned to ensure safe bone healing and spinal stability.
          </p>

          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Surgical Decompression & Alignment Complete</span>
                <span className="text-[11px] text-slate-400">Pinching on spinal nerves successfully relieved in OT</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Log-Roll Technique Mastered</span>
                <span className="text-[11px] text-slate-400">Turning in bed keeping your spine straight without twisting</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 text-xs">
              <Clock className="w-5 h-5 text-cyan-400 shrink-0 animate-spin" />
              <div>
                <span className="font-bold text-white block">First Bedside Sitting & Standing</span>
                <span className="text-[11px] text-slate-300">With {patient.physioRehab.bracePrescribed} and Physio Dr. Shreya</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/40 border border-slate-800 text-slate-500 text-xs">
              <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] shrink-0 font-mono">
                4
              </div>
              <div>
                <span className="font-semibold block text-slate-400">Surgical Drain Removal (&lt;50 mL)</span>
                <span className="text-[11px] text-slate-600">Once fluid minimizes, drain is removed comfortably</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/40 border border-slate-800 text-slate-500 text-xs">
              <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] shrink-0 font-mono">
                5
              </div>
              <div>
                <span className="font-semibold block text-slate-400">Safe Home Discharge</span>
                <span className="text-[11px] text-slate-600">Medications reconciled, ergonomic guide given to family</span>
              </div>
            </div>
          </div>
        </div>

        {/* My Care Team Today Card */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            Your Stavya Care Team Today
          </h3>
          <p className="text-xs text-slate-400">
            These dedicated doctors, nurses, and specialists are directly looking after you.
          </p>

          <div className="space-y-3 pt-1">
            {/* Operating Spine Surgeon */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-bold text-sm">
                  BD
                </div>
                <div>
                  <div className="font-bold text-white text-xs">{patient.primarySpineConsultant}</div>
                  <div className="text-[11px] text-cyan-400 font-medium">Chief Spine Surgeon</div>
                  <div className="text-[10px] text-slate-400">Lead Surgeon & Clinical Director</div>
                </div>
              </div>
            </div>

            {/* Inpatient Floor Nurse */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold text-sm">
                  EC
                </div>
                <div>
                  <div className="font-bold text-white text-xs">{patient.nursing.primaryNurse}</div>
                  <div className="text-[11px] text-emerald-400 font-medium">Dedicated Inpatient Nurse</div>
                  <div className="text-[10px] text-slate-400">Morning Shift (Bedside Care & Vitals)</div>
                </div>
              </div>
            </div>

            {/* Spine Physiotherapist */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center font-bold text-sm">
                  SH
                </div>
                <div>
                  <div className="font-bold text-white text-xs">{patient.physioRehab.assignedPhysio}</div>
                  <div className="text-[11px] text-purple-400 font-medium">Spine Rehabilitation Specialist</div>
                  <div className="text-[10px] text-slate-400">Prescribed: {patient.physioRehab.bracePrescribed}</div>
                </div>
              </div>
            </div>

            {/* Patient Relationship Officer */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold text-sm">
                  KN
                </div>
                <div>
                  <div className="font-bold text-white text-xs">{patient.assignedPro}</div>
                  <div className="text-[11px] text-amber-400 font-medium">Patient Experience & Family Liaison</div>
                  <div className="text-[10px] text-slate-400">Available to answer family questions anytime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spine Safety & Ergonomic Rules for Home */}
      <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
        <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-400" />
          Golden Rules for Your Spine Recovery
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-300 text-sm block">1. The Log-Roll</span>
            <p className="text-slate-400 leading-relaxed">
              Never twist your torso. Bend your knees and roll your entire body like a log before swinging your legs over the bed edge.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="font-bold text-teal-300 text-sm block">2. Wear Your Spine Belt</span>
            <p className="text-slate-400 leading-relaxed">
              Always fasten your {patient.physioRehab.bracePrescribed} securely while lying flat in bed before standing up.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-300 text-sm block">3. No Heavy Lifting</span>
            <p className="text-slate-400 leading-relaxed">
              Do not lift objects heavier than 2 kg (like a milk carton) or bend from your waist for the first 4 to 6 weeks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
