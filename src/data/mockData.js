/**
 * PregAI Mock Data
 * 
 * Central mock database for telemetry, patient session, signal features,
 * and physiological EHG waveform generator.
 * 
 * TODO: Replace these mock data structures when connecting to
 * ESP32 hardware, Firebase Realtime Database / Firestore, and the AI model endpoint.
 */

export const INITIAL_PATIENT_SESSION = {
  patientId: "PT-001",
  sessionId: "SESSION-001",
  connected: true,
  monitoringStatus: "Active", // "Active" | "Paused" | "Ended"
  monitoringTimeSeconds: 1122, // 00:18:42
  startDate: "2026-09-02 09:30:00",
  gestationalAgeWeeks: 32.4, // Research context
};

export const INITIAL_TELEMETRY = {
  patientId: "PT-001",
  sessionId: "SESSION-001",
  connected: true,
  samplingRate: 500, // Hardware sampling rate (Hz)
  researchSamplingRate: 20, // Research processed rate (Hz)
  analysisWindowSeconds: 30,
  
  // Real-time metrics
  rms: 0.012, // in Volts
  snr: 8.4, // in dB
  snrStatus: "Good",
  battery: 82, // percentage
  electrodeContact: true, // true = GOOD (green), false = POOR (red)
  motionDetected: false, // false = STABLE, true = MOTION DETECTED
  contractionDetected: false, // "INACTIVE" | "DETECTED" | "VALIDATED"
  contractionState: "INACTIVE",
  
  // Clinical / Prototype Signal Status
  // Possible states: "NORMAL" | "MOTION ARTEFACT" | "SIGNAL POOR" | "ELEVATED TONE" | "CONTRACTION EVENT"
  signalStatus: "NORMAL",
  
  // AI Risk Assessment
  aiRisk: "LOW", // "LOW" | "MODERATE" | "HIGH"
  aiConfidence: 0.78, // 78%
  modelStatus: "Model Connected",
  predictionStatus: "Ready",
  lastPredictionTime: "2 min ago",
  riskScore: 22, // 0-100 scale for gauge/progress bar
};

export const INITIAL_SIGNAL_QUALITY = {
  snr: { value: "8.4 dB", rating: "GOOD", isOk: true },
  clipping: { value: "0.2%", rating: "GOOD", isOk: true },
  motion: { value: "2.0%", rating: "GOOD", isOk: true },
  electrodeContact: { value: "Contact Stable", rating: "GOOD", isOk: true },
  overallValidity: "VALID SIGNAL", // "VALID SIGNAL" | "INVALID SIGNAL"
  usableForAI: true,
  noiseFloor: "0.0018 V",
};

// 13 Extracted EHG Features for the 30-second research analysis window
export const INITIAL_EHG_FEATURES = [
  { name: "RMS", value: "0.0124", unit: "V", category: "Time Domain", description: "Root Mean Square amplitude" },
  { name: "Variance", value: "0.00015", unit: "V²", category: "Time Domain", description: "Power of AC signal component" },
  { name: "Wave Energy", value: "0.0432", unit: "J", category: "Time Domain", description: "Integrated signal energy" },
  { name: "Mean Absolute Value (MAV)", value: "0.0098", unit: "V", category: "Time Domain", description: "Average absolute amplitude" },
  { name: "Peak-to-Peak", value: "0.0782", unit: "V", category: "Time Domain", description: "Difference between extreme peaks" },
  { name: "Line Length", value: "1.4280", unit: "m", category: "Complexity", description: "Cumulative waveform length" },
  { name: "Crest Factor", value: "3.1400", unit: "-", category: "Statistical", description: "Ratio of peak to RMS value" },
  { name: "Median Frequency", value: "0.2800", unit: "Hz", category: "Frequency Domain", description: "Frequency dividing spectrum in half" },
  { name: "Peak Frequency", value: "0.3400", unit: "Hz", category: "Frequency Domain", description: "Dominant frequency peak (EHG band)" },
  { name: "Sample Entropy", value: "1.2800", unit: "-", category: "Non-linear", description: "Signal regularity and complexity" },
  { name: "PSD Peak", value: "0.0089", unit: "V²/Hz", category: "Frequency Domain", description: "Power Spectral Density maximum" },
  { name: "Skewness", value: "0.1200", unit: "-", category: "Statistical", description: "Spectral distribution asymmetry" },
  { name: "Kurtosis", value: "2.8500", unit: "-", category: "Statistical", description: "Tailedness of amplitude distribution" },
];

export const INITIAL_EVENTS_LOG = [
  { id: 1, time: "09:42:15", event: "Monitoring Started", status: "Normal", type: "info" },
  { id: 2, time: "09:45:21", event: "Contraction Activity", status: "Detected", type: "warning" },
  { id: 3, time: "09:47:03", event: "Motion Detected", status: "Warning", type: "warning" },
  { id: 4, time: "09:49:18", event: "Signal Quality", status: "Good", type: "success" },
  { id: 5, time: "09:51:32", event: "AI Assessment", status: "Low Risk", type: "success" },
];

