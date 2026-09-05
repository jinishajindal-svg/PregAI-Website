import React from 'react';
import { 
  Zap, 
  Wifi, 
  Disc, 
  Activity, 
  Battery, 
  BatteryMedium,
  CheckCircle,
  AlertTriangle,
  Waves
} from 'lucide-react';

export default function TelemetryCards({
  rms = 0.012,
  snr = 8.4,
  snrStatus = "Good",
  electrodeContact = true,
  motionDetected = false,
  contractionState = "INACTIVE", // "INACTIVE" | "DETECTED" | "VALIDATED"
  battery = 82
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* 1. Signal RMS */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Signal RMS</span>
          <Waves className="w-4 h-4 text-teal-600" />
        </div>
        <div className="mt-2">
          <div className="text-xl font-bold font-mono text-slate-800">
            {rms.toFixed(3)} <span className="text-xs font-normal text-slate-500">V</span>
          </div>
          <span className="text-[10px] text-slate-400">Baseline amplitude</span>
        </div>
      </div>

      {/* 2. SNR */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">SNR</span>
          <Zap className="w-4 h-4 text-teal-600" />
        </div>
        <div className="mt-2">
          <div className="text-xl font-bold font-mono text-slate-800">
            {snr.toFixed(1)} <span className="text-xs font-normal text-slate-500">dB</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] font-semibold text-emerald-700">{snrStatus}</span>
          </div>
        </div>
      </div>

      {/* 3. Electrode Contact */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Electrode</span>
          <Disc className={`w-4 h-4 ${electrodeContact ? 'text-emerald-500' : 'text-rose-500'}`} />
        </div>
        <div className="mt-2">
          <div className={`text-base font-bold tracking-wide ${electrodeContact ? 'text-emerald-700' : 'text-rose-600'}`}>
            {electrodeContact ? 'GOOD' : 'POOR CONTACT'}
          </div>
          <span className={`text-[10px] font-medium ${electrodeContact ? 'text-emerald-600' : 'text-rose-500'}`}>
            {electrodeContact ? '4 Leads Impedance OK' : 'Re-attach Lead 2'}
          </span>
        </div>
      </div>

      {/* 4. Motion */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Motion</span>
          <Activity className={`w-4 h-4 ${motionDetected ? 'text-amber-500' : 'text-slate-400'}`} />
        </div>
        <div className="mt-2">
          <div className={`text-base font-bold tracking-wide ${motionDetected ? 'text-amber-600' : 'text-slate-800'}`}>
            {motionDetected ? 'MOTION DETECTED' : 'STABLE'}
          </div>
          <span className="text-[10px] text-slate-400">
            {motionDetected ? 'Artefact filter on' : 'Artifacts minimal'}
          </span>
        </div>
      </div>

      {/* 5. Contraction */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Contraction</span>
          <div className={`w-2.5 h-2.5 rounded-full ${
            contractionState === 'VALIDATED' ? 'bg-indigo-600 animate-ping' :
            contractionState === 'DETECTED' ? 'bg-amber-500' : 'bg-slate-300'
          }`} />
        </div>
        <div className="mt-2">
          <div className={`text-base font-bold tracking-wide ${
            contractionState === 'VALIDATED' ? 'text-indigo-700' :
            contractionState === 'DETECTED' ? 'text-amber-600' : 'text-slate-700'
          }`}>
            {contractionState}
          </div>
          <span className="text-[10px] text-slate-400">
            {contractionState === 'INACTIVE' ? 'Quiescent state' : 'Burst detected in window'}
          </span>
        </div>
      </div>

      {/* 6. Battery */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Battery</span>
          <BatteryMedium className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="mt-2">
          <div className="text-xl font-bold font-mono text-slate-800">
            {battery}%
          </div>
          {/* Progress indicator */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
            <div 
              className="bg-emerald-500 h-1.5 rounded-full" 
              style={{ width: `${battery}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
