/**
 * PregAI Service & API Layer
 * 
 * This file serves as the abstraction layer between the UI and data sources.
 * In this prototype version, it serves data from src/data/mockData.js.
 * 
 * =========================================================================
 * FUTURE INTEGRATION ROADMAP:
 * 1. ESP32 / ADS1115 Hardware -> Firebase Realtime DB / MQTT WebSocket
 * 2. Firebase / REST API -> getEHGData(), getSignalQuality()
 * 3. Preterm AI Prediction Service (Flask/FastAPI/TensorFlow) -> getAIResult()
 * =========================================================================
 */

import {
  INITIAL_PATIENT_SESSION,
  INITIAL_TELEMETRY,
  INITIAL_SIGNAL_QUALITY,
  INITIAL_EHG_FEATURES,
  INITIAL_EVENTS_LOG,
  MOCK_SESSION_REPORT,
  MOCK_PATIENT_RECORDS,
  generateInitialEHGWindow,
  calculateEHGValue
} from '../data/mockData.js';

/**
 * Fetch patient information and current active session.
 * 
 * TODO: Replace mock data with Firebase/API data:
 * e.g., const doc = await getDoc(doc(db, "patients", patientId));
 */
export async function getPatientData(patientId = "PT-001") {
  // Simulate slight network latency
  await new Promise((res) => setTimeout(res, 50));
  
  const record = MOCK_PATIENT_RECORDS[patientId] || {
    patientId,
    currentSessionId: `SESSION-${Math.floor(100 + Math.random() * 900)}`,
    monitoringStatus: "Active",
    signalQuality: "Good (SNR 8.0 dB)",
    lastSession: "2026-09-02 09:30",
    aiAssessment: "Low Risk (75%)",
    totalSessions: 1,
    notes: "New patient session registered.",
  };

  return {
    ...INITIAL_PATIENT_SESSION,
    ...record,
  };
}

/**
 * Fetch initial EHG waveform buffer.
 * 
 * TODO: Replace mock data with Firebase/API data:
 * e.g., subscribe to Firebase Realtime Database node `/devices/esp32-01/ehg_stream`
 * or WebSocket endpoint `ws://localhost:8000/api/ehg/stream`
 */
export async function getEHGData() {
  await new Promise((res) => setTimeout(res, 50));
  return generateInitialEHGWindow(30, 60);
}

/**
 * Fetch a single live point for continuous streaming.
 * 
 * TODO: Replace with ESP32 ADS1115 ADC data over WebSocket or SSE.
 */
export function getNextEHGPoint(currentSeconds, isContractionActive = false) {
  const amplitude = calculateEHGValue(currentSeconds, isContractionActive);
  return {
    time: parseFloat(currentSeconds.toFixed(1)),
    timeLabel: `${currentSeconds.toFixed(1)}s`,
    amplitude,
  };
}

/**
 * Fetch real-time signal quality metrics.
 * 
 * TODO: Replace mock data with Firebase/API data:
 * Real-time computed SNR and lead-off detection from ESP32/ADS1115 alert registers.
 */
export async function getSignalQuality() {
  await new Promise((res) => setTimeout(res, 40));
  return { ...INITIAL_SIGNAL_QUALITY };
}

/**
 * Fetch AI risk assessment and 30-second window extracted features.
 * 
 * TODO: Replace mock data with AI model inference endpoint:
 * e.g., const res = await fetch('https://api.pregai.org/v1/predict', { method: 'POST', body: JSON.stringify(features) });
 */
export async function getAIResult() {
  await new Promise((res) => setTimeout(res, 60));
  return {
    riskLevel: INITIAL_TELEMETRY.aiRisk,
    confidence: INITIAL_TELEMETRY.aiConfidence,
    riskScore: INITIAL_TELEMETRY.riskScore,
    modelStatus: INITIAL_TELEMETRY.modelStatus,
    predictionStatus: INITIAL_TELEMETRY.predictionStatus,
    lastPredictionTime: INITIAL_TELEMETRY.lastPredictionTime,
    features: [...INITIAL_EHG_FEATURES],
    disclaimer: "AI prediction is for research/prototype purposes and does not replace clinical assessment.",
  };
}

/**
 * Fetch session summary report.
 * 
 * TODO: Replace with database query aggregating recorded session windows.
 */
export async function getSessionReport(sessionId = "SESSION-001") {
  await new Promise((res) => setTimeout(res, 70));
  return {
    ...MOCK_SESSION_REPORT,
    sessionId,
  };
}

/**
 * Fetch recent telemetry events log.
 * 
 * TODO: Replace with Firebase Firestore collection `events`.
 */
export async function getRecentEvents() {
  await new Promise((res) => setTimeout(res, 40));
  return [...INITIAL_EVENTS_LOG];
}

/**
 * Helper to export session data as CSV format.
 * Generates and triggers browser download of mock EHG & telemetry points.
 */
export function exportSessionCSV(patientId = "PT-001", sessionId = "SESSION-001") {
  const headers = [
    "Timestamp_s",
    "EHG_Amplitude_V",
    "RMS_V",
    "SNR_dB",
    "Electrode_Contact",
    "Motion_State",
    "Contraction_State",
    "Signal_Status"
  ];

  const rows = [];
  for (let i = 0; i <= 60; i += 0.5) {
    const isBurst = i >= 20 && i <= 35;
    const amp = calculateEHGValue(i, isBurst);
    rows.push([
      i.toFixed(1),
      amp.toFixed(5),
      (0.012 + (isBurst ? 0.008 : 0)).toFixed(4),
      "8.4",
      "GOOD",
      "STABLE",
      isBurst ? "DETECTED" : "INACTIVE",
      isBurst ? "CONTRACTION EVENT" : "NORMAL"
    ]);
  }

  const csvContent = "data:text/csv;charset=utf-8," 
    + `# PregAI Prototype EHG Export\n# Patient: ${patientId} | Session: ${sessionId} | Date: ${new Date().toISOString()}\n`
    + headers.join(",") + "\n"
    + rows.map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `PregAI_${patientId}_${sessionId}_EHG_Data.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
