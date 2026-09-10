import React, { useState } from 'react';
import type { PatientDossier } from '../../types';
import { getStaffByUnit } from '../../data/stavyaRoster';
import { 
  Pill, AlertTriangle, Clock, ShieldCheck, CheckCircle2, 
  Sparkles, FileText, UserCheck, Flame, Info, AlertOctagon
} from 'lucide-react';

interface Props {
  patient: PatientDossier;
  onUpdatePatient: (patient: PatientDossier) => void;
}

export const ClinicalPharmacyView: React.FC<Props> = ({ patient, onUpdatePatient }) => {
  const pharmacyStaff = getStaffByUnit('Pharmacy');
  const clinicalPharmacist = { name: 'Preena', desig: 'Clinical Pharmacist (Spine Care)' };

  const [sapGiven, setSapGiven] = useState(patient.surgeryPlan?.sapGiven || false);
  const [activeTab, setActiveTab] = useState<'current' | 'sap' | 'neuropathic' | 'anticoag' | 'counseling'>('current');
  const [newMedName, setNewMedName] = useState('');
  const [newMedDose, setNewMedDose] = useState('');
  const [newMedFreq, setNewMedFreq] = useState('OD');
  const [newMedRoute] = useState('Oral');
  const [reconciled, setReconciled] = useState(false);

  const currentMeds = patient.medications || patient.pharmacy.multimodalPainRegimen.map(m => ({
    name: m,
    dose: 'Standard dose',
    route: 'Oral / IV',
    frequency: 'Protocol scheduled',
    status: 'active' as const
  }));

  const patientAllergies = patient.allergies || patient.pharmacy.allergyAlerts || [];

  const toggleSap = () => {
    const next = !sapGiven;
    setSapGiven(next);
    if (patient.surgeryPlan) {
      onUpdatePatient({
        ...patient,
        surgeryPlan: {
          ...patient.surgeryPlan,
          sapGiven: next,
          sapTiming: next ? 'Given 42m prior to incision (Cefuroxime 1.5g IV)' : undefined
        }
      });
    }
  };

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim()) return;
    const newMed = {
      name: newMedName,
      dose: newMedDose || 'As directed',
      route: newMedRoute,
      frequency: newMedFreq,
      status: 'active' as const
    };
    onUpdatePatient({
      ...patient,
      medications: [...currentMeds, newMed]
    });
    setNewMedName('');
    setNewMedDose('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-extrabold text-slate-900 tracking-wide">
                Clinical Pharmacy & Medication Stewardship
              </h2>
              <p className="text-xs text-slate-600">
                Patient-Centric Multi-Modal Analgesia, Surgical Prophylaxis & Neuro-Spine Pharmacotherapy
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setReconciled(true)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              reconciled
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            {reconciled ? 'Reconciled by Clinical Pharmacist' : 'Verify & Reconcile Meds'}
          </button>
        </div>
      </div>

      {/* Allergies & Safety Alert */}
      {patientAllergies.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3">
          <AlertOctagon className="w-6 h-6 text-rose-600 shrink-0" />
          <div>
            <div className="text-xs font-bold text-rose-800 uppercase tracking-wider">Patient Allergy Watch</div>
            <div className="text-sm font-semibold text-slate-800">
              Documented severe adverse reaction to: <span className="text-rose-700 underline font-bold">{patientAllergies.join(', ')}</span>.
              Cross-sensitivities automatically blocked in prescription engine.
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'current', label: 'Active Inpatient Regimen', count: currentMeds.length },
          { id: 'sap', label: 'Surgical Prophylaxis (SAP)', badge: sapGiven ? 'TIMED OK' : 'PENDING' },
          { id: 'neuropathic', label: 'Spine Neuropathic Ladder' },
          { id: 'anticoag', label: 'DVT Thromboprophylaxis Timing' },
          { id: 'counseling', label: 'Patient Discharge Counseling' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-700 font-bold">
                {tab.count}
              </span>
            )}
            {tab.badge && (
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                tab.badge === 'TIMED OK' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: Current Inpatient Regimen */}
      {activeTab === 'current' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Active Bedside Spine Medication Orders
              </h3>

              <div className="space-y-3">
                {currentMeds.map((med, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">{med.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-semibold">
                          {med.dose}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-medium">
                          {med.route}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-3">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> Frequency: <strong className="text-slate-800">{med.frequency}</strong></span>
                        <span>• Status: <span className="text-emerald-700 font-semibold">Active Inpatient</span></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                        <ShieldCheck className="w-3.5 h-3.5" /> Barcode Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Inpatient Medication */}
              <form onSubmit={handleAddMed} className="mt-6 pt-5 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
                  + Prescribe Additional Spine Protocol Agent
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Medication (e.g., Paracetamol IV)"
                    value={newMedName}
                    onChange={(e) => setNewMedName(e.target.value)}
                    className="sm:col-span-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Dose (e.g., 1000 mg)"
                    value={newMedDose}
                    onChange={(e) => setNewMedDose(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                  />
                  <select
                    value={newMedFreq}
                    onChange={(e) => setNewMedFreq(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="OD">OD (Once daily)</option>
                    <option value="BD">BD (Twice daily)</option>
                    <option value="TDS">TDS (Thrice daily)</option>
                    <option value="QID">QID (Four times)</option>
                    <option value="SOS">SOS (As needed)</option>
                    <option value="Stat">Stat (Immediate)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="mt-3 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Commit Order to e-Prescription
                </button>
              </form>
            </div>
          </div>

          {/* Department Faculty & Pharmacy Team */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Clinical Pharmacy Team
              </h3>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 mb-3">
                <div className="text-xs font-bold text-blue-900">{clinicalPharmacist.name}</div>
                <div className="text-[11px] text-slate-600">{clinicalPharmacist.desig}</div>
                <div className="text-[10px] text-slate-500 mt-1">Dedicated Spine Ward Rounds & Stewardship</div>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {pharmacyStaff.map((staff) => (
                  <div key={staff.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-slate-900">{staff.name}</div>
                      <div className="text-[10px] text-slate-500">{staff.desig}</div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{staff.mobile}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Info className="w-4 h-4" />
                <span className="text-xs font-bold text-slate-900 uppercase">NABH Medication KPI</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero medication administration errors achieved for 180 consecutive days at Stavya Spine.
                High-alert medications (Heparin, Concentrated Electrolytes, Opioids) require dual independent nurse verification before release.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SAP Prophylaxis */}
      {activeTab === 'sap' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Surgical Antimicrobial Prophylaxis (SAP) Timing Lock
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                NABH & Stavya Spine Protocol mandates IV Cefuroxime (1.5g) administered strictly within 
                <strong className="text-blue-700"> 60 minutes prior to surgical skin incision</strong>. Vancomycin (if MRSA colonized/allergic) requires 120 minutes.
              </p>
            </div>

            <button
              onClick={toggleSap}
              className={`px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                sapGiven
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
              }`}
            >
              {sapGiven ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  SAP Administered & Verified
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  Mark SAP Given (OT Induction)
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Primary Regimen</span>
              <div className="text-sm font-bold text-slate-900 mt-1">Cefuroxime 1.5g IV</div>
              <div className="text-xs text-slate-600 mt-1">Single dose over 3-5 mins at anesthesia induction. Redose at 4 hours if surgery prolonged.</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">MRSA / Penicillin Allergy</span>
              <div className="text-sm font-bold text-slate-900 mt-1">Vancomycin 1g IV + Gentamicin 5mg/kg</div>
              <div className="text-xs text-slate-600 mt-1">Infusion initiated 90-120 minutes prior to incision to prevent red-man syndrome.</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Post-Op Discontinuation</span>
              <div className="text-sm font-bold text-slate-900 mt-1">Stop within 24 hours</div>
              <div className="text-xs text-slate-600 mt-1">NABH stewardship rule: Uncomplicated spine instrumentation stops at 24h to prevent C. difficile.</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Neuropathic Pain Ladder */}
      {activeTab === 'neuropathic' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Stavya Spine Multimodal Neuropathic Analgesia</h3>
              <p className="text-xs text-slate-600">Targeted radicular dysesthesia, leg shooting pain, and opioid-sparing protocol</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-blue-700 uppercase mb-1">Step 1: Baseline Anti-inflammatory</div>
              <div className="text-sm font-bold text-slate-900">IV Paracetamol + Etoricoxib</div>
              <div className="text-xs text-slate-600 mt-2">Paracetamol 1000mg q6h + Etoricoxib 90mg OD (Gastro-protected with Pantoprazole 40mg).</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-teal-700 uppercase mb-1">Step 2: Neuropathic Stabilizer</div>
              <div className="text-sm font-bold text-slate-900">Pregabalin 75mg HS / Gabapentin</div>
              <div className="text-xs text-slate-600 mt-2">Blocks voltage-gated Ca2+ channels in dorsal root ganglion; relieves burning radiculopathy.</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-amber-700 uppercase mb-1">Step 3: Centrally Acting Relaxant</div>
              <div className="text-sm font-bold text-slate-900">Thiocolchicoside 4mg / 8mg BD</div>
              <div className="text-xs text-slate-600 mt-2">GABA-A and glycine receptor agonist. Relieves paraspinal muscle spasm after pedicle screw placement.</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-rose-700 uppercase mb-1">Step 4: Breakthrough Rescue</div>
              <div className="text-sm font-bold text-slate-900">IV Tramadol + Ondansetron</div>
              <div className="text-xs text-slate-600 mt-2">50mg slow infusion with anti-emetic. Used only if VAS pain score exceeds 6/10.</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Anticoagulation Timing */}
      {activeTab === 'anticoag' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Spine DVT Chemoprophylaxis Timing Protocol</h3>
              <p className="text-xs text-slate-600">Balancing epidural hematoma risk with deep vein thrombosis prevention</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-950 block font-bold">Absolute Spine Hemostasis Requirement:</strong>
              Do not start LMWH (Enoxaparin 40mg SC) until at least 12-24 hours post-operatively, after neuro-examination is stable and surgical drain output is &lt; 50 mL in past 8 hours.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-blue-700 uppercase mb-2">Mechanical Prophylaxis (Immediate)</div>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                <li>Graduated Compression Stockings (TED hose) applied bilateral pre-induction</li>
                <li>Sequential Compression Devices (Pneumatic SCD) active during prone positioning</li>
                <li>Early bedside ankle pumps and passive knee flexion every 2 hours</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-blue-700 uppercase mb-2">Chemical Prophylaxis (Post-Op Day 1)</div>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                <li>Enoxaparin 40mg (4000 IU) Subcutaneously once daily at 20:00</li>
                <li>If drain removal planned: Hold dose 12 hours prior to drain pull</li>
                <li>Monitor Platelet count for Heparin-Induced Thrombocytopenia (HIT) on Day 4</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Patient Counseling */}
      {activeTab === 'counseling' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            Discharge Medication Counseling & Patient Handover
          </h3>
          <p className="text-xs text-slate-600">
            Plain language instructions prepared by Clinical Pharmacist Preena for {patient.name} and family.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-blue-700 block mb-1">Pain Medicines (Analgesics)</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Take pain medicine with meals to prevent acidity. Do not combine over-the-counter pain pills with prescribed Paracetamol without checking with hospital pharmacy.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-blue-700 block mb-1">Nerve Medication (Pregabalin)</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Take strictly at bedtime. May cause mild initial drowsiness for 2-3 days, which subsides. Do not stop abruptly as nerve tingling may rebound.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-blue-700 block mb-1">Stool Softener (Post-op Bowel)</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lactulose or Cremaffin syrup 15ml at night with warm water. Crucial to prevent straining while bowel habit normalizes after spine surgery.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
