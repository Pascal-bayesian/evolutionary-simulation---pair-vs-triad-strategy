import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SimulationState, SimulationParams, runGeneration } from '../lib/simulationEngine';

const DEFAULT_PARAMS: SimulationParams = {
  initialPopulation: 1000,
  triadRatio: 0.9, // Start with mostly triads
  triadFecundity: 1.2, // Triads are slightly better at raising young
  pairFecundity: 1.0,
  searchCostTriad: 0.3, // Harder to find 2 partners
  searchCostPair: 0.05, // Easier to find 1 partner
  mutationRate: 0.01
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
    if (isRunning && state.generation < 100) {
      interval = setInterval(() => {
        setState(prev => runGeneration(prev, params));
      }, 200);
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

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Evolutionary Simulation</h1>
          <p className="text-slate-500">Watch the competition between Triad (3-parent) and Pair (2-parent) strategies.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all ${
              isRunning ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isRunning ? 'Pause' : <><Play className="w-4 h-4" /> Run Simulation</>}
          </button>
          <button 
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Stats Panel */}
        <div className="space-y-6">
          <StatCard 
            label="Generation" 
            value={state.generation} 
            sub={`Pop: ${state.populationSize}`}
          />
          <StatCard 
            label="Triad Strategy" 
            value={`${(state.history[state.history.length - 1].triadRatio * 100).toFixed(1)}%`} 
            color="text-indigo-600"
          />
          <StatCard 
            label="Pair Strategy" 
            value={`${(state.history[state.history.length - 1].pairRatio * 100).toFixed(1)}%`} 
            color="text-rose-600"
          />
        </div>

        {/* Chart Panel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[400px]">
          <div className="flex items-center gap-2 mb-6 font-semibold text-slate-700">
            <TrendingUp className="w-5 h-5" />
            <h2>Population Dynamics</h2>
          </div>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={state.history}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="generation" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Line 
                name="Triad (3-Parent)"
                type="monotone" 
                dataKey="triadRatio" 
                stroke="#4f46e5" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line 
                name="Pair (2-Parent)"
                type="monotone" 
                dataKey="pairRatio" 
                stroke="#e11d48" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
        <h3 className="font-semibold text-indigo-900 mb-2">Current Insight</h3>
        <p className="text-indigo-800 text-sm leading-relaxed">
          {state.history[state.history.length - 1].pairRatio > state.history[state.history.length - 1].triadRatio 
            ? "The 'Pair' strategy is outcompeting the 'Triad' strategy. The 50% genetic contribution per offspring provides a massive advantage over the 33% contribution, despite the triad's higher fecundity."
            : "The 'Triad' strategy is currently holding its own due to high fecundity, but it remains vulnerable to 'cheater' mutations that favor pairing."}
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color = "text-slate-900" }: { label: string, value: string | number, sub?: string, color?: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className={`text-3xl font-bold ${color}`}>{value}</h3>
        {sub && <span className="text-xs text-slate-400 font-mono">{sub}</span>}
      </div>
    </div>
  );
}
