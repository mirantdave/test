import React, { useState } from 'react';
import { 
  Crosshair, 
  CheckCircle2, 
  ShieldCheck, 
} from 'lucide-react';
import { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';

interface OperatingTheatresViewProps {
  patient: PatientDossier;
  onUpdatePatient?: (patient: PatientDossier) => void;
}

export const OperatingTheatresView: React.FC<OperatingTheatresViewProps> = ({ patient }) => {
  const otStaff = getStaffByUnit('Operating Theatres');
  const [signIn, setSignIn] = useState(patient.otStatus.whoChecklist.signInCompleted);
  const [timeOut, setTimeOut] = useState(patient.otStatus.whoChecklist.timeOutCompleted);
  const [signOut, setSignOut] = useState(patient.otStatus.whoChecklist.signOutCompleted);
  const [swabCount] = useState(patient.otStatus.swabCountStatus);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-blue-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <Crosshair className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-heading font-extrabold text-slate-900">
              Operating Theatres Complex (OT 1 to OT 6)
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Nursing & Quality Lead: <strong className="text-slate-900">Brijesh Hasmukhkumar Bhatt (CNO · ICN · NABH Lead)</strong> · Biomedical: <strong className="text-blue-700">Meet Jatinkumar Pathak</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> NABH IPSG 4 Compliant · Laminar Class 100
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
                  ? 'bg-blue-50/70 border-blue-400 shadow-md ring-1 ring-blue-300'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {isPatientOT && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
              )}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-heading font-extrabold text-base text-slate-900">{ot.num}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  ot.status.includes('Active') || ot.status.includes('Ongoing')
                    ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {ot.status}
                </span>
              </div>

              <div className="text-xs font-semibold text-blue-700 mt-2">{ot.name}</div>

              <div className="space-y-1.5 mt-3 text-[11px] text-slate-500">
                <div className="flex justify-between">
                  <span>Current Patient:</span>
                  <span className="font-semibold text-slate-900 truncate max-w-[140px]">{ot.patient}</span>
                </div>
                <div className="flex justify-between">
                  <span>Scrub Nurse:</span>
                  <span className="text-slate-800 font-medium">{ot.scrub}</span>
                </div>
                <div className="flex justify-between">
                  <span>Circulating Nurse:</span>
                  <span className="text-slate-800 font-medium">{ot.circ}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Patient Intra-Op Cockpit & WHO Surgical Safety Checklist */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                WHO Surgical Safety Checklist (IPSG Goal 4)
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-semibold">
                {patient.name} ({patient.otStatus.theatreNumber})
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Triple verification safety pause: Sign In, Time Out, and Sign Out protocols.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Fluoroscopy DAP:</span>
            <span className="font-mono font-bold text-blue-700 px-2 py-1 rounded bg-slate-50 border border-slate-200">
              {patient.otStatus.fluoroscopyDoseDap} mGy·cm²
            </span>
          </div>
        </div>

        {/* 3 Step WHO Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sign In */}
          <div className={`p-4 rounded-2xl border transition ${
            signIn ? 'bg-emerald-50/80 border-emerald-300' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className={`w-4 h-4 ${signIn ? 'text-emerald-600' : 'text-slate-400'}`} />
                1. Sign In (Pre-Induction)
              </span>
              <input
                type="checkbox"
                checked={signIn}
                onChange={e => setSignIn(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </div>
            <ul className="text-[11px] text-slate-600 space-y-1 list-disc pl-4">
              <li>Patient identity, consent, & spine levels confirmed.</li>
              <li>Surgical site marked with indelible ink.</li>
              <li>Pulse oximeter functioning and audible.</li>
              <li>Known allergies and airway aspiration risk assessed.</li>
            </ul>
          </div>

          {/* Time Out */}
          <div className={`p-4 rounded-2xl border transition ${
            timeOut ? 'bg-emerald-50/80 border-emerald-300' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className={`w-4 h-4 ${timeOut ? 'text-emerald-600' : 'text-slate-400'}`} />
                2. Time Out (Pre-Incision)
              </span>
              <input
                type="checkbox"
                checked={timeOut}
                onChange={e => setTimeOut(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </div>
            <ul className="text-[11px] text-slate-600 space-y-1 list-disc pl-4">
              <li>Entire team introduced by name and role.</li>
              <li>Surgeon, anesthetist, and nurse confirm patient name.</li>
              <li>Antibiotic prophylaxis confirmed given &lt;60 min.</li>
              <li>Essential spine imaging (MRI/X-Ray) displayed in OR.</li>
            </ul>
          </div>

          {/* Sign Out */}
          <div className={`p-4 rounded-2xl border transition ${
            signOut ? 'bg-emerald-50/80 border-emerald-300' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className={`w-4 h-4 ${signOut ? 'text-emerald-600' : 'text-slate-400'}`} />
                3. Sign Out (Pre-Closure)
              </span>
              <input
                type="checkbox"
                checked={signOut}
                onChange={e => setSignOut(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </div>
            <ul className="text-[11px] text-slate-600 space-y-1 list-disc pl-4">
              <li>Swab, sponge, and needle count confirmed 40/40 correct.</li>
              <li>Implant tracking barcode stickers logged in chart.</li>
              <li>Specimens (disc, bone) labeled with patient UHID.</li>
              <li>Post-op extubation and HDU bed transfer confirmed.</li>
            </ul>
          </div>
        </div>

        {/* Swab & Sponge Count Reconciliation Strip */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Swab & Instrument Status:</span>
            <span className="font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">{swabCount}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <span>Scrub Nurse: <strong className="text-slate-900">{patient.otStatus.scrubNurse}</strong></span>
            <span>·</span>
            <span>Circulating Nurse: <strong className="text-slate-900">{patient.otStatus.circulatingNurse}</strong></span>
          </div>
        </div>
      </div>

      {/* OT Staff Directory */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Stavya Operating Theatre Nurses & Technicians Roster
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {otStaff.map(s => (
            <div key={s.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-900">{s.name}</div>
              <div className="text-blue-700 text-[11px] font-medium">{s.desig}</div>
              <div className="text-slate-500 text-[10px]">{s.note || 'Theatre Service Team'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
