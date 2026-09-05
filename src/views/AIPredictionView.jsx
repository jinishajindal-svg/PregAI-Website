import React from 'react';
import { BrainCircuit, Sparkles, CheckCircle2, ShieldAlert, Cpu, Layers, HelpCircle, Code } from 'lucide-react';
import EHGFeaturesTable from '../components/EHGFeaturesTable';

export default function AIPredictionView({ telemetry, features }) {
  const isLow = telemetry.aiRisk === "LOW";
  const isMod = telemetry.aiRisk === "MODERATE";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">AI Risk Assessment Details</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Research inference pipeline predicting preterm delivery risk from electrohysterography feature vectors.
        </p>
      </div>

      {/* Main AI Risk Assessment Banner */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 text-indigo-600">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI-Estimated Risk Level</span>
              <h3 className={`text-3xl font-black ${isLow ? 'text-emerald-700' : isMod ? 'text-amber-700' : 'text-rose-700'}`}>
                {telemetry.aiRisk} RISK
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="bg-slate-50 px-3 py-2 rounded border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Model Status</span>
              <span className="font-semibold text-emerald-700">{telemetry.modelStatus}</span>
            </div>
            <div className="bg-slate-50 px-3 py-2 rounded border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Prediction Engine</span>
              <span className="font-semibold text-slate-800 font-mono">XGBoost / EHG-Net v1</span>
            </div>
          </div>
        </div>

        {/* Confidence progress */}
        <div className="my-5 max-w-xl">
          <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
            <span>Model Prediction Confidence: {(telemetry.aiConfidence * 100).toFixed(0)}%</span>
            <span className="text-slate-400 font-mono">Index Score: {telemetry.riskScore}/100</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${isLow ? 'bg-emerald-500' : isMod ? 'bg-amber-500' : 'bg-rose-500'}`}
              style={{ width: `${telemetry.aiConfidence * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Mandatory Research Disclaimer Box */}
        <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
          <div className="flex items-center gap-2 font-bold mb-1">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <span>CRITICAL RESEARCH DISCLAIMER</span>
          </div>
          <p>
            <strong>“AI prediction is for research/prototype purposes and does not replace clinical assessment.”</strong>
            <br />
            Terminology Notice: This system produces an <em>“AI-estimated risk level”</em>. It does NOT confirm preterm labor or make clinical diagnoses. All findings must be evaluated by licensed medical personnel.
          </p>
        </div>
      </div>

      {/* Extracted Features Window */}
      <EHGFeaturesTable features={features} />

      {/* Model & Hardware Pipeline Architecture Notes */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Code className="w-5 h-5 text-teal-600" />
          <div>
            <h3 className="text-base font-bold text-slate-800">Future AI Pipeline Integration</h3>
            <p className="text-xs text-slate-500">API endpoint connection points for machine learning model</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-700 block mb-1">1. Feature Extraction</span>
            <p className="text-slate-600">
              30s EHG sliding window sampled at 20 Hz calculates 13 time, frequency, and entropy metrics via DSP workers.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-700 block mb-1">2. Inference Service</span>
            <p className="text-slate-600">
              Payload posted to Python/FastAPI endpoint or TensorFlow.js runtime connected via <code>src/services/api.js</code>.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-700 block mb-1">3. Risk Classification</span>
            <p className="text-slate-600">
              Multi-class risk probabilities (LOW, MODERATE, HIGH) returned with calibrated confidence and feature attribution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
