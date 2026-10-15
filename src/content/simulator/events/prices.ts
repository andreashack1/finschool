import { bani } from '../../../lib/simulator/money';
/** Educational scenario bands in lei, not measured averages or brand prices. */
export const priceBands = {
  bakery:[3,8], water:[3,6], coffee:[6,15], snack:[5,12], printing:[3,12], supply:[8,25],
  lunch:[16,30], delivery:[32,48], transit:[3,8], ride:[15,30], household:[10,30], care:[12,35],
  accessory:[20,55], cable:[18,40], headphones:[45,100], phone_repair:[100,220], repair:[25,65],
  cinema:[28,45], leisure:[15,35], gift:[20,50], clothing:[40,100], groceries:[25,50],
  digital:[10,35], project:[12,35], sport:[12,30], addon:[5,12], free:[0,0],
} as const;
export type PriceBand = keyof typeof priceBands;
export function bandPrice(band: PriceBand) { const [min,max]=priceBands[band]; return { type:'range' as const,minBani:bani(min*100),maxBani:bani(max*100) }; }
