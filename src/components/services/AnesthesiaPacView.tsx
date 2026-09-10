import React, { useState } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Heart, 
  Zap, 
  UserCheck 
} from 'lucide-react';
import { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';

interface AnesthesiaPacViewProps {
  patient: PatientDossier;
  onUpdatePatient?: (patient: PatientDossier) => void;
}

export const AnesthesiaPacView: React.FC<AnesthesiaPacViewProps> = ({ patient }) => {
  const anesthesiaStaff = getStaffByUnit('Anesthesia');
  const [ionmSignalActive] = useState<boolean>(true);
  const [selectedElectrode, setSelectedElectrode] = useState<string>('L5 - Extensor Hallucis Longus');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-blue-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <Activity className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-heading font-extrabold text-slate-900">
              Anesthesia, PAC & Neuro-Monitoring (IONM)
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Department Head: <strong className="text-slate-900">Dr. Kashyap Rameshchandra Shah</strong> · Specialty: Complex Spine Prone Anesthesia & Neuro-Protection
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> PAC Cleared · ASA Grade {patient.anesthesia.asaGrade}
          </span>
        </div>
      </div>

      {/* PAC Clearance & Prone Safety Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PAC Clearance Profile */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-heading font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-600" /> Pre-Anesthesia Evaluation Card
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-semibold">ASA Physical Status</span>
              <span className="text-base font-bold font-mono text-blue-700">Class {patient.anesthesia.asaGrade}</span>
              <span className="text-[10px] text-slate-500 block">Mild systemic disease</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-semibold">Mallampati Airway</span>
              <span className="text-base font-bold font-mono text-emerald-700">Class {patient.anesthesia.mallampatiClass}</span>
              <span className="text-[10px] text-slate-500 block">Favorable visualization</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-semibold">Attending Anesthetist</span>
              <span className="font-semibold text-slate-900 truncate block">{patient.anesthesia.assignedAnesthetist}</span>
              <span className="text-[10px] text-slate-500">Supervised by Dr. Kashyap</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-semibold">Fasting / NPO Status</span>
              <span className="font-semibold text-emerald-700 block">{patient.anesthesia.npoStatus}</span>
              <span className="text-[10px] text-slate-500">Adhered & verified</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs space-y-2">
            <div className="font-semibold text-blue-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Spine Prone Positioning Protocol
            </div>
            <ul className="space-y-1 text-slate-600 text-[11px] list-disc pl-4">
              <li>Facial soft-gel frame with eye cutout (zero pressure on globes to avoid retinal artery ischemia).</li>
              <li>Free-hanging abdomen on Montreal / Wilson frame to decrease epidural venous engorgement and bleeding.</li>
              <li>Arms positioned in &lt;90° abduction to prevent brachial plexus stretch neuropraxia.</li>
            </ul>
          </div>
        </div>

        {/* Intra-Op Neuro-Monitoring (IONM) Station */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              Intra-Operative Neuro-Monitoring (IONM)
            </h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              ionmSignalActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse' : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              {patient.anesthesia.ionmStatus}
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Real-time motor evoked potentials (TcMEP) and somatosensory evoked potentials (SSEP) during hardware insertion.
          </p>

          {/* Simulated Oscilloscope Waveform */}
          <div className="p-4 rounded-xl bg-slate-900 border border-blue-900/60 relative overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between text-[10px] text-sky-400 border-b border-slate-800 pb-2 mb-3">
              <span>Channel: {selectedElectrode}</span>
              <span>Amplitude: 450 μV · Latency: 22.4 ms</span>
            </div>

            <svg viewBox="0 0 400 80" className="w-full h-20 stroke-cyan-400 fill-none stroke-2">
              <path d="M 0,40 L 40,40 L 60,35 L 70,45 L 90,40 L 120,40 L 140,20 L 155,70 L 170,10 L 185,55 L 200,40 L 400,40" />
            </svg>

            <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2">
              <span>50 ms / div</span>
              <span className="text-emerald-400">Baseline Stability: 99.4% (No Cord/Root Traction)</span>
            </div>
          </div>

          {/* Electrode Selector */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {['L4 - Tibialis Anterior', 'L5 - Extensor Hallucis Longus', 'S1 - Gastrocnemius', 'SSEP Posterior Tibial'].map(el => (
              <button
                key={el}
                onClick={() => setSelectedElectrode(el)}
                className={`p-2 rounded-lg border text-left transition ${
                  selectedElectrode === el
                    ? 'bg-blue-50 border-blue-400 text-blue-800 font-bold shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {el}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Post-Op Acute Spine Pain Service */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
          <Heart className="w-4 h-4 text-blue-600" />
          Multimodal Post-Operative Pain Service (Acute Pain Team)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-[10px] text-blue-700 font-bold uppercase">Primary Analgesia Modality</span>
            <div className="font-bold text-slate-900 text-sm">{patient.anesthesia.postOpAnalgesiaPlan}</div>
            <p className="text-slate-500 text-[11px]">Continuous infusion of non-motor-blocking low-dose local anesthetic.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-[10px] text-teal-700 font-bold uppercase">Neuropathic Nerve Quelling</span>
            <div className="font-bold text-slate-900 text-sm">Oral Pregabalin 75mg HS</div>
            <p className="text-slate-500 text-[11px]">Suppresses central sensitization and post-decompression dysesthesia.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-[10px] text-amber-700 font-bold uppercase">Rescue Breakthrough Analgesic</span>
            <div className="font-bold text-slate-900 text-sm">Inj. Paracetamol 1g IV + Tramadol SOS</div>
            <p className="text-slate-500 text-[11px]">Opioid-sparing protocol to allow rapid bowel motility and ambulation.</p>
          </div>
        </div>
      </div>

      {/* Anesthesia Roster */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Stavya Anesthesia Faculty Members
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {anesthesiaStaff.map(s => (
            <div key={s.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-900">{s.name}</div>
              <div className="text-blue-700 text-[11px] font-medium">{s.desig}</div>
              <div className="text-slate-500 text-[10px]">Mobile: {s.mobile} · Blood: {s.blood || 'A+'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
