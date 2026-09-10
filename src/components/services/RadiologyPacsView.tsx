import React, { useState } from 'react';
import { 
  Scan, 
  FileText, 
  Ruler, 
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';

interface RadiologyPacsViewProps {
  patient: PatientDossier;
  onUpdatePatient?: (patient: PatientDossier) => void;
}

export const RadiologyPacsView: React.FC<RadiologyPacsViewProps> = ({ patient }) => {
  const radiologyStaff = getStaffByUnit('Radiology');
  const [activeSeries, setActiveSeries] = useState<'t2_sag' | 't1_ax' | 'xray_dyn' | 'ct_3d'>('t2_sag');
  const [caliperDiameter, setCaliperDiameter] = useState<number>(6.2);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-blue-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <Scan className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-heading font-extrabold text-slate-900">
              Spine Radiology, PACS & Advanced Imaging Hub
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Head of Radiology: <strong className="text-slate-900">Dr. Preety Ajay Krishnan</strong> · High-field MRI, Multi-slice CT, Dynamic Digital Radiography
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-center gap-1.5 font-mono">
            <Calendar className="w-3.5 h-3.5 text-blue-600" /> Study Date: {patient.radiology.reportingDate}
          </span>
        </div>
      </div>

      {/* PACS Viewer & Measurement Calipers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Imaging Slice Display */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">DICOM Series</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                1.5T High-Resolution Spine
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setActiveSeries('t2_sag')}
                className={`px-2.5 py-1 rounded-lg transition text-xs ${
                  activeSeries === 't2_sag' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                T2 Sagittal
              </button>
              <button
                onClick={() => setActiveSeries('t1_ax')}
                className={`px-2.5 py-1 rounded-lg transition text-xs ${
                  activeSeries === 't1_ax' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                T1 Axial
              </button>
              <button
                onClick={() => setActiveSeries('xray_dyn')}
                className={`px-2.5 py-1 rounded-lg transition text-xs ${
                  activeSeries === 'xray_dyn' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                Dynamic X-Ray
              </button>
              <button
                onClick={() => setActiveSeries('ct_3d')}
                className={`px-2.5 py-1 rounded-lg transition text-xs ${
                  activeSeries === 'ct_3d' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                3D Bone CT
              </button>
            </div>
          </div>

          {/* Imaging Simulation Canvas */}
          <div className="h-80 w-full rounded-xl bg-slate-950 border border-blue-900/40 relative flex flex-col items-center justify-center overflow-hidden p-4">
            {/* Corner metadata overlays typical of PACS */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-400 space-y-0.5 pointer-events-none">
              <div>STAVYA SPINE PACS</div>
              <div>{patient.uhid} · {patient.name}</div>
              <div>TE: 104ms · TR: 3400ms</div>
              <div>FOV: 280mm · Slice: 3.0mm</div>
            </div>

            <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 text-right space-y-0.5 pointer-events-none">
              <div>{patient.primarySpineLevels.join('-')} TARGET</div>
              <div>W: 1450 L: 580</div>
              <div className="text-emerald-400 font-bold">DR PREETY KRISHNAN</div>
            </div>

            {/* Central Graphical Representation */}
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-48 h-48 rounded-full border-2 border-cyan-500/40 flex items-center justify-center relative bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl">
                <div className="w-24 h-24 rounded-full border border-dashed border-rose-500/60 flex items-center justify-center animate-pulse">
                  <div className="text-[10px] font-mono font-bold text-rose-400">
                    Stenosis AP: {caliperDiameter}mm
                  </div>
                </div>
                {/* Visual calipers */}
                <div className="absolute top-4 bottom-4 w-px bg-cyan-400/40" />
                <div className="absolute left-4 right-4 h-px bg-cyan-400/40" />
              </div>
              <span className="text-xs text-slate-300 font-medium">
                {activeSeries === 't2_sag' && 'T2 Sagittal: Marked disc desiccation and canal narrowing at L4-L5'}
                {activeSeries === 't1_ax' && 'T1 Axial: Bilateral subarticular recess impingement of traversing roots'}
                {activeSeries === 'xray_dyn' && 'Dynamic Flex/Ext: 3.5mm translation confirming spinal instability'}
                {activeSeries === 'ct_3d' && '3D CT: Hypertrophied facet arthropathy and calcified posterior spurs'}
              </span>
            </div>

            {/* Caliper adjustment slider */}
            <div className="absolute bottom-3 left-4 right-4 bg-slate-900/90 border border-slate-800 p-2 rounded-xl flex items-center gap-3">
              <Ruler className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-[11px] text-slate-400 shrink-0">Caliper Calibrate:</span>
              <input
                type="range"
                min="4.0"
                max="15.0"
                step="0.1"
                value={caliperDiameter}
                onChange={e => setCaliperDiameter(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <span className="font-mono text-xs font-bold text-cyan-300 shrink-0">{caliperDiameter} mm</span>
            </div>
          </div>
        </div>

        {/* Right: Formal Signed Report Card */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-heading font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Radiological Impression & Findings
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              Signed & Verified
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Disc Degeneration (Pfirrmann Scale)</span>
              <div className="font-bold text-amber-700 text-sm mt-0.5">{patient.radiology.pfirrmannGrade}</div>
              <p className="text-slate-600 text-[11px] mt-0.5">Inhomogeneous dark disc, collapsed intervertebral disc height.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Central Canal Stenosis (Schizas)</span>
              <div className="font-bold text-rose-700 text-sm mt-0.5">{patient.radiology.canalStenosisGrade}</div>
              <p className="text-slate-600 text-[11px] mt-0.5">Marked crowding and obliteration of thecal sac CSF column.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Dynamic Instability Evaluation</span>
              <div className="font-bold text-blue-700 text-sm mt-0.5">{patient.radiology.dynamicInstabilityXray}</div>
              <p className="text-slate-600 text-[11px] mt-0.5">Motion exceeding physiological threshold on flexion-extension bending views.</p>
            </div>
          </div>

          {/* Radiologist Signature */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-900">{patient.radiology.headRadiologist}</div>
              <div className="text-slate-500 text-[10px]">Head, Department of Radiology</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Digital Signature Valid
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Radiology Staff Roster */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Stavya Radiology Team & Technicians
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {radiologyStaff.map(s => (
            <div key={s.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-900">{s.name}</div>
              <div className="text-blue-700 text-[11px] font-medium">{s.desig}</div>
              <div className="text-slate-500 text-[10px]">Shift: {s.shift || 'General Shift'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
