/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Research from './components/Research';
import Simulation from './components/Simulation';
import { Beaker, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'research' | 'simulation'>('research');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar / Navigation */}
      <nav className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-8 z-10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">
            T
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight leading-none">TriadSim</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">v1.0.4</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <NavButton 
            active={activeTab === 'research'} 
            onClick={() => setActiveTab('research')}
            icon={<BookOpen className="w-5 h-5" />}
            label="Research"
          />
          <NavButton 
            active={activeTab === 'simulation'} 
            onClick={() => setActiveTab('simulation')}
            icon={<Beaker className="w-5 h-5" />}
            label="Simulation"
          />
        </div>

        <div className="mt-auto p-5 bg-slate-900 rounded-2xl text-white space-y-2">
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Status</p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Theoretical model active. Simulation engine ready for parameters.
          </p>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pl-64 min-h-screen">
        <div className="p-10">
          {activeTab === 'research' && <Research />}
          {activeTab === 'simulation' && <Simulation />}
        </div>
      </main>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 w-full text-left ${
        active 
          ? 'bg-indigo-50 text-indigo-700 font-bold shadow-sm shadow-indigo-100' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'
      }`}
    >
      <div className={`${active ? 'text-indigo-600' : 'text-slate-400'}`}>
        {icon}
      </div>
      <span>{label}</span>
    </button>
  );
}


