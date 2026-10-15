import 'server-only';
import type { EventDefinitionV1, WindowId } from '../../../lib/simulator/events/types';
import { validateCatalog } from '../../../lib/simulator/events/validate';
import { bani } from '../../../lib/simulator/money';

// Immutable educational catalog v1: these are scenario prices, not official
// Romanian prices. Free prepared-food alternatives are scenario conventions;
// no inventory is implied or activated in Chapter 3.
type Context = readonly [string, string, string];
type Choice = readonly [string, number, number, number, string];
function family(id: string, category: 'mancare' | 'iesiri', cadenceClass: 'routine' | 'additional', windows: WindowId[], cooldownDays: number, contexts: readonly [Context, Context], choices: readonly [Choice, Choice], fallback: readonly [string, string], settings: { weekendOnly?: boolean; social?: boolean; lunch?: boolean; addon?: readonly [number, number] } = {}): EventDefinitionV1 {
  return {
    id, version: 1, familyId: id, category, cadenceClass, weight: 1, allowedWindows: windows, expirationPolicy: 'local_midnight',
    rules: { cooldownDays, weekendOnly: settings.weekendOnly ?? false, groups: settings.social ? ['social_invites'] : [], ...(settings.lunch ? { exclusionGroup: 'lunch' } : {}), requiresFutureFeature: false },
    variations: contexts.map(([key, title, description]) => ({
      id: `${id}_${key}`, title, description, weight: 1,
      options: [
        ...choices.map(([label, min, max, duration, feedback], index) => ({
          id: `${id}_${key}_${index === 0 ? 'simple' : 'extended'}`, label,
          priceModel: index === 1 && settings.addon ? { type: 'base_plus_addon' as const, baseOptionId: `${id}_${key}_simple`, minAddonBani: bani(settings.addon[0] * 100), maxAddonBani: bani(settings.addon[1] * 100) } : { type: 'range' as const, minBani: bani(min * 100), maxBani: bani(max * 100) },
          feedback: `${feedback} ${title} rămâne în istoricul zilei.`, durationMinutes: duration, fallbackWhenUnaffordable: false,
        })),
        { id: `${id}_${key}_free`, label: fallback[0], priceModel: { type: 'fixed' as const, amountBani: bani(0) }, feedback: fallback[1], durationMinutes: 0, fallbackWhenUnaffordable: true },
      ],
    })),
  };
}
export const catalogV1 = validateCatalog([
  family('breakfast', 'mancare', 'routine', ['morning'], 1,
    [['station', 'Mic dejun înainte de autobuz', 'Ajungi în stație mai devreme. Brutăria de lângă are covrigi calzi, iar magazinul are iaurt și banane.'], ['walk', 'Mic dejun pe traseul de dimineață', 'Pleci pe jos și treci pe lângă o brutărie. Ai și varianta micului dejun pregătit înainte să pleci.']],
    [['Iei un covrig', 3, 5, 0, 'Ai cumpărat un covrig pentru dimineață.'], ['Iei iaurt și o banană', 7, 11, 0, 'Ai ales iaurt și o banană.']], ['Mănânci din ce ai pregătit', 'Folosești micul dejun pregătit în scenariu. Nu ai cheltuit bani.']),
  family('morning_coffee', 'mancare', 'routine', ['morning'], 1,
    [['queue', 'Cafea înainte să înceapă ziua', 'Cafeneaua de pe traseu are o coadă scurtă. Poți lua ceva la pachet sau folosi cafeaua pregătită acasă.'], ['early', 'O dimineață cu timp de cafea', 'Ai ajuns devreme în apropierea programului. La chioșc găsești espresso și cappuccino.']],
    [['Iei un espresso', 5, 10, 0, 'Ai luat un espresso.'], ['Iei un cappuccino', 10, 17, 0, 'Ai luat un cappuccino.']], ['Folosești cafeaua de acasă sau renunți', 'Nu faci o cumpărătură de cafea astăzi.']),
  family('lunch_break', 'mancare', 'routine', ['lunch'], 1,
    [['short', 'Prânz într-o pauză scurtă', 'În pauză ai la îndemână un sandviș sau un meniu simplu. Pachetul pregătit este și el o variantă.'], ['nearby', 'Prânz de la locul de lângă', 'Locul din apropiere afișează meniul zilei. Poți cumpăra prânzul sau folosi masa pregătită.']],
    [['Iei un sandviș', 12, 20, 0, 'Ai cumpărat un sandviș pentru pauză.'], ['Iei un meniu simplu', 20, 30, 0, 'Ai ales un meniu simplu.']], ['Mănânci pachetul pregătit', 'Folosești pachetul pregătit în scenariu, fără o plată nouă.'], { lunch: true }),
  family('after_snack', 'mancare', 'routine', ['after_program'], 1,
    [['route', 'Gustare pe drumul spre casă', 'După program treci pe lângă un magazin mic. Sunt fructe și batoane, dacă vrei o gustare.'], ['park', 'Gustare după o oprire în parc', 'Te oprești puțin în parc după program. Chioșcul are fructe și batoane la vânzare.']],
    [['Iei un fruct', 2, 5, 0, 'Ai cumpărat un fruct.'], ['Iei un baton', 4, 8, 0, 'Ai cumpărat un baton.']], ['Nu cumperi o gustare', 'Continui fără să cumperi o gustare.']),
  family('city_drink', 'mancare', 'routine', ['after_program', 'weekend_day'], 1,
    [['errand', 'O băutură între două drumuri', 'Ai câteva drumuri de făcut în oraș. Poți cumpăra apă, o limonadă sau folosi apa adusă.'], ['square', 'Oprire în piațeta din oraș', 'În timpul plimbării te oprești în piațetă. La stand găsești apă și limonadă.']],
    [['Cumperi apă', 3, 6, 0, 'Ai cumpărat o sticlă de apă.'], ['Cumperi limonadă', 15, 23, 0, 'Ai cumpărat o limonadă.']], ['Folosești apa adusă', 'Folosești apa adusă în scenariu. Nu apare o cheltuială.']),
  family('friends_coffee', 'iesiri', 'additional', ['after_program', 'evening', 'weekend_day'], 3,
    [['catchup', 'Cafea și povești cu prietenii', 'Prietenii propun o întâlnire la cafenea pentru a povesti ce s-a mai întâmplat. Poți propune și o plimbare.'], ['reunion', 'O întâlnire după ceva timp', 'Un prieten revine în oraș și propune să vă vedeți la cafenea. O plimbare este alternativa gratuită.']],
    [['Iei o băutură', 10, 20, 60, 'Ai ales întâlnirea cu o băutură.'], ['Iei o băutură și o gustare', 25, 40, 60, 'Ai ales o băutură și o gustare la întâlnire.']], ['Propui o plimbare', 'Ai propus o plimbare, fără cumpărături.'], { social: true, addon: [15, 20] }),
  family('cinema', 'iesiri', 'additional', ['evening', 'weekend_day'], 7,
    [['premiere', 'Cinema cu prietenii', 'Grupul vrea să vadă un film nou. Poți lua doar biletul, adăuga gustări sau alege o seară fără cinema.'], ['rerun', 'Un film revine pe ecran', 'Un film pe care voiai să-l vezi are o nouă proiecție. Poți merge la cinema sau propune altă activitate.']],
    [['Iei doar biletul', 30, 45, 120, 'Ai ales biletul de cinema.'], ['Iei bilet și gustări', 45, 70, 120, 'Ai ales același bilet, plus gustări.']], ['Refuzi sau alegi o activitate gratuită', 'Nu mergi la cinema în această situație. Nu ai cheltuit bani.'], { social: true, addon: [15, 25] }),
  family('games', 'iesiri', 'additional', ['evening', 'weekend_day'], 7,
    [['board', 'Seară de jocuri de societate', 'Prietenii organizează o seară cu jocuri de societate. Poți aduce o gustare, contribui la mâncare sau veni fără cumpărături.'], ['team', 'Jocuri în echipă la prieteni', 'O întâlnire acasă la prieteni se transformă într-o seară de jocuri în echipă. Cumpărăturile sunt opționale.']],
    [['Aduci o gustare', 10, 18, 90, 'Ai adus o gustare la seara de jocuri.'], ['Contribui la mâncare', 20, 35, 90, 'Ai contribuit la mâncarea grupului.']], ['Participi fără cumpărături', 'Participi fără o cumpărătură suplimentară.'], { social: true }),
  family('colleagues_lunch', 'mancare', 'additional', ['lunch'], 1,
    [['order', 'Prânz comandat cu colegii', 'Colegii strâng o comandă pentru pauza de prânz. Poți intra în comandă sau mânca masa pregătită.'], ['menu', 'O comandă comună în pauză', 'În pauză, câțiva colegi aleg de pe un meniu comun. Poți lua o porție simplă, adăuga o băutură sau folosi masa pregătită.']],
    [['Iei o comandă simplă', 25, 35, 0, 'Ai intrat în comandă cu o porție simplă.'], ['Iei comandă și băutură', 35, 50, 0, 'Ai ales o porție cu băutură.']], ['Mănânci masa pregătită', 'Folosești masa pregătită în scenariu, fără o comandă.'], { lunch: true, addon: [10, 15] }),
  family('weekend_terrace', 'iesiri', 'additional', ['weekend_day'], 3,
    [['sun', 'Terasă într-o zi de weekend', 'Prietenii propun să stați la terasă. Poți lua o băutură, o masă sau propune o plimbare.'], ['market', 'O terasă după târgul de weekend', 'După o vizită la târg, grupul se oprește lângă o terasă. Ai și alternativa unei plimbări.']],
    [['Iei o băutură', 12, 22, 60, 'Ai ales o băutură la terasă.'], ['Iei băutură și masă', 45, 70, 90, 'Ai ales o băutură și o masă.']], ['Propui o plimbare', 'Continuați cu o plimbare, fără această cheltuială.'], { weekendOnly: true, social: true, addon: [33, 48] }),
  family('delivery', 'mancare', 'additional', ['evening'], 3,
    [['quiet', 'Mâncare comandată într-o seară liniștită', 'Seara te gândești să comanzi ceva. Prețul porției include taxele; desertul se adaugă aceleiași porții.'], ['busy', 'Cină după o zi plină', 'După o zi plină ai opțiunea unei comenzi. Poți lua o porție, adăuga desert sau folosi mâncarea disponibilă.']],
    [['Comanzi o porție cu taxe', 35, 50, 0, 'Ai comandat o porție, cu taxele incluse.'], ['Comanzi aceeași porție și desert', 45, 68, 0, 'Ai adăugat un desert la aceeași porție.']], ['Folosești mâncarea disponibilă', 'Folosești mâncarea disponibilă în scenariu. Nu plasezi o comandă.'], { addon: [10, 18] }),
  family('picnic', 'iesiri', 'additional', ['weekend_day'], 7,
    [['park', 'Picnic în parc', 'Grupul propune un picnic în parc. Poți cumpăra o gustare, contribui la cumpărăturile comune sau veni cu ce ai.'], ['lake', 'Picnic lângă lac', 'Prietenii aleg o zonă lângă lac pentru un picnic de weekend. Fiecare poate contribui în felul ales.']],
    [['Iei o gustare personală', 12, 20, 90, 'Ai ales o gustare pentru picnic.'], ['Contribui la cumpărăturile comune', 25, 40, 90, 'Ai contribuit la cumpărăturile grupului.']], ['Participi cu ce ai', 'Participi cu ce ai în scenariu, fără o cumpărătură nouă.'], { weekendOnly: true, social: true }),
]);
