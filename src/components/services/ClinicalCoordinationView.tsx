import React, { useState } from 'react';
import type { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';
import { 
  GitMerge, CheckCircle, AlertCircle, Calendar, 
  PhoneCall, ShieldCheck, FileCheck, HeartPulse, Sparkles
} from 'lucide-react';

interface Props {
  patient: PatientDossier;
  onUpdatePatient?: (patient: PatientDossier) => void;
}

export const ClinicalCoordinationView: React.FC<Props> = ({ patient }) => {
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
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
            <GitMerge className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-extrabold text-slate-900 tracking-wide">
              Clinical Coordination & Patient Journey Center
            </h2>
            <p className="text-xs text-slate-600">
              Department Head: <span className="text-blue-700 font-bold">Dr. Ravi Baldevbhai Patel</span> • Synchronizing Multi-Disciplinary Spine Care
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 ${
            allReady 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-amber-50 text-amber-800 border-amber-300'
          }`}>
            {allReady ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-amber-600" />}
            {allReady ? '100% Surgery Ready' : '7/8 Clearances Complete'}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Surgery Readiness & Continuum Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Pre-Operative Surgery Readiness Matrix (PSRM)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Every spine case requires 100% verification by Clinical Coordinator prior to theatre wheel-in
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 font-bold">
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
                      ? 'bg-slate-50 border-slate-200 hover:border-blue-300'
                      : 'bg-amber-50/70 border-amber-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${
                      item.done ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                    }`}>
                      {item.done && <CheckCircle className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className={`text-xs font-semibold ${item.done ? 'text-slate-900' : 'text-amber-900'}`}>
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>Lead: <strong className="text-slate-700">{item.doctor}</strong></span>
                        <span>• Status: {item.ts}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.done ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.done ? 'VERIFIED' : 'ACTION REQ'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Longitudinal Follow-up Milestones */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Post-Discharge Longitudinal Follow-Up Journey
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Stavya Clinical Coordinators stay in active touch with the patient from Day 0 through Month 12
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold text-blue-700 uppercase">Day 3 Post-Discharge</div>
                <div className="text-xs font-semibold text-slate-900 mt-1 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" /> Telephonic Welfare Call
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Check wound dressing, pain relief, bowel motility & fever.</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold text-blue-700 uppercase">Day 14 Post-Op</div>
                <div className="text-xs font-semibold text-slate-900 mt-1 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-blue-600" /> Suture Removal & OPD
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Inspection by Consultant, remove skin staples, start active physio.</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold text-blue-700 uppercase">Week 6 Milestone</div>
                <div className="text-xs font-semibold text-slate-900 mt-1 flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-amber-600" /> Flex-Ext X-Rays
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Confirm fusion progression, wean lumbar/cervical brace.</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold text-blue-700 uppercase">Month 3 & 12</div>
                <div className="text-xs font-semibold text-slate-900 mt-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" /> ODI / NDI Registry
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Functional disability outcome score recorded into research DB.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Coordination Team & Patient Dossier Summary */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Assigned Clinical Coordinators
            </h3>
            <div className="space-y-2.5">
              {coordStaff.map((staff) => (
                <div key={staff.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{staff.name}</div>
                    <div className="text-[10px] text-blue-700 font-medium">{staff.desig}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 block">{staff.mobile}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">Available</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Patient Primary Attendant Details
            </h3>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Emergency Contact:</span>
                <span className="font-semibold text-slate-900">Family Attendant</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-mono text-blue-700 font-bold">+91 98250 19912</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Language Preferred:</span>
                <span className="text-slate-800 font-medium">Gujarati / Hindi / English</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Educational Video Sent:</span>
                <span className="text-emerald-700 font-bold">Yes (WhatsApp link)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
