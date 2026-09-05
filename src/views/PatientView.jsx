import React, { useState } from 'react';
import { User, Search, Calendar, Activity, BrainCircuit, ShieldCheck, CheckCircle2, History } from 'lucide-react';
import { MOCK_PATIENT_RECORDS } from '../data/mockData';

export default function PatientView({ currentPatientId, onSelectPatient }) {
  const [patientInput, setPatientInput] = useState(currentPatientId || "PT-001");
  const [sessionInput, setSessionInput] = useState("SESSION-001");
  const [activeRecord, setActiveRecord] = useState(MOCK_PATIENT_RECORDS[currentPatientId] || MOCK_PATIENT_RECORDS["PT-001"]);
  const [lookupMessage, setLookupMessage] = useState("");

  const handleLookup = (e) => {
    e.preventDefault();
    const cleanId = patientInput.trim().toUpperCase();
    if (MOCK_PATIENT_RECORDS[cleanId]) {
      setActiveRecord(MOCK_PATIENT_RECORDS[cleanId]);
      setLookupMessage(`Loaded record for ${cleanId}`);
      if (onSelectPatient) {
        onSelectPatient(cleanId, sessionInput);
      }
    } else {
      // Create a temporary mock record for custom ID
      const newRec = {
        patientId: cleanId,
        currentSessionId: sessionInput || "SESSION-NEW",
        monitoringStatus: "Active",
        signalQuality: "Good (SNR 8.1 dB)",
        lastSession: new Date().toISOString().slice(0, 16).replace('T', ' '),
        aiAssessment: "Low Risk (76%)",
        totalSessions: 1,
        notes: "Anonymous prototype subject profile created for hardware session.",
      };
      setActiveRecord(newRec);
      setLookupMessage(`Created temporary research session for ${cleanId}`);
      if (onSelectPatient) {
        onSelectPatient(cleanId, sessionInput);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Title & Intro */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">Patient & Session Management</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage anonymous research subject IDs and active telemetry sessions.
        </p>
      </div>

      {/* Lookup / ID Entry Form */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
          Session Identification
        </h3>

        <form onSubmit={handleLookup} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Patient ID
            </label>
            <input
              type="text"
              value={patientInput}
              onChange={(e) => setPatientInput(e.target.value)}
              placeholder="e.g. PT-001"
              className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
            <span className="text-[10px] text-slate-400 mt-1 block">Quick IDs: PT-001, PT-002, PT-003</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Session ID
            </label>
            <input
              type="text"
              value={sessionInput}
              onChange={(e) => setSessionInput(e.target.value)}
              placeholder="e.g. SESSION-001"
              className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
            <span className="text-[10px] text-slate-400 mt-1 block">Telemetry session identifier</span>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-md shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Load / Set Session</span>
            </button>
          </div>
        </form>

        {lookupMessage && (
          <p className="mt-3 text-xs text-teal-700 font-medium bg-teal-50 p-2 rounded border border-teal-100">
            {lookupMessage}
          </p>
        )}
      </div>

      {/* Patient Overview Cards */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-teal-600" />
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Subject Record: <span className="font-mono text-teal-700">{activeRecord.patientId}</span>
              </h3>
              <p className="text-xs text-slate-500">De-identified clinical research record</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Profile
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Current Monitoring Status */}
          <div className="p-3 bg-slate-50 rounded border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Monitoring Status
            </span>
            <span className="text-base font-bold text-slate-800 block mt-1">
              {activeRecord.monitoringStatus}
            </span>
            <span className="text-[10px] text-slate-400">Real-time ESP32 sync</span>
          </div>

          {/* Current Signal Quality */}
          <div className="p-3 bg-slate-50 rounded border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Current Signal Quality
            </span>
            <span className="text-base font-bold text-emerald-700 block mt-1">
              {activeRecord.signalQuality}
            </span>
            <span className="text-[10px] text-slate-400">Electrode impedance nominal</span>
          </div>

          {/* Last Session */}
          <div className="p-3 bg-slate-50 rounded border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Last Session
            </span>
            <span className="text-sm font-bold font-mono text-slate-800 block mt-1">
              {activeRecord.lastSession}
            </span>
            <span className="text-[10px] text-slate-400">{activeRecord.totalSessions} Total Sessions</span>
          </div>

          {/* AI Assessment */}
          <div className="p-3 bg-slate-50 rounded border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              AI Assessment
            </span>
            <span className="text-base font-bold text-indigo-700 block mt-1">
              {activeRecord.aiAssessment}
            </span>
            <span className="text-[10px] text-slate-400">Research estimation</span>
          </div>
        </div>

        {/* Clinical Research Notes */}
        <div className="p-3 bg-slate-50 rounded border border-slate-100 text-xs">
          <span className="font-semibold text-slate-700 block mb-1">Station Notes:</span>
          <p className="text-slate-600">{activeRecord.notes}</p>
        </div>

        {/* Privacy & Compliance Disclaimer */}
        <div className="p-3 bg-amber-50 rounded border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong className="font-semibold">Privacy Notice: </strong>
            To protect patient confidentiality in this engineering prototype, do not input real names, dates of birth, or sensitive health identifiers. Use strictly coded identifiers (e.g. PT-XXX).
          </p>
        </div>
      </div>
    </div>
  );
}
