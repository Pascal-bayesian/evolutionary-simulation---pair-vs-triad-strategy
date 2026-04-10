import React from 'react';
import { BookOpen, HelpCircle, Zap, ShieldAlert, Users } from 'lucide-react';

export default function Research() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Research & Theoretical Framework</h1>
        <p className="text-slate-500 text-lg">Exploring the evolutionary stability of multi-parent reproductive systems.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold">
            <BookOpen className="w-5 h-5" />
            <h2>Existing Literature</h2>
          </div>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>
              <strong className="text-slate-900">Anisogamy Evolution (PBS Model):</strong> 
              Parker, Baker, and Smith (1972) explained why two sexes (large eggs, small sperm) are stable. 
              Intermediate gametes are outcompeted by specialists.
            </li>
            <li>
              <strong className="text-slate-900">Mating Types:</strong> 
              Many fungi have thousands of mating types, but reproduction is almost always binary. 
              Why? To minimize mitochondrial conflict and search costs.
            </li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-600 font-semibold">
            <ShieldAlert className="w-5 h-5" />
            <h2>The "Cheater" Problem</h2>
          </div>
          <p className="text-sm text-slate-600">
            In a 3-parent system, each parent contributes 33.3% DNA. 
            If two individuals "cheat" and form a pair, they contribute 50% DNA each.
          </p>
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 text-xs text-amber-800 font-mono">
            Fitness(Triad) = 0.33 * F_triad <br />
            Fitness(Pair) = 0.50 * F_pair
          </div>
          <p className="text-xs text-slate-500 italic">
            Unless F_triad is at least 1.5x greater than F_pair, the pair strategy is mathematically superior.
          </p>
        </div>
      </section>

      <section className="p-6 bg-slate-900 rounded-xl text-white space-y-6">
        <div className="flex items-center gap-2 font-semibold text-indigo-400">
          <HelpCircle className="w-5 h-5" />
          <h2>Clarifying Questions for Simulation Design</h2>
        </div>
        
        <div className="grid gap-4">
          <QuestionItem 
            icon={<Users className="w-4 h-4" />}
            title="Search Costs"
            desc="How do individuals find each other? Is finding 2 partners significantly harder than finding 1? (Search cost p³ vs p²)"
          />
          <QuestionItem 
            icon={<Zap className="w-4 h-4" />}
            title="Resource Contribution"
            desc="Does the 3rd parent provide extra resources (food, protection) that significantly increase offspring survival?"
          />
          <QuestionItem 
            icon={<ShieldAlert className="w-4 h-4" />}
            title="Gamete Specialization"
            desc="Are there 3 distinct 'sexes' (e.g., Egg-layer, Sperm-A, Sperm-B) or is it a symmetric 3-way merger?"
          />
        </div>
      </section>

      <div className="flex justify-center p-8">
        <div className="text-center space-y-4">
          <p className="text-slate-600 max-w-md">
            "We aren't just reinventing the wheel; we're testing if a three-wheeled car can outrun a bicycle in a world where everyone wants to keep as much of the car as possible."
          </p>
        </div>
      </div>
    </div>
  );
}

function QuestionItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
      <div className="mt-1 text-indigo-400">{icon}</div>
      <div className="space-y-1">
        <h3 className="font-medium text-slate-100">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
