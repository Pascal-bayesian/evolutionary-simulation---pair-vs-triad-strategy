import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, TrendingUp, Info, Settings2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SimulationState, SimulationParams, runGeneration, EvolutionaryTheory } from '../lib/simulationEngine';

const DEFAULT_PARAMS: SimulationParams = {
  initialPopulation: 1000,
  triadRatio: 0.8,
  triadFecundity: 1.0,
  pairFecundity: 1.0,
  searchCostTriad: 0.2,
  searchCostPair: 0.05,
  theory: 'mutational'
};

export default function Simulation() {
  const [params, setParams] = useState<SimulationParams>(DEFAULT_PARAMS);
  const [state, setState] = useState<SimulationState>({
    populationSize: DEFAULT_PARAMS.initialPopulation,
    triadCount: Math.round(DEFAULT_PARAMS.initialPopulation * DEFAULT_PARAMS.triadRatio),
    pairCount: Math.round(DEFAULT_PARAMS.initialPopulation * (1 - DEFAULT_PARAMS.triadRatio)),
    generation: 0,
    history: [{ generation: 0, triadRatio: DEFAULT_PARAMS.triadRatio, pairRatio: 1 - DEFAULT_PARAMS.triadRatio }]
  });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning && state.generation < 200) {
      interval = setInterval(() => {
        setState(prev => runGeneration(prev, params));
      }, 100);
    } else {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, state.generation, params]);

  const reset = () => {
    setIsRunning(false);
    setState({
      populationSize: params.initialPopulation,
      triadCount: Math.round(params.initialPopulation * params.triadRatio),
      pairCount: Math.round(params.initialPopulation * (1 - params.triadRatio)),
      generation: 0,
      history: [{ generation: 0, triadRatio: params.triadRatio, pairRatio: 1 - params.triadRatio }]
    });
  };

  const updateParam = (key: keyof SimulationParams, value: any) => {
    setParams(prev => ({ ...prev, [key]: value }));
    setIsRunning(false); // Pause on change
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Evolutionary Sandbox</h1>
          <p className="text-slate-500">Testing the Perry-Reny-Robson hypothesis on triparental stability.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
              isRunning 
                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
            }`}
          >
            {isRunning ? 'Pause' : <><Play className="w-4 h-4 fill-current" /> Run Simulation</>}
          </button>
          <button 
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Controls Panel */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-sm uppercase tracking-wider">
              <Settings2 className="w-4 h-4 text-indigo-600" />
              <h2>Parameters</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Active Theory</label>
                <select 
                  value={params.theory}
                  onChange={(e) => updateParam('theory', e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="mutational">Mutational Theory</option>
                  <option value="red-queen">Red Queen Theory</option>
                </select>
              </div>

              <ParamSlider 
                label="Triad Search Cost" 
                value={params.searchCostTriad} 
                onChange={(v) => updateParam('searchCostTriad', v)} 
                min={0} max={0.5} step={0.01}
              />
              
              <ParamSlider 
                label="Triad Fecundity" 
                value={params.triadFecundity} 
                onChange={(v) => updateParam('triadFecundity', v)} 
                min={0.5} max={2.0} step={0.1}
              />

              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                  <span>Initial Ratio</span>
                  <span>{Math.round(params.triadRatio * 100)}% Triad</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="1" step="0.05"
                  value={params.triadRatio}
                  onChange={(e) => updateParam('triadRatio', parseFloat(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-indigo-900 p-6 rounded-2xl text-white space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase">
              <Info className="w-4 h-4" />
              Theory Insight
            </div>
            <p className="text-xs leading-relaxed text-indigo-100">
              {params.theory === 'red-queen' 
                ? "Red Queen suggests triads might survive if diversity benefits are massive. Notice how triads dominate if fecundity is high."
                : "Mutational theory suggests biparental sex is the 'sweet spot'. Even with high initial counts, triads often collapse due to genetic dilution."}
            </p>
          </div>
        </div>

        {/* Main Visualization Area */}
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Gen" value={state.generation} />
            <StatCard label="Triad %" value={`${(state.history[state.history.length - 1].triadRatio * 100).toFixed(1)}%`} color="text-indigo-600" />
            <StatCard label="Pair %" value={`${(state.history[state.history.length - 1].pairRatio * 100).toFixed(1)}%`} color="text-rose-600" />
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-[450px] relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <h2>Population Trajectory</h2>
              </div>
              <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-indigo-600 rounded-full"></div> Triad</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-rose-600 rounded-full"></div> Pair</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={state.history}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="generation" hide />
                <YAxis domain={[0, 1]} hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                  formatter={(value: number) => [`${(value * 100).toFixed(1)}%`]}
                />
                <Line 
                  type="monotone" 
                  dataKey="triadRatio" 
                  stroke="#4f46e5" 
                  strokeWidth={4} 
                  dot={false}
                  animationDuration={300}
                />
                <Line 
                  type="monotone" 
                  dataKey="pairRatio" 
                  stroke="#e11d48" 
                  strokeWidth={4} 
                  dot={false}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParamSlider({ label, value, onChange, min, max, step }: { label: string, value: number, onChange: (v: number) => void, min: number, max: number, step: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
        <span>{label}</span>
        <span className="text-indigo-600">{value.toFixed(2)}</span>
      </div>
      <input 
        type="range" 
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

function StatCard({ label, value, color = "text-slate-900" }: { label: string, value: string | number, color?: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h3 className={`text-2xl font-black ${color}`}>{value}</h3>
    </div>
  );
}

