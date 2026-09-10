import React, { useState } from 'react';
import { 
  Droplet, 
  Activity, 
  CheckCircle2, 
  RotateCw, 
  Bed
} from 'lucide-react';
import { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';

interface NursingFloorViewProps {
  patient: PatientDossier;
  onUpdatePatient?: (patient: PatientDossier) => void;
}

export const NursingFloorView: React.FC<NursingFloorViewProps> = ({ patient }) => {
  const floorInCharges = getStaffByUnit('Floor In-charges');
  const ipdStaff = getStaffByUnit('IPD & HDU Nursing');

  const [logRollCompleted, setLogRollCompleted] = useState<boolean>(patient.nursing.logRollSchedule.twoNursesVerified);
  const [drainOutput] = useState<number>(patient.nursing.drainOutputMl24h);
  const [recordedVitals] = useState(patient.nursing.vitals);

  const handleVerifyLogRoll = () => {
    setLogRollCompleted(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-blue-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <Droplet className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-heading font-extrabold text-slate-900">
              IPD & HDU Nursing Stations (4th, 5th, 6th Floors)
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Nursing Superintendent: <strong className="text-slate-900">Manilal Mangilal Hadat (ANS)</strong> · CNO: <strong className="text-blue-700">Brijesh Bhatt</strong> · Assigned: <strong className="text-emerald-700">{patient.nursing.primaryNurse}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-blue-600" /> {patient.roomBed} ({patient.floor})
          </span>
        </div>
      </div>

      {/* 2-Hourly Neuro-Vitals & Inpatient Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Neuro-Vitals Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Spine Neuro-Vitals Monitoring (q2h)
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Last Log: {recordedVitals.recordedAt}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Blood Pressure</span>
              <span className="text-sm font-bold font-mono text-slate-900 mt-0.5 block">{recordedVitals.bp}</span>
              <span className="text-[9px] text-emerald-700 font-medium">Normotensive</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Pulse Rate</span>
              <span className="text-sm font-bold font-mono text-slate-900 mt-0.5 block">{recordedVitals.pulse} bpm</span>
              <span className="text-[9px] text-emerald-700 font-medium">Regular sinus</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">SpO2 Oxygen</span>
              <span className="text-sm font-bold font-mono text-blue-700 mt-0.5 block">{recordedVitals.spo2}%</span>
              <span className="text-[9px] text-emerald-700 font-medium">Room air</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Temperature</span>
              <span className="text-sm font-bold font-mono text-slate-900 mt-0.5 block">{recordedVitals.temp}°F</span>
              <span className="text-[9px] text-emerald-700 font-medium">Afebrile</span>
            </div>
          </div>

          {/* Motor Nerve Assessment Summary */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
              Lower Limb Myotome Power (MRC Scale 0–5)
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                <span className="text-slate-600">L4 Ankle Dorsiflexion:</span>
                <span className="font-bold text-slate-900">{patient.neuroExam.motorPower.l4_ankleDorsiflexion}/5</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                <span className="text-slate-600">L5 Great Toe Ext (EHL):</span>
                <span className="font-bold text-blue-700">{patient.neuroExam.motorPower.l5_greatToeExtension}/5</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                <span className="text-slate-600">S1 Plantarflexion:</span>
                <span className="font-bold text-slate-900">{patient.neuroExam.motorPower.s1_anklePlantarflexion}/5</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                <span className="text-slate-600">Sensory Saddle (S3-S5):</span>
                <span className="font-bold text-emerald-700">{patient.neuroExam.sensoryDermatomes.s3s5_perianal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Nurse Log-Roll Turning Protocol */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
              <RotateCw className="w-4 h-4 text-blue-600" />
              Two-Nurse Log-Roll Turning Protocol
            </h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              logRollCompleted ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
            }`}>
              {logRollCompleted ? 'Turn Complete' : 'Turn Due Now'}
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Maintains rigid axial spinal alignment while preventing sacral pressure injury. Requires 2 trained nurses.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="flex justify-between items-center text-[11px] text-slate-700">
              <span>Last Log-Roll: <strong className="text-slate-900">{patient.nursing.logRollSchedule.lastTurnedTime}</strong></span>
              <span>Next Due: <strong className="text-blue-700 font-bold">{patient.nursing.logRollSchedule.nextTurnDue}</strong></span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1 text-[11px] text-slate-600">
              <div>• Nurse 1 controls shoulders and torso; Nurse 2 supports pelvis and lower limbs.</div>
              <div>• Patient turns simultaneously without torsional spine twist. Pillow placed between knees.</div>
            </div>

            <button
              onClick={handleVerifyLogRoll}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs ${
                logRollCompleted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {logRollCompleted ? 'Verified by Nurse Staff' : 'Confirm 2-Nurse Log-Roll Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Hemovac Surgical Drain & Inpatient Tubes Strip */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
          <Droplet className="w-4 h-4 text-blue-600" />
          Surgical Drain & Catheter Management
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Hemovac Negative Suction</span>
              <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                drainOutput < 50 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {drainOutput} mL / 24h
              </span>
            </div>
            <p className="text-slate-600 text-[11px]">
              {drainOutput < 50 
                ? 'Drain output is below 50 mL in 24 hours. Cleared for removal by Dr. Bharat Dave!' 
                : 'Active serosanguinous collection. Maintain vacuum canister seal.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Foley Urinary Catheter</span>
            <div className="font-bold text-slate-900 text-sm">{patient.nursing.foleyCatheterStatus}</div>
            <p className="text-slate-600 text-[11px]">Early removal protocol on Post-Op Day 1 prevents catheter-associated UTI.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Surgical Site Dressing</span>
            <div className="font-bold text-emerald-700 text-sm">{patient.nursing.surgicalDressingStatus}</div>
            <p className="text-slate-600 text-[11px]">No strikethrough exudate. Waterproof adhesive intact for sponge bath.</p>
          </div>
        </div>
      </div>

      {/* Nursing Floor Leadership Roster */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Stavya Floor In-charges & Senior Nursing Officers
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {floorInCharges.map(s => (
            <div key={s.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-900">{s.name}</div>
              <div className="text-blue-700 text-[11px] font-medium">{s.desig}</div>
              <div className="text-slate-500 text-[10px]">Mobile: {s.mobile}</div>
            </div>
          ))}
          {ipdStaff.slice(0, 4).map(s => (
            <div key={s.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-900">{s.name}</div>
              <div className="text-teal-700 text-[11px] font-medium">{s.desig}</div>
              <div className="text-slate-500 text-[10px]">Shift: {s.shift || 'Rotational'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
