import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  Activity, 
  BrainCircuit, 
  FileText, 
  Sliders, 
  Radio,
  CheckCircle2
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenSettings }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patient', label: 'Patient', icon: User },
    { id: 'ehg-signal', label: 'EHG Signal', icon: Activity },
    { id: 'ai-prediction', label: 'AI Prediction', icon: BrainCircuit },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col justify-between shrink-0 border-r border-slate-800 select-none">
      {/* Brand / Logo */}
      <div>
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              P
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-none">PregAI</h1>
              <p className="text-xs text-slate-400 font-medium mt-1">EHG Pregnancy Monitoring</p>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-3 space-y-1">
          <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Monitoring Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-700/80 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-300' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom section: System Status & Settings */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        {/* System Status summary card */}
        <div className="bg-slate-800/80 p-3 rounded-md text-xs text-slate-300 border border-slate-700/50">
          <div className="flex items-center justify-between font-semibold text-slate-200 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-teal-400" />
              System Status
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-teal-900 text-teal-200">
              Simulated
            </span>
          </div>
          <div className="space-y-1 text-slate-400 text-[11px]">
            <div className="flex justify-between">
              <span>Sensor:</span>
              <span className="text-slate-200 font-mono">ADS1115 (4-Lead)</span>
            </div>
            <div className="flex justify-between">
              <span>DSP Band:</span>
              <span className="text-slate-200 font-mono">0.08–4.0 Hz</span>
            </div>
            <div className="flex justify-between">
              <span>Telemetry:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 inline" /> 20 Hz sync
              </span>
            </div>
          </div>
        </div>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
            Settings
          </span>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
            v1.0-proto
          </span>
        </button>
      </div>
    </aside>
  );
}
