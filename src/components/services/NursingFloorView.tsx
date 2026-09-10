import React, { useState } from 'react';
import { 
  Droplet, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  FileText,
  RotateCw,
  HeartPulse,
  Bed
} from 'lucide-react';
import { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';

interface NursingFloorViewProps {
  patient: PatientDossier;
  onUpdatePatient?: (patient: PatientDossier) => void;
}

export const NursingFloorView: React.FC<NursingFloorViewProps> = ({ patient, onUpdatePatient }) => {
  const nursingLeadership = getStaffByUnit('Nursing Leadership');
  const floorInCharges = getStaffByUnit('Floor In-charges');
  const ipdStaff = getStaffByUnit('IPD & HDU Nursing');

  const [logRollCompleted, setLogRollCompleted] = useState<boolean>(patient.nursing.logRollSchedule.twoNursesVerified);
  const [drainOutput, setDrainOutput] = useState<number>(patient.nursing.drainOutputMl24h);
  const [recordedVitals, setRecordedVitals] = useState(patient.nursing.vitals);

  const handleVerifyLogRoll = () => {
    setLogRollCompleted(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-cyan-500/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40">
              <Droplet className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-heading font-extrabold text-white">
              IPD & HDU Nursing Stations (4th, 5th, 6th Floors)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Nursing Superintendent: <strong className="text-white">Manilal Mangilal Hadat (ANS)</strong> · CNO: <strong className="text-cyan-300">Brijesh Bhatt</strong> · Assigned: <strong className="text-emerald-300">{patient.nursing.primaryNurse}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-cyan-400" /> {patient.roomBed} ({patient.floor})
          </span>
        </div>
      </div>

      {/* 2-Hourly Neuro-Vitals & Inpatient Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Neuro-Vitals Card */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Spine Neuro-Vitals Monitoring (q2h)
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Last Log: {recordedVitals.recordedAt}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Blood Pressure</span>
              <span className="text-sm font-bold font-mono text-white mt-0.5 block">{recordedVitals.bp}</span>
              <span className="text-[9px] text-emerald-400">Normotensive</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pulse Rate</span>
              <span className="text-sm font-bold font-mono text-white mt-0.5 block">{recordedVitals.pulse} bpm</span>
              <span className="text-[9px] text-emerald-400">Regular sinus</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">SpO2 Oxygen</span>
              <span className="text-sm font-bold font-mono text-cyan-400 mt-0.5 block">{recordedVitals.spo2}%</span>
              <span className="text-[9px] text-emerald-400">Room air</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Temperature</span>
              <span className="text-sm font-bold font-mono text-white mt-0.5 block">{recordedVitals.temp}°F</span>
              <span className="text-[9px] text-emerald-400">Afebrile</span>
            </div>
          </div>

          {/* Motor Nerve Assessment Summary */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
              Lower Limb Myotome Power (MRC Scale 0–5)
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">L4 Ankle Dorsiflexion:</span>
                <span className="font-bold text-white">{patient.neuroExam.motorPower.l4_ankleDorsiflexion}/5</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">L5 Great Toe Ext (EHL):</span>
                <span className="font-bold text-cyan-300">{patient.neuroExam.motorPower.l5_greatToeExtension}/5</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">S1 Plantarflexion:</span>
                <span className="font-bold text-white">{patient.neuroExam.motorPower.s1_anklePlantarflexion}/5</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">Sensory Saddle (S3-S5):</span>
                <span className="font-bold text-emerald-400">{patient.neuroExam.sensoryDermatomes.s3s5_perianal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Nurse Log-Roll Turning Protocol */}
        <div className="p-6 rounded-2xl glass-panel-glow border border-cyan-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider text-teal-400 flex items-center gap-2">
              <RotateCw className="w-4 h-4" />
              Two-Nurse Log-Roll Turning Protocol
            </h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              logRollCompleted ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40' : 'bg-amber-950 text-amber-300 border-amber-500/40 animate-pulse'
            }`}>
              {logRollCompleted ? 'Turn Complete' : 'Turn Due Now'}
            </span>
          </div>

          <p className="text-xs text-slate-300">
            Maintains rigid axial spinal alignment while preventing sacral pressure injury. Requires 2 trained nurses.
          </p>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
            <div className="flex justify-between items-center text-[11px] text-slate-300">
              <span>Last Log-Roll: <strong className="text-white">{patient.nursing.logRollSchedule.lastTurnedTime}</strong></span>
              <span>Next Due: <strong className="text-cyan-400">{patient.nursing.logRollSchedule.nextTurnDue}</strong></span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1 text-[11px] text-slate-400">
              <div>• Nurse 1 controls shoulders and torso; Nurse 2 supports pelvis and lower limbs.</div>
              <div>• Patient turns simultaneously without torsional spine twist. Pillow placed between knees.</div>
            </div>

            <button
              onClick={handleVerifyLogRoll}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-md ${
                logRollCompleted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-teal-600/20 active:scale-95'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {logRollCompleted ? 'Verified by Nurse Emerald & Anita' : 'Confirm 2-Nurse Log-Roll Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Hemovac Surgical Drain & Inpatient Tubes Strip */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider text-cyan-400 flex items-center gap-2">
          <Droplet className="w-4 h-4" />
          Surgical Drain & Catheter Management
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Hemovac Negative Suction</span>
              <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                drainOutput < 50 ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
              }`}>
                {drainOutput} mL / 24h
              </span>
            </div>
            <p className="text-slate-400 text-[11px]">
              {drainOutput < 50 
                ? 'Drain output is below 50 mL in 24 hours. Cleared for removal by Dr. Bharat Dave!' 
                : 'Active serosanguinous collection. Maintain vacuum canister seal.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Foley Urinary Catheter</span>
            <div className="font-bold text-white text-sm">{patient.nursing.foleyCatheterStatus}</div>
            <p className="text-slate-400 text-[11px]">Early removal protocol on Post-Op Day 1 prevents catheter-associated UTI.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Surgical Site Dressing</span>
            <div className="font-bold text-emerald-400 text-sm">{patient.nursing.surgicalDressingStatus}</div>
            <p className="text-slate-400 text-[11px]">No strikethrough exudate. Waterproof adhesive intact for sponge bath.</p>
          </div>
        </div>
      </div>

      {/* Nursing Floor Leadership Roster */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Stavya Floor In-charges & Senior Nursing Officers
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {floorInCharges.map(s => (
            <div key={s.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="font-bold text-white">{s.name}</div>
              <div className="text-cyan-400 text-[11px]">{s.desig}</div>
              <div className="text-slate-400 text-[10px]">Mobile: {s.mobile}</div>
            </div>
          ))}
          {ipdStaff.slice(0, 4).map(s => (
            <div key={s.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="font-bold text-white">{s.name}</div>
              <div className="text-teal-400 text-[11px]">{s.desig}</div>
              <div className="text-slate-400 text-[10px]">Shift: {s.shift || 'Rotational'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
