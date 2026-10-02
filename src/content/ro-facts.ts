// Reviewed against ANAF's consolidated Fiscal Code (arts. 77, 78, 138, 156)
// and D112 instructions. These are standard-case rates, not a universal calculator.
export const roFacts = {
  verifiedAt: "2026-10-03",
  sources: [
    { label: "ANAF · Codul fiscal, art. 77, 78, 138, 156", url: "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm" },
    { label: "ANAF · Instrucțiuni D112, Ordinul 605/2026", url: "https://static.anaf.ro/static/10/Anaf/legislatie/OPANAF_605_2026.pdf" },
  ],
  salary: {
    casRate: 0.25, cassRate: 0.10, incomeTaxRate: 0.10,
    youthDeductionMaxAge: 26,
    exampleGross: 8000,
    assumptions: "Exemplu simplificat: contract de muncă în România, lună întreagă, condiții normale, fără deduceri, scutiri, beneficii sau alte rețineri. Nu este un calcul personalizat.",
    notes: "Facilitățile, deducerile și alte rețineri pot schimba rezultatul. Nu folosi exemplul pentru salariul minim sau situații speciale.",
  },
} as const;
const s = roFacts.salary;
const cas = s.exampleGross * s.casRate;
const cass = s.exampleGross * s.cassRate;
const taxBase = s.exampleGross - cas - cass;
const tax = taxBase * s.incomeTaxRate;
export const salaryExample = { gross: s.exampleGross, cas, cass, taxBase, tax, net: taxBase - tax };
export const lei = (amount: number) => `${amount.toLocaleString("ro-RO")} lei`;
