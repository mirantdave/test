import React, { useState } from 'react';
import { 
  Crosshair, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Layers, 
  Activity, 
  Zap,
  Users,
  Flame
} from 'lucide-react';
import { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';

interface OperatingTheatresViewProps {
  patient: PatientDossier;
  onUpdatePatient?: (patient: PatientDossier) => void;
}

export const OperatingTheatresView: React.FC<OperatingTheatresViewProps> = ({ patient, onUpdatePatient }) => {
  const otStaff = getStaffByUnit('Operating Theatres');
  const [signIn, setSignIn] = useState(patient.otStatus.whoChecklist.signInCompleted);
  const [timeOut, setTimeOut] = useState(patient.otStatus.whoChecklist.timeOutCompleted);
  const [signOut, setSignOut] = useState(patient.otStatus.whoChecklist.signOutCompleted);
  const [swabCount, setSwabCount] = useState(patient.otStatus.swabCountStatus);

  const theatres = [
    { num: 'OT 1', name: 'Major Deformity & Scoliosis', status: 'Deformity Correction Ongoing', scrub: 'Bansari Patel', circ: 'Sanjana Gohel', patient: 'Aarav Mehta' },
    { num: 'OT 2', name: 'Minimally Invasive Spine (MIS-TLIF)', status: 'Intra-Op Active', scrub: 'Gopalbhai Prajapati', circ: 'Smith Kalamkar', patient: 'Devendrabhai Joshi' },
    { num: 'OT 3', name: 'Cervical Spine Suite (ACDF)', status: 'Patient Positioning', scrub: 'Priyanka Jadhav', circ: 'Dimpalben Katara', patient: 'Sunita Sharma' },
    { num: 'OT 4', name: 'Full-Endoscopic Spine Theatre', status: 'Case Turnaround', scrub: 'Anandkumar Harijn', circ: 'Vidhi Patel', patient: 'Pooja Solanki (Completed)' },
    { num: 'OT 5', name: 'Trauma, Kyphoplasty & Fractures', status: 'Kyphoplasty Set Ready', scrub: 'Dhruvi Solanki', circ: 'Shah Prince', patient: 'Champaben Shah' },
    { num: 'OT 6', name: 'Pain Interventions & Day Care', status: 'Facet Block Concluded', scrub: 'Payal Prajapati', circ: 'Sanjana Gohel', patient: 'OPD Day Spine' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-cyan-500/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Crosshair className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-heading font-extrabold text-white">
              Operating Theatres Complex (OT 1 to OT 6)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Nursing & Quality Lead: <strong className="text-white">Brijesh Hasmukhkumar Bhatt (CNO · ICN · NABH Lead)</strong> · Biomedical: <strong className="text-cyan-300">Meet Jatinkumar Pathak</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> NABH IPSG 4 Compliant · Laminar Class 100
          </span>
        </div>
      </div>

      {/* 6 Theatres Live Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {theatres.map(ot => {
          const isPatientOT = ot.num === patient.otStatus.theatreNumber;
          return (
            <div
              key={ot.num}
              className={`p-4 rounded-2xl border transition relative overflow-hidden ${
                isPatientOT
                  ? 'glass-panel-glow border-cyan-400 shadow-xl'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {isPatientOT && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400 animate-pulse" />
              )}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-heading font-extrabold text-base text-white">{ot.num}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  ot.status.includes('Active') || ot.status.includes('Ongoing')
                    ? 'bg-rose-950 text-rose-400 border border-rose-800/40 animate-pulse'
                    : 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                }`}>
                  {ot.status}
                </span>
              </div>

              <div className="text-xs font-semibold text-cyan-300 mt-2">{ot.name}</div>

              <div className="space-y-1 mt-3 text-[11px] text-slate-400">
                <div className="flex justify-between">
                  <span>Current Patient:</span>
                  <span className="font-semibold text-white truncate max-w-[140px]">{ot.patient}</span>
                </div>
                <div className="flex justify-between">
                  <span>Scrub Nurse:</span>
                  <span className="text-slate-200">{ot.scrub}</span>
                </div>
                <div className="flex justify-between">
                  <span>Circulating Nurse:</span>
                  <span className="text-slate-200">{ot.circ}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Patient Intra-Op Cockpit & WHO Surgical Safety Checklist */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-sky-950/40 border border-cyan-500/30 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                WHO Surgical Safety Checklist (IPSG Goal 4)
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">
                {patient.name} ({patient.otStatus.theatreNumber})
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Triple verification safety pause: Sign In, Time Out, and Sign Out protocols.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Fluoroscopy DAP:</span>
            <span className="font-mono font-bold text-cyan-300 px-2 py-1 rounded bg-slate-900 border border-slate-800">
              {patient.otStatus.fluoroscopyDoseDap} mGy·cm²
            </span>
          </div>
        </div>

        {/* 3 Step WHO Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sign In */}
          <div className={`p-4 rounded-2xl border transition ${
            signIn ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-900/60 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                <CheckCircle2 className={`w-4 h-4 ${signIn ? 'text-emerald-400' : 'text-slate-500'}`} />
                1. Sign In (Pre-Induction)
              </span>
              <input
                type="checkbox"
                checked={signIn}
                onChange={e => setSignIn(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>
            <ul className="text-[11px] text-slate-300 space-y-1 list-disc pl-4">
              <li>Patient identity, consent, & spine levels confirmed.</li>
              <li>Surgical site marked with indelible ink.</li>
              <li>Pulse oximeter functioning and audible.</li>
              <li>Known allergies and airway aspiration risk assessed.</li>
            </ul>
          </div>

          {/* Time Out */}
          <div className={`p-4 rounded-2xl border transition ${
            timeOut ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-900/60 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                <CheckCircle2 className={`w-4 h-4 ${timeOut ? 'text-emerald-400' : 'text-slate-500'}`} />
                2. Time Out (Pre-Incision)
              </span>
              <input
                type="checkbox"
                checked={timeOut}
                onChange={e => setTimeOut(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>
            <ul className="text-[11px] text-slate-300 space-y-1 list-disc pl-4">
              <li>Entire team introduced by name and role.</li>
              <li>Surgeon, anesthetist, and nurse confirm patient name.</li>
              <li>Antibiotic prophylaxis confirmed given &lt;60 min.</li>
              <li>Essential spine imaging (MRI/X-Ray) displayed in OR.</li>
            </ul>
          </div>

          {/* Sign Out */}
          <div className={`p-4 rounded-2xl border transition ${
            signOut ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-900/60 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                <CheckCircle2 className={`w-4 h-4 ${signOut ? 'text-emerald-400' : 'text-slate-500'}`} />
                3. Sign Out (Pre-Closure)
              </span>
              <input
                type="checkbox"
                checked={signOut}
                onChange={e => setSignOut(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>
            <ul className="text-[11px] text-slate-300 space-y-1 list-disc pl-4">
              <li>Swab, sponge, and needle count confirmed 40/40 correct.</li>
              <li>Implant tracking barcode stickers logged in chart.</li>
              <li>Specimens (disc, bone) labeled with patient UHID.</li>
              <li>Post-op extubation and HDU bed transfer confirmed.</li>
            </ul>
          </div>
        </div>

        {/* Swab & Sponge Count Reconciliation Strip */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Swab & Instrument Status:</span>
            <span className="font-bold text-emerald-400">{swabCount}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Scrub Nurse: <strong className="text-white">{patient.otStatus.scrubNurse}</strong></span>
            <span>·</span>
            <span>Circulating Nurse: <strong className="text-white">{patient.otStatus.circulatingNurse}</strong></span>
          </div>
        </div>
      </div>

      {/* OT Staff Directory */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Stavya Operating Theatre Nurses & Technicians Roster
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {otStaff.map(s => (
            <div key={s.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="font-bold text-white">{s.name}</div>
              <div className="text-cyan-400 text-[11px]">{s.desig}</div>
              <div className="text-slate-400 text-[10px]">{s.note || 'Theatre Service Team'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
