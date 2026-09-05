import React from 'react';
import { BrainCircuit, CheckCircle2, ArrowRight, ShieldAlert, Sparkles, Clock } from 'lucide-react';

export default function AIRiskCard({
  riskLevel = "LOW",
  confidence = 0.78,
  riskScore = 22,
  modelStatus = "Model Connected",
  predictionStatus = "Ready",
  lastPrediction = "2 min ago",
  onViewDetails
}) {
  const getRiskDetails = (level) => {
    switch (level) {
      case 'HIGH':
        return {
          textColor: 'text-rose-700',
          badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
          barColor: 'bg-rose-500',
          subtitle: 'Elevated uterine burst frequency & energy density',
        };
      case 'MODERATE':
        return {
          textColor: 'text-amber-700',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
          barColor: 'bg-amber-500',
          subtitle: 'Moderate burst activity detected in 30s analysis window',
        };
      case 'LOW':
      default:
        return {
          textColor: 'text-emerald-700',
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          barColor: 'bg-emerald-500',
          subtitle: 'Baseline uterine tone consistent with term progression',
        };
    }
  };

  const risk = getRiskDetails(riskLevel);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-base font-bold text-slate-800">AI Risk Assessment</h3>
              <p className="text-xs text-slate-500">Preterm Delivery Risk Estimator (EHG Model)</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            {modelStatus}
          </span>
        </div>

        {/* Central Risk Level Display */}
        <div className="my-4 p-4 rounded-lg bg-slate-50 border border-slate-100 text-center">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest block">
            Estimated Risk Level
          </span>
          <div className="flex items-center justify-center gap-2 my-1">
            <span className={`text-3xl sm:text-4xl font-black tracking-tight ${risk.textColor}`}>
              {riskLevel} RISK
            </span>
          </div>
          <p className="text-xs text-slate-500">{risk.subtitle}</p>

          {/* Horizontal Progress Bar / Gauge */}
          <div className="mt-4 max-w-md mx-auto">
            <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
              <span>Model Confidence: {(confidence * 100).toFixed(0)}%</span>
              <span className="font-mono text-slate-400">Risk Index: {riskScore}/100</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${risk.barColor}`}
                style={{ width: `${(confidence * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Low (0-33)</span>
              <span>Moderate (34-66)</span>
              <span>High (67-100)</span>
            </div>
          </div>
        </div>

        {/* Model Telemetry status */}
        <div className="grid grid-cols-2 gap-2 text-xs py-2 border-t border-slate-100 text-slate-600">
          <div className="flex items-center justify-between px-2 py-1 bg-slate-50 rounded">
            <span className="text-slate-400">Pipeline Status:</span>
            <span className="font-medium text-emerald-700">{predictionStatus}</span>
          </div>
          <div className="flex items-center justify-between px-2 py-1 bg-slate-50 rounded">
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Last Run:
            </span>
            <span className="font-medium text-slate-700 font-mono">{lastPrediction}</span>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="mt-3 p-2.5 bg-amber-50/80 border border-amber-200/80 rounded text-[11px] text-amber-900 leading-relaxed">
          <span className="font-semibold block mb-0.5">Research Disclaimer:</span>
          “AI prediction is for research/prototype purposes and does not replace clinical assessment.”
        </div>
      </div>

      {/* Action button */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <button
          onClick={onViewDetails}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <span>View AI Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
