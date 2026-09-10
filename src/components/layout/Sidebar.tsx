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
  Workflow, 
  Compass, 
  Sparkles,
  ClipboardList,
  Crosshair,
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
    category: 'Patient Core'
  },
  {
    key: 'ward-bed-board',
    label: 'Ward & Bed Matrix',
    lead: 'Live Bed Board',
    icon: BedDouble,
    category: 'Patient Core'
  },

  // Surgical & Acute
  {
    key: 'spine-surgery',
    label: 'Spine Surgery Suite',
    lead: 'Operative Planning',
    icon: Stethoscope,
    category: 'Surgical & Acute'
  },
  {
    key: 'anesthesia-pac',
    label: 'Anesthesia & PAC',
    lead: 'Clearance & IONM',
    icon: Activity,
    category: 'Surgical & Acute'
  },
  {
    key: 'operating-theatres',
    label: 'Operating Theatres (1-6)',
    lead: 'WHO Safety Protocol',
    icon: Crosshair,
    badge: 'Live',
    category: 'Surgical & Acute'
  },
  {
    key: 'radiology-pacs',
    label: 'Spine Radiology & PACS',
    lead: 'MRI · CT · Dynamic X-Ray',
    icon: Scan,
    category: 'Surgical & Acute'
  },
  {
    key: 'cssd-sterile',
    label: 'CSSD & Sterile Sets',
    lead: 'Autoclave Batch Trace',
    icon: ShieldCheck,
    category: 'Surgical & Acute'
  },

  // Inpatient Care
  {
    key: 'nursing-floor',
    label: 'IPD & HDU Nursing',
    lead: 'Neuro-Vitals & Log-Roll',
    icon: Droplet,
    category: 'Inpatient Care'
  },
  {
    key: 'physio-rehab',
    label: 'Physio & Spine Rehab',
    lead: 'Ambulation Ladder & SLR',
    icon: Workflow,
    category: 'Inpatient Care'
  },
  {
    key: 'pharmacy-sap',
    label: 'Clinical Pharmacy',
    lead: 'Analgesia & SAP Timing',
    icon: Pill,
    category: 'Inpatient Care'
  },
  {
    key: 'medical-officers',
    label: 'Medical Officers 24x7',
    lead: 'NEWS2 & Inpatient Notes',
    icon: ClipboardList,
    category: 'Inpatient Care'
  },

  // Governance & Hospital
  {
    key: 'clinical-coord',
    label: 'Clinical Coordinators',
    lead: 'Patient Journey Milestones',
    icon: Compass,
    category: 'Governance & Hospital'
  },
  {
    key: 'patient-experience',
    label: 'Patient Experience & PRO',
    lead: 'Escorts & PREMs Voice',
    icon: HeartHandshake,
    category: 'Governance & Hospital'
  },
  {
    key: 'quality-research',
    label: 'Quality & Clinical Research',
    lead: 'NABH KPIs & ODI Score',
    icon: Sparkles,
    badge: 'NABH',
    category: 'Governance & Hospital'
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ activeService, onSelectService }) => {
  const categories = ['Patient Core', 'Surgical & Acute', 'Inpatient Care', 'Governance & Hospital'] as const;

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-slate-200/80 p-2.5 space-y-4 overflow-y-auto hidden lg:block select-none">
      {categories.map(cat => {
        const items = NAV_ITEMS.filter(item => item.category === cat);
        return (
          <div key={cat} className="space-y-0.5">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2.5 py-1">
              {cat}
            </div>
            {items.map(item => {
              const Icon = item.icon;
              const isActive = activeService === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => onSelectService(item.key)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition text-xs ${
                    isActive
                      ? 'bg-blue-50/90 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <div className="truncate">
                      <div className="truncate leading-tight">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5 font-normal">
                        {item.lead}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-medium uppercase shrink-0 ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
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
