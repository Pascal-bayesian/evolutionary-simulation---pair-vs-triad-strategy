import React from 'react';
import { BookOpen, HelpCircle, Zap, ShieldAlert, Users, Target } from 'lucide-react';

export default function Research() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          Theoretical Framework
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">The Tri-parental Paradox</h1>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto">
          Why does sexual reproduction stop at two? Exploring the game theory of genetic contribution.
        </p>
      </header>

      {/* Featured Paper Section */}
      <section className="p-8 bg-white rounded-2xl border-2 border-indigo-100 shadow-xl shadow-indigo-50/50 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <BookOpen className="w-32 h-32" />
        </div>
        <div className="flex items-center gap-3 text-indigo-600 font-bold">
          <Target className="w-6 h-6" />
          <h2 className="text-lg uppercase tracking-widest">Key Literature</h2>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-serif italic text-slate-800">"Why Sex? and Why Only in Pairs?"</h3>
          <p className="text-sm text-slate-500 font-medium">Perry, Reny, & Robson (2015)</p>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed">
              The authors argue that a successful theory of sex must satisfy a specific constraint: 
              <span className="text-indigo-600 font-semibold"> It must confer an advantage to biparental sex over asexual reproduction without conferring an even greater advantage to triparental sex.</span>
            </p>
            <blockquote className="border-l-4 border-indigo-200 pl-4 italic text-slate-500 text-sm">
              "To distinguish between theories, we ask: Why are there no triparental species with offspring composed of the genetic material of three individuals?"
            </blockquote>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Theory Comparison */}
        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-tight">
            <Zap className="w-5 h-5 text-amber-500" />
            <h2>The Two Leading Theories</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 text-sm mb-1">1. Red Queen (Parasite Resistance)</h4>
              <p className="text-xs text-slate-600">Genetic diversity helps stay ahead of evolving parasites. If diversity is the goal, 3 parents should be better than 2.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 text-sm mb-1">2. Mutational (Purging Bad Genes)</h4>
              <p className="text-xs text-slate-600">Sex helps combine and eliminate deleterious mutations. The paper suggests this theory might better explain the "Pair" limit.</p>
            </div>
          </div>
        </div>

        {/* The Cheater Problem */}
        <div className="p-6 bg-rose-50 rounded-xl border border-rose-100 space-y-4">
          <div className="flex items-center gap-2 text-rose-900 font-bold uppercase tracking-tight">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <h2>The Selfish Imperative</h2>
          </div>
          <p className="text-sm text-rose-800/80 leading-relaxed">
            In a triad, each parent gets <span className="font-bold">33%</span> of their DNA in the offspring. 
            A "cheater" mutation that allows two individuals to exclude the third and split DNA <span className="font-bold">50/50</span> 
            creates a massive fitness boost for those two individuals.
          </p>
          <div className="p-4 bg-white/50 rounded-lg border border-rose-200 font-mono text-xs text-rose-900">
            Fitness_Gain = (0.50 / 0.33) - 1 = +51.5%
          </div>
          <p className="text-xs text-rose-700 italic">
            Unless the triad offspring is 1.5x more likely to survive than a pair offspring, the triad is evolutionarily unstable.
          </p>
        </div>
      </div>

      <section className="p-8 bg-slate-900 rounded-2xl text-white space-y-8">
        <div className="flex items-center gap-3 font-bold text-indigo-400 uppercase tracking-widest">
          <HelpCircle className="w-6 h-6" />
          <h2>Simulation Objectives</h2>
        </div>
        
        <div className="grid sm:grid-cols-3 gap-6">
          <ObjectiveCard 
            icon={<Users className="w-5 h-5" />}
            title="Stability Test"
            desc="Can a triad population resist a 'Pair' mutation?"
          />
          <ObjectiveCard 
            icon={<Zap className="w-5 h-5" />}
            title="Theory Toggle"
            desc="Compare Red Queen vs Mutational outcomes."
          />
          <ObjectiveCard 
            icon={<Target className="w-5 h-5" />}
            title="Search Costs"
            desc="Model the difficulty of finding 3 vs 2 partners."
          />
        </div>
      </section>
    </div>
  );
}

function ObjectiveCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-3">
      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400 border border-slate-700">
        {icon}
      </div>
      <h3 className="font-bold text-slate-100 text-sm">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

