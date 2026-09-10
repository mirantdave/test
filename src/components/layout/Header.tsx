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
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200/80">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Brand Mark */}
        <div className="flex items-center gap-3 min-w-max">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm tracking-tight text-slate-900">
                STAVYA <span className="text-blue-600 font-bold">SSIE</span>
              </span>
              <span className="hidden md:inline-block text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                Spine OS
              </span>
            </div>
          </div>
        </div>

        {/* Center: Clean Patient Universal Anchor Selector */}
        <div className="relative flex-1 max-w-lg">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition text-left text-xs"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
                {activePatient.name.charAt(0)}
              </div>
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-slate-900 truncate">
                    {activePatient.name}
                  </span>
                  <span className="text-[10px] px-1 py-0.2 rounded bg-slate-100 text-slate-500 font-mono">
                    {activePatient.uhid}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 font-medium hidden sm:inline">
                    {activePatient.roomBed}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
              <span className="text-[11px] text-slate-500 hidden md:inline">Change</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${dropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
            </div>
          </button>

          {/* Patient Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 p-1.5 rounded-xl bg-white border border-slate-200 shadow-lg z-50 animate-in fade-in duration-100">
              <div className="p-1.5 border-b border-slate-100 flex items-center gap-2 mb-1 bg-slate-50 rounded-lg">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                <input
                  type="text"
                  placeholder="Search patient, UHID, room..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-xs text-slate-900 placeholder-slate-400 focus:outline-none py-0.5"
                  autoFocus
                />
              </div>

              <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
                {filteredPatients.map(patient => (
                  <div
                    key={patient.id}
                    onClick={() => {
                      onSelectPatient(patient);
                      setDropdownOpen(false);
                    }}
                    className={`p-2 rounded-lg cursor-pointer transition flex items-center justify-between gap-3 text-xs ${
                      patient.id === activePatient.id
                        ? 'bg-blue-50/80 text-blue-900 font-semibold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-bold shrink-0 ${
                        patient.id === activePatient.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {patient.name.charAt(0)}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-slate-900 truncate">{patient.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{patient.uhid}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 truncate">{patient.chiefDiagnosis}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 text-[10px] text-slate-500 font-medium">
                      {patient.roomBed}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-1 pt-1.5 border-t border-slate-100 flex justify-between items-center px-2 py-1 text-[11px]">
                <span className="text-slate-400">6 patients admitted</span>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenNewPatientModal();
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition"
                >
                  <PlusCircle className="w-3 h-3" /> Admit New
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Wi-Fi Local Test Button */}
          <button
            onClick={onOpenWifiModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 transition text-xs font-medium"
            title="Wi-Fi Live Testing details"
          >
            <Wifi className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Wi-Fi Test</span>
          </button>

          {/* Mode Switch: Clinician View vs Patient & Family View */}
          <button
            onClick={onTogglePatientMode}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition border ${
              isPatientMode
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/80'
            }`}
          >
            {isPatientMode ? (
              <>
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Patient Portal</span>
              </>
            ) : (
              <>
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Clinician View</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
