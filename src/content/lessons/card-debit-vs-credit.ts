import type { ReadyLesson } from "../../types/learning";
import { choice, scenario } from "./builders";
// Existing quick lesson retained; category remains coming soon in the catalog.
export const cardLesson: ReadyLesson = {
  id: "card-debit-vs-credit", slug: "card-debit-vs-credit", categoryId: "carduri-si-banca", chapterId: "cardul", title: "Debit vs. credit", description: "Arată la fel. Banii din spate sunt diferiți.", minutes: 3, xp: 20, status: "ready",
  recapPoints: ["Debit: folosești în mod obișnuit banii din cont.", "Credit: împrumutul trebuie rambursat.", "Verifică dobânda, comisioanele și termenele."],
  screens: [
    { id: "intro", type: "explicatie", title: "Arată la fel. Funcționează diferit.", body: "Cardul este un mod de a plăti. Ca să știi ce cheltuiești, contează dacă banii sunt ai tăi sau împrumutați.", fini: { mood: "thinking", message: "Limita de credit nu este venitul tău." } },
    choice("debit", "Banii cui?", "Cu un card de debit, fără descoperit de cont, ce folosești?", ["Banii disponibili în contul tău.", "Un împrumut automat pentru fiecare plată.", "Doar dobânda primită de la bancă.", "Salariul din luna următoare."], 0, "Cardul de debit îți dă acces la banii disponibili în cont. Un descoperit de cont este o facilitate de împrumut separată."),
    scenario("credit", "Ai plătit cu un card de credit.", "Banca ți-a pus la dispoziție o limită din care ai cumpărat ceva.", "Trebuie să returnezi suma?", ["Nu, limita este un bonus.", "Da, conform condițiilor de rambursare.", "Doar dacă nu mai folosești cardul.", "Doar dacă plata a fost online."], 1, "Folosești bani împrumutați. Citește condițiile și scadența înainte să cumperi, inclusiv regulile unei eventuale perioade de grație."),
    choice("verifici", "Înainte să alegi.", "Ce verifici la un card de credit?", ["Doar limita maximă de cumpărături.", "Doar dacă merge contactless.", "Dobânda, comisioanele și condițiile de rambursare.", "Doar dacă ai aceeași bancă precum prietenii."], 2, "Costurile și termenele îți arată ce presupune împrumutul. Limita disponibilă nu este o sumă câștigată de tine."),
    { id: "recap", type: "recap", title: "Ține minte", points: ["Debit: folosești în mod obișnuit banii din cont.","Credit: împrumutul trebuie rambursat.","Verifică dobânda, comisioanele și termenele."] },
    { id: "final", type: "final", title: "Lecție terminată." },
  ],
};
