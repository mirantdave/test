import React from 'react';
import { 
  Activity, 
  Layers, 
  Stethoscope, 
  Scan, 
  HeartHandshake, 
  Droplet, 
  Pill, 
  ShieldCheck, 
  BedDouble, 
  Flame, 
  Workflow, 
  Compass, 
  Users, 
  Sparkles,
  ClipboardList,
  Crosshair,
  BadgeAlert
} from 'lucide-react';

export type ActiveService = 
  | 'patient-360'
  | 'spine-surgery'
  | 'anesthesia-pac'
  | 'radiology-pacs'
  | 'operating-theatres'
  | 'nursing-floor'
  | 'physio-rehab'
  | 'pharmacy-sap'
  | 'clinical-coord'
  | 'medical-officers'
  | 'cssd-sterile'
  | 'patient-experience'
  | 'quality-research'
  | 'ward-bed-board';

interface SidebarProps {
  activeService: ActiveService;
  onSelectService: (service: ActiveService) => void;
}

interface NavItem {
  key: ActiveService;
  label: string;
  lead: string;
  icon: React.ElementType;
  badge?: string;
  category: 'Patient Core' | 'Surgical & Acute' | 'Inpatient Care' | 'Governance & Hospital';
}

const NAV_ITEMS: NavItem[] = [
  // Patient Core
  {
    key: 'patient-360',
    label: 'Patient 360 & Anatomy',
    lead: 'Spine Column (C1–S5)',
    icon: Layers,
    badge: 'Core',
    category: 'Patient Core'
  },
  {
    key: 'ward-bed-board',
    label: 'Ward & Bed Matrix',
    lead: 'HDU · 4th · 5th · 6th Fl',
    icon: BedDouble,
    category: 'Patient Core'
  },

  // Surgical & Acute
  {
    key: 'spine-surgery',
    label: 'Spine Surgery Suite',
    lead: 'Dr. Bharat Dave · Dr. Mirant Dave',
    icon: Stethoscope,
    category: 'Surgical & Acute'
  },
  {
    key: 'anesthesia-pac',
    label: 'Anesthesia & PAC',
    lead: 'Dr. Kashyap Shah · IONM',
    icon: Activity,
    category: 'Surgical & Acute'
  },
  {
    key: 'operating-theatres',
    label: 'Operating Theatres (1-6)',
    lead: 'Brijesh Bhatt CNO · WHO Safety',
    icon: Crosshair,
    badge: 'Live',
    category: 'Surgical & Acute'
  },
  {
    key: 'radiology-pacs',
    label: 'Spine Radiology & PACS',
    lead: 'Dr. Preety Krishnan · MRI/CT',
    icon: Scan,
    category: 'Surgical & Acute'
  },
  {
    key: 'cssd-sterile',
    label: 'CSSD & Sterile Sets',
    lead: 'Dev Puri · Autoclave Batches',
    icon: ShieldCheck,
    category: 'Surgical & Acute'
  },

  // Inpatient Care
  {
    key: 'nursing-floor',
    label: 'IPD & HDU Nursing',
    lead: 'Manilal Hadat ANS · Neuro-Vitals',
    icon: Droplet,
    category: 'Inpatient Care'
  },
  {
    key: 'physio-rehab',
    label: 'Physio & Spine Rehab',
    lead: 'Dr. Parth Joshi · Braces & Day 1',
    icon: Workflow,
    category: 'Inpatient Care'
  },
  {
    key: 'pharmacy-sap',
    label: 'Clinical Pharmacy',
    lead: 'Jatin Pathak · Preena · Pain',
    icon: Pill,
    category: 'Inpatient Care'
  },
  {
    key: 'medical-officers',
    label: 'Medical Officers 24x7',
    lead: 'Dr. Jaydeep · Dr. Vipul · Ward',
    icon: ClipboardList,
    category: 'Inpatient Care'
  },

  // Governance & Hospital
  {
    key: 'clinical-coord',
    label: 'Clinical Coordinators',
    lead: 'Dr. Ravi Patel · Dr. Birju Vyas',
    icon: Compass,
    category: 'Governance & Hospital'
  },
  {
    key: 'patient-experience',
    label: 'Patient Experience & PRO',
    lead: 'Parimal Yagnik · Escort Fleet',
    icon: HeartHandshake,
    category: 'Governance & Hospital'
  },
  {
    key: 'quality-research',
    label: 'Quality, NABH & Research',
    lead: 'Dr. Akruti Dave · PREM/PROM',
    icon: Sparkles,
    badge: 'NABH',
    category: 'Governance & Hospital'
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ activeService, onSelectService }) => {
  const categories = ['Patient Core', 'Surgical & Acute', 'Inpatient Care', 'Governance & Hospital'] as const;

  return (
    <aside className="w-64 shrink-0 glass-panel border-r border-slate-800/80 p-3 space-y-5 overflow-y-auto hidden lg:block select-none">
      {categories.map(cat => {
        const items = NAV_ITEMS.filter(item => item.category === cat);
        return (
          <div key={cat} className="space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-1">
              {cat}
            </div>
            {items.map(item => {
              const Icon = item.icon;
              const isActive = activeService === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => onSelectService(item.key)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/20 text-white border border-cyan-500/40 shadow-md shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`p-1.5 rounded-lg shrink-0 ${
                      isActive ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800/80 text-slate-400 group-hover:text-white'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="font-semibold text-xs truncate leading-tight">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5 group-hover:text-slate-400">
                        {item.lead}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                      isActive ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-cyan-400 border border-cyan-800/40'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        );
      })}
    </aside>
  );
};
