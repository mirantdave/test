import React, { useState } from 'react';
import { 
  Activity, 
  Wifi, 
  UserCheck, 
  HeartHandshake, 
  ChevronDown, 
  Search, 
  PlusCircle, 
  Bed
} from 'lucide-react';
import type { PatientDossier } from '../../types';

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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Stavya Brand */}
        <div className="flex items-center gap-3 min-w-max">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-sky-500 p-0.5 shadow-md shadow-blue-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-600 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-base tracking-tight text-slate-900 flex items-center gap-1.5">
                STAVYA <span className="text-blue-600 font-bold">SSIE</span>
              </span>
              <span className="hidden md:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                Spine Care OS
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Spine Hospital & Research Institute · Ahmedabad
            </p>
          </div>
        </div>

        {/* Center: Patient Universal Anchor Selector */}
        <div className="relative flex-1 max-w-xl">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200 hover:border-blue-400 transition shadow-xs text-left group"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
                {activePatient.name.charAt(0)}
              </div>
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900 truncate group-hover:text-blue-600 transition">
                    {activePatient.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200/80 text-slate-700 font-mono font-medium">
                    {activePatient.uhid}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                    {activePatient.currentStage}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 flex items-center gap-2 truncate mt-0.5">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <Bed className="w-3 h-3 text-blue-600" /> {activePatient.roomBed}
                  </span>
                  <span>·</span>
                  <span className="truncate text-slate-500">
                    {activePatient.chiefDiagnosis}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-semibold text-slate-500 hidden sm:inline">Switch Patient</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
            </div>
          </button>

          {/* Patient Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl bg-white border border-blue-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-2 border-b border-slate-100 flex items-center gap-2 mb-2 bg-slate-50 rounded-xl">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by patient name, UHID, diagnosis, or room..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
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
                        ? 'bg-blue-50 border border-blue-300 text-blue-950'
                        : 'hover:bg-slate-50 border border-transparent text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        patient.id === activePatient.id ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {patient.name.charAt(0)}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 truncate">{patient.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{patient.uhid}</span>
                          <span className="text-[10px] text-blue-600 font-semibold">({patient.age}y/{patient.gender})</span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{patient.chiefDiagnosis}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 block mb-1 font-medium">
                        {patient.roomBed}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold">{patient.currentStage}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center px-2">
                <span className="text-[11px] text-slate-500 font-medium">Total 6 Spine Patients Active</span>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenNewPatientModal();
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 transition"
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
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 transition shadow-xs active:scale-95 group"
            title="Scan QR or open IP from any mobile/tablet on this Wi-Fi"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <Wifi className="w-4 h-4 text-blue-600 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold hidden md:inline">Test on Wi-Fi</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white font-mono text-blue-600 border border-blue-200 hidden lg:inline font-bold">
              192.168.6.167
            </span>
          </button>

          {/* Mode Switch: Clinician View vs Patient & Family View */}
          <button
            onClick={onTogglePatientMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              isPatientMode
                ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200'
            }`}
            title="Toggle between Multi-disciplinary Clinical Suite and Patient-Facing Recovery Portal"
          >
            {isPatientMode ? (
              <>
                <HeartHandshake className="w-4 h-4 text-amber-600" />
                <span>Patient Portal</span>
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline">Clinician Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
