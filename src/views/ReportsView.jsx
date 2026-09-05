import React, { useState } from 'react';
import { FileText, Download, Printer, CheckCircle2, ShieldCheck, RefreshCw, Layers } from 'lucide-react';
import { exportSessionCSV } from '../services/api';
import { MOCK_SESSION_REPORT } from '../data/mockData';

export default function ReportsView({ patientId, sessionId }) {
  const [report, setReport] = useState(MOCK_SESSION_REPORT);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSuccess, setGeneratedSuccess] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setReport({
        ...MOCK_SESSION_REPORT,
        patientId: patientId || "PT-001",
        sessionId: sessionId || "SESSION-001",
        timestamp: new Date().toLocaleTimeString(),
      });
      setIsGenerating(false);
      setGeneratedSuccess(true);
      setTimeout(() => setGeneratedSuccess(false), 3000);
    }, 600);
  };

  const handleExportCSV = () => {
    exportSessionCSV(report.patientId, report.sessionId);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Session Reports & Data Export</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Summaries of electrohysterography sessions, quality metrics, and research risk estimations.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md text-xs font-semibold shadow-sm transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Compiling...' : 'Generate Report'}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-md text-xs font-semibold shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-md text-xs font-semibold shadow-sm transition-colors"
            title="Print report"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {generatedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Session report successfully updated and validated from telemetry buffer.</span>
        </div>
      )}

      {/* Main Report Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm print:border-none print:shadow-none">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-lg">
              P
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">PregAI Session Summary Report</h3>
              <p className="text-xs text-slate-500">Electrohysterography (EHG) Preterm Risk Prototype</p>
            </div>
          </div>
          <div className="text-right text-xs">
            <span className="text-slate-400 block">Report Generated:</span>
            <span className="font-mono font-medium text-slate-700">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Report Parameters Table */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs divide-y sm:divide-y-0 divide-slate-100">
          <div className="py-2 flex justify-between border-b border-slate-100">
            <span className="text-slate-500 font-medium">Patient ID:</span>
            <span className="font-mono font-bold text-slate-800">{report.patientId}</span>
          </div>

          <div className="py-2 flex justify-between border-b border-slate-100">
            <span className="text-slate-500 font-medium">Session ID:</span>
            <span className="font-mono font-bold text-slate-800">{report.sessionId}</span>
          </div>

          <div className="py-2 flex justify-between border-b border-slate-100">
            <span className="text-slate-500 font-medium">Session Duration:</span>
            <span className="font-mono font-bold text-slate-800">{report.sessionDuration}</span>
          </div>

          <div className="py-2 flex justify-between border-b border-slate-100">
            <span className="text-slate-500 font-medium">Average RMS:</span>
            <span className="font-mono font-bold text-slate-800">{report.averageRms}</span>
          </div>

          <div className="py-2 flex justify-between border-b border-slate-100">
            <span className="text-slate-500 font-medium">Average SNR:</span>
            <span className="font-mono font-bold text-slate-800">{report.averageSnr}</span>
          </div>

          <div className="py-2 flex justify-between border-b border-slate-100">
            <span className="text-slate-500 font-medium">Contraction Events:</span>
            <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              {report.contractionEventsCount} Detected
            </span>
          </div>

          <div className="py-2 flex justify-between border-b border-slate-100">
            <span className="text-slate-500 font-medium">Signal Quality:</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {report.signalQualitySummary}
            </span>
          </div>

          <div className="py-2 flex justify-between border-b border-slate-100">
            <span className="text-slate-500 font-medium">AI Risk Result:</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {report.aiRiskResult}
            </span>
          </div>
        </div>

        {/* Hardware & Sampling Summary */}
        <div className="mt-5 p-3.5 bg-slate-50 rounded border border-slate-200 text-xs">
          <span className="font-bold text-slate-700 block mb-1">Acquisition Setup:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
            <div>Sampling: <span className="font-mono text-slate-800">{report.samplingRateSummary}</span></div>
            <div>Operator Station: <span className="font-mono text-slate-800">{report.operator}</span></div>
          </div>
        </div>

        {/* Prototype Disclaimer */}
        <div className="mt-5 p-3.5 bg-amber-50 rounded border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Regulatory Disclaimer:</span>
            <span>
              This session summary is generated by the PregAI research prototype for electrohysterography signal analysis. It is NOT a diagnostic report, does NOT confirm preterm labor, and must NOT replace medical care by a qualified healthcare professional.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
