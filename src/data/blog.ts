export interface BlogSection {
  type: 'paragraph' | 'heading' | 'list' | 'quote';
  content: string;
  items?: string[];
  level?: 2 | 3;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: BlogSection[];
  faq: BlogFAQ[];
}

export const blogCategories = ['All', 'Compliance', 'Manufacturing', 'Quality', 'Industry Trends', 'Safety'];

export const blogArticles: BlogArticle[] = [
  // =========================================================================
  // Article 1: REACH Compliance
  // =========================================================================
  {
    slug: 'reach-compliance-guide-chemical-buyers',
    title: 'REACH Compliance Guide for Chemical Buyers',
    excerpt: 'Everything B2B chemical buyers need to know about EU REACH regulation — from registration and authorization to supply chain obligations and compliance strategies.',
    author: 'SoleChem Technical Team',
    date: '2026-05-05',
    readTime: '10 min read',
    category: 'Compliance',
    image: '/industries/Biotechnology & Life Sciences.webp',
    content: [
      { type: 'paragraph', content: 'The EU REACH regulation (Registration, Evaluation, Authorisation and Restriction of Chemicals) is the cornerstone of chemical safety legislation in Europe. For B2B chemical buyers, understanding REACH is not optional — it directly impacts purchasing decisions, supplier selection, and market access across all 27 EU member states.' },
      { type: 'heading', content: 'What Is REACH and Why Does It Matter?', level: 2 },
      { type: 'paragraph', content: 'REACH entered into force in 2007 and is managed by the European Chemicals Agency (ECHA). It places the burden of proof on companies to demonstrate that the chemicals they manufacture, import, or sell are safe for human health and the environment. The regulation applies to all chemical substances — not just new ones — and affects manufacturers, importers, downstream users, and distributors.' },
      { type: 'paragraph', content: 'For buyers, REACH compliance means you must verify that your suppliers have properly registered their substances, provide Safety Data Sheets (SDS), and communicate information about substances of very high concern (SVHCs) throughout the supply chain.' },
      { type: 'heading', content: 'Key REACH Obligations for Chemical Buyers', level: 2 },
      { type: 'list', content: '', items: [
        'Verify supplier registration: Ensure all chemicals purchased above 1 tonne/year are registered with ECHA',
        'Request extended SDS: Obtain Safety Data Sheets with exposure scenarios for all hazardous substances',
        'SVHC monitoring: Track the Candidate List for Substances of Very High Concern (updated twice yearly)',
        'Authorization checks: Confirm that substances requiring authorization have valid approvals for your intended use',
        'Restriction compliance: Verify no purchased substances violate Annex XVII restrictions for your application',
      ]},
      { type: 'heading', content: 'How to Verify Your Supplier\'s REACH Status', level: 2 },
      { type: 'paragraph', content: 'The most reliable way to verify compliance is to request the REACH registration number directly from your supplier. This 18-digit number can be cross-referenced on the ECHA database. At SoleChem, every product in our catalog includes REACH compliance status, and our team provides documentation upon request.' },
      { type: 'heading', content: 'Common REACH Pitfalls for Buyers', level: 3 },
      { type: 'list', content: '', items: [
        'Assuming your supplier handles everything — downstream users have their own obligations',
        'Ignoring SVHC updates — the Candidate List is updated in January and July each year',
        'Not checking restriction conditions — some substances are only restricted for specific uses',
        'Overlooking imported articles — REACH applies to substances in articles above 0.1% w/w',
      ]},
      { type: 'quote', content: 'REACH compliance is a shared responsibility across the entire supply chain. Choosing a supplier who proactively manages compliance significantly reduces your regulatory risk.' },
      { type: 'heading', content: 'How SoleChem Supports Your REACH Compliance', level: 2 },
      { type: 'paragraph', content: 'As a REACH-compliant global distributor, SoleChem provides full regulatory documentation for every product we supply. Our technical team monitors SVHC updates, maintains current Safety Data Sheets, and offers compliance consultations to help buyers navigate the complexities of European chemical regulation. Whether you are importing into the EU for the first time or optimizing an existing supply chain, we serve as your compliance partner.' },
    ],
    faq: [
      { question: 'What is REACH compliance in the chemical industry?', answer: 'REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals) is an EU regulation that requires all chemical substances manufactured or imported into the EU above 1 tonne per year to be registered with ECHA. It ensures chemicals are safe for human health and the environment.' },
      { question: 'Who is responsible for REACH compliance — the buyer or seller?', answer: 'Both parties share responsibility. Manufacturers and importers must register substances, while downstream users (buyers) must ensure they use chemicals within registered conditions of use and communicate SVHC information down the supply chain.' },
      { question: 'How can I check if a chemical is REACH registered?', answer: 'You can verify REACH registration by requesting the registration number from your supplier and checking it on the ECHA database at echa.europa.eu. The registration number is an 18-digit identifier unique to each registration.' },
      { question: 'Does REACH apply to chemicals imported from outside the EU?', answer: 'Yes. If you import chemicals into the EU above 1 tonne per year, you are considered the importer and must ensure REACH registration. Working with an EU-based distributor like SoleChem simplifies this process as we handle registration for our product range.' },
    ],
  },

  // =========================================================================
  // Article 2: Toll vs Contract Manufacturing
  // =========================================================================
  {
    slug: 'toll-manufacturing-vs-contract-manufacturing',
    title: 'Toll Manufacturing vs Contract Manufacturing: Which Is Right for You?',
    excerpt: 'A comprehensive comparison of toll manufacturing and contract manufacturing in the chemical industry — key differences, advantages, cost considerations, and how to choose the right model.',
    author: 'SoleChem Technical Team',
    date: '2026-04-18',
    readTime: '8 min read',
    category: 'Manufacturing',
    image: '/about.webp',
    content: [
      { type: 'paragraph', content: 'When scaling chemical production, businesses face a critical decision: toll manufacturing or contract manufacturing? While both models offer outsourced production capabilities, they differ significantly in terms of control, cost structure, intellectual property, and supply chain integration. Choosing the right model can mean the difference between operational efficiency and costly misalignment.' },
      { type: 'heading', content: 'What Is Toll Manufacturing?', level: 2 },
      { type: 'paragraph', content: 'In toll manufacturing (also called toll processing), you provide the raw materials and formulation to a manufacturer who processes them on your behalf. You retain ownership of the materials throughout the process. The toll manufacturer charges a processing fee — the "toll" — for their equipment, labor, and facility usage. Think of it as renting a factory and its expertise.' },
      { type: 'heading', content: 'What Is Contract Manufacturing?', level: 2 },
      { type: 'paragraph', content: 'Contract manufacturing is a more comprehensive arrangement where the manufacturer handles everything: sourcing raw materials, formulation, production, quality control, and sometimes even packaging and shipping. You specify what you need, and the contract manufacturer delivers the finished product. This is a true end-to-end production partnership.' },
      { type: 'heading', content: 'Key Differences at a Glance', level: 2 },
      { type: 'list', content: '', items: [
        'Raw material ownership: Toll = you own them; Contract = manufacturer sources them',
        'Formulation control: Toll = you provide the formula; Contract = manufacturer may develop it',
        'Cost structure: Toll = processing fee only; Contract = all-inclusive per-unit price',
        'IP protection: Toll = higher control (you own the formula); Contract = requires strong NDA',
        'Scalability: Contract manufacturing typically offers faster scaling since the manufacturer manages procurement',
        'Minimum quantities: Toll often has lower minimums; Contract may require larger commitments',
      ]},
      { type: 'heading', content: 'When to Choose Toll Manufacturing', level: 3 },
      { type: 'paragraph', content: 'Toll manufacturing is ideal when you have proprietary formulations you want to protect, already have reliable raw material suppliers, and need processing capabilities you lack in-house. It works particularly well for specialty chemicals, custom blends, and situations where batch-to-batch consistency from your specific raw materials is critical.' },
      { type: 'heading', content: 'When to Choose Contract Manufacturing', level: 3 },
      { type: 'paragraph', content: 'Contract manufacturing suits companies that want to focus on marketing and sales rather than production logistics. It is the better choice when you need end-to-end production support, want to enter a new market quickly, or lack the expertise to manage raw material procurement for a new product line.' },
      { type: 'quote', content: 'The best manufacturing model is the one that aligns with your business strategy — not just the one with the lowest sticker price. Consider IP, control, scalability, and time-to-market.' },
      { type: 'heading', content: 'SoleChem Manufacturing Services', level: 2 },
      { type: 'paragraph', content: 'SoleChem offers both toll manufacturing and contract manufacturing services, certified to ISO 9001:2015 and GMP+ standards. Whether you need custom blending, full-scale production, or precision formulation, our facilities and technical team deliver quality at scale. Contact us to discuss which model fits your project.' },
    ],
    faq: [
      { question: 'What is the main difference between toll and contract manufacturing?', answer: 'The main difference is ownership and scope. In toll manufacturing, you supply the raw materials and the manufacturer only processes them. In contract manufacturing, the manufacturer handles everything — sourcing, production, and quality control — delivering a finished product.' },
      { question: 'Which is cheaper — toll or contract manufacturing?', answer: 'Toll manufacturing typically has lower per-unit processing fees, but you bear the cost of raw materials and logistics. Contract manufacturing has higher per-unit costs but includes everything. The total cost depends on your raw material sourcing efficiency and production volumes.' },
      { question: 'How do I protect my formula in contract manufacturing?', answer: 'Use a robust Non-Disclosure Agreement (NDA) and ensure the contract clearly states IP ownership. Some companies split their formula across multiple manufacturers so no single partner has the complete recipe. Choose manufacturers with strong IP protection track records.' },
      { question: 'Can I switch from toll to contract manufacturing?', answer: 'Yes. Many companies start with toll manufacturing for greater control during product development, then transition to contract manufacturing once the product is stable and they want to simplify operations. SoleChem supports both models and can facilitate this transition.' },
    ],
  },

  // =========================================================================
  // Article 3: Certificate of Analysis
  // =========================================================================
  {
    slug: 'how-to-read-certificate-of-analysis-coa',
    title: 'How to Read a Certificate of Analysis (COA)',
    excerpt: 'A practical guide for chemical buyers on how to interpret Certificates of Analysis — understanding test results, specifications, and what to look for to ensure product quality.',
    author: 'SoleChem Technical Team',
    date: '2026-03-25',
    readTime: '7 min read',
    category: 'Quality',
    image: '/categories/Pharmaceutical Intermediates.webp',
    content: [
      { type: 'paragraph', content: 'A Certificate of Analysis (COA) is one of the most important documents in chemical procurement. It provides batch-specific test results that confirm a product meets its stated specifications. Yet many buyers receive COAs without fully understanding what they contain or how to evaluate the data. This guide will help you read any COA with confidence.' },
      { type: 'heading', content: 'What Is a Certificate of Analysis?', level: 2 },
      { type: 'paragraph', content: 'A COA is a quality document issued by the manufacturer or an independent laboratory for a specific production batch. It contains the results of analytical tests performed on that batch, compared against established specifications. The COA serves as evidence that the product you received matches the quality you ordered.' },
      { type: 'heading', content: 'Key Components of a COA', level: 2 },
      { type: 'list', content: '', items: [
        'Product identification: Chemical name, grade, CAS number, and catalog/product code',
        'Batch/Lot number: The unique identifier linking the COA to a specific production run',
        'Manufacturing and expiry dates: Production date and shelf-life information',
        'Test parameters: The specific properties tested (purity, moisture, pH, heavy metals, etc.)',
        'Specifications: The acceptable range or limit for each parameter',
        'Results: The actual measured values from testing the specific batch',
        'Test methods: The analytical methods used (HPLC, GC, Karl Fischer, ICP-MS, etc.)',
        'QC approval: Signature or stamp from the Quality Control department',
      ]},
      { type: 'heading', content: 'How to Evaluate COA Results', level: 2 },
      { type: 'paragraph', content: 'The most critical step is comparing the "Result" column against the "Specification" column for each parameter. Every result should fall within the specified range. Pay special attention to purity (usually the first parameter listed), moisture content, and any heavy metal limits — these are the most common sources of quality issues in industrial chemicals.' },
      { type: 'heading', content: 'Red Flags to Watch For', level: 3 },
      { type: 'list', content: '', items: [
        'Results exactly at specification limits — may indicate borderline quality',
        'Missing test parameters — especially for heavy metals or residual solvents',
        'No batch number — the COA cannot be traced to a specific production run',
        'Generic COA (not batch-specific) — this is a specification sheet, not a true COA',
        'Outdated test methods — ensure methods are current pharmacopoeia or industry standards',
      ]},
      { type: 'quote', content: 'A genuine COA is always batch-specific. If the document does not reference a unique lot or batch number, it is a specification sheet — not proof of quality for your specific delivery.' },
      { type: 'heading', content: 'Requesting COAs from Your Supplier', level: 2 },
      { type: 'paragraph', content: 'At SoleChem, we provide batch-specific COAs for every product shipment as standard practice. Our COAs include complete test data, methods used, and QC sign-off. We also offer independent third-party analysis upon request for customers with stringent quality requirements. Never hesitate to request a COA — it is your right as a buyer and a basic quality assurance practice.' },
    ],
    faq: [
      { question: 'What is the difference between a COA and an SDS?', answer: 'A COA (Certificate of Analysis) provides batch-specific test results showing actual quality measurements. An SDS (Safety Data Sheet) provides safety, handling, and hazard information about the chemical in general. Both are essential — the SDS for safe handling, the COA for quality verification.' },
      { question: 'Should I request a COA for every order?', answer: 'Yes. Best practice is to request a batch-specific COA for every shipment, especially for chemicals used in regulated industries (pharmaceutical, food, cosmetics). At SoleChem, COAs are provided automatically with every delivery.' },
      { question: 'What does it mean if a COA result is "within specification"?', answer: 'It means the tested value falls within the acceptable range defined by the product specification. For example, if purity specification is ≥99.0% and the result is 99.5%, it is within specification. Values outside this range indicate the batch does not meet quality standards.' },
      { question: 'Can I request a third-party COA?', answer: 'Yes. If you require independent verification, you can request that the product be tested by an accredited third-party laboratory. SoleChem supports third-party testing requests and can coordinate with accredited labs on your behalf.' },
      { question: 'How long should I keep COAs on file?', answer: 'Industry best practice is to retain COAs for the shelf life of the product plus one year, or according to your industry-specific regulatory requirements. For pharmaceutical and food-grade chemicals, retention periods may be longer (typically 5-7 years).' },
    ],
  },

  // =========================================================================
  // Article 4: Top 10 Industrial Chemicals
  // =========================================================================
  {
    slug: 'top-10-industrial-chemicals-2026',
    title: 'Top 10 Industrial Chemicals in Demand for 2026',
    excerpt: 'An overview of the most in-demand industrial chemicals for 2026 — market drivers, key applications, and supply chain trends shaping the global chemical industry.',
    author: 'SoleChem Technical Team',
    date: '2026-02-12',
    readTime: '9 min read',
    category: 'Industry Trends',
    image: '/hero.webp',
    content: [
      { type: 'paragraph', content: 'The global chemical industry continues to evolve rapidly, driven by sustainability mandates, green chemistry innovation, and shifting supply chain dynamics. As we move through 2026, certain industrial chemicals are seeing increased demand across manufacturing, construction, automotive, and electronics sectors. Here are the top 10 chemicals shaping the market this year.' },
      { type: 'heading', content: '1. Methylene Diphenyl Diisocyanate (MDI)', level: 2 },
      { type: 'paragraph', content: 'MDI remains a cornerstone of the polyurethane industry, used in rigid foam insulation, automotive parts, and adhesives. Growing demand for energy-efficient buildings and lightweight vehicles is pushing MDI consumption to record levels. The global MDI market is projected to exceed $30 billion by 2027.' },
      { type: 'heading', content: '2. Epoxy Resins', level: 2 },
      { type: 'paragraph', content: 'The wind energy and electronics sectors are driving significant growth in epoxy resin demand. These versatile thermosets are essential for wind turbine blades, circuit boards, and protective coatings. Bio-based epoxy alternatives are also gaining traction as sustainability requirements tighten.' },
      { type: 'heading', content: '3. Titanium Dioxide (TiO2)', level: 2 },
      { type: 'paragraph', content: 'As the most widely used white pigment globally, TiO2 demand tracks closely with the paints, coatings, and plastics industries. Regulatory scrutiny in the EU is reshaping the supply landscape, with buyers increasingly seeking high-purity, REACH-compliant grades from trusted suppliers.' },
      { type: 'heading', content: '4. Lithium Hydroxide', level: 2 },
      { type: 'paragraph', content: 'The electric vehicle revolution continues to fuel explosive demand for lithium hydroxide, a key cathode material in lithium-ion batteries. Supply constraints and geopolitical factors are making reliable sourcing partnerships more critical than ever.' },
      { type: 'heading', content: '5. Caustic Soda (Sodium Hydroxide)', level: 2 },
      { type: 'paragraph', content: 'Caustic soda is a fundamental chemical across alumina refining, pulp and paper, water treatment, and chemical synthesis. Its market remains tightly linked to chlorine production, creating unique supply-demand dynamics that procurement teams must monitor closely.' },
      { type: 'heading', content: 'Chemicals 6-10: Rising Stars', level: 2 },
      { type: 'list', content: '', items: [
        'Polyethylene Glycol (PEG) — Pharmaceutical and cosmetics applications continue growing',
        'Isopropyl Alcohol (IPA) — Electronics cleaning and semiconductor manufacturing demand',
        'Adipic Acid — Nylon 6,6 production for automotive and textiles',
        'Acetic Acid — PET bottles and vinyl acetate monomer driving consumption',
        'Silicones — Electronics, healthcare, and construction applications expanding',
      ]},
      { type: 'quote', content: 'Supply chain resilience is the defining procurement challenge of 2026. Companies that diversify their supplier base and build strategic partnerships will outperform those relying on single-source procurement.' },
      { type: 'heading', content: 'How SoleChem Supports Your Procurement', level: 2 },
      { type: 'paragraph', content: 'With 4,480+ products in our catalog and distribution capabilities across 50+ countries, SoleChem provides reliable access to all the chemicals listed above. Our procurement team monitors global supply trends to ensure availability and competitive pricing. Request a quote for any product to receive pricing within 24 hours.' },
    ],
    faq: [
      { question: 'What are the most in-demand industrial chemicals in 2026?', answer: 'The top industrial chemicals by demand in 2026 include MDI (for polyurethane), epoxy resins (for wind energy and electronics), titanium dioxide (for coatings), lithium hydroxide (for EV batteries), and caustic soda (for industrial processing). Demand is driven by sustainability, electrification, and construction trends.' },
      { question: 'How do sustainability trends affect chemical demand?', answer: 'Sustainability is driving demand for bio-based chemicals, recyclable materials, and greener production processes. Chemicals that support energy efficiency (like MDI for insulation) and electrification (like lithium hydroxide for batteries) are seeing the strongest growth.' },
      { question: 'How can I secure reliable chemical supply in 2026?', answer: 'Diversify your supplier base across regions, build strategic relationships with distributors who hold inventory, negotiate framework agreements for critical materials, and monitor supply-demand dynamics for key chemicals. Working with a global distributor like SoleChem provides built-in supply chain resilience.' },
    ],
  },

  // =========================================================================
  // Article 5: SDS Safety Data Sheets
  // =========================================================================
  {
    slug: 'sds-safety-data-sheets-complete-guide',
    title: 'SDS Safety Data Sheets: A Complete Guide for Chemical Buyers',
    excerpt: 'Everything you need to know about Safety Data Sheets — the 16 sections explained, legal requirements, how to use SDS in your workplace, and common mistakes to avoid.',
    author: 'SoleChem Technical Team',
    date: '2026-01-20',
    readTime: '11 min read',
    category: 'Safety',
    image: '/categories/Flame Retardants.webp',
    content: [
      { type: 'paragraph', content: 'Safety Data Sheets (SDS) are the primary documents for communicating chemical hazard information throughout the supply chain. Under REACH, CLP, GHS, and OSHA regulations, suppliers are legally required to provide SDS for hazardous substances. As a buyer, understanding SDS is essential for workplace safety, regulatory compliance, and responsible chemical management.' },
      { type: 'heading', content: 'What Is a Safety Data Sheet?', level: 2 },
      { type: 'paragraph', content: 'An SDS (formerly MSDS — Material Safety Data Sheet) is a standardized document that provides comprehensive information about a chemical substance or mixture. The globally harmonized format contains 16 sections covering identification, hazards, composition, first aid, firefighting, handling, exposure controls, physical properties, stability, toxicology, ecology, disposal, transport, regulation, and additional information.' },
      { type: 'heading', content: 'The 16 Sections of an SDS Explained', level: 2 },
      { type: 'list', content: '', items: [
        'Section 1: Identification — Product name, supplier details, emergency contact',
        'Section 2: Hazard Identification — GHS classification, signal words, pictograms, hazard statements',
        'Section 3: Composition — Chemical identity, CAS number, concentration of ingredients',
        'Section 4: First Aid Measures — Instructions for inhalation, skin contact, eye contact, ingestion',
        'Section 5: Firefighting Measures — Suitable extinguishing media, special hazards, protective equipment',
        'Section 6: Accidental Release — Containment procedures, cleanup methods, environmental precautions',
        'Section 7: Handling & Storage — Safe handling practices, storage conditions, incompatibilities',
        'Section 8: Exposure Controls / PPE — Occupational exposure limits, recommended personal protective equipment',
        'Section 9: Physical & Chemical Properties — Appearance, pH, boiling point, flash point, density',
        'Section 10: Stability & Reactivity — Conditions to avoid, incompatible materials, decomposition products',
        'Section 11: Toxicological Information — Acute toxicity data, chronic effects, carcinogenicity',
        'Section 12: Ecological Information — Aquatic toxicity, persistence, bioaccumulation',
        'Section 13: Disposal Considerations — Waste treatment methods, contaminated packaging disposal',
        'Section 14: Transport Information — UN number, shipping name, hazard class, packing group',
        'Section 15: Regulatory Information — REACH status, national regulations, authorizations',
        'Section 16: Other Information — Revision date, version history, abbreviations',
      ]},
      { type: 'heading', content: 'Most Critical Sections for Buyers', level: 2 },
      { type: 'paragraph', content: 'While all 16 sections are important, buyers should prioritize Section 2 (Hazard Identification) for risk assessment, Section 7 (Handling & Storage) for warehouse planning, Section 8 (PPE) for worker safety, and Section 14 (Transport) for logistics compliance. Section 15 (Regulatory Information) is essential for confirming REACH registration status and any use restrictions.' },
      { type: 'heading', content: 'Common SDS Mistakes to Avoid', level: 3 },
      { type: 'list', content: '', items: [
        'Using outdated SDS — regulations require SDS updates when new hazard data emerges',
        'Not providing SDS to employees who handle chemicals — this is a legal requirement',
        'Ignoring exposure scenarios in extended SDS — these are legally binding conditions of use',
        'Storing SDS only digitally without accessible emergency copies in the workplace',
        'Accepting SDS in a language your workers cannot read — translations may be required',
      ]},
      { type: 'quote', content: 'An SDS is not just a compliance document — it is a practical safety tool that should be accessible to every person who handles, stores, or transports chemicals in your organization.' },
      { type: 'heading', content: 'SDS from SoleChem', level: 2 },
      { type: 'paragraph', content: 'SoleChem provides current, regulation-compliant SDS documents for every product in our catalog. Our SDS are available in multiple languages and are updated whenever regulatory changes occur. You can request SDS for any product through our website or by contacting our technical team directly. We also offer extended SDS with exposure scenarios for REACH-registered substances.' },
    ],
    faq: [
      { question: 'What is the difference between SDS and MSDS?', answer: 'SDS (Safety Data Sheet) is the updated format that replaced MSDS (Material Safety Data Sheet) under the Globally Harmonized System (GHS). The SDS uses a standardized 16-section format, while MSDS formats varied by country. Since 2015, all chemical suppliers should be providing GHS-compliant SDS.' },
      { question: 'Is it a legal requirement to provide SDS?', answer: 'Yes. Under REACH (EU), OSHA HCS (US), and GHS (international), suppliers must provide SDS for all hazardous chemical substances and mixtures. Employers must also make SDS accessible to employees who handle chemicals.' },
      { question: 'How often should SDS be updated?', answer: 'SDS must be updated when new hazard information becomes available, when new risk management measures are implemented, or when an authorization is granted or refused. Under REACH, SDS should also be reviewed if the registration is updated. As a best practice, verify your SDS are no older than 3 years.' },
      { question: 'In which languages should SDS be provided?', answer: 'SDS must be provided in the official language(s) of the country where the chemical is sold or used. In the EU, this means the local language of each member state. SoleChem provides SDS in English, Italian, German, and French, with additional languages available on request.' },
      { question: 'Where can I get SDS for SoleChem products?', answer: 'You can request SDS for any SoleChem product directly through our website product pages, by emailing info@solechem.com, or by contacting our technical team. SDS are provided free of charge for all products in our catalog.' },
    ],
  },
];

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find(a => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string, category: string, count = 3): BlogArticle[] {
  const sameCategory = blogArticles.filter(a => a.slug !== currentSlug && a.category === category);
  const others = blogArticles.filter(a => a.slug !== currentSlug && a.category !== category);
  return [...sameCategory, ...others].slice(0, count);
}
