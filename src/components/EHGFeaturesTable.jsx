import React from 'react';
import { Layers, SlidersHorizontal, Info } from 'lucide-react';

export default function EHGFeaturesTable({ features = [] }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-teal-600" />
          <div>
            <h3 className="text-base font-bold text-slate-800">EHG Features</h3>
            <p className="text-xs text-slate-500">Biophysical features extracted from active window</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
          <span>Analysis Window: 30 seconds</span>
        </div>
      </div>

      {/* Compact Grid Table */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {features.map((feat, idx) => (
          <div 
            key={idx} 
            className="p-2.5 rounded bg-slate-50/80 border border-slate-100 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 truncate" title={feat.name}>
                {feat.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono bg-white px-1 rounded border border-slate-100">
                {feat.unit}
              </span>
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-sm font-bold font-mono text-slate-800">
                {feat.value}
              </span>
              <span className="text-[9px] text-teal-700 font-medium truncate max-w-[85px]">
                {feat.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Processing Pipeline Footnote */}
      <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Butterworth Bandpass (0.08–4.0 Hz) + Spectral PSD (Welch 20Hz)</span>
        <span>Window updated every 5 seconds</span>
      </div>
    </div>
  );
}
