import React, { useState } from 'react';
import { 
  Workflow, 
  CheckCircle2, 
  Clock, 
  Activity, 
  FileCheck, 
  Zap, 
  ShieldCheck, 
  UserCheck,
  Award
} from 'lucide-react';
import { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';

interface PhysioRehabViewProps {
  patient: PatientDossier;
  onUpdatePatient?: (patient: PatientDossier) => void;
}

export const PhysioRehabView: React.FC<PhysioRehabViewProps> = ({ patient, onUpdatePatient }) => {
  const physioStaff = getStaffByUnit('Physiotherapy and Rehabilitation');
  const [activeTab, setActiveTab] = useState<'brace' | 'milestones' | 'slr'>('milestones');
  const [slrValue, setSlrValue] = useState<number>(patient.physioRehab.slrRightDegrees);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-cyan-500/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
              <Workflow className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-heading font-extrabold text-white">
              Physiotherapy & Spine Rehabilitation Center
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Department Head: <strong className="text-white">Dr. Parth Janakbhai Joshi</strong> · Day 0/1 Mobilization Protocols, Spine Orthotics & Dynamic Core Stabilization
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-xl bg-purple-950 text-purple-300 border border-purple-800 font-semibold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" /> Assigned: {patient.physioRehab.assignedPhysio}
          </span>
        </div>
      </div>

      {/* Main Rehab Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Step-by-Step Mobility Milestones */}
        <div className="lg:col-span-7 p-6 rounded-2xl glass-panel-glow border border-cyan-500/30 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                Post-Operative Spine Ambulation Ladder
              </h3>
              <p className="text-xs text-slate-400">Targeting zero-torsion, safe bone fusion healing</p>
            </div>
            <span className="text-xs font-bold text-cyan-300 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono">
              {patient.physioRehab.ambulationMilestone}
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 flex items-start gap-3">
              <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">Day 0: In-Bed Core Activation & Ankle Pumps</div>
                <p className="text-slate-400">
                  Diaphragmatic breathing, active ankle-foot pumps to promote venous return and prevent calf DVT, isometric quadriceps sets.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/50 flex items-start gap-3 shadow-md shadow-cyan-500/10">
              <div className="p-1 rounded-full bg-cyan-500/20 text-cyan-400 mt-0.5 animate-spin">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white flex items-center gap-2">
                  Day 1: Log-Roll to High-Sitting & Walker Standing
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500 text-slate-950 font-bold uppercase">Active Target</span>
                </div>
                <p className="text-slate-300">
                  Patient fitted with {patient.physioRehab.bracePrescribed}. Vital signs checked for postural orthostatic hypotension. 2-minute bedside stand with Zimmer walker.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3 text-slate-500">
              <div className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center font-mono text-[10px] shrink-0">
                3
              </div>
              <div className="text-xs space-y-0.5">
                <div className="font-semibold text-slate-400">Day 2: Corridor Ambulation (50 meters)</div>
                <p className="text-slate-600">
                  Cadence and balance re-training. Gait symmetry check without pelvic tilt or trendelenburg lurch.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3 text-slate-500">
              <div className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center font-mono text-[10px] shrink-0">
                4
              </div>
              <div className="text-xs space-y-0.5">
                <div className="font-semibold text-slate-400">Day 3: Independent Ambulation & Stair Clearance</div>
                <p className="text-slate-600">
                  Safe stair ascent (good leg leading) and descent (surgical leg leading with handrail). Home discharge physical therapy cleared.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Spine Orthosis (Brace) & SLR Analyzer */}
        <div className="lg:col-span-5 space-y-4">
          {/* Orthosis Card */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
            <span className="text-[10px] text-teal-400 uppercase tracking-wider font-semibold block">
              Prescribed Spine Orthosis
            </span>
            <div className="text-lg font-heading font-extrabold text-white">
              {patient.physioRehab.bracePrescribed}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides multi-planar external lumbar stability, offloading axial loads from the interbody fusion cage while bone graft consolidates.
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <span className="font-semibold text-cyan-300 block">Proper Fitting Instructions:</span>
              <div>1. Fasten Velcro side straps while lying flat in bed.</div>
              <div>2. The rigid posterior stays must center symmetrically over lumbar spine.</div>
              <div>3. Wear during sitting, standing, and walking; remove while sleeping.</div>
            </div>
          </div>

          {/* Straight Leg Raise (SLR) Test Box */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-purple-400 uppercase tracking-wider font-semibold">
                Straight Leg Raise (SLR) Angle
              </span>
              <span className="text-xs font-mono font-bold text-cyan-300">{slrValue}° Degrees</span>
            </div>

            <div className="space-y-1">
              <input
                type="range"
                min="20"
                max="90"
                value={slrValue}
                onChange={e => setSlrValue(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>30° (Severe Sciatica)</span>
                <span>60° (Mild)</span>
                <span className="text-emerald-400">90° (Normal)</span>
              </div>
            </div>

            <div className="text-xs text-slate-300">
              {slrValue >= 70 ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Sciatic nerve tension negative. L5 nerve root freely mobilized!
                </span>
              ) : (
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  Residual dural tension at {slrValue}°. Perform gentle neural flossing exercises.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Physio Team Roster */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Stavya Physiotherapy & Rehabilitation Clinical Staff
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {physioStaff.map(s => (
            <div key={s.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="font-bold text-white">{s.name}</div>
              <div className="text-cyan-400 text-[11px]">{s.desig}</div>
              <div className="text-slate-400 text-[10px]">Mobile: {s.mobile}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
