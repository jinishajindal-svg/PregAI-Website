import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SettingsModal from './components/SettingsModal';
import DashboardView from './views/DashboardView';
import PatientView from './views/PatientView';
import EHGSignalView from './views/EHGSignalView';
import AIPredictionView from './views/AIPredictionView';
import ReportsView from './views/ReportsView';

import { 
  INITIAL_PATIENT_SESSION, 
  INITIAL_TELEMETRY, 
  INITIAL_SIGNAL_QUALITY, 
  INITIAL_EHG_FEATURES, 
  INITIAL_EVENTS_LOG,
  generateInitialEHGWindow 
} from './data/mockData';
import { getNextEHGPoint } from './services/api';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Patient & Session State
  const [session, setSession] = useState(INITIAL_PATIENT_SESSION);
  const [telemetry, setTelemetry] = useState(INITIAL_TELEMETRY);
  const [signalQuality, setSignalQuality] = useState(INITIAL_SIGNAL_QUALITY);
  const [features, setFeatures] = useState(INITIAL_EHG_FEATURES);
  const [events, setEvents] = useState(INITIAL_EVENTS_LOG);

  // EHG Waveform Streaming State
  const [waveformPoints, setWaveformPoints] = useState(() => generateInitialEHGWindow(30, 60));
  const [isStreaming, setIsStreaming] = useState(true);
  const currentTimeRef = useRef(30.0);

  // Timer for session duration
  useEffect(() => {
    let timer;
    if (session.monitoringStatus === 'Active') {
      timer = setInterval(() => {
        setSession((prev) => ({
          ...prev,
          monitoringTimeSeconds: prev.monitoringTimeSeconds + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [session.monitoringStatus]);

  // Real-time EHG Waveform generator interval
  useEffect(() => {
    let streamInterval;
    if (isStreaming && session.monitoringStatus === 'Active') {
      streamInterval = setInterval(() => {
        currentTimeRef.current += 0.5;
        const currentT = currentTimeRef.current;
        const isContraction = telemetry.signalStatus === 'CONTRACTION EVENT';
        const newPoint = getNextEHGPoint(currentT, isContraction);

        setWaveformPoints((prev) => {
          const next = [...prev.slice(1), newPoint];
          return next;
        });

        // Subtle random telemetry fluctuation to simulate live sensor
        setTelemetry((prev) => {
          const newRms = isContraction 
            ? parseFloat((0.022 + Math.random() * 0.006).toFixed(3))
            : parseFloat((0.011 + (Math.random() - 0.5) * 0.002).toFixed(3));
          return {
            ...prev,
            rms: newRms,
          };
        });
      }, 250); // updates 4 times per second (smooth rendering)
    }
    return () => clearInterval(streamInterval);
  }, [isStreaming, session.monitoringStatus, telemetry.signalStatus]);

  // Waveform controls
  const handleStartStreaming = () => setIsStreaming(true);
  const handlePauseStreaming = () => setIsStreaming(false);
  const handleClearWaveform = () => {
    currentTimeRef.current = 0;
    setWaveformPoints([]);
  };

  // Patient session controls
  const handleStartMonitoring = () => {
    setSession((prev) => ({
      ...prev,
      monitoringStatus: 'Active',
    }));
    setIsStreaming(true);
    setEvents((prev) => [
      {
        id: Date.now(),
        time: new Date().toTimeString().slice(0, 8),
        event: 'Monitoring Resumed',
        status: 'Normal',
        type: 'info'
      },
      ...prev
    ]);
  };

  const handleEndSession = () => {
    setSession((prev) => ({
      ...prev,
      monitoringStatus: 'Ended',
    }));
    setIsStreaming(false);
    setEvents((prev) => [
      {
        id: Date.now(),
        time: new Date().toTimeString().slice(0, 8),
        event: 'Session Ended by Operator',
        status: 'Stopped',
        type: 'warning'
      },
      ...prev
    ]);
  };

  // Signal status simulation toggle
  const handleSignalStatusChange = (newStatus) => {
    const isContraction = newStatus === 'CONTRACTION EVENT';
    const isMotion = newStatus === 'MOTION ARTEFACT';
    const isPoor = newStatus === 'SIGNAL POOR';

    setTelemetry((prev) => ({
      ...prev,
      signalStatus: newStatus,
      contractionState: isContraction ? 'VALIDATED' : 'INACTIVE',
      motionDetected: isMotion,
      electrodeContact: !isPoor,
      snrStatus: isPoor ? 'POOR' : 'Good',
      snr: isPoor ? 4.2 : 8.4,
    }));

    setSignalQuality((prev) => ({
      ...prev,
      overallValidity: isPoor ? 'INVALID SIGNAL' : 'VALID SIGNAL',
      usableForAI: !isPoor,
    }));

    setEvents((prev) => [
      {
        id: Date.now(),
        time: new Date().toTimeString().slice(0, 8),
        event: `Signal State Changed: ${newStatus}`,
        status: isPoor ? 'Warning' : 'Normal',
        type: isPoor ? 'warning' : 'info'
      },
      ...prev
    ]);
  };

  const handleSelectPatient = (patientId, sessionId) => {
    setSession((prev) => ({
      ...prev,
      patientId,
      sessionId: sessionId || prev.sessionId,
    }));
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'patient':
        return 'Patient & Session Info';
      case 'ehg-signal':
        return 'EHG Signal Waveform';
      case 'ai-prediction':
        return 'AI Risk Assessment';
      case 'reports':
        return 'Session Reports & Export';
      case 'dashboard':
      default:
        return 'PregAI Dashboard';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 text-slate-900 antialiased font-sans">
      {/* 1. Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* 2. Top Header */}
        <Header
          title={getPageTitle()}
          patientId={session.patientId}
          sessionId={session.sessionId}
          isConnected={session.connected}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <DashboardView
              session={session}
              telemetry={telemetry}
              signalQuality={signalQuality}
              features={features}
              events={events}
              waveformPoints={waveformPoints}
              isStreaming={isStreaming}
              onStartStreaming={handleStartStreaming}
              onPauseStreaming={handlePauseStreaming}
              onClearWaveform={handleClearWaveform}
              onStartMonitoring={handleStartMonitoring}
              onEndSession={handleEndSession}
              onSignalStatusChange={handleSignalStatusChange}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'patient' && (
            <PatientView
              currentPatientId={session.patientId}
              onSelectPatient={handleSelectPatient}
            />
          )}

          {activeTab === 'ehg-signal' && (
            <EHGSignalView
              waveformPoints={waveformPoints}
              isStreaming={isStreaming}
              onStartStreaming={handleStartStreaming}
              onPauseStreaming={handlePauseStreaming}
              onClearWaveform={handleClearWaveform}
              telemetry={telemetry}
              signalQuality={signalQuality}
            />
          )}

          {activeTab === 'ai-prediction' && (
            <AIPredictionView
              telemetry={telemetry}
              features={features}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView
              patientId={session.patientId}
              sessionId={session.sessionId}
            />
          )}
        </main>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
