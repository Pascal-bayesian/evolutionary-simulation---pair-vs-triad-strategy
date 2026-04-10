/**
 * Simulation Engine for Triad vs Pair Evolution
 */

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
  triadFecundity: number; // multiplier for triad offspring survival
  pairFecundity: number; // multiplier for pair offspring survival
  searchCostTriad: number; // penalty for finding 2 partners
  searchCostPair: number; // penalty for finding 1 partner
  mutationRate: number;
}

export function runGeneration(state: SimulationState, params: SimulationParams): SimulationState {
  const { triadFecundity, pairFecundity, searchCostTriad, searchCostPair } = params;
  
  // Calculate effective reproduction rates
  // Triad: 3 individuals -> 1 offspring (each gets 0.33)
  // Pair: 2 individuals -> 1 offspring (each gets 0.50)
  
  const triadOffspring = (state.triadCount / 3) * triadFecundity * (1 - searchCostTriad);
  const pairOffspring = (state.pairCount / 2) * pairFecundity * (1 - searchCostPair);
  
  const totalOffspring = triadOffspring + pairOffspring;
  
  // New counts (normalized to maintain population size for simplicity in this draft)
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
