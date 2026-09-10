import React, { useState } from 'react';
import type { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';
import { 
  GitMerge, CheckCircle, AlertCircle, Clock, Calendar, 
  PhoneCall, ShieldCheck, FileCheck, HeartPulse, Sparkles
} from 'lucide-react';

interface Props {
  patient: PatientDossier;
  onUpdatePatient: (patient: PatientDossier) => void;
}

export const ClinicalCoordinationView: React.FC<Props> = ({ patient, onUpdatePatient }) => {
  const coordStaff = getStaffByUnit('Clinical Coordinators');

  // Pre-Op Surgery Readiness Checklist
  const [readiness, setReadiness] = useState([
    { id: 'pac', label: 'Pre-Anesthetic PAC Medical Clearance', done: true, doctor: 'Dr. Kashyap Shah', ts: 'Cleared yesterday' },
    { id: 'imaging', label: 'Standing Spine Whole Spine X-Rays + MRI', done: true, doctor: 'Dr. Preety Krishnan', ts: 'PACS uploaded' },
    { id: 'blood', label: 'Blood Cross-Match & PRBC Reservation', done: patient.surgeryPlan ? true : false, doctor: 'Hospital Blood Bank', ts: '2 Units Packed Cells on call' },
    { id: 'implants', label: 'Pedicle Screws / Cages / Bone Graft Requisition', done: true, doctor: 'OT Stores & Vendor', ts: 'Titanium MIS set delivered' },
    { id: 'consent', label: 'Detailed Informed Spine Surgical & Neurological Consent', done: true, doctor: patient.primarySpineConsultant, ts: 'Signed by Patient & Attendant' },
    { id: 'financial', label: 'TPA / Cashless Insurance Pre-Authorization', done: true, doctor: 'Zeal Thacore (Admission)', ts: 'Approval letter on file' },
    { id: 'counseling', label: 'Spine Log-Roll & Mobilization Pre-Rehab Briefing', done: false, doctor: 'Dr. Ravi Patel / Dr. Priyanka', ts: 'Scheduled 17:00 today' },
    { id: 'npo', label: 'NPO (Fasting) Protocol from Midnight', done: patient.currentStage === 'Intra-Op OT' || patient.currentStage === 'HDU Stabilization' || patient.currentStage === 'Inpatient Floor Care', doctor: 'Night Duty Floor Nurse', ts: 'Confirmed' },
  ]);

  const toggleItem = (id: string) => {
    setReadiness(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const allReady = readiness.every(r => r.done);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <GitMerge className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Clinical Coordination & Patient Journey Center
            </h2>
            <p className="text-xs text-slate-400">
              Department Head: <span className="text-sky-300 font-semibold">Dr. Ravi Baldevbhai Patel</span> • Synchronizing Multi-Disciplinary Spine Care
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 ${
            allReady 
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
          }`}>
            {allReady ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {allReady ? '100% Surgery Ready' : '7/8 Clearances Complete'}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Surgery Readiness & Continuum Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  Pre-Operative Surgery Readiness Matrix (PSRM)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Every spine case requires 100% verification by Clinical Coordinator prior to theatre wheel-in
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800 text-sky-300 font-bold">
                {readiness.filter(r => r.done).length} / {readiness.length} Passed
              </span>
            </div>

            <div className="space-y-2.5">
              {readiness.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    item.done
                      ? 'bg-slate-800/40 border-slate-700/60 hover:border-emerald-500/40'
                      : 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${
                      item.done ? 'bg-emerald-500 text-white' : 'border border-slate-600'
                    }`}>
                      {item.done && <CheckCircle className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className={`text-xs font-semibold ${item.done ? 'text-slate-200' : 'text-amber-200'}`}>
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>Lead: <strong className="text-slate-300">{item.doctor}</strong></span>
                        <span>• Status: {item.ts}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.done ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {item.done ? 'VERIFIED' : 'ACTION REQ'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Longitudinal Follow-up Milestones */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-400" />
              Post-Discharge Longitudinal Follow-Up Journey
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Stavya Clinical Coordinators stay in active touch with the patient from Day 0 through Month 12
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="text-[11px] font-bold text-sky-400 uppercase">Day 3 Post-Discharge</div>
                <div className="text-xs font-semibold text-white mt-1 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" /> Telephonic Welfare Call
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Check wound dressing, pain relief, bowel motility & fever.</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="text-[11px] font-bold text-sky-400 uppercase">Day 14 Post-Op</div>
                <div className="text-xs font-semibold text-white mt-1 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-sky-400" /> Suture Removal & OPD
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Inspection by Consultant, remove skin staples, start active physio.</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="text-[11px] font-bold text-sky-400 uppercase">Week 6 Milestone</div>
                <div className="text-xs font-semibold text-white mt-1 flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-amber-400" /> Flex-Ext X-Rays
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Confirm fusion progression, wean lumbar/cervical brace.</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="text-[11px] font-bold text-sky-400 uppercase">Month 3 & 12</div>
                <div className="text-xs font-semibold text-white mt-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" /> ODI / NDI Registry
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Functional disability outcome score recorded into research DB.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Coordination Team & Patient Dossier Summary */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Assigned Clinical Coordinators
            </h3>
            <div className="space-y-2.5">
              {coordStaff.map((staff) => (
                <div key={staff.id} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-white">{staff.name}</div>
                    <div className="text-[10px] text-sky-300">{staff.desig}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block">{staff.mobile}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">Available</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Patient Primary Attendant Details
            </h3>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Emergency Contact:</span>
                <span className="font-semibold text-white">Family Attendant</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contact Number:</span>
                <span className="font-mono text-sky-300">+91 98250 19912</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Language Preferred:</span>
                <span className="text-slate-200">Gujarati / Hindi / English</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Educational Video Sent:</span>
                <span className="text-emerald-400 font-semibold">Yes (WhatsApp link)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