export const MOCK_SESSION_REPORT = {
  patientId: "PT-001",
  sessionId: "SESSION-001",
  sessionDuration: "00:18:42",
  averageRms: "0.0121 V",
  averageSnr: "8.35 dB",
  contractionEventsCount: 2,
  signalQualitySummary: "Good (98.4% Valid data)",
  aiRiskResult: "LOW (78% Confidence)",
  recommendedAction: "Continue routine monitoring as per protocol.",
  samplingRateSummary: "Hardware: 500 Hz | Resampled: 20 Hz",
  operator: "Lab Station 2 (Research Prototype)",
};

export const MOCK_PATIENT_RECORDS = {
  "PT-001": {
    patientId: "PT-001",
    currentSessionId: "SESSION-001",
    monitoringStatus: "Active",
    signalQuality: "Good (SNR 8.4 dB)",
    lastSession: "2026-09-02 09:30",
    aiAssessment: "Low Risk (78%)",
    totalSessions: 3,
    notes: "Electrode placement: Sub-umbilical 4-lead montage. Stable contact.",
  },
  "PT-002": {
    patientId: "PT-002",
    currentSessionId: "SESSION-003",
    monitoringStatus: "Idle",
    signalQuality: "Fair (SNR 6.1 dB)",
    lastSession: "2026-08-30 14:15",
    aiAssessment: "Moderate Risk (64%)",
    totalSessions: 1,
    notes: "Mild baseline wander observed during maternal repositioning.",
  },
  "PT-003": {
    patientId: "PT-003",
    currentSessionId: "SESSION-005",
    monitoringStatus: "Ended",
    signalQuality: "Good (SNR 9.0 dB)",
    lastSession: "2026-08-28 11:00",
    aiAssessment: "Low Risk (85%)",
    totalSessions: 4,
    notes: "Consistent low tone, baseline tone stable.",
  },
};

/**
 * Generate synthetic physiological EHG waveform data.
 * EHG signals consist of:
 * 1. Slow baseline fluctuation (0.02 - 0.05 Hz)
 * 2. Physiological uterine electrical burst during contraction events (~0.2 - 0.4 Hz modulated wave)
 * 3. Low amplitude high-frequency biological/thermal noise
 *
 * @param {number} t - Time in seconds
 * @param {boolean} isContraction - Whether a contraction burst is occurring
 * @returns {number} Amplitude in Volts (typically in range -0.04 to +0.04 V)
 */
export function calculateEHGValue(t, isContraction = false) {
  // Baseline respiratory / abdominal drift (slow sine)
  const baseline = 0.003 * Math.sin(2 * Math.PI * 0.03 * t);
  
  // Baseline quiet uterine tone (~0.15 Hz small oscillations)
  const tone = 0.004 * Math.sin(2 * Math.PI * 0.18 * t + 0.5);

  // Contraction burst envelope (burst frequency ~0.3 Hz within 0.125-0.575 Hz feature band)
  let burst = 0;
  if (isContraction) {
    // Spindle-like amplitude burst
    burst = 0.028 * Math.sin(2 * Math.PI * 0.32 * t) * (0.8 + 0.2 * Math.sin(2 * Math.PI * 0.08 * t));
  } else {
    // Occasional subtle micro-burst
    const periodicBurst = Math.sin(2 * Math.PI * (1 / 45) * t); // peaks every 45s
    if (periodicBurst > 0.85) {
      const envelope = (periodicBurst - 0.85) / 0.15;
      burst = 0.018 * envelope * Math.sin(2 * Math.PI * 0.30 * t);
    }
  }

  // Gaussian-like physiological noise
  const noise = (Math.random() - 0.5) * 0.0035;

  const totalV = baseline + tone + burst + noise;
  return parseFloat(totalV.toFixed(5));
}

/**
 * Generate an initial window of historical points for immediate graph display.
 * @param {number} windowSeconds - Duration of window (e.g. 30 seconds)
 * @param {number} pointsCount - Number of sample points to display (e.g. 60 points)
 */
export function generateInitialEHGWindow(windowSeconds = 30, pointsCount = 60) {
  const points = [];
  const dt = windowSeconds / pointsCount;
  const startTime = 0;

  for (let i = 0; i < pointsCount; i++) {
    const t = parseFloat((startTime + i * dt).toFixed(1));
    // Simulate a gentle contraction burst between 12s and 22s
    const isBurst = t >= 12 && t <= 22;
    points.push({
      time: t,
      timeLabel: `${t}s`,
      amplitude: calculateEHGValue(t, isBurst),
    });
  }
  return points;
}
