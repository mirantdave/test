import React from 'react';
import type { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';
import { 
  Sparkles, CheckCircle2, ShieldCheck, 
  Clock, Layers, RefreshCw
} from 'lucide-react';

interface Props {
  patient: PatientDossier;
}

export const CssdSterileView: React.FC<Props> = ({ patient }) => {
  const cssdStaff = getStaffByUnit('CSSD');

  const trays = [
    {
      id: 'tray-1',
      name: 'Thoracolumbar Pedicle Screw Instrumentation (MIS)',
      code: 'STAV-CSSD-TL-042',
      cycle: 'Cycle #1892 (Vacuum Steam 134°C / 18 min)',
      status: 'sterile',
      bioIndicator: 'Geobacillus 24h Incubator: NEGATIVE (PASSED)',
      class5Integrator: 'Color change to Black (PASSED)',
      expiry: '28 Sep 2026',
      leadTech: 'Dev Puri'
    },
    {
      id: 'tray-2',
      name: 'Spine Micro-Discectomy & Decompression Tray',
      code: 'STAV-CSSD-MIC-018',
      cycle: 'Cycle #1893 (Vacuum Steam 134°C / 18 min)',
      status: 'sterile',
      bioIndicator: 'Geobacillus 24h Incubator: NEGATIVE (PASSED)',
      class5Integrator: 'Color change to Black (PASSED)',
      expiry: '30 Sep 2026',
      leadTech: 'Mahesh Chaudhary'
    },
    {
      id: 'tray-3',
      name: 'Midas Rex High-Speed Spine Drill Handpiece & Attachments',
      code: 'STAV-CSSD-DRILL-007',
      cycle: 'Cycle #412 (Sterrad Hydrogen Peroxide Gas Plasma)',
      status: 'sterile',
      bioIndicator: 'Rapid Readout Plasma BI: PASSED',
      class5Integrator: 'Chemical Indicator Verified',
      expiry: '25 Sep 2026',
      leadTech: 'Dev Puri'
    },
    {
      id: 'tray-4',
      name: 'Full-Endoscopic Spine Sheath & Radiofrequency Probe',
      code: 'STAV-CSSD-ENDO-011',
      cycle: 'Cycle #414 (Sterrad Plasma 55°C)',
      status: 'in_cycle',
      bioIndicator: 'Incubating (18 min remaining)',
      class5Integrator: 'Awaiting completion',
      expiry: 'Validating',
      leadTech: 'Mahesh Chaudhary'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-extrabold text-slate-900 tracking-wide">
              CSSD & Sterile Processing Assurance
            </h2>
            <p className="text-xs text-slate-600">
              Supervised by <strong className="text-blue-700 font-bold">Brijesh Bhatt (CNO & NABH Lead)</strong> • 100% Biological Validation for Spine Instrumentation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Zero SSI (Surgical Site Infection) Compliance
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Dedicated Spine Instrument Sets */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                Spine Trays Reserved for Patient: {patient.name}
              </h3>
              <span className="text-xs font-mono text-slate-500 font-medium">Surgery: {patient.surgeryPlan?.procedureName || 'Elective Spine'}</span>
            </div>

            <div className="space-y-3">
              {trays.map((tray) => (
                <div
                  key={tray.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{tray.name}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                          {tray.code}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                        <Clock className="w-3 h-3 text-slate-400" /> {tray.cycle}
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 self-start ${
                      tray.status === 'sterile'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse'
                    }`}>
                      {tray.status === 'sterile' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                      {tray.status === 'sterile' ? 'STERILE & RELEASED' : 'STERILIZING'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Biological Indicator</span>
                      <strong className="text-emerald-700">{tray.bioIndicator}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Chemical Integrator</span>
                      <strong className="text-blue-700">{tray.class5Integrator}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Processed By / Exp</span>
                      <span className="text-slate-700 font-medium">{tray.leadTech} • {tray.expiry}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: CSSD Staff & Quality Rules */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              CSSD Qualified Technicians
            </h3>
            <div className="space-y-2.5">
              {cssdStaff.map((staff) => (
                <div key={staff.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{staff.name}</div>
                    <div className="text-[10px] text-blue-700 font-medium">{staff.desig}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 block">{staff.mobile}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">Certified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Spine Sterilization Standards
            </h3>
            <ul className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>No Flash Autoclaving:</strong> All spinal implants undergo full 18-min holding time at 134°C with dry cycle.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Tracking:</strong> Barcode sticker attached to patient operative sheet for lifetime implant trace.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Bowie-Dick Air Removal:</strong> Performed daily at 06:30 AM before first clinical cycle.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
