import 'server-only';
import { catalogV2 } from './catalog-v2.server';
import { validateCatalog } from '../../../lib/simulator/events/validate';
import { lifeEvents } from './life-builder';
import { editorialPresentation } from './presentation-editorial';
import { profileContext } from '../../../lib/simulator/events/profile-context';

// Follow-ups use the existing bounded effects and option eligibility. No second ledger charge.
const continuations = [
  ...lifeEvents('food','mancare',['preparation','quick_food'],['evening'],['liceu','lucrez'],[
    ['prepared_dinner_followup','meal_coverage','Ai deja ingrediente','Ai luat ingrediente pentru mai multe mese. În seara asta încă ai provizii: poți găti din ele sau poți alege o comandă.','Comanzi în seara asta','delivery','Lași masa pentru mai târziu',{story:{effect:'food_coverage',phase:'use'}}],
  ]),
  ...lifeEvents('school','scoala',['project','reuse'],['midday_break'],['liceu'],[
    ['prepared_project_followup','school_team','Materialele sunt deja la tine','La activitatea de azi puteți folosi materialele pregătite anterior pentru proiect. Nu e nevoie să cumperi încă un set dacă le folosești pe acelea.','Iei un set separat','project','Propui varianta digitală',{story:{effect:'project_ready',phase:'use'}}],
  ]),
  ...lifeEvents('transport','transport',['transport','preparation'],['after_program','weekend_daytime'],['liceu','lucrez'],[
    ['prepared_route_followup','unexpected_trip','Ai verificat deja alternativa','Drumul de azi te duce prin zona pentru care ai pregătit un traseu alternativ. Îl poți urma sau poți plăti o cursă directă.','Iei o cursă directă','ride','Amâni drumul',{story:{effect:'transport_prepared',phase:'use'}}],
  ]),
].map(d=>({...d,rules:{...d.rules,state:{requiredEffects:[d.id==='prepared_dinner_followup'?'food_coverage':d.id==='prepared_project_followup'?'project_ready':'transport_prepared']}},life:{...d.life!,...profileContext(d)}}));

/** V2 remains the historical catch-up input; V3 preserves old choices and adds recognition. */
export const lifeEditorialV3: Readonly<Record<string, readonly [string, string?]>> = {
  home_group_meal: ['Cină acasă', 'Cei cu care locuiești vor să gătiți împreună diseară. Cineva face lista de ingrediente; poți pune bani sau te poți ocupa de pregătire.'],
  weekend_local_trip: ['Plan de weekend', 'Pe grup apare un plan pentru câteva ore în afara orașului. Un prieten poate conduce, iar ceilalți împart transportul. Poți contribui sau poți rămâne în oraș.'],
  weekend_family_meal: ['Masă cu familia'],
  late_small_hunger: ['Mai stai după program'],
  social_cafe_table: ['La cafeneaua din centru', 'Un prieten a prins o masă la cafeneaua din centru și vă scrie să veniți. Poți lua o băutură sau poți propune să vă întâlniți în parc.'],
  digital_game_addon: ['Un pachet în joc', 'Jocul pe care îl folosești a adăugat un pachet opțional. Prietenii îl discută pe grup, dar puteți juca în continuare și cu versiunea pe care o ai.'],
  digital_cloud_export: ['Fișiere fără loc', 'Când vrei să salvezi fotografiile de la ultima întâlnire, vezi că spațiul este aproape plin. Poți plăti pentru o lună sau poți șterge întâi copiile inutile.'],
  digital_headphones_resolution: ['Căști noi sau pauză'],
  digital_online_course: ['Atelier online'],
  home_extension: ['Priza e prea departe', 'Cablurile nu ajung comod până la biroul unde lucrezi. Poți lua un prelungitor sau poți muta lucrurile mai aproape de priză.'],
  home_shared_detergent: ['Detergent la comun'],
  home_small_fastenings: ['Biroul se clatină', 'O prindere de la birou s-a slăbit și îl simți mișcându-se când scrii. Poți lua un kit simplu sau poți cere ajutor ca să vedeți întâi ce trebuie reparat.'],
  home_storage_box: ['Sertarul plin'],
  home_week_supply: ['Lista pentru casă'],
  leisure_boardgame_cafe: ['La cafeneaua cu jocuri', 'Prietenii au găsit o cafenea cu jocuri de masă și taxă de acces. Puteți încerca jocurile de acolo sau vă puteți întâlni în parc.'],
  leisure_book_evening: ['O carte pentru seară'],
  leisure_craft_kit: ['Primul kit creativ', 'Ai salvat un tutorial și ai vrea să încerci proiectul acasă. Magazinul are un kit de început, dar poți urmări întâi tutorialul gratuit ca să vezi ce presupune.'],
  leisure_local_match: ['Meci în cartier'],
  leisure_sport_court: ['Teren cu gașca'],
  morning_bakery_offer: ['Oferta de la patiserie'],
  obligation_clothing_repair: ['Haina la reparat'],
  obligation_id_photo: ['Poze pentru înscriere'],
  obligation_project_refill: ['Lipsește materialul', 'Ai avansat cu proiectul, dar s-a terminat un consumabil înainte de ultima parte. Poți lua altul sau poți adapta partea rămasă în format digital.'],
  obligation_return_trip: ['De returnat unui prieten'],
  opportunity_borrow_tool: ['Unealtă de împrumut'],
  opportunity_prepared_meal: ['Cina e deja pregătită'],
  opportunity_repair_help: ['Reparație cu ajutor'],
  pack_next_lunch: ['Pachet pentru mâine'],
  school_art_supply: ['Materiale pentru atelier'],
  school_library_copy: ['La copiator'],
  school_missing_snack: ['Ai uitat pachetul'],
  school_presentation_adapter: ['Lipsește adaptorul'],
  school_secondhand_book: ['Cartea unui coleg'],
  seasonal_study_supplies: ['Pregătiri pentru septembrie'],
  shopping_personal_soap: ['Săpun pe terminate'],
  shopping_retail_receipt: ['Încă ceva la casă'],
  shopping_socks: ['Șosete de schimb'],
  transport_connection_wait: ['Aștepți legătura'],
  transport_evening_departure: ['Drumul după întâlnire'],
  transport_friend_meeting: ['În celălalt cartier'],
  transport_nearby_errand: ['Până la magazin'],
  transport_pickup_locker: ['Coletul de la locker'],
  transport_route_change: ['Alt traseu azi'],
  work_after_meal: ['Masă după muncă'],
  work_after_walk: ['Plimbare după muncă'],
  work_personal_folder: ['Documentele tale în ordine'],
  work_notepad: ['Notițe în pauză'],
};

export const catalogV3 = validateCatalog([...catalogV2,...continuations].map(d => ({
  ...d,
  ...(d.id==='school_missing_snack'?{rules:{...d.rules,state:{excludedEffects:['packed_lunch']}}}:{}),
  ...(d.id==='work_desk_cable'?{rules:{...d.rules,state:{excludedFlags:['cable_problematic']}}}:{}),
  variations: d.variations.map(v => {
    const edit = lifeEditorialV3[d.id];
    const presentation=v.presentation??editorialPresentation(d,v);
    return { ...v, presentation: { ...presentation, ...(edit ? { title: edit[0], context: edit[1] ?? presentation.context } : {}) } };
  }),
})));
