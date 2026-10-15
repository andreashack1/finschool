import type { EventDefinitionV1, WindowId } from '../../../lib/simulator/events/types';
import type { ConsequenceDescriptor, StateRules } from '../../../lib/simulator/consequences/types';
import { lifeMetadataSchema, type LifeMetadata, type OpportunityId, type knownStateFlags, type knownEffectFamilies } from '../../../lib/simulator/events/life-taxonomy';
import { bandPrice, type PriceBand } from './prices';
import { bani } from '../../../lib/simulator/money';

type Flag = typeof knownStateFlags[number];
type Effect = typeof knownEffectFamilies[number];
export type Story = { flag:Flag; phase:'problem'|'followup'|'resolution' } | { effect:Effect; phase:'prepare'|'use' };
export type LifeRow = readonly [id:string,family:string,title:string,description:string,paidLabel:string,band:PriceBand,freeLabel:string,settings?:{
  tags?:LifeMetadata['semanticTags']; rarity?:LifeMetadata['rarity']; opportunities?:OpportunityId[]; duration?:number; story?:Story; months?:number[];
  alternative?:readonly [string,PriceBand]; feedback?:string;
}];
const windowFor:Record<OpportunityId,WindowId> = { before_program:'morning',morning_break:'lunch',midday_break:'lunch',after_program:'after_program',early_evening:'evening',evening:'evening',weekend_morning:'weekend_day',weekend_daytime:'weekend_day' };
const flagTitles:Record<Flag,string>={phone_problematic:'Telefonul are o problemă',cable_problematic:'Cablul de încărcare trebuie înlocuit',headphones_problematic:'Căștile nu mai funcționează bine',printing_needed:'Ai materiale de imprimat',bag_problematic:'Geanta are o problemă',clothing_problematic:'Un obiect de îmbrăcăminte necesită atenție'};
const effectTitles:Record<Effect,string>={food_coverage:'Ai provizii pentru câteva zile',packed_lunch:'Ai pregătit masa pentru pauză',transport_prepared:'Ai pregătit un traseu alternativ',project_ready:'Materialele proiectului sunt pregătite',home_supplies_covered:'Ai refăcut consumabilele de acasă'};
export function lifeEvents(domain:LifeMetadata['domain'], category:EventDefinitionV1['category'], tags:LifeMetadata['semanticTags'], slots:OpportunityId[], profiles:LifeMetadata['profiles'], rows:readonly LifeRow[]):EventDefinitionV1[] {
  return rows.map(([id,familyId,title,description,label,band,free,settings={}])=>{
    const story=settings.story, chosenTags=settings.tags??tags;
    const life=lifeMetadataSchema.parse({domain,semanticTags:chosenTags,rarity:settings.rarity??'occasional',profiles,opportunities:settings.opportunities??slots,
      familyCooldownDays:story && 'flag' in story && story.phase==='problem'?30:chosenTags.includes('cinema')?7:3,weekdaysOnly:domain==='school'||domain==='work',...(settings.months?{months:settings.months}:{})});
    let state:StateRules|undefined;
    const solve:ConsequenceDescriptor[]=[],wait:ConsequenceDescriptor[]=[];
    if(story && 'flag' in story){
      state=story.phase==='problem'?{excludedFlags:[story.flag]}:{requiredFlags:[story.flag]};
      solve.push({id:'solve',type:'clear_flag',key:story.flag});
      if(story.phase==='problem')wait.push({id:'remember',type:'set_flag',key:story.flag,value:true,presentation:{title:flagTitles[story.flag],visibility:'user',priority:60}});
    }
    if(story && 'effect' in story && story.phase==='prepare')solve.push({id:'prepare',type:'add_effect',familyKey:story.effect,effectType:story.effect,durationDays:3,startOffsetDays:0,overlapPolicy:story.effect==='food_coverage'?'extend':'replace',value:{covered:true},presentation:{title:effectTitles[story.effect],visibility:'user',priority:30}});
    const duration=settings.duration??0;
    const options:EventDefinitionV1['variations'][number]['options']=[{id:`${id}_pay`,label,priceModel:bandPrice(band),durationMinutes:duration,fallbackWhenUnaffordable:false,
      feedback:settings.feedback??(solve.some(c=>c.type==='clear_flag')?'Problema a fost rezolvată.':solve.some(c=>c.type==='add_effect')?'Pregătirea rămâne disponibilă pentru următoarele zile.':`Ai ales: ${label.toLocaleLowerCase('ro')}.`),...(solve.length?{consequences:solve}:{})}];
    if(settings.alternative){const [alternative,alternativeBand]=settings.alternative;options.push({id:`${id}_alternative`,label:alternative,priceModel:bandPrice(alternativeBand),durationMinutes:duration,fallbackWhenUnaffordable:false,feedback:'Ai ales alternativa disponibilă în această situație.',...(solve.length?{consequences:solve}:{})});}
    if(story && 'effect' in story && story.phase==='use')options.push({id:`${id}_covered`,label:story.effect==='food_coverage'?'Folosești proviziile pregătite':story.effect==='packed_lunch'?'Mănânci pachetul pregătit':story.effect==='project_ready'?'Folosești materialele pregătite':story.effect==='transport_prepared'?'Urmezi traseul pregătit':'Folosești consumabilele cumpărate',priceModel:{type:'fixed',amountBani:bani(0)},durationMinutes:0,fallbackWhenUnaffordable:false,state:{requiredEffects:[story.effect]},feedback:'Ai folosit pregătirea anterioară. Nu apare o cheltuială nouă.'});
    options.push({id:`${id}_free`,label:free,priceModel:{type:'fixed',amountBani:bani(0)},durationMinutes:0,fallbackWhenUnaffordable:true,feedback:wait.length?'Ai amânat cumpărătura. Problema rămâne de rezolvat.':`${free}. Nu ai făcut o plată nouă.`,...(wait.length?{consequences:wait}:{})});
    return {id,version:2,familyId,category,cadenceClass:'routine',weight:1,allowedWindows:[...new Set(life.opportunities.map(o=>windowFor[o]))],expirationPolicy:'local_midnight',life,
      rules:{cooldownDays:7,weekendOnly:domain==='weekend',groups:chosenTags.includes('social_outing')?['social_invites']:[],requiresFutureFeature:false,...(state?{state}:{})},
      variations:[{id:`${id}_context`,title,description,weight:1,options}]};
  });
}
