import React from 'react';
import { X, Sliders, Database, Cpu, Radio, ShieldCheck } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg border border-slate-200 w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-800">PregAI Prototype Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Simulated Hardware Pipeline */}
          <div>
            <span className="font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Cpu className="w-3.5 h-3.5 text-teal-600" />
              Hardware Telemetry Source
            </span>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Active Source:</span>
                <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  Synthetic EHG Generator (v1.0)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">ADC Sampling Rate:</span>
                <span className="font-mono text-slate-800">500 Hz (Simulated ADS1115)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Research Stream Rate:</span>
                <span className="font-mono text-slate-800">20 Hz Downsampled</span>
              </div>
            </div>
          </div>

          {/* Firebase / Backend Placeholder */}
          <div>
            <span className="font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-600" />
              Backend / Firebase Integration Status
            </span>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Firebase Cloud:</span>
                <span className="font-mono text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                  Mock Service (src/services/api.js)
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                To connect real Firebase, add your Firebase Config keys in <code>.env</code> and update <code>src/services/api.js</code> with Firestore/Realtime DB subscriptions.
              </p>
            </div>
          </div>

          {/* Clinical Prototype Notice */}
          <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
            <span className="font-bold block mb-0.5">Prototype Advisory:</span>
            All algorithms and telemetry in this version are configured for laboratory validation. No clinical diagnosis is performed.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded text-xs font-semibold shadow-sm transition-colors"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
}
