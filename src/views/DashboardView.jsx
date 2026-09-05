import React from 'react';
import PatientSessionCard from '../components/PatientSessionCard';
import EHGWaveformGraph from '../components/EHGWaveformGraph';
import TelemetryCards from '../components/TelemetryCards';
import SignalStatusAlert from '../components/SignalStatusAlert';
import AIRiskCard from '../components/AIRiskCard';
import EHGFeaturesTable from '../components/EHGFeaturesTable';
import SignalQualityCard from '../components/SignalQualityCard';
import RecentEventsTable from '../components/RecentEventsTable';

export default function DashboardView({
  session,
  telemetry,
  signalQuality,
  features,
  events,
  waveformPoints,
  isStreaming,
  onStartStreaming,
  onPauseStreaming,
  onClearWaveform,
  onStartMonitoring,
  onEndSession,
  onSignalStatusChange,
  onNavigateTab
}) {
  return (
    <div className="space-y-5">
      {/* 1. Patient Session Card */}
      <PatientSessionCard
        patientId={session.patientId}
        sessionId={session.sessionId}
        monitoringStatus={session.monitoringStatus}
        elapsedSeconds={session.monitoringTimeSeconds}
        onStartMonitoring={onStartMonitoring}
        onEndSession={onEndSession}
      />

      {/* 2. Main EHG Waveform Card */}
      <EHGWaveformGraph
        data={waveformPoints}
        isPlaying={isStreaming}
        onStart={onStartStreaming}
        onPause={onPauseStreaming}
        onClear={onClearWaveform}
        samplingRate={telemetry.samplingRate}
        researchSamplingRate={telemetry.researchSamplingRate}
        signalQuality={telemetry.snrStatus}
        snr={`${telemetry.snr.toFixed(1)} dB`}
      />

      {/* 3. Real-Time Status Cards (6 cards) */}
      <TelemetryCards
        rms={telemetry.rms}
        snr={telemetry.snr}
        snrStatus={telemetry.snrStatus}
        electrodeContact={telemetry.electrodeContact}
        motionDetected={telemetry.motionDetected}
        contractionState={telemetry.contractionState}
        battery={telemetry.battery}
      />

      {/* 4. Current Signal Status Banner (Large status + disclaimer) */}
      <SignalStatusAlert
        status={telemetry.signalStatus}
        onStatusChange={onSignalStatusChange}
      />

      {/* 5. Two-column layout: AI Risk Assessment & Signal Quality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <AIRiskCard
          riskLevel={telemetry.aiRisk}
          confidence={telemetry.aiConfidence}
          riskScore={telemetry.riskScore}
          modelStatus={telemetry.modelStatus}
          predictionStatus={telemetry.predictionStatus}
          lastPrediction={telemetry.lastPredictionTime}
          onViewDetails={() => onNavigateTab('ai-prediction')}
        />

        <SignalQualityCard quality={signalQuality} />
      </div>

      {/* 6. Extracted EHG Features (Compact 13-feature grid) */}
      <EHGFeaturesTable features={features} />

      {/* 7. Recent Events Audit Log */}
      <RecentEventsTable events={events} />

      {/* Standard Prototype Footer */}
      <footer className="pt-4 pb-6 text-center text-xs text-slate-400 border-t border-slate-200">
        <p className="font-semibold text-slate-500">
          PregAI &bull; Prototype for EHG-based pregnancy risk monitoring
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Not a clinical diagnostic system. Designed for engineering validation and physiological research.
        </p>
      </footer>
    </div>
  );
}
