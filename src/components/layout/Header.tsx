import React, { useState } from 'react';
import { 
  Activity, 
  Wifi, 
  UserCheck, 
  HeartHandshake, 
  ShieldAlert, 
  ChevronDown, 
  Search, 
  PlusCircle, 
  Bed,
  Layers,
  Sparkles
} from 'lucide-react';
import { PatientDossier } from '../../types';

interface HeaderProps {
  patients: PatientDossier[];
  activePatient: PatientDossier;
  onSelectPatient: (patient: PatientDossier) => void;
  isPatientMode: boolean;
  onTogglePatientMode: () => void;
  onOpenWifiModal: () => void;
  onOpenNewPatientModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  patients,
  activePatient,
  onSelectPatient,
  isPatientMode,
  onTogglePatientMode,
  onOpenWifiModal,
  onOpenNewPatientModal
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.chiefDiagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.roomBed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 shadow-xl">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Stavya Brand */}
        <div className="flex items-center gap-3 min-w-max">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                STAVYA <span className="text-cyan-400 font-normal">SSIE</span>
              </span>
              <span className="hidden md:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 uppercase tracking-wider">
                Spine Care OS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Spine Hospital & Research Institute · Ahmedabad
            </p>
          </div>
        </div>

        {/* Center: Patient Universal Anchor Selector */}
        <div className="relative flex-1 max-w-xl">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 transition shadow-inner text-left group"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-xs shrink-0">
                {activePatient.name.charAt(0)}
              </div>
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-white truncate group-hover:text-cyan-300 transition">
                    {activePatient.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                    {activePatient.uhid}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 font-medium">
                    {activePatient.currentStage}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-2 truncate mt-0.5">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Bed className="w-3 h-3 text-cyan-400" /> {activePatient.roomBed}
                  </span>
                  <span>·</span>
                  <span className="truncate text-slate-400">
                    {activePatient.chiefDiagnosis}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-medium text-slate-400 hidden sm:inline">Switch Patient</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
            </div>
          </button>

          {/* Patient Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl glass-panel-glow border border-cyan-500/30 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-2 border-b border-slate-800 flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by patient name, UHID, diagnosis, or room..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none"
                  autoFocus
                />
              </div>

              <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
                {filteredPatients.map(patient => (
                  <div
                    key={patient.id}
                    onClick={() => {
                      onSelectPatient(patient);
                      setDropdownOpen(false);
                    }}
                    className={`p-2.5 rounded-xl cursor-pointer transition flex items-center justify-between gap-3 ${
                      patient.id === activePatient.id
                        ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/60 border border-cyan-500/40 text-white'
                        : 'hover:bg-slate-800/70 border border-transparent text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        patient.id === activePatient.id ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {patient.name.charAt(0)}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-white truncate">{patient.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{patient.uhid}</span>
                          <span className="text-[10px] text-cyan-400 font-medium">({patient.age}y/{patient.gender})</span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{patient.chiefDiagnosis}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/80 text-slate-300 block mb-1">
                        {patient.roomBed}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold">{patient.currentStage}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between items-center px-2">
                <span className="text-[11px] text-slate-400">Total 6 Spine Patients Active</span>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenNewPatientModal();
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Fast-Track Admit
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Wi-Fi Local Test Button */}
          <button
            onClick={onOpenWifiModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600/20 to-teal-600/20 hover:from-cyan-600/30 hover:to-teal-600/30 border border-cyan-500/40 text-cyan-300 hover:text-white transition shadow-sm active:scale-95 group"
            title="Scan QR or open IP from any mobile/tablet on this Wi-Fi"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Wifi className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-semibold hidden md:inline">Test on Wi-Fi</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 font-mono text-cyan-400 border border-cyan-800/50 hidden lg:inline">
              192.168.6.167
            </span>
          </button>

          {/* Mode Switch: Clinician View vs Patient & Family View */}
          <button
            onClick={onTogglePatientMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
              isPatientMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-md shadow-amber-500/10'
                : 'bg-slate-800/80 text-slate-300 hover:text-white border-slate-700/80 hover:bg-slate-700'
            }`}
            title="Toggle between Multi-disciplinary Clinical Suite and Patient-Facing Recovery Portal"
          >
            {isPatientMode ? (
              <>
                <HeartHandshake className="w-4 h-4 text-amber-400" />
                <span>Patient Portal</span>
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Clinician Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
