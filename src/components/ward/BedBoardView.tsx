import React, { useState } from 'react';
import type { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';
import { 
  Bed, Users, CheckCircle2, AlertCircle, ShieldAlert, 
  Phone, UserCheck, HeartPulse, Sparkles
} from 'lucide-react';

interface Props {
  patients: PatientDossier[];
  activePatient: PatientDossier;
  onSelectPatient: (patient: PatientDossier) => void;
}

export const BedBoardView: React.FC<Props> = ({
  patients,
  activePatient,
  onSelectPatient,
}) => {
  const floorIncharges = getStaffByUnit('Floor In-charges');
  const [selectedFloor, setSelectedFloor] = useState<'All' | 'HDU' | '4th Floor' | '5th Floor' | '6th Floor'>('All');

  // Realistic Stavya Bed Layout
  const beds = [
    // HDU / ICU (2nd Floor)
    { id: 'HDU-01', floor: 'HDU', type: 'High Dependency Bed', patientId: 'p1', occupant: 'Rajeshbhai K. Patel', condition: 'Post-Op MIS-TLIF Day 1', nurse: 'Saraswati Makwana' },
    { id: 'HDU-02', floor: 'HDU', type: 'High Dependency Bed', patientId: 'p5', occupant: 'Mukeshbhai D. Solanki', condition: 'Foot Drop L5-S1 Decompression', nurse: 'Emerald Christian' },
    { id: 'HDU-03', floor: 'HDU', type: 'High Dependency Bed', patientId: null, occupant: null, condition: 'Vacant (Cleaned & Sanitized)', nurse: 'On Standby' },
    { id: 'HDU-04', floor: 'HDU', type: 'Isolation HDU Bed', patientId: null, occupant: null, condition: 'Vacant (Negative Pressure)', nurse: 'On Standby' },

    // 4th Floor (Anita Sunilbhai Gohel)
    { id: '401', floor: '4th Floor', type: 'Deluxe Suite', patientId: 'p2', occupant: 'Meenaben V. Shah', condition: 'C5-C6 ACDF Pre-Op Fasting', nurse: 'Ami Patni' },
    { id: '402', floor: '4th Floor', type: 'Twin Sharing A', patientId: 'p4', occupant: 'Kusumben R. Joshi', condition: 'L2 Kyphoplasty (Day 0)', nurse: 'Adityaraj Rathod' },
    { id: '403', floor: '4th Floor', type: 'Twin Sharing B', patientId: null, occupant: null, condition: 'Vacant (Housekeeping in progress)', nurse: 'Anita Gohel (Incharge)' },
    { id: '404', floor: '4th Floor', type: 'Single Special Room', patientId: null, occupant: null, condition: 'Vacant', nurse: 'On Standby' },

    // 5th Floor (Trupti Dayabhai Asari)
    { id: '501', floor: '5th Floor', type: 'Spine Step-Down Room', patientId: 'p3', occupant: 'Aarav J. Mehta', condition: 'T5-T12 Scoliosis Correction', nurse: 'Ilaben Chauhan' },
    { id: '502', floor: '5th Floor', type: 'Twin Sharing A', patientId: null, occupant: null, condition: 'Vacant', nurse: 'Trupti Asari (Incharge)' },
    { id: '503', floor: '5th Floor', type: 'Twin Sharing B', patientId: null, occupant: null, condition: 'Vacant', nurse: 'On Standby' },
    { id: '504', floor: '5th Floor', type: 'Deluxe Suite', patientId: null, occupant: null, condition: 'Reserved for 16:00 Admission', nurse: 'Admissions' },

    // 6th Floor (Dilipkumar Sankarlal Labana)
    { id: '601', floor: '6th Floor', type: 'Executive Suite', patientId: 'p6', occupant: 'Vikramsinh M. Vaghela', condition: 'L5-S1 Endoscopic Discectomy (D2)', nurse: 'Harish Meghwal' },
    { id: '602', floor: '6th Floor', type: 'Executive Suite', patientId: null, occupant: null, condition: 'Vacant', nurse: 'Dilipkumar Labana (Incharge)' },
    { id: '603', floor: '6th Floor', type: 'Twin Sharing A', patientId: null, occupant: null, condition: 'Vacant', nurse: 'On Standby' },
    { id: '604', floor: '6th Floor', type: 'Twin Sharing B', patientId: null, occupant: null, condition: 'Vacant', nurse: 'On Standby' },
  ];

  const filteredBeds = selectedFloor === 'All' ? beds : beds.filter(b => b.floor === selectedFloor);
  const occupiedCount = beds.filter(b => b.patientId !== null).length;
  const occupancyRate = Math.round((occupiedCount / beds.length) * 100);

  const handleBedClick = (bed: typeof beds[0]) => {
    if (!bed.patientId) return;
    const found = patients.find(p => p.id === bed.patientId);
    if (found) {
      onSelectPatient(found);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Bed className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Stavya Live Hospital Bed & Floor Board
            </h2>
            <p className="text-xs text-slate-400">
              Interactive Inpatient Spine Ward Matrix • HDU • 4th, 5th, 6th Floors
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center gap-3">
            <span>Occupancy: <strong className="text-indigo-400 font-bold">{occupancyRate}%</strong> ({occupiedCount}/{beds.length} Beds)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
        </div>
      </div>

      {/* Floor Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'HDU', '4th Floor', '5th Floor', '6th Floor'].map((fl) => (
          <button
            key={fl}
            onClick={() => setSelectedFloor(fl as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedFloor === fl
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {fl}
          </button>
        ))}
      </div>

      {/* Floor Incharges Quick Contacts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {floorIncharges.map((incharge) => (
          <div key={incharge.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-white">{incharge.name}</div>
              <div className="text-[10px] text-indigo-400">{incharge.desig}</div>
            </div>
            <a href={`tel:${incharge.mobile}`} className="flex items-center gap-1 text-[11px] font-mono text-slate-300 hover:text-indigo-300">
              <Phone className="w-3 h-3 text-indigo-400" /> {incharge.mobile}
            </a>
          </div>
        ))}
      </div>

      {/* Bed Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredBeds.map((bed) => {
          const isOccupied = bed.patientId !== null;
          const isCurrentActive = activePatient.id === bed.patientId;

          return (
            <div
              key={bed.id}
              onClick={() => handleBedClick(bed)}
              className={`p-4 rounded-2xl border transition-all ${
                isCurrentActive
                  ? 'bg-indigo-950/40 border-indigo-500 shadow-xl shadow-indigo-500/20 scale-[1.02]'
                  : isOccupied
                  ? 'bg-slate-900/80 border-slate-700/80 hover:border-indigo-500/50 cursor-pointer'
                  : 'bg-slate-950/40 border-slate-800/60 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black text-white font-mono">{bed.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold">
                    {bed.floor}
                  </span>
                </div>

                <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                  isOccupied ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {isOccupied ? 'OCCUPIED' : 'VACANT'}
                </span>
              </div>

              <div className="text-[11px] text-indigo-300 font-semibold mb-2">{bed.type}</div>

              {isOccupied ? (
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1 text-xs">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>{bed.occupant}</span>
                    {isCurrentActive && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500 text-white font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{bed.condition}</div>
                  <div className="text-[10px] text-teal-400 pt-1 border-t border-slate-700/50 flex items-center gap-1">
                    <UserCheck className="w-3 h-3" /> Nurse: {bed.nurse}
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-900/30 border border-dashed border-slate-800 text-center text-xs text-slate-500 py-4">
                  {bed.condition}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
