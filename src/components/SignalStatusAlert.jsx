import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

export default function SignalStatusAlert({ 
  status = "NORMAL",
  onStatusChange 
}) {
  // Color configuration depending on prototype signal status
  const getStatusConfig = (s) => {
    switch (s) {
      case 'NORMAL':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          textColor: 'text-emerald-800',
          badgeBg: 'bg-emerald-600',
          desc: 'Electrode impedance and physiological baseline are within expected limits. Signal is stable.',
          icon: CheckCircle2,
        };
      case 'CONTRACTION EVENT':
        return {
          bg: 'bg-indigo-50',
          border: 'border-indigo-200',
          textColor: 'text-indigo-900',
          badgeBg: 'bg-indigo-600',
          desc: 'Electrical burst in 0.125–0.575 Hz bandwidth detected matching myometrial contraction profile.',
          icon: Activity,
        };
      case 'MOTION ARTEFACT':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          textColor: 'text-amber-900',
          badgeBg: 'bg-amber-600',
          desc: 'Sudden high amplitude baseline shift detected. Motion filter actively damping spurious transients.',
          icon: AlertTriangle,
        };
      case 'ELEVATED TONE':
        return {
          bg: 'bg-sky-50',
          border: 'border-sky-200',
          textColor: 'text-sky-900',
          badgeBg: 'bg-sky-600',
          desc: 'Sustained basal electrical activity observed above the resting baseline RMS threshold.',
          icon: AlertCircle,
        };
      case 'SIGNAL POOR':
      default:
        return {
          bg: 'bg-rose-50',
          border: 'border-rose-200',
          textColor: 'text-rose-900',
          badgeBg: 'bg-rose-600',
          desc: 'High noise floor or electrode lead disconnect. AI analysis suspended until lead impedance recovers.',
          icon: AlertTriangle,
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  const demoStatuses = [
    'NORMAL',
    'CONTRACTION EVENT',
    'MOTION ARTEFACT',
    'ELEVATED TONE',
    'SIGNAL POOR'
  ];

  return (
    <div className={`rounded-lg border ${config.border} ${config.bg} p-5 shadow-sm transition-all`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Section title, large status & description */}
        <div className="flex items-start gap-3.5">
          <div className={`p-2.5 rounded-lg ${config.badgeBg} text-white shrink-0 mt-0.5 shadow-sm`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Current Signal Status
              </span>
            </div>
            
            {/* Large Prominent Status */}
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight mt-0.5 ${config.textColor}`}>
              {status}
            </h2>
            
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              {config.desc}
            </p>

            {/* Mandatory Medical Prototype Disclaimer */}
            <p className="text-[11px] font-medium text-slate-500 mt-2 italic flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              “Prototype signal status — not a clinical diagnosis.”
            </p>
          </div>
        </div>

        {/* Right: Interactive demo status switcher (allows testing all prototype states) */}
        {onStatusChange && (
          <div className="flex flex-col items-start md:items-end gap-1.5 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Simulation Status Switcher:</span>
            <div className="flex flex-wrap gap-1.5">
              {demoStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusChange(s)}
                  className={`px-2 py-1 text-[11px] font-medium rounded transition-colors ${
                    status === s
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
