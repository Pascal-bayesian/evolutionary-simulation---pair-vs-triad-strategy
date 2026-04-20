/**
 * Simulation Engine for Triad vs Pair Evolution
 */

export type EvolutionaryTheory = 'red-queen' | 'mutational';

export interface SimulationState {
  populationSize: number;
  triadCount: number;
  pairCount: number;
  generation: number;
  history: { generation: number; triadRatio: number; pairRatio: number }[];
}

export interface SimulationParams {
  initialPopulation: number;
  triadRatio: number; // 0 to 1
  triadFecundity: number; // Base multiplier for triad offspring survival
  pairFecundity: number; // Base multiplier for pair offspring survival
  searchCostTriad: number; // penalty for finding 2 partners
  searchCostPair: number; // penalty for finding 1 partner
  theory: EvolutionaryTheory;
}

export function runGeneration(state: SimulationState, params: SimulationParams): SimulationState {
  const { triadFecundity, pairFecundity, searchCostTriad, searchCostPair, theory } = params;
  
  // Theory-based fitness adjustments
  let effectiveTriadFecundity = triadFecundity;
  let effectivePairFecundity = pairFecundity;

  if (theory === 'red-queen') {
    // Red Queen: Diversity is king. Triads get a significant survival boost 
    // because they produce more genetically diverse offspring.
    effectiveTriadFecundity *= 1.8; // High diversity bonus
  } else {
    // Mutational: Diminishing returns on purging mutations.
    // Biparental is already very good at this; triparental adds complexity 
    // without proportional benefit.
    effectiveTriadFecundity *= 1.1; // Marginal benefit
  }

  // Calculate effective reproduction rates
  // Triad: 3 individuals -> 1 offspring (each gets 0.33 share)
  // Pair: 2 individuals -> 1 offspring (each gets 0.50 share)
  
  // We model the "Selfish Imperative" by looking at the per-capita gene propagation
  const triadOffspring = (state.triadCount / 3) * effectiveTriadFecundity * (1 - searchCostTriad);
  const pairOffspring = (state.pairCount / 2) * effectivePairFecundity * (1 - searchCostPair);
  
  const totalOffspring = triadOffspring + pairOffspring;
  
  if (totalOffspring === 0) return state;

  // New counts (normalized to maintain population size)
  const nextTriadCount = Math.round((triadOffspring / totalOffspring) * state.populationSize);
  const nextPairCount = state.populationSize - nextTriadCount;
  
  const nextGeneration = state.generation + 1;
  const triadRatio = nextTriadCount / state.populationSize;
  const pairRatio = nextPairCount / state.populationSize;

  return {
    populationSize: state.populationSize,
    triadCount: nextTriadCount,
    pairCount: nextPairCount,
    generation: nextGeneration,
    history: [...state.history, { generation: nextGeneration, triadRatio, pairRatio }]
  };
}

