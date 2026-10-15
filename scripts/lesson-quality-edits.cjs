// Curated changes. IDs and correct option IDs deliberately stay stable.
module.exports = {
  'tva':{questions:{q2:{question:'TVA scris separat pe document trebuie plătit încă o dată peste totalul care îl include.',explanation:'Baza și TVA sunt componente ale aceluiași total. Separarea pe document explică suma, nu creează o a doua plată peste total.'},q4:{question:'Oferta A are bază 80 lei și TVA 16 lei. Oferta B are total 96 lei cu TVA inclus. Ce concluzie este justificată înainte de alte costuri?',labels:{'0':'A este mai ieftină fiindcă cifra inițială este 80.','1':'B este mai scumpă fiindcă TVA este inclus.','2':'Totalurile sunt egale: 96 lei pentru fiecare.'},explanation:'Aducerea ofertelor la aceeași bază arată două totaluri de 96 lei. Abia apoi verifici alte componente, precum transportul.'},q7:{labels:{'0':'Transportul este aceeași componentă cu TVA fiindcă apare pe document.','1':'Transportul este deja inclus automat în orice preț fără TVA.'}}}},
  'cursul-valutar-si-euro':{questions:{q7:{labels:{'0':'Doar cursul pentru operațiunea inversă, presupunând că este identic.','1':'Doar valuta contului, fără suma finală primită.'}}}}
  ,
  'nevoi-vs-dorinte':{questions:{q1:{labels:{'2':'Care este prețul cel mai mare, presupunând că rezolvă nevoia mai bine.'}},q7:{labels:{'1':'Doar diferența de calitate presupusă din preț, fără obligația apropiată.'}},q8:{labels:{'1':'O nevoie obligatorie, fiindcă există un model nou.','2':'O prioritate față de orice obligație, dacă produsul este popular.'}}}},
  'cumparaturile-pe-impuls':{questions:{q5:{labels:{'1':'Reducerea transformă automat produsul într-o nevoie.','2':'Plata salvată dovedește că achiziția fusese planificată.'}},q6:{labels:{'0':'Toată suma din cont este liberă până când biletul este cumpărat.','2':'Cheltuiala nouă poate fi acoperită din venitul viitor neconfirmat.'}},q8:{labels:{'1':'Da, diferența din reclamă trebuie considerată o economie ratată în buget.','2':'Da, procentul redus dovedește că produsul trebuia cumpărat.'}}}},
  'cum-te-conving-reclamele':{questions:{q3:{labels:{'0':'Popularitatea persoanei de durata ofertei, fără a verifica produsul.','2':'Prețul de funcție, presupunând că aprecierea creatorului este o dovadă tehnică.'}},q7:{labels:{'0':'Doar utilizarea demonstrată pe alt telefon, fără compatibilitatea cu al ei.'}}}},
  'cumparaturi-in-jocuri-si-aplicatii':{questions:{q1:{question:'Alex vede zece plăți de 8 lei în aceeași săptămână. Ce total din bugetul real compară cu celelalte activități?',explanation:'Cele zece plăți consumă 80 lei. Prețul mic al fiecărui pachet și moneda din joc nu reduc totalul în bani reali.'},q3:{labels:{'2':'Consideri unitățile rămase bani recuperabili automat.'}},q6:{labels:{'2':'Da, costul nou este justificat automat de suma deja plătită.'}}}},
  'etf-uri-si-fonduri':{questions:{q2:{question:'Două fonduri pot avea multe dețineri și totuși expuneri diferite, deci numărul pozițiilor nu arată singur diversificarea.',explanation:'Contează în ce companii, sectoare și piețe este investit portofoliul. Titlul fondului și numărul deținerilor nu înlocuiesc politica sa.'},q4:{labels:{'0':'Doar numărul pozițiilor, presupunând că riscul devine identic.','1':'Doar randamentul trecut, fără sectoarele în care investesc.'}},q6:{labels:{'2':'În randamentul ultimului an, presupunând că descrie politica.'}},q7:{labels:{'0':'Doar comisionul anual, presupunând că tranzacția nu costă.','1':'Doar costurile în moneda contului, fără conversie.'}},q8:{labels:{'1':'Doar numărul total al unităților, fără ce dețin fondurile.'}}}},
  'cum-functioneaza-bursa':{questions:{q5:{labels:{'1':'Ultimul preț de 100 ar trebui să oblige vânzătorul să accepte 100.','2':'Ordinul limită ar trebui să accepte 102 ca să se execute.'}},q6:{question:'Vânzătorul cere 102 lei, dar ordinul lui Dan are limită 100. Ce preț maxim poate accepta acest ordin fără schimbarea limitei?',explanation:'Limita de cumpărare rămâne 100 lei. Faptul că vânzătorul cere mai mult poate lăsa ordinul neexecutat, fără să mărească automat limita.'},q7:{labels:{'0':'Doar prețul afișat, fără confirmarea și tarifele intermediarului.','1':'Doar faptul că aplicația funcționează, fără verificarea autorizării.'}},q9:{labels:{'0':'Prețul maxim al ordinului limită se mărește automat.','2':'Ultimul preț afișat garantează orice cantitate la acel nivel.'}}}},
  'investesti-vs-speculezi':{questions:{q2:{question:'Un termen lung de deținere nu transformă singur o anticipare de preț într-o decizie fundamentată pe valoare.',explanation:'Motivul și informațiile care susțin decizia contează, nu doar durata. Păstrarea unui instrument după scădere nu produce automat analiza care lipsea.'},q6:{labels:{'0':'Doar durata deținerii, presupunând că înlocuiește analiza.'}}}},
  'crypto-ce-trebuie-sa-stii':{questions:{q1:{labels:{'2':'Doar autorizarea furnizorului, presupunând că garantează prețul.'}}}}
  ,
  'de-ce-investim':{questions:{q4:{labels:{'1':'Doar perioada recomandată în reclamă, fără scadența propriei obligații.'}},q5:{labels:{'1':'Produsul recomandat tuturor ar trebui să se potrivească oricărui termen.','2':'Orizontul lung ar elimina nevoia de bani disponibili pentru taxă.'}},q6:{question:'Obiectivul Anei este peste zece ani, dar taxa trebuie plătită în două luni. Ce orizont poate fi studiat separat de disponibilul pentru taxă?',explanation:'Obiectivul de peste zece ani are alt termen decât taxa apropiată. Separarea permite evaluarea riscurilor fără să presupună că un produs se potrivește tuturor banilor.'}}},
  'risc-si-randament':{questions:{q2:{question:'Un câștig posibil mai mare nu este echivalent cu un câștig garantat; comparația trebuie să includă și riscul.',explanation:'Randamentul descrie rezultatul, iar riscul privește incertitudinea lui. O valoare posibilă sau istorică nu confirmă cât vei obține.'},q4:{labels:{'0':'Doar câștigul trecut, presupunând că prețul va rămâne favorabil.','1':'Doar randamentul dorit, fără momentul când trebuie să vinzi.'}},q5:{question:'Dan a calculat o creștere de 100 lei înainte de costuri și un rezultat net de 80 lei. Ce cost explică diferența?',explanation:'Costurile de 20 lei reduc rezultatul de la 100 la 80 lei. Compararea randamentelor înainte de costuri poate ascunde această diferență.'},q7:{labels:{'0':'Calmul garantează că poate păstra investiția până când prețul revine.','1':'Calmul poate înlocui verificarea obligațiilor apropiate.'}},q8:{labels:{'1':'Doar cât a câștigat alt client, fără garanția concretă.'}}}},
  'actiuni':{questions:{q1:{labels:{'2':'Un împrumut către companie, cu aceeași relație ca o obligațiune.'}},q2:{question:'Poți deține o participație într-o companie fără să primești dividende în fiecare an.',explanation:'Dividendele depind de distribuirea lor și de condițiile aplicabile. Deținerea acțiunii nu creează un salariu anual garantat.'},q5:{labels:{'1':'Prețul observat arată singur cât de sigură este deținerea.','2':'Folosirea produsului înlocuiește evaluarea riscului la prețul acțiunii.'}},q7:{labels:{'0':'Doar variația prețului, fără comisioane.','1':'Doar dividendele posibile, fără valoarea deținerii.'}}}},
  'obligatiuni-si-titluri-de-stat':{questions:{q5:{question:'Ana poate avea nevoie de bani înainte de termen. Ce criteriu al produsului trebuie să lege de această nevoie?',labels:{'1':'Doar valoarea cuponului anual, fără ieșirea timpurie.','2':'Doar numele emitentului, presupunând recuperare integrală oricând.'},explanation:'Accesul înainte de scadență depinde de condițiile produsului și poate schimba rezultatul. Cuponul singur nu descrie banii disponibili la data necesară.'},q8:{labels:{'1':'Doar cuponul nominal, presupunând că valorează la fel în moneda cheltuielilor.'}},q9:{labels:{'0':'Doar valoarea cuponului, fără posibilitatea ca emitentul să nu plătească.'}}}}
  ,
  'preturile-psihologice-99-99':{questions:{q2:{question:'O economie de un ban față de 100 lei nu schimbă semnificativ o depășire a bugetului cu zeci de lei.',explanation:'Terminația prețului poate influența impresia, dar totalul trebuie comparat cu disponibilul. Un ban economisit pe produs nu repară o depășire mare.'},q5:{labels:{'1':'Fiecare produs ar trebui numărat ca 99 lei, ignorând restul.','2':'Fiecare preț sub 100 garantează că suma coșului rămâne sub buget.'}}}},
  'de-ce-cheltuim-mai-mult-cu-cardul-decat-cu-numerarul':{questions:{q5:{question:'Luca nu și-a amintit fiecare plată de 20 lei. Ce total trebuie inclus în buget pentru cele cinci cumpărături?',labels:{'1':'Contează doar plățile de care își amintește, nu întregul istoric.','2':'Plățile mici pot fi excluse dacă nu depășesc individual limita.'},explanation:'Cele cinci plăți însumează 100 lei, indiferent cât de vizibilă a fost fiecare. Extrasul și evidența completează memoria.'}}},
  'gratificarea-imediata-vs-viitor':{questions:{q1:{labels:{'1':'Doar plăcerea de acum, fără ce amâni.','2':'Doar suma economisită deja, fără efectul retragerii.'}},q2:{question:'Poți alege o plăcere acum și păstra un obiectiv viitor, dacă arăți explicit ce bani folosești și ce termen se schimbă.',explanation:'Alegerea implică un cost de oportunitate. Planul poate fi revizuit, dar aceeași sumă nu poate fi integral cheltuită și economisită simultan.'},q6:{question:'Mara are inițial 200 lei pentru curs. De ce nu îi poate considera și buget liber pentru ieșire fără să schimbe planul?',labels:{'0':'Economisirea îi transformă în bani suplimentari.','1':'Suma are deja o destinație; folosirea ei schimbă disponibilul pentru curs.','2':'Un obiectiv viitor nu este afectat de cheltuielile de azi.'},explanation:'Cei 200 lei fac parte din planul cursului. Dacă folosește o parte acum, suma lipsă și termenul trebuie recalculate.'}}},
  'cheltuieli-mici-care-se-aduna':{questions:{q5:{question:'Dan vrea să păstreze unele cumpărături și să reducă totalul. Ce test compară beneficiul păstrat cu o cheltuială mai mică?',labels:{'1':'Elimină numai evidența, păstrând toate cumpărăturile.','2':'Reduce prețul presupus în tabel, fără schimbarea plăților.'},explanation:'Reducerea frecvenței de la 20 la 10 zile reduce totalul la 120 lei în exemplu. Dan păstrează unele cumpărături și poate verifica efectul asupra scopului său.'},q7:{labels:{'1':'Doar economisirea unei singure categorii, fără restul bugetului.'}}}}
  ,
  'fomo-si-cheltuieli':{questions:{q1:{labels:{'1':'O nevoie confirmată de faptul că oferta expiră.','2':'Dovada că produsul este util fiindcă îl cumpără grupul.'}},q6:{labels:{'2':'Doar costul biletului, presupunând că restul se poate acoperi ulterior.'}}}},
  'presiunea-sociala':{questions:{q1:{labels:{'1':'Numai achizițiile pe care le-ai planificat înaintea invitației.','2':'Numai cheltuielile mari, fiindcă cele mici nu exprimă așteptări.'}},q2:{question:'Refuzul unei ieșiri care depășește bugetul nu înseamnă automat refuzul relației cu grupul.',explanation:'Poți respecta grupul și păstra o limită financiară. O alternativă sau altă ocazie poate menține legătura fără aceeași cheltuială.'},q6:{question:'Întâlnirea propusă de Radu costă 40 lei, sub limita de 60. Ce sumă descrie alternativa care încape în buget?',explanation:'Varianta de 40 lei lasă 20 lei în limita stabilită. Comparația urmărește o participare suportabilă, fără să impună grupului același buget.'}}},
  'cum-vorbesti-despre-bani':{questions:{q1:{labels:{'2':'O promisiune generală, fără o dată și o sumă.'}},q5:{question:'Lia cere clarificare luni pentru o plată promisă vineri. Care reper permite să constate întârzierea?',labels:{'1':'O promisiune „cândva”, fără dată.','2':'O intenție de plată, fără termen convenit.'},explanation:'Data de vineri a fost convenită și poate fi verificată. O formulare vagă nu oferă același reper pentru discuția despre întârziere.'},q6:{labels:{'0':'Doar confirmarea că Dan vrea să plătească, fără termen.','2':'Doar explicația întârzierii, fără un pas următor.'}}}},
  'cheltuieli-emotionale':{questions:{q2:{question:'O emoție reală poate influența cumpărarea, fără ca produsul să rezolve automat cauza stresului.',explanation:'Confortul promis de achiziție și problema care a declanșat-o sunt distincte. Observarea contextului ajută alegerea, fără să judece orice plăcere.'},q6:{labels:{'0':'Ca să concluzioneze că orice cumpărătură după stres este greșită.','2':'Ca să considere suma din coș bani economisiți deja.'}},q7:{question:'Sofia încearcă o plimbare înainte să revadă coșul. Ce pas introduce o alternativă la cumpărarea imediată?',labels:{'0':'Confirmarea achiziției, urmată de verificarea nevoilor.','1':'Amânarea verificării bugetului până după plată.'},explanation:'Plimbarea introduce o pauză înainte de cost. După ea, Sofia poate verifica utilitatea și bugetul, fără să considere emoția o obligație de cumpărare.'}}}
  ,
  'cat-costa-sa-te-muti-singur':{questions:{q1:{labels:{'1':'Doar chiria, presupunând că garanția poate fi folosită și pentru mutare.','2':'Doar totalul primei luni, aplicat identic tuturor lunilor.'}},q9:{labels:{'2':'Doar suma garanției, fără starea consemnată la predare.'}}}},
  'asigurari-rca-locuinta-calatorie':{questions:{
    q1:{labels:{'2':'Doar suma maximă afișată, fără riscurile excluse.'}},
    q2:{question:'Două polițe cu același titlu pot oferi protecție diferită; prețul mai mic nu înlocuiește citirea condițiilor.',explanation:'Polița acoperă riscurile descrise în condițiile sale. Compară acoperiri, excluderi și limite înainte să presupui că protecția este identică.'},
    q5:{labels:{'1':'Doar țara călătoriei, fără activitățile excluse.','2':'Doar prima mai mică, fără acoperirea sportului planificat.'}},
    q6:{labels:{'0':'O sumă adăugată peste despăgubire.','2':'Întreaga despăgubire datorată, indiferent de valoarea daunei.'}},
    q7:{labels:{'0':'Prima mai mare garantează acoperirea oricărui incident.','1':'Același titlu al poliței garantează condiții identice.'}},
    q9:{labels:{'0':'Doar data plății primei, fără perioada asigurată.','2':'Doar destinația principală, fără restul teritoriului călătoriei.'}}
  }},
  'burse-si-costul-facultatii':{questions:{q1:{labels:{'2':'Doar materialele, presupunând că locuirea nu intră în costul studiilor.'}},q6:{labels:{'2':'În regulile altei facultăți, presupunând că sunt identice.'}}}},
  'cheltuielile-din-supermarket':{questions:{q2:{question:'Un pachet mai ieftin pe kilogram poate costa mai mult pentru nevoia ta dacă o parte nu poate fi păstrată și se strică.',explanation:'Prețul pe unitate și cantitatea folosită trebuie privite împreună. Un avantaj pe etichetă nu compensează automat risipa.'},q5:{labels:{'1':'Ambalajul mare este automat potrivit fiindcă are preț unitar mai mic.'}},q8:{labels:{'2':'Doar prețul pe bucată, fără suma plătită pentru toate trei.'}}}}
  ,
  'tichete-si-beneficii':{questions:{
    q1:{labels:{'2':'Doar valoarea totală din reclamă, fără utilizările permise.'}},
    q2:{question:'O ofertă cu net mai mic, dar cu abonament medical, poate fi utilă în funcție de serviciile folosite; valoarea abonamentului nu este numerar pentru chirie.',explanation:'Banii și serviciile au utilizări diferite. Compară costul înlocuit de beneficiu și netul fix, fără să adaugi valoarea comercială la sold.'},
    q5:{question:'Lia trebuie să plătească chiria. Ce componentă cere acoperire din netul disponibil, chiar dacă pachetul include servicii?',labels:{'1':'Valoarea comercială a abonamentului medical, tratată ca sumă intrată în cont.','2':'Bonusul condiționat, considerat încasat înainte de confirmare.'},explanation:'Chiria cere bani disponibili. Un serviciu sau un bonus posibil nu acoperă automat o plată care trebuie făcută acum.'},
    q6:{labels:{'0':'Doar valoarea nominală, presupunând că poate fi folosită la orice plată.','2':'Doar totalul anual, fără momentul acordării.'}},
    q9:{labels:{'2':'Doar valoarea maximă a bonusului, fără condițiile sale.'}}
  }},
  'pensia-de-ce-conteaza-de-la-primul-salariu':{questions:{
    q2:{question:'Contribuția de pe fluturaș nu trebuie tratată ca bani disponibili pentru o cumpărătură din contul curent.',explanation:'Contribuția ține de un sistem cu reguli proprii de acces. Nu este automat o sumă pe care o poți retrage când dorești.'},
    q3:{labels:{'0':'Doar netul lunar, fără perioadele înregistrate.','2':'Doar primul contract, presupunând că tot istoricul este deja corect.'}},
    q6:{labels:{'0':'Doar numele din mesajul primit, fără o sursă independentă.','2':'Doar suma primei contribuții, fără documentele administratorului.'}},
    q7:{labels:{'0':'Pentru a calcula pensia doar din primul venit, fără regulile sistemului.','1':'Pentru a considera fiecare contribuție imediat retragibilă.'}}
  }},
  'ce-faci-cu-primul-salariu':{questions:{q6:{question:'Radu a separat 300 lei pentru rezervă. Ce sumă are această destinație și nu poate fi numărată simultan pentru telefon?',explanation:'Cei 300 lei au fost separați pentru rezervă. Dacă schimbă destinația, trebuie să arate explicit efectul asupra planului, nu să îi numere de două ori.'},q8:{labels:{'1':'Doar suma primită, presupunând că reprezintă o lună întreagă.'}}}},
  'ce-este-creditul':{questions:{q1:{labels:{'2':'Doar acces la o limită, fără obligații până la prima scadență.'}},q4:{labels:{'1':'Doar limita aprobată, presupunând că banca a confirmat confortul bugetului.'}},q6:{question:'Mara primește 1.000 lei și vede costul de 100 lei. Ce sumă trebuie să acopere sursa ei de rambursare până la termen?',explanation:'Trebuie restituiți 1.100 lei: suma împrumutată plus costul. Planul nu poate acoperi numai costul de 100 lei.'}}},
  'dobanda-fixa-vs-variabila':{questions:{q1:{labels:{'1':'Nivelul inițial, care ar trebui păstrat indiferent de indice.','2':'Doar marja, fără indicele inclus în formulă.'}},q2:{question:'Un credit poate avea doi ani cu dobândă fixă și apoi dobândă variabilă, deci rata de azi nu descrie automat toată durata.',explanation:'Verifică perioada pentru care nivelul este fix. Formula și actualizarea după această perioadă pot schimba estimarea plăților.'},q5:{labels:{'1':'Doar rata inițială, considerată valabilă pe toată durata.','2':'Doar marja ulterioară, fără indice și actualizare.'}},q7:{labels:{'0':'Arată nivelul sigur al indicelui viitor.','1':'Înlocuiește datele creditului necesare pentru calculul ratei.'}}}},
  'cardul-de-credit':{questions:{q5:{labels:{'1':'Că minimumul elimină necesitatea de a citi suma integrală.','2':'Că limita rămasă descrie venitul propriu disponibil.'}},q6:{labels:{'0':'Doar plata minimă, fără suma necesară pentru condițiile grației.','2':'Doar limita disponibilă, fără datoria din extras.'}}}},
  'creditele-rapide-ifn':{questions:{q4:{labels:{'0':'Doar scadența nouă, fără costul prelungirii.'}},q6:{labels:{'2':'Numai viteza aprobării, presupunând că aceasta verifică și costul.'}}}},
  'cum-iesi-din-datorii':{questions:{q6:{labels:{'0':'Rata lunară scade automat pentru toate datoriile.','2':'Costul total devine neimportant când soldul începe să scadă.'}}}}
  ,
  'primul-contract-de-munca':{questions:{
    q1:{labels:{'1':'Numai suma netă primită, fără funcție și program.','2':'Numai condițiile discutate verbal, fără cele scrise.'}},
    q5:{labels:{'1':'Salariul verbal ar trebui folosit ca sumă confirmată înainte de acte.','2':'O perioadă numită probă ar înlocui verificarea contractului.'}},
    q8:{labels:{'1':'Doar totalul promis, presupunând că și partea ascunsă este documentată.','2':'Doar momentul plății, fără baza contribuțiilor și dovada venitului.'}}
  }},
  'munca-part-time-si-student':{questions:{
    q3:{labels:{'0':'Doar numărul orelor zilnice, fără repartizarea lor.','2':'Doar venitul lunar, fără timpul ocupat de navetă.'}},
    q5:{labels:{'1':'Doar salariul lunar, considerând programul deja confirmat.','2':'Doar cele patru ore din ofertă, fără condiția rămânerii suplimentare.'}},
    q6:{labels:{'0':'Trebuie considerată automat parte din orele plătite.','2':'Poate fi ignorată dacă salariul lunar este suficient.'}}
  }},
  'fluturasul-de-salariu':{questions:{
    q1:{labels:{'1':'Doar suma ultimului virament, indiferent de avans.','2':'Doar salariul de bază, fără componentele lunii.'}},
    q2:{question:'Un virament mai mic decât netul lunii poate fi explicat de un avans deja încasat, fără ca salariul net să fi scăzut.',explanation:'Avansul și lichidarea pot fi două părți ale aceluiași net. Verifică ambele intrări și liniile fluturașului înainte să concluzionezi că lipsesc bani.'},
    q4:{labels:{'0':'Doar ultimul virament, fără avansurile din lună.','1':'Doar netul unui coleg, fără perioadă și componente.'}},
    q5:{labels:{'1':'Într-o reducere automată a netului, fără să verifice avansul.','2':'În taxarea încă o dată a viramentului, fără o linie corespunzătoare.'}}
  }},
  'plateste-te-pe-tine-primul':{questions:{
    q5:{labels:{'1':'Contribuția aleasă trebuie păstrată, chiar dacă obligațiile nu mai încap.','2':'Ordinea transferului este suficientă pentru echilibrarea oricărei sume.'}},
    q6:{labels:{'0':'Înregistrează mutarea drept o cheltuială de consum.','2':'Înregistrează intrarea în economii drept un venit nou.'}}
  }},
  'unde-dispar-banii':{questions:{q3:{question:'O gustare costă 12 lei și este cumpărată în 15 zile ale perioadei. Ce total compari cu abonamentul de transport de 120 lei?',explanation:'Gustările costă 180 lei în total, mai mult decât transportul din exemplu. Frecvența poate schimba ordinea categoriilor, fără să impună eliminarea gustărilor.'},q7:{labels:{'1':'Ca să o includă identic în estimarea tuturor lunilor, fără context.'}}}},
  'metoda-50-30-20':{questions:{q3:{question:'Pentru 2.400 lei disponibili, reperul de 20% al metodei indică ce sumă pentru economii sau obiective, înainte de adaptarea la costurile reale?',explanation:'Reperul indică 480 lei. Aceasta este o sumă de pornire pentru comparație, nu o obligație care elimină nevoile reale.'}}},
  'bani-de-buzunar-si-venituri-neregulate':{questions:{q3:{question:'Intrările sunt 300, 700 și 500 lei în trei luni. Ce medie folosești pentru context, fără să o tratezi ca venit garantat luna următoare?',explanation:'Media este 500 lei, dar nu completează automat luna de 300. Pentru plăți folosești suma și momentul intrărilor efective.'}}},
  'piramide-si-scheme-bani-rapizi':{questions:{
    q1:{labels:{'1':'Cât s-a plătit primilor participanți, fără sursa banilor.','2':'Cât costă intrarea, fără clienți din afara recrutării.'}},
    q3:{question:'În schemă, cei trei participanți trebuie să aducă fiecare trei oameni noi care plătesc. De câți participanți noi depinde etapa următoare?',explanation:'Etapa nouă cere nouă oameni. Calculul arată cum crește nevoia de recrutare; nu dovedește că există clienți sau venit sustenabil.'},
    q5:{labels:{'2':'Doar existența unei plăți către coleg, fără sursa venitului.'}}
  }},
  'protejeaza-datele-cardului':{questions:{
    q1:{labels:{'1':'Doar existența unui cod primit, fără operațiunea descrisă.','2':'Doar tipul datelor, presupunând că aceeași solicitare este legitimă pe orice canal.'}},
    q5:{labels:{'1':'O fotografie nu poate autoriza direct plata, deci nu expune niciun risc.'}}
  }},
  'conturi-folosite-de-altii':{questions:{q6:{labels:{'0':'Mărimea comisionului este suficientă pentru evaluarea operațiunii.','2':'O sumă primită în cont devine automat venit legitim.'}}}},
  'ce-faci-daca-ai-fost-inselat':{questions:{
    q4:{labels:{'0':'Doar totalul pierdut, fără destinatari și confirmări.'}},
    q6:{labels:{'0':'Numai suma plătită, fără datele și codurile expuse.','2':'Doar numele folosit de expeditor, fără operațiunea autorizată.'}},
    q7:{labels:{'0':'Plata taxei ar confirma automat că serviciul este legitim.','1':'Suma mică a taxei ar elimina riscul unei noi pierderi.'}},
    q9:{question:'Daria a contactat banca și a păstrat dovezile. Ce poate concluziona despre recuperarea banilor?',labels:{'0':'Contactarea băncii garantează returnarea integrală.','1':'A făcut pași utili, dar rezultatul recuperării trebuie verificat.','2':'Dovezile înlocuiesc orice procedură de verificare.'},explanation:'Limitarea expunerii și dovezile ajută verificarea. Nu confirmă singure recuperarea; urmărește răspunsurile oficiale și pașii potriviți situației.'}
  }},
  'banii-intre-prieteni-si-intr-o-relatie':{questions:{
    q2:{question:'Dacă Lia achită temporar factura comună, plata nu devine automat un cadou pentru Dan.',explanation:'Plata făcută de o persoană și contribuția datorată de cealaltă sunt distincte. Clarificați regula și dacă suma trebuie rambursată.'},
    q3:{question:'Doi colegi au convenit împărțirea egală a facturii de 300 lei. Unul achită integral. Ce contribuție rămâne de rambursat de celălalt?',explanation:'În acordul egal, fiecare suportă 150 lei. Cel care a achitat temporar tot primește contribuția celuilalt, fără să numere plata ca un cadou.'},
    q5:{labels:{'2':'Confirmarea că Lia poate achita temporar, presupunând că stabilește singură contribuția lui Dan.'}},
    q6:{labels:{'0':'Doar faptul că suma a fost trimisă, fără condițiile returnării.','2':'Doar apropierea dintre ei, presupunând că exclude rambursarea.'}},
    q7:{labels:{'0':'Doar dreptul de a vedea soldul, oferind acces pentru plăți.','1':'Doar acordul despre sume, fără limite privind accesul la cont.'}}
  }},
  'efectul-de-ancorare':{questions:{
    q3:{question:'Oferta de 300 lei pare avantajoasă față de 500 lei tăiat. Același produs este 280 lei în altă parte, în aceleași condiții. Cât plătești în plus alegând prima ofertă?',explanation:'Diferența relevantă între alternative este 20 lei. Cei 200 lei față de prețul tăiat nu arată care ofertă actuală are costul mai mic.'},
    q4:{labels:{'1':'Doar dacă prețul vechi a fost real, fără alte oferte actuale.'}},
    q5:{question:'Teo spune „economisesc 200 lei”, fără să fi comparat oferta de 280 lei. Care valoare i-a devenit reper inițial?',labels:{'2':'Bugetul disponibil, fără să fi analizat alte prețuri.'},explanation:'Prețul tăiat de 500 lei i-a format prima comparație. Ofertele actuale comparabile oferă un reper mai util pentru alegere.'}
  }},
  'obiceiuri-bune-cu-banii':{questions:{
    q2:{question:'Dacă ora aleasă pentru verificarea bugetului nu funcționează, schimbarea momentului poate păstra obiceiul util.',explanation:'Un sistem repetabil trebuie să încapă în program. Adaptarea declanșatorului ajută mai mult decât păstrarea unei ore imposibile.'},
    q3:{labels:{'0':'Doar soldul afișat, fără plățile omise și obligațiile.','2':'Doar planul inițial, fără tranzacțiile reale.'}},
    q5:{question:'Lia găsește două plăți mici omise. Ce trebuie inclus ca disponibilul calculat să reflecte realitatea?',labels:{'1':'Numai plățile mari, fiindcă cele mici nu schimbă disponibilul.','2':'Numai cheltuielile prevăzute în planul inițial.'},explanation:'Cele două plăți mici au consumat bani și trebuie incluse. Mărimea lor nu justifică păstrarea unui sold calculat prea mare.'},
    q8:{labels:{'2':'Doar respectarea orei, fără plățile reale.'}}
  }},
  'cum-incepi-cu-sume-mici':{questions:{
    q2:{question:'Un comision fix poate conta mai mult ca procent într-o tranzacție mică, chiar dacă suma comisionului rămâne aceeași.',explanation:'Un cost de 5 lei reprezintă 5% din 100 lei și 1% din 500 lei. Procentul mai mic nu justifică automat expunerea unei sume mai mari.'},
    q3:{question:'Din cei 100 lei disponibili pentru o tranzacție, costul fix este 5 lei. Ce parte din sumă consumă comisionul înainte de orice evoluție a investiției?',explanation:'Comisionul consumă 5% din sumă. Acest cost trebuie separat de evoluția prețului, care rămâne incertă.'},
    q7:{labels:{'0':'Doar suma minimă acceptată, fără registrul oficial.','1':'Doar frecvența tranzacțiilor, fără tarifele aplicabile.'}}
  }},
  'chirie-si-contract-de-inchiriere':{questions:{
    q1:{labels:{'1':'Doar chiria lunară, presupunând că include utilitățile.','2':'Doar garanția, fără condițiile restituirii.'}},
    q2:{question:'Dovada chiriei plătite nu înlocuiește verificarea contractului pentru utilități, garanție și plecarea înainte de termen.',explanation:'Confirmarea plății arată suma și destinația ei. Obligațiile și condițiile încetării trebuie verificate în documentele închirierii.'},
    q6:{labels:{'0':'Numai chiria, fără starea inițială a locuinței.','2':'Doar inventarul bunurilor, fără starea lor și indexuri.'}},
    q7:{labels:{'0':'Doar mesajul că suma a fost primită, fără ce reprezintă.','1':'Numai anunțul cu chiria, fără confirmarea plății.'}},
    q9:{labels:{'2':'Doar condițiile de la începutul contractului, fără încetare.'}}
  }},
  'utilitati-si-cum-citesti-o-factura':{questions:{
    q1:{labels:{'2':'Doar tariful unitar, fără consum și soldul anterior.'}},
    q3:{question:'Consumul costă 100 lei, costul fix este 20 lei și soldul anterior este 30 lei. Ce sumă de plată verifici pe factura din exemplu?',explanation:'Cele trei componente însumează 150 lei, dar numai 100 lei reprezintă consumul. Totalul mai mare nu dovedește singur creșterea tarifului.'},
    q8:{labels:{'1':'Scazi singur diferența din suma de plată, fără clarificare.','2':'Consideri indexul estimat definitiv, fără să păstrezi dovada.'}}
  }},
  'cumperi-casa-sau-inchiriezi':{questions:{
    q2:{question:'Chiar dacă rata creditului este mai mică decât chiria, costurile proprietății și o mutare posibilă pot schimba comparația.',explanation:'Rata nu este costul complet. Avansul, întreținerea și flexibilitatea necesară trebuie evaluate alături de plata lunară.'},
    q4:{labels:{'0':'Doar rata mai mică, presupunând revânzare imediată.','1':'Doar avansul disponibil, fără durata probabilă de ședere.'}},
    q6:{labels:{'0':'Doar rezerva lunară, fără suma necesară la început.','2':'Doar prima rată, presupunând că nu există alt cost inițial.'}}
  }},
  'primul-telefon-sau-laptop':{questions:{
    q3:{question:'Laptopul de 1.800 lei cere un accesoriu necesar de 200 lei. Ce total compari cu bugetul disponibil de 2.000 lei?',explanation:'Costul pentru utilizarea cerută este 2.000 lei, nu numai eticheta laptopului. Accesoriul necesar consumă restul bugetului din exemplu.'},
    q7:{labels:{'0':'Doar marca, presupunând că starea și suportul sunt identice.','1':'Doar reducerea afișată, fără informațiile vânzătorului.'}},
    q9:{labels:{'2':'Doar numărul ratelor, fără valoarea și costurile separate.'}}
  }},
  'cheltuieli-neprevazute':{questions:{
    q6:{labels:{'0':'Doar termenul promoției atelierului, fără diagnostic.','2':'Doar disponibilul din rezervă, fără necesitatea lucrării.'}},
    q7:{question:'După reparație, Sofia vrea să planifice alt cost. Ce sumă mai poate considera disponibilă în aceeași rezervă?',explanation:'După plata celor 400 lei, rezerva de 600 lei mai are 200 lei. Nu poate fi numărată încă întreagă pentru un al doilea scop.'}
  }} ,
  'dobanda-la-credit-si-dae':{questions:{
    q2:{question:'Două credite pot avea aceeași dobândă afișată, dar costuri totale diferite dacă unul cere un comision obligatoriu.',explanation:'Dobânda este o componentă a costului. Comisionul obligatoriu poate schimba comparația, chiar dacă dobânzile din reclame sunt identice.'},
    q3:{labels:{'0':'Prezentarea aceleiași dobânzi ca procent, fără alte costuri.','2':'Împărțirea aceleiași sume de plată în mai multe rânduri descriptive.'}},
    q4:{labels:{'1':'Doar DAE, fără totalul în lei și scadențe.'}},
    q5:{labels:{'1':'Că o DAE mai mică garantează un total în lei mai mic la orice durată.','2':'Că rata lunară cea mai mică identifică întotdeauna costul minim.'}}
  }},
  'rata-lunara-si-costul-total':{questions:{
    q3:{question:'Oferta B cere 24 de rate de 60 lei. Ce total compari cu cei 1.200 lei ai ofertei A?',explanation:'B costă 1.440 lei fără alte costuri. Plata lunară este mai mică, dar repetarea ei pe mai multe luni crește totalul.'},
    q4:{question:'A costă 1.200 lei și B costă 1.440 lei. Ce sumă suplimentară plătești pentru calendarul B, cu rata lunară mai mică?',explanation:'Diferența totală este de 240 lei. Nu o confunda cu reducerea lunară de 40 lei; sunt două criterii diferite.'},
    q5:{question:'De ce plata de 60 lei a ofertei B nu dovedește că împrumutul este mai ieftin?',labels:{'0':'Se repetă 24 de luni, față de 12 luni la oferta A.','1':'Plata lunară include automat orice cost posibil.','2':'Aceeași sumă împrumutată garantează totaluri identice.'},explanation:'B reduce plata lunară, dar o prelungește. Compari atât numărul plăților, cât și totalul lor înainte să decizi.'},
    q7:{labels:{'0':'Doar cea mai mică rată, fără calendarul complet.','1':'Doar înmulțirea ratei lunare, presupunând că nu există plăți separate.'}}
  },details:{'idee-0':'Pentru același împrumut fictiv, 24 de plăți de 60 lei costă 1.440 lei, iar 12 de 100 lei costă 1.200 lei. Prima variantă cere mai puțin lunar, dar mai mult în total.'}},
  'plata-in-rate-si-cumpara-acum-plateste-mai-tarziu':{questions:{
    q2:{question:'O ofertă cu dobândă zero poate cere totuși verificarea scadențelor și a costurilor întârzierii.',explanation:'Condiția de dobândă zero privește scenariul descris în ofertă. Nu elimină obligația de plată sau urmările unei întârzieri.'},
    q3:{question:'Eva are plăți lunare de 100, 80 și 70 lei. O nouă tranșă de 90 lei se suprapune cu ele. Ce sumă trebuie să acopere bugetul în lunile comune?',explanation:'În lunile de suprapunere, obligațiile însumează 340 lei. Evaluarea noii tranșe separat de cele vechi ar subestima presiunea asupra bugetului.'},
    q5:{labels:{'2':'Doar costul primei luni, presupunând că celelalte rate se termină imediat.'}}
  }},
  'scorul-de-credit':{questions:{'radu-informatie':{labels:{'1':'Doar limita aprobată, presupunând că arată ce poate susține bugetul.'}}}},
  'ce-se-intampla-daca-nu-ti-platesti-datoria':{questions:{
    q2:{question:'O conversație cu creditorul nu confirmă singură schimbarea ratelor; trebuie verificate condițiile și acordul documentat.',explanation:'O propunere discutată și un acord confirmat sunt lucruri diferite. În planul de plată folosești termenele și costurile documentate.'},
    q4:{labels:{'0':'Doar rata nouă, fără totalul și durata schimbate.','1':'Doar perioada de amânare, fără costurile care continuă.'}},
    q5:{labels:{'1':'Presupunerea că o rată mai mică va fi acceptată automat.','2':'Un transfer către un cont nou, fără verificarea solicitării.'}},
    q7:{labels:{'0':'Ca să urmărească numai rata lunară, fără restul costurilor.','1':'Ca să folosească totalul inițial, fără plățile și costurile ulterioare.'}}
  }} ,
  'obiective-de-economisire':{questions:{q8:{labels:{'1':'Doar contribuția lunară, presupunând că termenul rămâne realizabil.','2':'Doar procentul de progres, păstrând ținta la prețul vechi.'}}}},
  'unde-tii-banii-cont-depozit-numerar':{questions:{q6:{labels:{'0':'Doar dobânda, presupunând că accesul înainte de termen nu o schimbă.','2':'Doar protecția instituției, fără natura produsului.'}}}},
  'cum-citesti-un-contract':{questions:{
    q1:{labels:{'1':'Doar salariul promis, fără program și responsabilități.','2':'Doar durata, presupunând că anexele nu creează obligații.'}},
    q2:{question:'O ofertă verbală de patru ore și un contract cu opt ore trebuie clarificate înainte să îți planifici programul.',explanation:'Programul scris poate diferi de discuția inițială. Clarifică diferența înainte de acceptare, ca să nu organizezi cursurile după o promisiune neconfirmată.'},
    q3:{labels:{'0':'Doar salariul, presupunând că programul discutat rămâne valabil.','2':'Doar durata contractului, fără punctul de lucru.'}}
  }},
  'salariul-minim':{questions:{
    q3:{labels:{'0':'Care sumă este mai mare, fără data intrării în vigoare.','2':'Care articol se referă la aceeași profesie, fără norma de lucru.'}},
    q5:{labels:{'1':'Totalul cu tichete, presupunând că acesta este salariul de bază.','2':'Totalul cu prima posibilă, presupunând că se plătește lunar.'}},
    q6:{labels:{'0':'Articolul cu suma mai mare este întotdeauna cel aplicabil.','2':'Pragul din articol se aplică automat oricărei norme de lucru.'}}
  }},
  'taxele-pe-salariu-cas-cass-impozit':{questions:{
    q3:{question:'Brutul este 8.000 lei, iar reținerile deja calculate sunt 2.000, 800 și 520 lei. Ce sumă folosești ca net în bugetul acestui exemplu?',explanation:'În buget intră suma după toate cele trei rețineri: 4.680 lei. Folosești liniile furnizate, fără să transformi exercițiul într-o cotă fiscală universală.'},
    q4:{labels:{'0':'Doar procentul, presupunând că baza este întotdeauna salariul brut.','1':'Doar totalul reținerilor unui coleg, fără situația sa.'}},
    q6:{labels:{'0':'Asigurările sociale de sănătate.','2':'Impozitarea venitului salarial.'}},
    q7:{labels:{'0':'Doar suma brută, presupunând o bază comună pentru toate procentele.','1':'Doar procentele memorate, fără deduceri și condițiile situației.'}}
  }},
  'ce-este-inflatia': { questions: {
    'venit-confirmat': { title: 'Venit și prețuri', question:'Venitul confirmat crește cu 5%, iar coșul obișnuit se scumpește cu 10%. Venitul mai mare garantează că poți cumpăra mai mult.', explanation:'Numărul de lei primit crește, dar prețurile relevante cresc mai mult. Pentru puterea de cumpărare compari cele două schimbări, nu doar salariul nou.' },
    'cos-nou': { question:'Ai rezervat 100 lei pentru același coș, care se scumpește cu 10%. Ce sumă trebuie să acopere acum bugetul?', context:'Cantitatea și produsele sunt identice. Procentul este ipotetic, iar venitul rămâne neschimbat.', explanation:'Coșul costă acum 110 lei. Diferența de 10 lei trebuie acoperită prin adaptarea planului; soldul inițial nu crește automat odată cu prețurile.' }
  }},
  'apelul-fals-de-la-banca': {questions:{
    q6:{labels:{'0':'Dacă numele e corect, nu mai trebuie verificată cererea.','2':'Numărul afișat și numele sunt două confirmări independente.'}},
    q9:{labels:{'0':'Certitudinea că apelul este fals, fără alte verificări.','2':'Posibilitatea de a verifica prin numărul dictat de apelant.'}}
  }},
  'anunturi-si-livrari-false': {questions:{
    q5:{labels:{'1':'O încasare cere întotdeauna să aprobi mai întâi o plată.','2':'Codul confirmă doar livrarea, fără efect asupra banilor.'}}
  }},
  'magazine-false': {questions:{
    q4:{labels:{'0':'Confirmarea că pagina are conexiune protejată.','1':'Confirmarea că site-ul folosește adresa unei firme reale.'}},
    q6:{labels:{'0':'Stelele arată numai popularitatea produsului, deci verifică și comerciantul.','2':'Recenziile de pe site sunt suficiente dacă sunt multe.'}},
    q9:{labels:{'0':'Doar totalul pierdut, fără legătura cu tranzacția.','2':'Doar numele firmei copiate, fără adresa exactă a site-ului.'}}
  }},
  'oferte-prea-bune-ca-sa-fie-reale': {questions:{
    q5:{labels:{'1':'Doar prețurile altor modele, fără starea celui oferit.','2':'Doar fotografiile trimise, fără identificarea aparatului.'}}
  }},
  'ce-face-o-banca-si-cum-alegi-un-cont': {questions:{
    q1:{labels:{'1':'Doar comisionul de administrare, fără operațiunile folosite.','2':'Doar bonusul de deschidere, fără costurile ulterioare.'}},
    q3:{question:'Contul costă 10 lei în fiecare lună fără încasarea cerută. Dacă nu îndeplinești condiția tot anul, cât rezervi pentru administrare?',explanation:'Gratuitatea depinde de condiție. În acest scenariu, cele 12 costuri lunare însumează 120 lei, înainte de alte operațiuni.'},
    q5:{labels:{'1':'Dacă titlul „student” este suficient pentru gratuitate.','2':'Dacă transferurile gratuite elimină și administrarea lunară.'}},
    q7:{labels:{'1':'Doar bonusul de deschidere, fără serviciile disponibile.'}}
  }},
  'iban':{questions:{q8:{labels:{'2':'Doar numărul de caractere, fără titularul contului.'}}}},
  'comisioane-bancare':{questions:{
    q1:{labels:{'1':'Doar procentul, fără minimumul pe operațiune.'}},
    q6:{labels:{'0':'Confunda comisionul retragerii cu cel al administrării.','2':'Aplica minimumul o singură dată pentru toate retragerile.'}},
    q9:{labels:{'2':'Numai după procent, fără costuri fixe și frecvență.'}}
  },details:{
    'idee-0':'Un transfer gratuit nu stabilește tariful retragerilor. Caută costul pentru operațiunea, moneda și canalul pe care le folosești.',
    'idee-1':'La tariful ipotetic de 1%, minimum 5 lei, o retragere de 100 lei costă 5 lei. Patru retrageri separate costă 20 lei, fiindcă minimumul se aplică de fiecare dată.'
  }},
  'cardul-de-debit':{questions:{
    q6:{labels:{'0':'Soldul contului cu suma cheltuită efectiv.','2':'Suma numerarului disponibil cu soldul disponibil pe card.'}},
    q7:{question:'Teo are 120 lei în cont și 100 lei în numerar. Poate plăti cu cardul de debit o cumpărătură de 150 lei, fără descoperit de cont?',labels:{'0':'Da, fiindcă resursele sale totale sunt 220 lei.','1':'Da, retragerea anterioară îi mărește automat disponibilul pe card.'},explanation:'Bancnotele din portofel nu sunt disponibile automat pe card. Cei 120 lei din cont nu acoperă plata de 150 lei.'}
  }},
  'plati-digitale':{questions:{
    q1:{labels:{'1':'Fac autentic orice comerciant dacă banca cere autentificare.','2':'Verifică în locul tău că suma corespunde cumpărăturii.'}},
    q5:{labels:{'1':'Doar că telefonul a cerut autentificare.','2':'Doar numele magazinului, fără total.'}},
    q6:{labels:{'0':'O nouă solicitare confirmă automat că prima plată a eșuat.','2':'Aceeași aplicație ar trebui să accepte automat orice solicitare ulterioară.'}}
  }},
  'cardul-in-strainatate':{questions:{
    q1:{labels:{'1':'Doar moneda contului, presupunând că plata nu implică conversie.','2':'Doar prețul în euro, fără tariful serviciului.'}},
    q4:{labels:{'0':'Alegi lei numai fiindcă suma este mai ușor de recunoscut.'}},
    q5:{question:'În condițiile ipotetice din caz, Sofia poate plăti 106 lei prin conversia terminalului sau 100 lei prin card. Ce cost suplimentar acceptă dacă alege terminalul?',explanation:'Pentru aceeași cumpărătură, conversia terminalului costă cu 6 lei mai mult în acest exemplu. Comparația privește totalurile confirmate, fără a generaliza cursul la orice card.'},
    q6:{labels:{'0':'Doar comisionul conversiei din magazin, presupunând că se aplică și retragerii.'}}
  }},
  'extrasul-de-cont':{questions:{q1:{labels:{'2':'Doar suma, presupunând că fiecare rând este consum.'}}}},
  'sunt-banii-mei-in-siguranta-la-banca':{questions:{
    q3:{labels:{'0':'Prin numele instituției, presupunând că toate produsele sunt garantate.'}},
    q5:{labels:{'1':'Dacă apare în aplicația contului, presupunând aceeași protecție.','2':'Dacă randamentul promis depășește dobânda contului, fără riscuri.'}}
  }},
  'contul-pentru-minori':{questions:{
    q1:{labels:{'1':'Doar costul cardului, fără drepturile de acces.'}},
    q4:{labels:{'0':'Doar gratuitatea administrării, fără vizibilitatea tranzacțiilor.','1':'Doar suma primei încasări, fără limitele plăților.'}},
    q5:{labels:{'1':'Dacă orice funcție din reclamă este disponibilă automat unui minor.','2':'Dacă un card asociat oferă toate funcțiile unui cont obișnuit.'}},
    q6:{labels:{'2':'Presupune că regulile vechi rămân valabile până cere alt card.'}}
  }},
  'ce-sunt-banii': { questions: {
    q6: { labels: {'0':'Le alegi după preț, fără să verifici ce accesorii folosești.','2':'Le compari doar după numărul accesoriilor incluse.'} },
    q7: { labels: {'0':'Puterea de cumpărare a rămas aceeași fiindcă soldul este identic.','1':'Economiile trebuie să crească automat când prețul se schimbă.'} },
    q8: { question:'Alex are 100 lei în cont și vrea două bilete de câte 60 lei. Ce contează înainte să plătească cu cardul de debit?', labels: {'1':'Limita înscrisă pentru o singură plată, fără să verifice soldul.','2':'Valoarea banilor primiți luna trecută, chiar dacă i-a cheltuit.'}, explanation:'Cardul accesează banii din cont. Cele două bilete costă împreună 120 lei, iar soldul de 100 lei nu acoperă plata.' }
  }, details: {
    'idee-0':'Poți vinde o carte unei persoane și cumpăra un ghiozdan de la alta. Nu trebuie ca fiecare să aibă exact obiectul dorit de celălalt.',
    'idee-1':'Două etichete în lei pot fi comparate direct ca sumă. Pentru alegere, verifică și dacă produsele rezolvă aceeași nevoie; prețul mai mare nu dovedește utilitatea.',
    'idee-2':'Dacă ghiozdanul se scumpește până la excursie, economiile identice pot să nu mai ajungă. Verifică din nou prețul înainte să consideri obiectivul acoperit.'
  }},
  'venit-cheltuieli-si-ce-ramane': { questions: {
    q1: { question:'Teo primește 400 lei de la familie și 200 lei pentru un proiect. Avea deja 90 lei. Ce sumă reprezintă venitul perioadei?', explanation:'Cei 400 și 200 lei sunt intrări noi. Cei 90 lei existenți fac parte din soldul inițial, nu din venitul perioadei.' },
    q5: { question:'Teo vrea să numere și transferul între conturile lui ca o cheltuială de consum. Ce total descrie cumpărăturile din caz?', explanation:'Transportul, mâncarea, accesoriul și abonamentul însumează 510 lei. Transferul propriu schimbă locul banilor, nu consumul.' }
  }},
  'ce-detii-si-ce-datorezi': { questions: {
    q6: { labels: {'0':'Valoarea tuturor bunurilor, fără termenele de vânzare.','2':'Venitul așteptat după scadență, fără banii disponibili până atunci.'} }
  }},
  'dobanda': { questions: {
    q1: { labels: {'1':'Doar suma; procentul arată singur durata.','2':'Doar perioada; procentul produce aceeași sumă pentru orice bază.'} },
    q3: { question:'Depozitul de 1.000 lei produce 50 lei dobândă într-un an, fără costuri. O ofertă de împrumut afișează tot 5%, dar lunar și cu comision. Ce poți compara deja?', labels: {'0':'Costul împrumutului este sigur tot 50 lei.','1':'Câștigul depozitului este calculabil, dar costul împrumutului cere alte condiții.','2':'Împrumutul este mai ieftin fiindcă procentele sunt egale.'}, explanation:'Cei 50 lei rezultă din baza și durata depozitului. La împrumut, perioada lunară și comisionul schimbă comparația; cifra de 5% nu ajunge.' },
    q4: { labels: {'1':'Compari numai procentul, fiindcă durata este deja inclusă în cifra 5.'} },
    q5: { labels: {'1':'Același procent produce aceeași sumă indiferent de durată.','2':'Dobânda este întotdeauna bani primiți, chiar și la împrumut.'} },
    q6: { leadIn: 'Ioana ar putea avea nevoie de sumă înainte de termen.', labels: {'0':'Doar câștigul la scadență, presupunând că retragerea nu îl afectează.'} },
    q7: { labels: {'0':'Doar dobânda din reclamă, fără celelalte plăți.','1':'Doar prima plată, fără termenele următoare.'} },
    q8: { labels: {'1':'Doar creșterea soldului, fără prețurile cumpărăturilor.','2':'Doar procentul dobânzii, indiferent ce sumă primești.'} },
    q9: { labels: {'0':'Care a fost rata inițială, presupunând că rămâne aceeași?','2':'Cât câștigi dacă folosești rata inițială pentru toată perioada?'} }
  }, details: {
    'idee-0':'La depozit, instituția poate plăti dobândă pentru suma păstrată. La împrumut, tu o plătești pentru folosirea banilor altcuiva; aceeași cifră poate descrie sensuri opuse.',
    'idee-1':'O ofertă de 5% pe lună descrie alt interval decât una de 5% pe an. Adu ofertele la aceeași durată și aceeași sumă înainte să compari rezultatul.',
    'idee-2':'Comisionul și calendarul rambursării pot schimba costul unui împrumut. Pentru economii, verifică și ce se întâmplă dacă ai nevoie de sumă înainte de scadență.'
  }},
  'banca-centrala-bnr': { questions: {
    q3: { labels: {'0':'Da, aceeași modificare se aplică tuturor produselor.','2':'Da, dacă știrea este publicată în aceeași zi.'} },
    q8: { labels: {'1':'Doar valoarea noii rate, fără costurile producătorului.','2':'Doar data deciziei, fără condițiile pieței produsului.'} }
  }},
  'cerere-si-oferta': { questions: {
    q1: { labels: {'1':'Oferta de locuri, fiindcă interesul creează automat capacitate.','2':'Prețul oficial, care trebuie să crească imediat.'} },
    q5: { labels: {'1':'Prețul oficial trebuie să fi crescut, chiar dacă a rămas fix.','2':'Oferta de locuri s-a redus, deși capacitatea sălii este aceeași.'} },
    q6: { labels: {'0':'Prețul trebuie să scadă imediat, indiferent de costuri.','2':'Cererea a crescut automat în aceeași proporție.'} }
  }},
  'impozit-taxa-si-contributie': { questions: {
    q1: { labels: {'1':'Care este suma, presupunând că sumele egale au același rol?','2':'Cui îi plătești, presupunând că toate plățile către stat sunt identice?'} },
    q4: { labels: {'0':'Totalul brut, presupunând că toate reținerile au aceeași bază.','1':'Procentele reținute de un coleg, fără condițiile sale.'} }
  }},
  'costul-real-al-unui-produs': { questions: {
    q3: { question:'Dispozitivul de 250 lei cere transport de 20 lei și un accesoriu necesar de 30 lei. Ce total compari cu un pachet complet?', explanation:'Pentru aceeași utilizare incluzi transportul și accesoriul necesar: 300 lei. Eticheta de 250 lei ascunde o parte din costul inițial.' },
    q4: { question:'Un serviciu opțional costă 10 lei lunar. Dacă îl folosești tot anul, ce sumă rezervi separat de prețul dispozitivului?', explanation:'Plata se repetă în fiecare lună: 120 lei într-un an. O compari separat, după ce stabilești dacă serviciul îți este necesar.' },
    q7: { labels: {'0':'Doar reducerea față de prețul vechi, fără utilizare.','1':'Doar prețul inițial, fără compatibilitate.'} }
  }},
  'bonul-factura-si-chitanta': { questions: {
    q1: { labels: {'1':'Dacă suma este egală cu alta, fără referința operațiunii.','2':'Dacă documentul se numește factură, presupunând că plata e confirmată.'} },
    q3: { labels: {'0':'Numai suma egală, fără comerciant sau referință.','2':'Numai luna emiterii, fără identificarea cumpărării.'} },
    q6: { labels: {'0':'Doar factura, fără detalii despre defect.','2':'Doar extrasul cu suma, fără identificarea produsului.'} }
  }},
  'reduceri-care-nu-sunt-reduceri': { questions: {
    q4: { labels: {'1':'Doar prețul produsului, fără transport și condiția codului.'} }
  }},
  'abonamentele': { questions: {
    q4: { labels: {'1':'Doar diferența față de prețul anterior, fără perioada folosită.'} }
  }},
  'drepturile-consumatorului': { questions: {
    q6: { labels: {'0':'Doar data cumpărării, fără tipul problemei.','2':'Doar prețul produsului, fără modul de cumpărare.'} },
    q7: { labels: {'0':'Doar suma cerută, fără dovezi sau date.','1':'Numai răspunsul comerciantului, fără descrierea problemei.'} }
  }}
};
