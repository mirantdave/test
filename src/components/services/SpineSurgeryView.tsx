import React, { useState } from 'react';
import { 
  Stethoscope, 
  Layers, 
  Compass, 
  CheckCircle2, 
  Activity, 
} from 'lucide-react';
import { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';

interface SpineSurgeryViewProps {
  patient: PatientDossier;
  onUpdatePatient?: (patient: PatientDossier) => void;
}

export const SpineSurgeryView: React.FC<SpineSurgeryViewProps> = ({ patient }) => {
  const consultants = getStaffByUnit('Consultant Spine Surgeons');
  const juniorConsultants = getStaffByUnit('Junior Consultants');
  const seniorRegistrars = getStaffByUnit('Senior Registrars');
  const juniorRegistrars = getStaffByUnit('Junior Registrars');

  const [simulatedLordosis, setSimulatedLordosis] = useState<number>(patient.sagittalBalance.lumbarLordosis);
  const [cageAngle, setCageAngle] = useState<number>(4); // degrees

  const pi = patient.sagittalBalance.pelvicIncidence;
  const currentMismatch = Math.abs(pi - simulatedLordosis);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-blue-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <Stethoscope className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-heading font-extrabold text-slate-900">
              Spine Surgery Department & Operative Planning
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Department Leadership: <strong className="text-slate-900">Dr. Bharat Dave (Chief of Spine Surgery)</strong> · Managing Director: <strong className="text-blue-700">Dr. Mirant Dave</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 font-semibold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-600" /> Approach: {patient.surgeryPlan.approach}
          </span>
        </div>
      </div>

      {/* Patient Surgical Case Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] text-blue-600 uppercase tracking-wider font-bold">Planned Surgical Procedure</span>
            <h3 className="text-lg font-heading font-bold text-slate-900 mt-0.5">
              {patient.surgeryPlan.procedureName}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Target Vertebral Segments: {patient.surgeryPlan.levels.map(l => (
                <span key={l} className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold text-xs ml-1">
                  {l}
                </span>
              ))}
            </p>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Estimated Duration</span>
              <span className="text-sm font-bold font-mono text-blue-700">{patient.surgeryPlan.estimatedDurationMins} minutes</span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Operating Date</span>
              <span className="text-sm font-bold text-slate-800">{patient.surgeryPlan.plannedDate}</span>
            </div>
          </div>
        </div>

        {/* Surgical Team Assignment */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Primary Operating Surgeon</span>
            <div className="font-bold text-slate-900 text-sm mt-1">{patient.surgeryPlan.primarySurgeon}</div>
            <span className="text-[10px] text-blue-700 font-medium">Chief Consultant Spine Surgeon</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Assisting Spine Surgeons</span>
            <div className="font-semibold text-slate-800 text-xs mt-1">
              {patient.surgeryPlan.assistingSurgeons.join(' · ')}
            </div>
            <span className="text-[10px] text-slate-500">Consultant / Senior Registrar</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Theatre Assigned</span>
            <div className="font-bold text-emerald-700 text-sm mt-1">{patient.otStatus.theatreNumber}</div>
            <span className="text-[10px] text-slate-500">Clean Laminar Flow Room</span>
          </div>
        </div>

        {/* Implant & Instrumentation Requisition */}
        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5 text-blue-700 font-bold">
              <Layers className="w-4 h-4 text-blue-600" /> Verified Implant & Hardware Requisition
            </span>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Requisition Confirmed by CSSD
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-semibold">Pedicle Screw System</span>
              <span className="font-semibold text-slate-900">{patient.surgeryPlan.implantRequisition.pedicleScrews}</span>
            </div>
            <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-semibold">Interbody Fusion Cage</span>
              <span className="font-semibold text-slate-900">{patient.surgeryPlan.implantRequisition.interbodyCage}</span>
            </div>
            <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-semibold">Biologics / Bone Graft</span>
              <span className="font-semibold text-slate-900">{patient.surgeryPlan.implantRequisition.boneGraft}</span>
            </div>
            <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-semibold">Stabilization Rods</span>
              <span className="font-semibold text-slate-900">{patient.surgeryPlan.implantRequisition.rodLength}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Sagittal Alignment Simulation */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              Intra-Op Sagittal Realignment Simulator
            </h3>
            <p className="text-xs text-slate-500">
              Adjust cage lordotic angle to achieve harmonious Pelvic Incidence ($PI$) to Lumbar Lordosis ($LL$) match.
            </p>
          </div>
          <div className={`px-3 py-1 rounded-xl text-xs font-bold border ${
            currentMismatch <= 10
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            Target PI–LL Mismatch: {currentMismatch}° {currentMismatch <= 10 ? '(Harmonious)' : '(Risk of ASD)'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Interbody Cage Lordosis: +{cageAngle}°</span>
                <span className="text-blue-600">Adjusts L4-L5 segmental arc</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="1"
                value={cageAngle}
                onChange={e => {
                  const val = Number(e.target.value);
                  setCageAngle(val);
                  setSimulatedLordosis(patient.sagittalBalance.lumbarLordosis + (val - 4));
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Native Pelvic Incidence</span>
                <span className="text-lg font-bold font-mono text-slate-900">{pi}°</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Simulated Lordosis</span>
                <span className="text-lg font-bold font-mono text-emerald-700">{simulatedLordosis}°</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Sagittal SVA</span>
                <span className="text-lg font-bold font-mono text-blue-700">{patient.sagittalBalance.sagittalVerticalAxis} mm</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-700 space-y-2">
            <span className="font-bold text-blue-900 block">Dr. Bharat Dave’s Surgical Guidance:</span>
            <p className="text-slate-600 leading-relaxed">
              "For degenerative listhesis at L4-L5, achieving regional lordosis prevents hyperextension stress on L3-L4. 
              The pre-contoured rod combined with a {cageAngle}° lordotic cage restores native anterior column height while 
              decompressing the exiting L4 nerve roots through indirect foraminal expansion."
            </p>
          </div>
        </div>
      </div>

      {/* Stavya Spine Surgical Faculty Roster */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-500">
          Stavya Spine Surgery Faculty & Clinical Registrar Directory
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {consultants.map(c => (
            <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-900">{c.name}</div>
              <div className="text-blue-700 text-[11px] font-medium">{c.desig}</div>
              <div className="text-slate-500 text-[10px]">Mobile: {c.mobile} · Shift: {c.shift}</div>
            </div>
          ))}
          {juniorConsultants.map(c => (
            <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-900">{c.name}</div>
              <div className="text-teal-700 text-[11px] font-medium">{c.desig}</div>
              <div className="text-slate-500 text-[10px]">Mobile: {c.mobile}</div>
            </div>
          ))}
          {seniorRegistrars.map(c => (
            <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-900">{c.name}</div>
              <div className="text-indigo-700 text-[11px] font-medium">{c.desig}</div>
              <div className="text-slate-500 text-[10px]">Mobile: {c.mobile}</div>
            </div>
          ))}
          {juniorRegistrars.map(c => (
            <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-900">{c.name}</div>
              <div className="text-purple-700 text-[11px] font-medium">{c.desig}</div>
              <div className="text-slate-500 text-[10px]">Mobile: {c.mobile}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
