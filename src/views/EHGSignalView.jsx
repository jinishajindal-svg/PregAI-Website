import React from 'react';
import EHGWaveformGraph from '../components/EHGWaveformGraph';
import { Activity, Sliders, ShieldCheck, Cpu, Filter, Zap } from 'lucide-react';

export default function EHGSignalView({
  waveformPoints,
  isStreaming,
  onStartStreaming,
  onPauseStreaming,
  onClearWaveform,
  telemetry,
  signalQuality
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">EHG Signal Analysis</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Dedicated Electrohysterography waveform analysis, bandpass parameters, and electrode diagnostics.
        </p>
      </div>

      {/* Large Live Signal Graph */}
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

      {/* Signal Parameters & Signal Quality in 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 1. Signal Parameters Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Filter className="w-5 h-5 text-teal-600" />
            <div>
              <h3 className="text-base font-bold text-slate-800">Signal Parameters</h3>
              <p className="text-xs text-slate-500">Hardware acquisition and digital filtering specs</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs mt-2">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-600 font-medium">Hardware Sampling Rate:</span>
              <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                500 Hz (ADS1115 Over-sampled)
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-600 font-medium">Research Sampling Rate:</span>
              <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                20 Hz (Decimated / Resampled)
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-600 font-medium">Analysis Window:</span>
              <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                30 seconds (Sliding epoch)
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-600 font-medium">EHG Bandpass Band:</span>
              <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                ~ 0.08 – 4.0 Hz
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-600 font-medium">Feature Extraction Band:</span>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ~ 0.125 – 0.575 Hz (Contraction Core)
              </span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 rounded border border-slate-100 text-[11px] text-slate-500">
            <span className="font-semibold text-slate-700 block mb-0.5">Filtering Pipeline Note:</span>
            Raw signal is digitized by ADS1115 (16-bit, continuous mode), bandpassed via 4th-order Butterworth digital filter, and segmented into 30s sliding windows for AI feature calculation.
          </div>
        </div>

        {/* 2. Signal Quality Breakdown */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <div>
              <h3 className="text-base font-bold text-slate-800">Signal Quality Diagnostics</h3>
              <p className="text-xs text-slate-500">Real-time signal-to-noise and artefact diagnostics</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3 bg-slate-50 rounded border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">SNR</span>
              <div className="text-lg font-bold font-mono text-slate-800 mt-0.5">{signalQuality.snr.value}</div>
              <span className="text-[11px] font-semibold text-emerald-700">Rating: {signalQuality.snr.rating}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Clipping</span>
              <div className="text-lg font-bold font-mono text-slate-800 mt-0.5">{signalQuality.clipping.value}</div>
              <span className="text-[11px] font-semibold text-emerald-700">Rating: {signalQuality.clipping.rating}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Motion</span>
              <div className="text-lg font-bold font-mono text-slate-800 mt-0.5">{signalQuality.motion.value}</div>
              <span className="text-[11px] font-semibold text-emerald-700">Rating: {signalQuality.motion.rating}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Electrode Contact</span>
              <div className="text-lg font-bold text-emerald-700 mt-0.5">GOOD</div>
              <span className="text-[11px] font-semibold text-emerald-700">{signalQuality.electrodeContact.value}</span>
            </div>
          </div>

          {/* Usability Badge */}
          <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Signal Validity Assessment:</span>
            </div>
            <span className="font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600 text-white text-[11px]">
              {signalQuality.overallValidity}
            </span>
          </div>

          <p className="mt-3 text-[11px] text-slate-400 italic">
            * AI analysis is only performed when overall validity remains VALID.
          </p>
        </div>
      </div>
    </div>
  );
}
