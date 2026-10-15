import { definitionSchema, type EventDefinitionV1, type EventPolicy } from './types';
import { lifeFamilies, knownStateFlags, knownEffectFamilies } from './life-taxonomy';
import { costBaniSchema } from '../money';

/** Strict data validation; no executable rules or content expressions. */
export function validateCatalog(input: unknown): EventDefinitionV1[] {
  if (!Array.isArray(input)) throw new Error('Catalog invalid');
  const definitions = input.map(e => definitionSchema.parse(e));
  const ids = new Set<string>(), variations = new Set<string>(), options = new Set<string>(), families = new Set<string>();
  for (const definition of definitions) {
    if (ids.has(definition.id) || (!definition.life && families.has(definition.familyId))) throw new Error('Duplicate definition/family');
    if (definition.life && !lifeFamilies.some(f => f === definition.familyId)) throw new Error('Unknown family');
    if (definition.life) {
      const rules = [definition.rules.state,...definition.variations.flatMap(v=>[v.additionalRules?.state,...v.options.map(o=>o.state)])];
      for (const rule of rules) if (rule) {
        if ([...(rule.requiredFlags??[]),...(rule.excludedFlags??[])].some(k=>!knownStateFlags.some(f=>f===k))) throw new Error('Unknown state flag');
        if ([...(rule.requiredEffects??[]),...(rule.excludedEffects??[])].some(k=>!knownEffectFamilies.some(f=>f===k))) throw new Error('Unknown state effect');
      }
      for (const c of definition.variations.flatMap(v=>v.options.flatMap(o=>o.consequences??[]))) {
        if ((c.type==='set_flag'||c.type==='clear_flag') && !knownStateFlags.some(k=>k===c.key)) throw new Error('Unknown consequence flag');
        if (c.type==='add_effect' && !knownEffectFamilies.some(k=>k===c.familyKey)) throw new Error('Unknown consequence effect');
        if (c.type==='remove_effect' && 'familyKey' in c.target && !knownEffectFamilies.some(k=>k===('familyKey' in c.target ? c.target.familyKey : ''))) throw new Error('Unknown consequence effect');
      }
      if (definition.life.weekdaysOnly && definition.life.opportunities.some(o=>o.startsWith('weekend'))) throw new Error('Impossible profile window');
      if (definition.life.opportunities.some(o=>o==='morning_break'||o==='midday_break') && definition.variations.some(v=>v.options.some(o=>o.durationMinutes>0))) throw new Error('Activity overlaps program');
    }
    ids.add(definition.id); families.add(definition.familyId);
    if (new Set(definition.allowedWindows).size !== definition.allowedWindows.length) throw new Error('Duplicate windows');
    for (const variation of definition.variations) {
      if (variations.has(variation.id)) throw new Error('Duplicate variation');
      variations.add(variation.id);
      if(new Set(variation.options.map(o=>o.label)).size!==variation.options.length)throw new Error('Duplicate option labels');
      if(variation.presentation?.bullets.some(b=>b.costOptionId && !variation.options.some(o=>o.id===b.costOptionId)))throw new Error('Unknown presentation price reference');
      const fallbacks = variation.options.filter(o => o.fallbackWhenUnaffordable);
      if (fallbacks.length !== 1 || fallbacks[0].priceModel.type !== 'fixed' || fallbacks[0].priceModel.amountBani !== 0 || fallbacks[0].durationMinutes !== 0) throw new Error('Invalid safe fallback');
      if (fallbacks[0].state && Object.values(fallbacks[0].state).some(keys => keys?.length)) throw new Error('Fallback cannot require mutable state');
      for (const option of variation.options) {
        if (options.has(option.id)) throw new Error('Duplicate option');
        options.add(option.id);
        const seen = new Set<string>();
        let current = option;
        while (current.priceModel.type === 'base_plus_addon') {
          if (seen.has(current.id)) throw new Error('Cyclic price relationship');
          seen.add(current.id);
          const base = variation.options.find(o => o.id === (current.priceModel.type === 'base_plus_addon' ? current.priceModel.baseOptionId : ''));
          if (!base) throw new Error('Missing price base');
          current = base;
        }
        const maximum=(key:string):number=>{
          const item=variation.options.find(o=>o.id===key)!.priceModel;
          return item.type==='fixed'?item.amountBani:item.type==='range'?item.maxBani:maximum(item.baseOptionId)+item.maxAddonBani;
        };
        costBaniSchema.parse(maximum(option.id));
      }
    }
  }
  return definitions;
}
export function validateCatalogPolicy(catalog: readonly EventDefinitionV1[], policy: EventPolicy) {
  validateCatalog(catalog);
  for (const definition of catalog) {
    for (const rules of [definition.rules, ...definition.variations.flatMap(v => v.additionalRules ? [v.additionalRules] : [])]) {
      if (rules.groups.some(g => !policy.groups[g])) throw new Error('Unknown group');
    }
    for (const window of definition.allowedWindows) {
      const end = policy.windows[window].end;
      if (definition.variations.some(v => v.options.some(o => end + o.durationMinutes > 1440))) throw new Error('Activity could cross midnight');
    }
  }
}
