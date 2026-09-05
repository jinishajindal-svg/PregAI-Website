import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { Play, Pause, RotateCcw, Activity, Info } from 'lucide-react';

export default function EHGWaveformGraph({
  data = [],
  isPlaying = true,
  onStart,
  onPause,
  onClear,
  samplingRate = 500,
  researchSamplingRate = 20,
  signalQuality = "Good",
  snr = "8.4 dB"
}) {
  // Custom tooltip to show precision amplitude in Volts & microvolts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const val = payload[0].value;
      return (
        <div className="bg-slate-900 text-white p-2 rounded shadow text-xs font-mono border border-slate-700">
          <p className="text-slate-400">Time: <span className="text-white font-semibold">{label}s</span></p>
          <p className="text-teal-400 font-bold">
            EHG: {val > 0 ? `+${val}` : val} V ({(val * 1000).toFixed(2)} mV)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
      {/* Top bar: Title & Playback Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-600" />
          <div>
            <h3 className="text-base font-bold text-slate-800">Live EHG Signal</h3>
            <p className="text-xs text-slate-500">Continuous Electrohysterography Uterine Myometrium Waveform</p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Stream Controls:</span>
          {isPlaying ? (
            <button
              onClick={onPause}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded text-xs font-medium transition-colors"
              title="Pause waveform streaming"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={onStart}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 rounded text-xs font-medium transition-colors"
              title="Resume waveform streaming"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Start</span>
            </button>
          )}

          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-300 rounded text-xs font-medium transition-colors"
            title="Reset waveform buffer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Signal Telemetry Bar above/below the graph */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-3 bg-slate-50 p-2.5 rounded border border-slate-200/80 text-xs">
        <div className="flex items-center justify-between px-2">
          <span className="text-slate-500 font-medium">Hardware Sampling:</span>
          <span className="font-mono font-bold text-slate-800">{samplingRate} Hz</span>
        </div>
        <div className="flex items-center justify-between px-2 border-l border-slate-200">
          <span className="text-slate-500 font-medium">Research Sampling:</span>
          <span className="font-mono font-bold text-teal-700">{researchSamplingRate} Hz</span>
        </div>
        <div className="flex items-center justify-between px-2 border-l border-slate-200">
          <span className="text-slate-500 font-medium">Signal Quality:</span>
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {signalQuality}
          </span>
        </div>
        <div className="flex items-center justify-between px-2 border-l border-slate-200">
          <span className="text-slate-500 font-medium">SNR:</span>
          <span className="font-mono font-bold text-slate-800">{snr}</span>
        </div>
      </div>

      {/* Waveform Chart Area */}
      <div className="w-full h-72 sm:h-80 relative pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={true} />
            <XAxis 
              dataKey="time" 
              domain={['auto', 'auto']}
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickFormatter={(v) => `${Number(v).toFixed(0)}s`}
              unit="s"
              label={{ value: 'Time (seconds)', position: 'insideBottomRight', offset: -5, fontSize: 11, fill: '#94a3b8' }}
            />
            <YAxis 
              domain={[-0.05, 0.05]} 
              ticks={[-0.04, -0.02, 0, 0.02, 0.04]}
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickFormatter={(v) => Number(v).toFixed(2)}
              label={{ value: 'EHG Amplitude (V)', angle: -90, position: 'insideLeft', offset: 15, fontSize: 11, fill: '#94a3b8' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="amplitude"
              stroke="#0d9488" /* Teal-600 medical line */
              strokeWidth={1.75}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Live indicator overlay */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-slate-200 px-2 py-1 rounded text-[11px] font-mono text-slate-600 shadow-sm">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
          <span>{isPlaying ? 'STREAMING' : 'PAUSED'}</span>
        </div>
      </div>

      {/* Physiological notation note */}
      <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-2">
        <span>Bipolar Lead 1 (Sub-umbilical). Filtered Band: 0.08–4.0 Hz.</span>
        <span>ADS1115 16-Bit Resolution (±2.048V FSR)</span>
      </div>
    </div>
  );
}
