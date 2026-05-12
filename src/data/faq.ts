export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  icon: string;
  description: string;
  items: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    name: 'General',
    icon: 'building',
    description: 'About SoleChem, our services, and global reach',
    items: [
      {
        question: 'What is SoleChem?',
        answer: 'SoleChem Europe S.r.l. is a global B2B chemical distributor and manufacturer founded in 2013. We supply 4,480+ high-purity chemical products to customers in over 50 countries across Europe, Asia, the Americas, the Middle East, and Africa.',
      },
      {
        question: 'Where is SoleChem headquartered?',
        answer: 'Our headquarters are located at Via Cassina de\' Pecchi, 12, 20060 Cassina de\' Pecchi (MI), Italy. While our main office is in Italy, we serve customers globally in 50+ countries.',
      },
      {
        question: 'What industries does SoleChem serve?',
        answer: 'We serve 20+ industries including paints & coatings, adhesives & sealants, polyurethane systems, food & beverage, pharmaceuticals, cosmetics, agriculture, textiles, construction, automotive, electronics, water treatment, and more.',
      },
      {
        question: 'What languages does SoleChem support?',
        answer: 'Our team provides support in English, Italian, German, and French. We serve a global customer base and ensure clear communication across all major European languages.',
      },
      {
        question: 'What certifications does SoleChem hold?',
        answer: 'SoleChem is certified to ISO 9001:2015 (Quality Management), ISO 22000:2018 (Food Safety Management), and GMP+ (Feed Safety, SGS Certified). We are also fully REACH-compliant and GDPR-compliant.',
      },
    ],
  },
  {
    name: 'Products & Catalog',
    icon: 'flask',
    description: 'Product range, availability, and specifications',
    items: [
      {
        question: 'How many products does SoleChem offer?',
        answer: 'Our catalog includes over 4,480 chemical products spanning 30+ categories. Products range from basic industrial chemicals to high-purity specialty compounds, polyurethane raw materials, additives, pigments, and more.',
      },
      {
        question: 'How can I search for a specific chemical?',
        answer: 'You can search our product catalog at solechem.com/catalog by chemical name, CAS number, category, or industry application. Our search supports both common and IUPAC names.',
      },
      {
        question: 'Can I request a product that is not in your catalog?',
        answer: 'Yes. If you need a chemical that is not currently listed, contact our sales team at info@solechem.com. We have extensive sourcing networks and can often procure specialty chemicals on request.',
      },
      {
        question: 'What product documentation do you provide?',
        answer: 'We provide complete documentation including Safety Data Sheets (SDS), Certificates of Analysis (COA), Technical Data Sheets (TDS), and REACH registration information for every product. All documents are available upon request.',
      },
      {
        question: 'Do you supply food-grade and pharmaceutical-grade chemicals?',
        answer: 'Yes. Our ISO 22000:2018 certification covers food safety management, and we supply pharmaceutical intermediates and food-grade chemicals with full compliance documentation and batch-specific Certificates of Analysis.',
      },
    ],
  },
  {
    name: 'Ordering & Pricing',
    icon: 'cart',
    description: 'Quotes, orders, minimum quantities, and payment',
    items: [
      {
        question: 'How do I request a quote?',
        answer: 'You can request a quote through our website by clicking "Request Quote" on any page, through individual product pages, or by emailing info@solechem.com directly. Include the product name, CAS number (if known), required quantity, and delivery destination.',
      },
      {
        question: 'How fast will I receive a quote?',
        answer: 'We guarantee a response within 24 hours for all quote requests. Most quotes are delivered within a few business hours during working days (Monday-Friday, 09:00-18:00 CET).',
      },
      {
        question: 'Is there a minimum order quantity (MOQ)?',
        answer: 'MOQs vary by product and depend on the chemical, packaging, and sourcing requirements. Many products are available from 25 kg drums up to full container loads (FCL). Contact our sales team for specific MOQ information.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept bank transfers (SWIFT/SEPA), letters of credit (L/C), and other standard B2B payment methods. Payment terms are discussed on a per-customer basis and depend on order volume and relationship history.',
      },
      {
        question: 'How long are quotes valid?',
        answer: 'Standard quotes are valid for 30 days from the date of issue. For volatile commodities, validity may be shorter due to market price fluctuations. Your quote will always state the exact validity period.',
      },
    ],
  },
  {
    name: 'Shipping & Logistics',
    icon: 'truck',
    description: 'Delivery, packaging, and international shipping',
    items: [
      {
        question: 'Which countries do you ship to?',
        answer: 'We ship to over 50 countries worldwide, covering Europe, Asia, the Americas, the Middle East, and Africa. Our logistics team handles all international shipping requirements including customs documentation.',
      },
      {
        question: 'What packaging options are available?',
        answer: 'Products are available in various packaging formats: drums (25 kg, 200 kg), IBCs (1,000 L), bags (25 kg, 500 kg, 1,000 kg big bags), and bulk tanker loads. Custom packaging can be arranged upon request.',
      },
      {
        question: 'How long does delivery take?',
        answer: 'Delivery times depend on the product availability, order quantity, and destination. Stock items in Europe typically ship within 3-5 business days. International orders may require 2-6 weeks depending on the destination and shipping method.',
      },
      {
        question: 'Do you handle dangerous goods (DG) shipping?',
        answer: 'Yes. Our logistics team is experienced in shipping hazardous and dangerous goods in full compliance with ADR (road), IMDG (sea), and IATA (air) regulations. All shipments include proper classification, labeling, and documentation.',
      },
      {
        question: 'Can I arrange my own freight?',
        answer: 'Yes. We offer both Ex Works (EXW) and delivered pricing (CIF, DAP, DDP). If you have preferred freight partners or logistics arrangements, we can prepare your order for collection from our facilities.',
      },
    ],
  },
  {
    name: 'Quality & Compliance',
    icon: 'shield',
    description: 'Quality assurance, certifications, and regulatory compliance',
    items: [
      {
        question: 'Are your products REACH-compliant?',
        answer: 'Yes. All products we supply to the EU market are fully REACH-compliant. We monitor SVHC (Substances of Very High Concern) updates and maintain current registration status for our entire product range.',
      },
      {
        question: 'How do I get a Certificate of Analysis (COA)?',
        answer: 'We provide batch-specific Certificates of Analysis for every shipment as standard practice. COAs are included with delivery documentation and can also be requested in advance by contacting our quality team.',
      },
      {
        question: 'How do I get Safety Data Sheets (SDS)?',
        answer: 'SDS documents are available for every product in our catalog. You can request them through product pages on our website, by emailing info@solechem.com, or through our technical support team. SDS are provided in English, Italian, German, and French.',
      },
      {
        question: 'What quality control processes do you follow?',
        answer: 'Our ISO 9001:2015 certified quality management system covers incoming material inspection, in-process quality checks, final product testing, storage conditions monitoring, and documentation control. Every batch is tested and verified before shipment.',
      },
      {
        question: 'Do you comply with GMP standards?',
        answer: 'Yes. Our GMP+ (SGS Certified) certification ensures Good Manufacturing Practice compliance. This is particularly important for customers in food, feed, pharmaceutical, and cosmetic industries where GMP compliance is mandatory.',
      },
    ],
  },
  {
    name: 'Manufacturing Services',
    icon: 'factory',
    description: 'Toll manufacturing, contract manufacturing, and custom formulations',
    items: [
      {
        question: 'What manufacturing services does SoleChem offer?',
        answer: 'We offer four core manufacturing services: toll manufacturing (processing your raw materials), contract manufacturing (end-to-end production), custom formulations (R&D-driven tailored solutions), and blending & masterbatches (precision blending with quality control).',
      },
      {
        question: 'What is the difference between toll and contract manufacturing?',
        answer: 'In toll manufacturing, you supply the raw materials and formulation — we process them using our facilities. In contract manufacturing, we handle everything: sourcing, formulation, production, quality control, and delivery. Toll manufacturing gives you more control; contract manufacturing simplifies your operations.',
      },
      {
        question: 'Can you develop custom formulations?',
        answer: 'Yes. Our R&D team develops custom chemical formulations tailored to your specific requirements. We work from initial concept through testing, scale-up, and production. All custom formulations are protected by strict NDA agreements.',
      },
      {
        question: 'What is the minimum batch size for manufacturing?',
        answer: 'Minimum batch sizes vary by product type and process. We can accommodate small-scale pilot batches for development purposes as well as large-scale commercial production runs. Contact our manufacturing team to discuss your specific volume requirements.',
      },
      {
        question: 'Are your manufacturing facilities certified?',
        answer: 'Yes. Our manufacturing operations are certified to ISO 9001:2015, ISO 22000:2018, and GMP+ standards. All facilities maintain strict quality control protocols, environmental compliance, and safety management systems.',
      },
    ],
  },
  {
    name: 'Technical Support',
    icon: 'headset',
    description: 'Expert assistance, consultations, and after-sales support',
    items: [
      {
        question: 'Do you provide technical support?',
        answer: 'Yes. Our technical team includes experienced chemists and industry specialists who provide product selection guidance, application recommendations, regulatory consultations, and troubleshooting support at no additional charge.',
      },
      {
        question: 'Can I get help choosing the right product for my application?',
        answer: 'Absolutely. Contact our technical team with details about your application, performance requirements, and regulatory constraints. We will recommend suitable products from our catalog or suggest custom formulation solutions.',
      },
      {
        question: 'How do I contact SoleChem?',
        answer: 'You can reach us by email at info@solechem.com, by phone at +39 02 3055 6150, or through the contact form on our website. Our team is available Monday-Friday, 09:00-18:00 CET, and we guarantee a response within 24 hours.',
      },
      {
        question: 'Do you offer sample shipments?',
        answer: 'Yes. We provide product samples for evaluation and testing purposes. Sample quantities and terms depend on the product. Contact our sales team to arrange sample delivery to your location.',
      },
    ],
  },
];

export function getAllFAQItems(): { question: string; answer: string }[] {
  return faqCategories.flatMap((cat) => cat.items);
}
