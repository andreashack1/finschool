import type { ReadyLesson } from "../../types/learning";
import { calc, choice, scenario } from "./builders";
export const budgetLesson: ReadyLesson = {
  id: "primul-buget", slug: "primul-buget", categoryId: "bani-de-zi-cu-zi", chapterId: "bugetul-tau", title: "Cum îți faci un buget?", description: "Un plan pentru banii tăi. Fără tabele complicate.", minutes: 3, xp: 20, status: "ready",
  recapPoints: ["Pornește de la venitul net disponibil.", "Pune nevoile esențiale înaintea dorințelor.", "Verifică diferențele și ajustează planul."],
  screens: [
    { id: "intro", type: "text", title: "Un plan, nu o pedeapsă.", body: "Un buget îți arată ce ai, ce trebuie plătit și ce poți pune deoparte. Nu trebuie să fie perfect din prima.", fini: { mood: "encouraging", message: "Îl ajustezi pe măsură ce afli ce funcționează pentru tine." } },
    choice("start", "Începi cu ce ai.", "Care este primul pas într-un buget lunar?", ["Notez venitul net disponibil.", "Notez toate lucrurile pe care le vreau.", "Folosesc brutul din contract.", "Adaug un bonus încă neconfirmat."], 0, "Pornești de la banii disponibili. Apoi planifici ce trebuie plătit și ce vrei să pui deoparte."),
    scenario("nevoi", "Ai bani limitați.", "Ai de plătit transportul necesar și mâncarea. Îți dorești și un abonament nou de divertisment.", "Ce pui prima dată în plan?", ["Abonamentul, fiindcă e o sumă mică.", "Cheltuielile esențiale.", "Împart egal între toate, indiferent de nevoie.", "Amân orice plan până se termină banii."], 1, "Nevoile esențiale vin primele. După ce le acoperi, vezi cât rămâne pentru economii și dorințe."),
    calc("ramane", "Ai 500 lei disponibili.", "Planifici 120 lei pentru transport și 80 lei pentru un abonament.", "Cât rămâne pentru alte lucruri?", [200, 300, 320, 380], 300, "500 − 120 − 80 = 300 lei. Un calcul simplu îți arată ce mai poți planifica."),
    choice("ajustare", "Planul se poate schimba.", "Ai cheltuit mai mult decât credeai. Ce faci?", ["Renunț la buget.", "Păstrez aceleași estimări fără să verific.", "Verific diferența și ajustez luna următoare.", "Presupun că luna viitoare nu voi cheltui nimic."], 2, "Bugetul te ajută să observi și să ajustezi. O estimare greșită este informație pentru următorul plan."),
  ],
};
