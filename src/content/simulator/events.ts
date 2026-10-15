import type { EventDefinition, SimulatorEventSource } from '../../lib/simulator/types';

export const simulatorEvents = [] satisfies readonly EventDefinition[];
export const simulatorEventSource: SimulatorEventSource = { getDefinitions: () => simulatorEvents };
