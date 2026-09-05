import React from 'react';
import { Play, Square, Clock, Activity, ShieldCheck, UserCheck } from 'lucide-react';

export default function PatientSessionCard({
  patientId,
  sessionId,
  monitoringStatus,
  elapsedSeconds,
  onStartMonitoring,
  onEndSession,
}) {
  // Format seconds into HH:MM:SS
  const formatTime = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSec % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const isMonitoring = monitoringStatus === 'Active';

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left: Section Header and Field values */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Patient Session</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-1">
            {/* Patient ID */}
            <div className="bg-slate-50 p-2.5 rounded border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Patient ID</span>
              <span className="text-base font-bold font-mono text-slate-800">{patientId}</span>
            </div>

            {/* Session ID */}
            <div className="bg-slate-50 p-2.5 rounded border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Session ID</span>
              <span className="text-base font-bold font-mono text-slate-800">{sessionId}</span>
            </div>

            {/* Monitoring Status */}
            <div className="bg-slate-50 p-2.5 rounded border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Monitoring Status</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                <span className={`text-base font-semibold ${isMonitoring ? 'text-emerald-700' : 'text-slate-600'}`}>
                  {monitoringStatus}
                </span>
              </div>
            </div>

            {/* Monitoring Time */}
            <div className="bg-slate-50 p-2.5 rounded border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" /> Monitoring Time
              </span>
              <span className="text-base font-bold font-mono text-slate-800 tracking-wider">
                {formatTime(elapsedSeconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 self-start lg:self-center pt-2 lg:pt-0">
          <button
            onClick={onStartMonitoring}
            disabled={isMonitoring}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold shadow-sm transition-colors ${
              isMonitoring
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Monitoring</span>
          </button>

          <button
            onClick={onEndSession}
            disabled={!isMonitoring}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold shadow-sm transition-colors ${
              !isMonitoring
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800'
            }`}
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>End Session</span>
          </button>
        </div>
      </div>
    </div>
  );
}
