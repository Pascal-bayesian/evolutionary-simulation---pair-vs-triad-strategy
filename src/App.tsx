/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Research from './components/Research';
import Simulation from './components/Simulation';
import { Beaker, BookOpen, Settings } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'research' | 'simulation' | 'settings'>('research');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar / Navigation */}
      <nav className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-8 z-10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            T
          </div>
          <span className="font-bold text-xl tracking-tight">TriadSim</span>
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
          <NavButton 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
            icon={<Settings className="w-5 h-5" />}
            label="Parameters"
          />
        </div>

        <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 leading-relaxed">
            Project: Evolutionary Stability of 3-Parent Systems
          </p>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pl-64 min-h-screen">
        <div className="p-8">
          {activeTab === 'research' && <Research />}
          {activeTab === 'simulation' && <Simulation />}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold">Simulation Parameters</h2>
              <p className="text-slate-500">Configure the biological constraints for the alien ecosystem.</p>
              <div className="p-12 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400">
                Settings will be enabled after research phase.
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left ${
        active 
          ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm shadow-indigo-100' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

