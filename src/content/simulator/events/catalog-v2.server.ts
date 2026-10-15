import 'server-only';
import { catalogV1 } from './catalog-v1.server';
import { routineEvents } from './routine';
import { foodEvents } from './food';
import { schoolEvents } from './school';
import { workEvents } from './work';
import { transportEvents } from './transport';
import { socialEvents } from './social';
import { shoppingEvents } from './shopping';
import { homeEvents } from './home';
import { digitalEvents } from './digital';
import { leisureEvents } from './leisure';
import { obligationEvents } from './obligations';
import { unexpectedEvents } from './unexpected';
import { opportunityEvents } from './opportunities';
import { weekendEvents } from './weekend';
import { seasonalEvents } from './seasonal';
import type { LifeMetadata } from '../../../lib/simulator/events/life-taxonomy';
import { validateCatalog } from '../../../lib/simulator/events/validate';
import { editorialPresentation } from './presentation-editorial';
import { profileContext } from '../../../lib/simulator/events/profile-context';

const legacy: Record<string,Pick<LifeMetadata,'domain'|'semanticTags'|'opportunities'>> = {
 breakfast:{domain:'routine',semanticTags:['quick_food'],opportunities:['before_program','weekend_morning']},
 morning_coffee:{domain:'routine',semanticTags:['coffee'],opportunities:['before_program','weekend_morning']},
 lunch_break:{domain:'food',semanticTags:['quick_food'],opportunities:['midday_break']},
 after_snack:{domain:'routine',semanticTags:['quick_food'],opportunities:['after_program']},
 city_drink:{domain:'routine',semanticTags:['quick_food'],opportunities:['after_program','weekend_daytime']},
 friends_coffee:{domain:'social',semanticTags:['coffee','social_outing'],opportunities:['after_program','weekend_daytime']},
 cinema:{domain:'leisure',semanticTags:['cinema','culture','social_outing'],opportunities:['evening','weekend_daytime']},
 games:{domain:'leisure',semanticTags:['games','social_outing'],opportunities:['evening','weekend_daytime']},
 colleagues_lunch:{domain:'food',semanticTags:['quick_food','social_outing'],opportunities:['midday_break']},
 weekend_terrace:{domain:'social',semanticTags:['coffee','social_outing'],opportunities:['weekend_daytime']},
 delivery:{domain:'food',semanticTags:['delivery'],opportunities:['evening']},
 picnic:{domain:'social',semanticTags:['free_activity','social_outing'],opportunities:['weekend_daytime']},
};
// IDs and old content survive. V1 itself is never mutated.
const originals = catalogV1.map(definition => ({...definition,life:{...legacy[definition.id],rarity:definition.cadenceClass==='routine'?'common' as const:'occasional' as const,profiles:['liceu','lucrez'] as LifeMetadata['profiles'],weekdaysOnly:false,familyCooldownDays:definition.rules.cooldownDays}}));
const source=[...originals,...routineEvents,...foodEvents,...schoolEvents,...workEvents,...transportEvents,...socialEvents,...shoppingEvents,...homeEvents,...digitalEvents,...leisureEvents,...obligationEvents,...unexpectedEvents,...opportunityEvents,...weekendEvents,...seasonalEvents];
export const presentationTitleAudit=source.map(d=>({id:d.id,oldTitles:d.variations.map(v=>v.title),newTitles:d.variations.map(v=>editorialPresentation(d,v).title)}));
export const catalogV2 = validateCatalog(source.map(d=>({...d,life:{...d.life!,...profileContext(d)},variations:d.variations.map(v=>({...v,presentation:editorialPresentation(d,v)}))})).sort((a,b)=>a.id.localeCompare(b.id)));
