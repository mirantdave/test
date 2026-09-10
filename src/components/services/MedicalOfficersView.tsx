import React, { useState } from 'react';
import type { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';
import { 
  Stethoscope, AlertCircle, Heart, Activity, FileText, 
  CheckCircle2, PlusCircle, Thermometer, Droplet, UserCheck
} from 'lucide-react';

interface Props {
  patient: PatientDossier;
  onUpdatePatient: (patient: PatientDossier) => void;
}

export const MedicalOfficersView: React.FC<Props> = ({ patient, onUpdatePatient }) => {
  const moStaff = getStaffByUnit('Medical Officers');
  const medicineHeads = getStaffByUnit('Medicine');

  const [notes, setNotes] = useState([
    {
      id: '1',
      author: 'Dr. Jaydeep Vaghamshi (Duty MO)',
      time: 'Today 08:30 AM',
      note: 'Morning Spine Ward Rounds with Dr. Bharat Dave. Patient reports pain VAS 3/10. Lower limb motor exam stable: EHL 5/5, Ankle DF 5/5 bilateral. Hemovac drain drained 60ml serosanguinous fluid in 12h. Dressing dry and intact.',
      type: 'Routine'
    },
    {
      id: '2',
      author: 'Dr. Richa Patel (Night MO)',
      time: 'Yesterday 11:30 PM',
      note: 'Night evaluation. Stable hemodynamics. Patient ambulated with walker and physiotherapist in evening without paresthesia. Foley catheter urine clear > 50ml/hr. Night analgesia administered.',
      type: 'Night Round'
    }
  ]);

  const [newNote, setNewNote] = useState('');
  const [news2, setNews2] = useState({
    respRate: 16,
    spO2: 99,
    onOxygen: false,
    systolicBp: 122,
    heartRate: 74,
    consciousness: 'Alert',
    temperature: 36.8
  });

  // Calculate NEWS2 score
  const calculateNews2 = () => {
    let score = 0;
    if (news2.respRate <= 8 || news2.respRate >= 25) score += 3;
    else if (news2.respRate >= 21) score += 2;
    else if (news2.respRate >= 9 && news2.respRate <= 11) score += 1;

    if (news2.spO2 <= 91) score += 3;
    else if (news2.spO2 <= 93) score += 2;
    else if (news2.spO2 <= 95) score += 1;

    if (news2.onOxygen) score += 2;

    if (news2.systolicBp <= 90 || news2.systolicBp >= 220) score += 3;
    else if (news2.systolicBp <= 100) score += 2;
    else if (news2.systolicBp <= 110) score += 1;

    if (news2.heartRate <= 40 || news2.heartRate >= 131) score += 3;
    else if (news2.heartRate >= 111) score += 2;
    else if (news2.heartRate <= 50 || news2.heartRate >= 91) score += 1;

    if (news2.consciousness !== 'Alert') score += 3;

    if (news2.temperature <= 35.0) score += 3;
    else if (news2.temperature >= 39.1) score += 2;
    else if (news2.temperature <= 36.0 || news2.temperature >= 38.1) score += 1;

    return score;
  };

  const news2Score = calculateNews2();

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([
      {
        id: Date.now().toString(),
        author: 'Dr. Bajrangi Gupta (Medical Officer)',
        time: 'Just now',
        note: newNote,
        type: 'Routine'
      },
      ...notes
    ]);
    setNewNote('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Medical Officers & 24×7 Inpatient Rounding
            </h2>
            <p className="text-xs text-slate-400">
              Physician Head: <strong className="text-cyan-300">Dr. Saunak Dudhiya</strong> • HDU Lead: <strong className="text-cyan-300">Dr. Priyank Kapadiya</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 ${
            news2Score <= 2
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : news2Score <= 4
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
          }`}>
            <Activity className="w-4 h-4" />
            NEWS2 Score: {news2Score} ({news2Score <= 2 ? 'Low Clinical Risk' : news2Score <= 4 ? 'Medium - Increase Monitoring' : 'High Alert - Rapid Response'})
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Notes & Deterioration Score */}
        <div className="lg:col-span-2 space-y-6">
          {/* NEWS2 Clinical Deterioration Calculator */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-cyan-400" />
              National Early Warning Score 2 (NEWS2) Calculator
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Real-time physiological risk assessment for post-op spine patients (detects bleeding, hypoventilation, sepsis)
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Resp Rate (bpm)</span>
                <input
                  type="number"
                  value={news2.respRate}
                  onChange={(e) => setNews2({ ...news2, respRate: Number(e.target.value) })}
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-sm font-bold text-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase">SpO2 (%)</span>
                <input
                  type="number"
                  value={news2.spO2}
                  onChange={(e) => setNews2({ ...news2, spO2: Number(e.target.value) })}
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-sm font-bold text-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Systolic BP (mmHg)</span>
                <input
                  type="number"
                  value={news2.systolicBp}
                  onChange={(e) => setNews2({ ...news2, systolicBp: Number(e.target.value) })}
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-sm font-bold text-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Heart Rate (bpm)</span>
                <input
                  type="number"
                  value={news2.heartRate}
                  onChange={(e) => setNews2({ ...news2, heartRate: Number(e.target.value) })}
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-sm font-bold text-white"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={news2.onOxygen}
                  onChange={(e) => setNews2({ ...news2, onOxygen: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
                />
                Supplemental Oxygen (Nasal Cannula / Mask)
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Consciousness:</span>
                <select
                  value={news2.consciousness}
                  onChange={(e) => setNews2({ ...news2, consciousness: e.target.value })}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
                >
                  <option value="Alert">Alert (Normal)</option>
                  <option value="Voice">Voice Responsive</option>
                  <option value="Pain">Pain Responsive</option>
                  <option value="Unresponsive">Unresponsive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Inpatient Rounding Notes Log */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Resident Medical Officer Rounding Notes
            </h3>

            <form onSubmit={handleAddNote} className="space-y-3">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Record clinical observations (neuro status, motor power, wound status, drain output, vitals)..."
                className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                rows={3}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" /> Save Inpatient Note
              </button>
            </form>

            <div className="space-y-3 pt-2">
              {notes.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-cyan-300">{item.author}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-semibold">
                        {item.type}
                      </span>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px]">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Staff on Duty & Clinical Guidelines */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Medical Officers On Duty (24×7 Rotational)
            </h3>
            <div className="space-y-2.5">
              {moStaff.map((staff) => (
                <div key={staff.id} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-white">{staff.name}</div>
                    <div className="text-[10px] text-cyan-300">{staff.desig}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block">{staff.mobile}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Consultant Physicians & HDU Management
            </h3>
            <div className="space-y-2.5">
              {medicineHeads.map((staff) => (
                <div key={staff.id} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs">
                  <div className="font-bold text-white">{staff.name}</div>
                  <div className="text-[10px] text-cyan-300">{staff.desig}</div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{staff.note || 'Available for critical care consults & glycemic control.'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
