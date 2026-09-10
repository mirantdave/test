import React, { useState } from 'react';
import { MOCK_PATIENTS } from './data/mockPatients';
import type { PatientDossier } from './types';
import { Header } from './components/layout/Header';
import { Sidebar, type ActiveService } from './components/layout/Sidebar';
import { PatientHeroBanner } from './components/patient/PatientHeroBanner';
import { InteractiveSpineVisualizer } from './components/patient/InteractiveSpineVisualizer';
import { PatientFamilyPortal } from './components/patient/PatientFamilyPortal';
import { WifiTestingModal } from './components/wifi/WifiTestingModal';

// Clinical Services
import { SpineSurgeryView } from './components/services/SpineSurgeryView';
import { AnesthesiaPacView } from './components/services/AnesthesiaPacView';
import { OperatingTheatresView } from './components/services/OperatingTheatresView';
import { RadiologyPacsView } from './components/services/RadiologyPacsView';
import { NursingFloorView } from './components/services/NursingFloorView';
import { PhysioRehabView } from './components/services/PhysioRehabView';
import { ClinicalPharmacyView } from './components/services/ClinicalPharmacyView';
import { ClinicalCoordinationView } from './components/services/ClinicalCoordinationView';
import { MedicalOfficersView } from './components/services/MedicalOfficersView';
import { CssdSterileView } from './components/services/CssdSterileView';
import { PatientExperienceView } from './components/services/PatientExperienceView';
import { QualityResearchView } from './components/services/QualityResearchView';
import { BedBoardView } from './components/ward/BedBoardView';

import { PlusCircle, X, Sparkles, Stethoscope, Bed, Check } from 'lucide-react';

