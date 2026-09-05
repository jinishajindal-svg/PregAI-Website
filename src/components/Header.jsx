import React, { useState } from 'react';
import { Bell, UserCircle, CheckCircle, Wifi, ShieldAlert, X } from 'lucide-react';

export default function Header({ 
  title = "PregAI Dashboard", 
  patientId = "PT-001", 
  sessionId = "SESSION-001",
  isConnected = true,
  onOpenSettings
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "Electrode contact impedance verified (Good)", time: "10m ago" },
    { id: 2, text: "Baseline calibration completed (500Hz)", time: "18m ago" },
    { id: 3, text: "ESP32 ADS1115 telemetry streaming active", time: "25m ago" }
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm relative z-20">
      {/* Title */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
        <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
          Research Prototype v1.0
        </span>
      </div>

      {/* Right side telemetry & tools */}
      <div className="flex items-center gap-4 text-sm">
        {/* Connection status badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Device Connected</span>
        </div>

        {/* Current patient / session ID badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-md border border-slate-200 text-xs font-mono text-slate-700">
          <span className="font-semibold text-slate-900">{patientId}</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600">{sessionId}</span>
        </div>

        {/* Notification button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-md hover:bg-slate-100 text-slate-600 hover:text-slate-900 relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg p-3 z-30">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="text-xs font-bold text-slate-700">Telemetry Notifications</span>
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2 text-xs">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 bg-slate-50 rounded border border-slate-100">
                    <p className="text-slate-700">{n.text}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile / Station icon */}
        <button 
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 p-1.5 rounded-md hover:bg-slate-100 text-slate-700 transition-colors"
          title="Clinical Station Profile"
        >
          <UserCircle className="w-5 h-5 text-slate-600" />
          <span className="hidden lg:inline text-xs font-medium text-slate-700">Lab Station 2</span>
        </button>
      </div>
    </header>
  );
}
