import React, { useState } from 'react';
import type { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';
import { 
  Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, 
  Flame, Clock, Barcode, Layers, RefreshCw
} from 'lucide-react';

interface Props {
  patient: PatientDossier;
}

export const CssdSterileView: React.FC<Props> = ({ patient }) => {
  const cssdStaff = getStaffByUnit('CSSD');

  const [trays, setTrays] = useState([
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
  ]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              CSSD & Sterile Processing Assurance
            </h2>
            <p className="text-xs text-slate-400">
              Supervised by <strong className="text-purple-300">Brijesh Bhatt (CNO & NABH Lead)</strong> • 100% Biological Validation for Spine Instrumentation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Zero SSI (Surgical Site Infection) Compliance
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Dedicated Spine Instrument Sets */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                Spine Trays Reserved for Patient: {patient.name}
              </h3>
              <span className="text-xs font-mono text-slate-400">Surgery: {patient.surgeryPlan?.procedureName || 'Elective Spine'}</span>
            </div>

            <div className="space-y-3">
              {trays.map((tray) => (
                <div
                  key={tray.id}
                  className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-purple-500/40 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{tray.name}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                          {tray.code}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                        <Clock className="w-3 h-3" /> {tray.cycle}
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 self-start ${
                      tray.status === 'sterile'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                    }`}>
                      {tray.status === 'sterile' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                      {tray.status === 'sterile' ? 'STERILE & RELEASED' : 'STERILIZING'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-700/50 text-[11px]">
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase">Biological Indicator</span>
                      <strong className="text-emerald-400">{tray.bioIndicator}</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase">Chemical Integrator</span>
                      <strong className="text-purple-300">{tray.class5Integrator}</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase">Processed By / Exp</span>
                      <span className="text-slate-300">{tray.leadTech} • {tray.expiry}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: CSSD Staff & Quality Rules */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              CSSD Qualified Technicians
            </h3>
            <div className="space-y-2.5">
              {cssdStaff.map((staff) => (
                <div key={staff.id} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-white">{staff.name}</div>
                    <div className="text-[10px] text-purple-300">{staff.desig}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block">{staff.mobile}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">Certified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Spine Sterilization Standards
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span><strong>No Flash Autoclaving:</strong> All spinal implants undergo full 18-min holding time at 134°C with dry cycle.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span><strong>Tracking:</strong> Barcode sticker attached to patient operative sheet for lifetime implant trace.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span><strong>Bowie-Dick Air Removal:</strong> Performed daily at 06:30 AM before first clinical cycle.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
