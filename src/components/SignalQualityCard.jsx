import React from 'react';
import { CheckCircle2, ShieldCheck, AlertOctagon, HelpCircle, Activity } from 'lucide-react';

export default function SignalQualityCard({ quality }) {
  const {
    snr = { value: "8.4 dB", rating: "GOOD", isOk: true },
    clipping = { value: "0.2%", rating: "GOOD", isOk: true },
    motion = { value: "2.0%", rating: "GOOD", isOk: true },
    electrodeContact = { value: "Contact Stable", rating: "GOOD", isOk: true },
    overallValidity = "VALID SIGNAL",
    usableForAI = true
  } = quality || {};

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <div>
              <h3 className="text-base font-bold text-slate-800">Signal Quality</h3>
              <p className="text-xs text-slate-500">Hardware & Physiological Data Usability Validation</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Overall: {overallValidity}</span>
          </div>
        </div>

        {/* 4 Telemetry Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          {/* SNR */}
          <div className="p-3 bg-slate-50 rounded border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">SNR</span>
            <div className="text-sm font-bold font-mono text-slate-800 mt-0.5">{snr.value}</div>
            <div className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {snr.rating}
            </div>
          </div>

          {/* Clipping */}
          <div className="p-3 bg-slate-50 rounded border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Clipping</span>
            <div className="text-sm font-bold font-mono text-slate-800 mt-0.5">{clipping.value}</div>
            <div className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {clipping.rating}
            </div>
          </div>

          {/* Motion */}
          <div className="p-3 bg-slate-50 rounded border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Motion</span>
            <div className="text-sm font-bold font-mono text-slate-800 mt-0.5">{motion.value}</div>
            <div className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {motion.rating}
            </div>
          </div>

          {/* Electrode Contact */}
          <div className="p-3 bg-slate-50 rounded border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Contact</span>
            <div className="text-sm font-bold font-mono text-slate-800 mt-0.5">GOOD</div>
            <div className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {electrodeContact.value}
            </div>
          </div>
        </div>

        {/* Quality Gate Note */}
        <div className="p-2.5 bg-blue-50/70 border border-blue-200/80 rounded flex items-start gap-2 text-xs text-blue-900">
          <Activity className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">AI Quality Gate: </span>
            <span>Signal quality is acceptable. AI feature extraction and preterm risk prediction are enabled. (If signal degrades below 6 dB SNR or clipping &gt; 5%, AI predictions are automatically held).</span>
          </div>
        </div>
      </div>
    </div>
  );
}
