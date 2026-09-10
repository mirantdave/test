import React, { useState } from 'react';
import type { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';
import { 
  HeartHandshake, Users, PhoneCall, Sparkles, Navigation, 
  Smile, ShieldCheck, CheckCircle2, MessageSquare, Send
} from 'lucide-react';

interface Props {
  patient: PatientDossier;
}

export const PatientExperienceView: React.FC<Props> = ({ patient }) => {
  const pros = getStaffByUnit('PROs');
  const escorts = getStaffByUnit('Patient Escorts');
  const frontDesk = getStaffByUnit('Front Desk');

  const [escortRequested, setEscortRequested] = useState(false);
  const [escortDestination, setEscortDestination] = useState('Radiology (MRI Suite - Ground Floor)');
  const [feedbackRating, setFeedbackRating] = useState<number | null>(null);
  const [feedbackNote, setFeedbackNote] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const handleRequestEscort = (e: React.FormEvent) => {
    e.preventDefault();
    setEscortRequested(true);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackRating) return;
    setSubmittedFeedback(true);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Patient Experience, PROs & Escort Concierge
            </h2>
            <p className="text-xs text-slate-400">
              Department Head: <strong className="text-pink-300">Parimal Jayantilal Yagnik</strong> • Front Desk Lead: <strong className="text-pink-300">Sharon Christian</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40 flex items-center gap-1.5">
            <Smile className="w-4 h-4" /> 98.4% Patient Satisfaction Rating
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Concierge Dispatch & Feedback */}
        <div className="lg:col-span-2 space-y-6">
          {/* Wheelchair & Stretcher Escort Dispatch */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-pink-400" />
                  Spine Patient Wheelchair / Stretcher Escort Dispatch
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Supervised by Dineshbhai Ranva (Head, Patient Escorts) for safe, smooth patient transfers
                </p>
              </div>
            </div>

            {escortRequested ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-emerald-300 uppercase">Escort Dispatched</div>
                  <div className="text-sm font-bold text-white mt-1">
                    Escort Jaykumar Ranva is en route with specialized high-back spinal wheelchair to {patient.roomBed}
                  </div>
                  <div className="text-xs text-emerald-200 mt-1">Destination: {escortDestination} • ETA: 3 minutes</div>
                </div>
                <button
                  onClick={() => setEscortRequested(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs"
                >
                  Reset
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestEscort} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Transfer Destination</label>
                    <select
                      value={escortDestination}
                      onChange={(e) => setEscortDestination(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                    >
                      <option value="Radiology (MRI Suite - Ground Floor)">Radiology (MRI Suite - Ground Floor)</option>
                      <option value="Radiology (Digital X-Ray / CT Suite)">Radiology (Digital X-Ray / CT Suite)</option>
                      <option value="Physiotherapy Gymnasium (3rd Floor)">Physiotherapy Gymnasium (3rd Floor)</option>
                      <option value="Operating Theatres (2nd Floor Pre-Op)">Operating Theatres (2nd Floor Pre-Op)</option>
                      <option value="Discharge Porch / Valet Pickup">Discharge Porch / Valet Pickup</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Mobility Device</label>
                    <select className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                      <option>High-Back Spinal Wheelchair</option>
                      <option>Hydraulic Transfer Stretcher</option>
                      <option>Assisted Walking Frame (Walker)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" /> Request Immediate Escort Assistance
                </button>
              </form>
            )}
          </div>

          {/* Real-time PREMs Patient Reported Experience */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              Patient Experience Voice (PREMs Digital Survey)
            </h3>
            <p className="text-xs text-slate-400">
              Gathered directly at bedside by Patient Relations Officers Hetal Solanki & Khushbu Nagar
            </p>

            {submittedFeedback ? (
              <div className="p-4 rounded-xl bg-pink-500/20 border border-pink-500/40 text-center space-y-1">
                <CheckCircle2 className="w-8 h-8 text-pink-300 mx-auto" />
                <div className="text-sm font-bold text-white">Feedback Logged into SSIE Quality Matrix!</div>
                <div className="text-xs text-pink-200">
                  Thank you. Rating: {feedbackRating} / 5 Stars. Your comments have been shared with Hospital Governance.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">
                    How would you rate the attentiveness of your doctors, nurses, and care team today?
                  </label>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRating(star)}
                        className={`w-12 h-12 rounded-xl text-lg font-bold transition-all flex items-center justify-center ${
                          feedbackRating === star
                            ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/40 scale-110'
                            : 'bg-slate-800/80 text-slate-400 border border-slate-700 hover:border-pink-500/40'
                        }`}
                      >
                        {star === 5 ? '🌟 5' : star === 4 ? '😊 4' : star === 3 ? '😐 3' : star === 2 ? '😕 2' : '😞 1'}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  placeholder="Share any special compliments or areas where we can make your hospital stay more comfortable..."
                  rows={2}
                  className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />

                <button
                  type="submit"
                  disabled={!feedbackRating}
                  className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:opacity-40 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Bedside Feedback
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Col: Team Roster */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Patient Relations Officers (PROs)
            </h3>
            <div className="space-y-2.5">
              {pros.map((staff) => (
                <div key={staff.id} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-white">{staff.name}</div>
                    <div className="text-[10px] text-pink-300">{staff.desig}</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{staff.mobile}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Patient Escort Team ({escorts.length} Staff)
            </h3>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {escorts.map((staff) => (
                <div key={staff.id} className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/40 text-xs flex justify-between items-center">
                  <div>
                    <div className="font-medium text-slate-200">{staff.name}</div>
                    <div className="text-[10px] text-slate-400">{staff.desig}</div>
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