export const App: React.FC = () => {
  const [patients, setPatients] = useState<PatientDossier[]>(MOCK_PATIENTS);
  const [activePatientId, setActivePatientId] = useState<string>(MOCK_PATIENTS[0].id);
  const [activeService, setActiveService] = useState<ActiveService>('patient-360');
  const [isPatientMode, setIsPatientMode] = useState<boolean>(false);
  const [isWifiModalOpen, setIsWifiModalOpen] = useState<boolean>(false);
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState<boolean>(false);

  // New Patient Form state
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState(48);
  const [newPatientGender, setNewPatientGender] = useState<'Male' | 'Female'>('Male');
  const [newPatientBlood, setNewPatientBlood] = useState('O+');
  const [newPatientDiagnosis, setNewPatientDiagnosis] = useState('L4-L5 Lumbar Canal Stenosis with Sciatica');
  const [newPatientRoom, setNewPatientRoom] = useState('405');
  const [newPatientFloor, setNewPatientFloor] = useState<'3rd Floor HDU' | '4th Floor Ward' | '5th Floor Special' | '6th Floor Deluxe'>('4th Floor Ward');

  const activePatient = patients.find(p => p.id === activePatientId) || patients[0];

  const handleUpdatePatient = (updated: PatientDossier) => {
    setPatients(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleUpdatePainScore = (newScore: number) => {
    handleUpdatePatient({
      ...activePatient,
      vasPainScore: newScore
    });
  };

  const handleSelectPatient = (patient: PatientDossier) => {
    setActivePatientId(patient.id);
  };

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName.trim()) return;

    const newUHID = `STAV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newIPD = `IPD-26-${Math.floor(100 + Math.random() * 900)}`;

    const newEntry: PatientDossier = {
      ...activePatient,
      id: `p-${Date.now()}`,
      name: newPatientName,
      age: newPatientAge,
      gender: newPatientGender,
      bloodGroup: newPatientBlood,
      uhid: newUHID,
      ipdNumber: newIPD,
      admitDate: 'Today (Emergency Admission)',
      roomBed: `Room ${newPatientRoom}`,
      floor: newPatientFloor,
      currentStage: 'OPD Evaluation',
      chiefDiagnosis: newPatientDiagnosis,
      primarySpineLevels: ['L4', 'L5'],
      vasPainScore: 7,
      oswestryDisabilityIndex: 58,
      eq5dHealthScore: 0.42,
    };

    setPatients([newEntry, ...patients]);
    setActivePatientId(newEntry.id);
    setIsNewPatientModalOpen(false);
    setNewPatientName('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white font-sans">
      {/* Universal Top Header */}
      <Header
        patients={patients}
        activePatient={activePatient}
        onSelectPatient={handleSelectPatient}
        isPatientMode={isPatientMode}
        onTogglePatientMode={() => setIsPatientMode(!isPatientMode)}
        onOpenWifiModal={() => setIsWifiModalOpen(true)}
        onOpenNewPatientModal={() => setIsNewPatientModalOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto overflow-hidden">
        {/* Sidebar Nav (Only in Clinician Mode) */}
        {!isPatientMode && (
          <Sidebar
            activeService={activeService}
            onSelectService={setActiveService}
          />
        )}

        {/* Dynamic Content Region */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          {/* Patient 360 Hero Banner: Always visible to anchor care around this exact human */}
          <PatientHeroBanner
            patient={activePatient}
            onUpdatePainScore={handleUpdatePainScore}
            onNavigateToService={(serviceKey) => setActiveService(serviceKey as ActiveService)}
          />

          {/* Dual Operating Modes */}
          {isPatientMode ? (
            /* PATIENT & FAMILY COMPANION PORTAL MODE */
            <PatientFamilyPortal
              patient={activePatient}
              onUpdatePainScore={handleUpdatePainScore}
            />
          ) : (
            /* CLINICIAN COMMAND CENTER MODE */
            <div className="space-y-6">
              {activeService === 'patient-360' && (
                <InteractiveSpineVisualizer
                  patient={activePatient}
                />
              )}

              {activeService === 'spine-surgery' && (
                <SpineSurgeryView
                  patient={activePatient}
                  onUpdatePatient={handleUpdatePatient}
                />
              )}

              {activeService === 'anesthesia-pac' && (
                <AnesthesiaPacView
                  patient={activePatient}
                  onUpdatePatient={handleUpdatePatient}
                />
              )}

              {activeService === 'radiology-pacs' && (
                <RadiologyPacsView
                  patient={activePatient}
                  onUpdatePatient={handleUpdatePatient}
                />
              )}

              {activeService === 'operating-theatres' && (
                <OperatingTheatresView
                  patient={activePatient}
                  onUpdatePatient={handleUpdatePatient}
                />
              )}

              {activeService === 'nursing-floor' && (
                <NursingFloorView
                  patient={activePatient}
                  onUpdatePatient={handleUpdatePatient}
                />
              )}

              {activeService === 'physio-rehab' && (
                <PhysioRehabView
                  patient={activePatient}
                  onUpdatePatient={handleUpdatePatient}
                />
              )}

              {activeService === 'pharmacy-sap' && (
                <ClinicalPharmacyView
                  patient={activePatient}
                  onUpdatePatient={handleUpdatePatient}
                />
              )}

              {activeService === 'clinical-coord' && (
                <ClinicalCoordinationView
                  patient={activePatient}
                  onUpdatePatient={handleUpdatePatient}
                />
              )}

              {activeService === 'medical-officers' && (
                <MedicalOfficersView
                  patient={activePatient}
                  onUpdatePatient={handleUpdatePatient}
                />
              )}

              {activeService === 'cssd-sterile' && (
                <CssdSterileView
                  patient={activePatient}
                />
              )}

              {activeService === 'patient-experience' && (
                <PatientExperienceView
                  patient={activePatient}
                />
              )}

              {activeService === 'quality-research' && (
                <QualityResearchView
                  patient={activePatient}
                />
              )}

              {activeService === 'ward-bed-board' && (
                <BedBoardView
                  patients={patients}
                  activePatient={activePatient}
                  onSelectPatient={handleSelectPatient}
                />
              )}
            </div>
          )}
        </main>
      </div>

      {/* Wi-Fi QR & Local Network Test Modal */}
      <WifiTestingModal
        isOpen={isWifiModalOpen}
        onClose={() => setIsWifiModalOpen(false)}
      />

      {/* Fast-Track Emergency Spine Admission Modal */}
      {isNewPatientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white border border-blue-200 rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-slate-900">
            <button
              onClick={() => setIsNewPatientModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Fast-Track Spine Inpatient Admission</h3>
                <p className="text-xs text-slate-500">Instantly generate a complete clinical spine dossier</p>
              </div>
            </div>

            <form onSubmit={handleCreatePatient} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  placeholder="e.g., Jayantilal H. Patel"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Age</label>
                  <input
                    type="number"
                    value={newPatientAge}
                    onChange={(e) => setNewPatientAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Gender</label>
                  <select
                    value={newPatientGender}
                    onChange={(e) => setNewPatientGender(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Blood Group</label>
                  <select
                    value={newPatientBlood}
                    onChange={(e) => setNewPatientBlood(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Spine Diagnosis</label>
                <input
                  type="text"
                  value={newPatientDiagnosis}
                  onChange={(e) => setNewPatientDiagnosis(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Ward Floor</label>
                  <select
                    value={newPatientFloor}
                    onChange={(e) => setNewPatientFloor(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="3rd Floor HDU">3rd Floor HDU</option>
                    <option value="4th Floor Ward">4th Floor Ward</option>
                    <option value="5th Floor Special">5th Floor Special</option>
                    <option value="6th Floor Deluxe">6th Floor Deluxe</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Room / Bed No.</label>
                  <input
                    type="text"
                    value={newPatientRoom}
                    onChange={(e) => setNewPatientRoom(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Confirm & Open Dossier
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewPatientModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
