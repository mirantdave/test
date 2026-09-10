import React, { useState } from 'react';
import type { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';
import { 
  Award, BookOpen, ShieldCheck, TrendingUp, BarChart3, 
  CheckCircle2, FileSpreadsheet, Sparkles, Activity
} from 'lucide-react';

interface Props {
  patient: PatientDossier;
}

export const QualityResearchView: React.FC<Props> = ({ patient }) => {
  const qualityStaff = getStaffByUnit('Quality');
  const researchStaff = getStaffByUnit('Clinical Research');

  // PROMs Outcome State (ODI)
  const [odiScores, setOdiScores] = useState({
    painIntensity: 2,
    personalCare: 1,
    lifting: 2,
    walking: 2,
    sitting: 1,
    standing: 2,
    sleeping: 1,
    sexLife: 0,
    socialLife: 1,
    traveling: 2
  });

  const totalOdi = Object.values(odiScores).reduce((a, b) => a + b, 0);
  const odiPercentage = Math.round((totalOdi / 50) * 100);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Quality, Patient Safety & Clinical Research
            </h2>
            <p className="text-xs text-slate-400">
              Quality Director: <strong className="text-emerald-300">Dr. Akruti Mirant Dave</strong> • Research Head: <strong className="text-emerald-300">Dr. Dhara Panchal</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> NABH 5th Edition Fully Compliant
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: NABH Core Dashboard & PROMs (ODI) */}
        <div className="lg:col-span-2 space-y-6">
          {/* NABH Monthly KPIs */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Stavya Hospital-Wide NABH Spine Safety KPIs (Current Quarter)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase">SSI Rate (Infection)</span>
                <div className="text-xl font-black text-emerald-400 mt-1">0.00%</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Benchmark &lt; 0.8%</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Unplanned Re-Exploration</span>
                <div className="text-xl font-black text-sky-400 mt-1">0.18%</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Benchmark &lt; 1.5%</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Hand Hygiene Audit</span>
                <div className="text-xl font-black text-teal-400 mt-1">97.4%</div>
                <div className="text-[10px] text-slate-400 mt-0.5">WHO 5 Moments</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase">DVT Occurrence</span>
                <div className="text-xl font-black text-emerald-400 mt-1">0 Cases</div>
                <div className="text-[10px] text-slate-400 mt-0.5">100% Prophylaxis</div>
              </div>
            </div>
          </div>

          {/* PROMs Oswestry Disability Index (ODI) Calculator */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Oswestry Disability Index (ODI 2.1a) Spine Functional Score
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Assessing {patient.name}’s recovery baseline vs current functional status
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-right">
                <div className="text-xs text-slate-400 font-semibold">Calculated ODI</div>
                <div className="text-xl font-black text-emerald-400">
                  {odiPercentage}% <span className="text-xs font-normal text-slate-300">({totalOdi}/50)</span>
                </div>
                <div className="text-[10px] font-bold text-teal-300">
                  {odiPercentage <= 20 ? 'Minimal Disability' : odiPercentage <= 40 ? 'Moderate Disability' : 'Severe Disability'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { key: 'painIntensity', label: '1. Pain Intensity' },
                { key: 'personalCare', label: '2. Personal Care (Washing, Dressing)' },
                { key: 'lifting', label: '3. Lifting Objects' },
                { key: 'walking', label: '4. Walking Distance' },
                { key: 'sitting', label: '5. Sitting Tolerance' },
                { key: 'standing', label: '6. Standing Tolerance' },
                { key: 'sleeping', label: '7. Sleep Quality' },
                { key: 'traveling', label: '8. Traveling / Driving' },
              ].map((item) => (
                <div key={item.key} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-semibold text-slate-300">{item.label}</span>
                    <span className="font-bold text-emerald-400">{(odiScores as any)[item.key]} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={(odiScores as any)[item.key]}
                    onChange={(e) => setOdiScores({ ...odiScores, [item.key]: Number(e.target.value) })}
                    className="w-full accent-emerald-500 bg-slate-900 rounded-lg h-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Faculty & Research Trials */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Quality & Patient Safety Directorate
            </h3>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs">
                <div className="font-bold text-white">Dr. Akruti Mirant Dave</div>
                <div className="text-[10px] text-emerald-300">Director of Quality & Patient Safety</div>
                <div className="text-[10px] text-slate-400 mt-1">Independent reporting line directly to the Governing Body.</div>
              </div>
              {qualityStaff.map((staff) => (
                <div key={staff.id} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">{staff.name}</div>
                    <div className="text-[10px] text-emerald-300">{staff.desig}</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{staff.mobile}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Clinical Research & Publications
            </h3>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs">
                <div className="font-bold text-white">Dr. Dhara Arvindkumar Panchal</div>
                <div className="text-[10px] text-purple-300">Head, Clinical Research</div>
                <div className="text-[10px] text-slate-400 mt-1">Lead Investigator: Sagittal balance restoration in adult degenerative scoliosis.</div>
              </div>
              {researchStaff.map((staff) => (
                <div key={staff.id} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">{staff.name}</div>
                    <div className="text-[10px] text-purple-300">{staff.desig}</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{staff.mobile}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
