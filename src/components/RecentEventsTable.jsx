import React from 'react';
import { History, Clock, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function RecentEventsTable({ events = [] }) {
  const getStatusBadge = (status, type) => {
    switch (type) {
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            {status}
          </span>
        );
      case 'success':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            {status}
          </span>
        );
      case 'info':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <Info className="w-3 h-3 text-slate-500" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-teal-600" />
          <div>
            <h3 className="text-base font-bold text-slate-800">Recent Events</h3>
            <p className="text-xs text-slate-500">Live detection and threshold audit log</p>
          </div>
        </div>
        <span className="text-xs font-mono text-slate-400">{events.length} Logged Entries</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="py-2.5 px-3">Time</th>
              <th className="py-2.5 px-3">Event</th>
              <th className="py-2.5 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.map((ev) => (
              <tr key={ev.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-2.5 px-3 font-mono text-slate-600 font-medium">
                  {ev.time}
                </td>
                <td className="py-2.5 px-3 font-medium text-slate-800">
                  {ev.event}
                </td>
                <td className="py-2.5 px-3 text-right">
                  {getStatusBadge(ev.status, ev.type)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
