export interface AssessmentQuestion {
  id: string;
  text: string;
  textFr?: string;
  description?: string;
  descriptionFr?: string;
  type: 'radio' | 'multiselect' | 'dropdown' | 'text' | 'textarea';
  options?: string[];
  optionsFr?: string[];
  required: boolean;
  tooltip?: string;
  tooltipFr?: string;
}

export interface AssessmentSectionData {
  id: string;
  title: string;
  titleFr?: string;
  description: string;
  descriptionFr?: string;
  detailedDescription?: string;
  detailedDescriptionFr?: string;
  weight: string;
  weightFr?: string;
  estimatedTime: string;
  estimatedTimeFr?: string;
  questions: AssessmentQuestion[];
}

export interface FormData {
  [sectionId: string]: {
    [questionId: string]: string | string[];
  };
}

export const assessmentSections: AssessmentSectionData[] = [
  {
    id: 'business-strategy',
    title: 'Business Strategy & Use-Case Readiness',
    titleFr: 'Stratégie métier et préparation des cas d\'usage',
    description: 'Evaluates how clearly your business sees the opportunity for AI, how well near-term use-cases are defined, and how these initiatives align with broader business goals.',
    descriptionFr: 'Cette section évalue si votre organisation possède une compréhension claire de la façon dont l\'IA peut soutenir la croissance de l\'entreprise, l\'efficacité opérationnelle ou l\'impact client.',
    detailedDescription: 'This section evaluates if your organization has a clear understanding of how AI can support business growth, operational efficiency, or customer impact. It checks alignment between AI initiatives and business strategic objectives, business model maturity, and the ability to execute defined use cases with clear ROI vision.',
    detailedDescriptionFr: 'Cette section évalue si votre organisation possède une compréhension claire de la façon dont l\'IA peut soutenir la croissance de l\'entreprise, l\'efficacité opérationnelle ou l\'impact client. Elle vérifie l\'alignement entre les initiatives IA et les objectifs stratégiques de l\'entreprise, la maturité des modèles économiques ainsi que la capacité à exécuter des cas d\'usage définis avec une vision claire du retour sur investissement.',
    weight: '10%',
    estimatedTime: '5–7 minutes',
    estimatedTimeFr: '5–7 minutes',
    questions: [
      {
        id: 'identified-problems',
        text: 'Have you identified concrete opportunities to apply AI in the next 6-12 months?',
        textFr: 'Avez-vous identifié des opportunités concrètes pour appliquer l\'IA au cours des 6 à 12 prochains mois ?',
        type: 'radio',
        required: true,
        options: [
          'Still exploring – no clear ideas yet',
          'Ideas discussed but not formalized',
          '1–2 clear use-cases defined',
          'Multiple use-cases aligned to OKRs / growth strategy',
          'Visionary / long-term ideas identified but not near-term'
        ],
        optionsFr: [
          'Phase d\'exploration – aucune idée précise pour le moment',
          'Idées discutées mais non formalisées',
          '1 à 2 cas d\'usage clairement définis',
          'Plusieurs cas d\'usage alignés sur les OKR / la stratégie de croissance',
          'Idées visionnaires / à long terme identifiées mais pas d\'applications à court terme'
        ]
      },
      {
        id: 'use-case-prioritization',
        text: 'Have you prioritized your use-cases based on business value and feasibility?',
        textFr: 'Avez-vous priorisé vos cas d\'usage selon leur valeur métier et leur faisabilité ?',
        type: 'radio',
        required: true,
        options: [
          'No prioritization yet',
          'Informal prioritization (e.g., team discussion)',
          'Prioritized by perceived value',
          'Prioritized using methodological framework (impact vs feasibility)',
          'Prioritized and mapped to internal capabilities and timelines'
        ],
        optionsFr: [
          'Aucune priorisation à ce stade',
          'Priorisation informelle (ex. discussion d\'équipe)',
          'Priorisés selon la valeur perçue',
          'Priorisés via un cadre méthodologique (impact vs faisabilité)',
          'Priorisés et mappés aux capacités internes et aux échéances'
        ]
      },
      {
        id: 'strategic-alignment',
        text: 'Are your AI initiatives linked to your existing KPIs or OKRs?',
        textFr: 'Vos initiatives IA sont-elles liées à vos indicateurs de performance existants (KPI) ou à vos OKR ?',
        type: 'radio',
        required: true,
        options: [
          'No alignment',
          'Rough alignment',
          'Partial alignment (e.g., linked to 1–2 functions)',
          'Complete alignment across all teams and metrics',
          'AI initiatives are integrated into executive-level OKRs'
        ],
        optionsFr: [
          'Aucun alignement',
          'Alignement approximatif',
          'Alignement partiel (ex. liées à 1–2 fonctions)',
          'Alignement complet sur l\'ensemble des équipes et métriques',
          'Les initiatives IA sont intégrées aux OKR au niveau de la direction générale'
        ]
      },
      {
        id: 'roi-estimation',
        text: 'Have you estimated the financial or operational impact of your AI use-cases?',
        textFr: 'Avez-vous estimé l\'impact financier ou opérationnel de vos cas d\'usage IA ?',
        type: 'radio',
        required: true,
        options: [
          'No estimates',
          'Rough high-level estimates',
          'Basic cost-benefit model',
          'Detailed projections tied to performance indicators and business metrics'
        ],
        optionsFr: [
          'Aucune estimation',
          'Estimations approximatives de haut niveau',
          'Modèle coût-bénéfice de base',
          'Projections détaillées liées aux indicateurs de performance et métriques métier'
        ]
      },
      {
        id: 'business-model-maturity',
        text: 'Which description best matches your current business model state?',
        textFr: 'Quelle description correspond le mieux à l\'état actuel de votre modèle économique ?',
        type: 'radio',
        required: true,
        options: [
          'Pivot / pre-revenue',
          'Initial traction with some paying customers',
          'Repeatable sales with predictable CAC/LTV',
          'Growth stage with diversified revenue streams'
        ],
        optionsFr: [
          'Pivot / pré-chiffre d\'affaires',
          'Traction initiale avec quelques clients payants',
          'Ventes répétables avec CAC/LTV prévisibles',
          'Phase de croissance avec flux de revenus diversifiés'
        ]
      },
      {
        id: 'product-market-fit',
        text: 'Where are you in achieving product-market fit?',
        textFr: 'Où en êtes-vous dans l\'atteinte de l\'adéquation produit-marché ?',
        type: 'radio',
        required: true,
        options: [
          'Not yet product-market fit',
          'In validation phase (pilots, beta users)',
          'Product-market fit achieved in main market',
          'Product-market fit + expansion to adjacent/new markets'
        ],
        optionsFr: [
          'Pas encore d\'adéquation produit-marché',
          'En phase de validation (pilotes, utilisateurs bêta)',
          'Adéquation produit-marché atteinte sur le marché principal',
          'Adéquation produit-marché + expansion vers des marchés adjacents/nouveaux'
        ]
      },
      {
        id: 'competitive-ai-analysis',
        text: 'Have you analyzed how competitors are using AI?',
        textFr: 'Avez-vous analysé l\'utilisation de l\'IA par vos concurrents ?',
        type: 'radio',
        required: true,
        options: [
          'No knowledge',
          'Informal knowledge through observation',
          'Documented competitive AI use-cases',
          'Competitive analysis conducted with strategic implications',
          'We actively monitor competitor AI deployments'
        ],
        optionsFr: [
          'Aucune connaissance',
          'Connaissance informelle par observation',
          'Cas d\'usage IA concurrents documentés',
          'Analyse concurrentielle réalisée avec implications stratégiques',
          'Nous surveillons activement les déploiements IA des concurrents'
        ]
      },
      {
        id: 'primary-ai-objective',
        text: 'What is the main reason driving you to explore or invest in AI?',
        textFr: 'Quelle est la raison principale qui vous pousse à explorer ou investir dans l\'IA ?',
        type: 'radio',
        required: true,
        options: [
          'Save time / increase productivity',
          'Reduce operational costs',
          'Increase revenue / conversion',
          'Improve customer experience / NPS',
          'Accelerate innovation',
          'Strategic positioning / investor attractiveness'
        ],
        optionsFr: [
          'Gagner du temps / accroître la productivité',
          'Réduire les coûts opérationnels',
          'Augmenter le chiffre d\'affaires / la conversion',
          'Améliorer l\'expérience client / le NPS',
          'Accélérer l\'innovation',
          'Positionnement stratégique / attractivité pour les investisseurs'
        ]
      },
      {
        id: 'use-case-definition-blocker',
        text: 'What is the biggest challenge preventing you from defining your use-cases?',
        textFr: 'Quel est le plus grand défi qui vous empêche de définir vos cas d\'usage ?',
        type: 'textarea',
        required: false
      }
    ]
  },
  {
    id: 'financial-readiness',
    title: 'Financial Capacity & Strategic Readiness',
    titleFr: 'Capacité financière et préparation stratégique',
    description: 'Assesses your current budget capacity, funding runway, investor alignment, and clarity on measuring AI ROI.',
    descriptionFr: 'Cette section évalue la capacité actuelle et future de votre organisation à financer les initiatives data et IA.',
    detailedDescription: 'Understanding your financial constraints and stakeholder support helps us recommend sustainable AI adoption strategies that fit your budget and timeline.',
    detailedDescriptionFr: 'Cette section évalue la capacité actuelle et future de votre organisation à financer les initiatives data et IA. Elle examine l\'engagement budgétaire, la durée de financement, l\'alignement des investisseurs ou du conseil d\'administration, ainsi que la capacité à lier les investissements IA à des résultats mesurables et aux cadres de conformité.',
    weight: '10%',
    estimatedTime: '5–7 minutes',
    estimatedTimeFr: '5–7 minutes',
    questions: [
      {
        id: 'monthly-ai-budget',
        text: 'What is your current or planned monthly budget for AI and data projects?',
        textFr: 'Quel est votre budget mensuel actuel ou prévu pour les projets IA et data ?',
        type: 'radio',
        required: true,
        options: [
          'Less than €100',
          '€100–300',
          '€300–1,000',
          '€1,000–3,000',
          'Over €3,000',
          'Depends on ROI',
          'Not yet defined'
        ],
        optionsFr: [
          'Moins de 100 €',
          '100–300 €',
          '300–1 000 €',
          '1 000–3 000 €',
          'Plus de 3 000 €',
          'Dépend du retour sur investissement',
          'Pas encore défini'
        ]
      },
      {
        id: 'annual-tech-budget-share',
        text: 'What percentage of your annual tech budget is allocated to data and AI initiatives?',
        textFr: 'Quel pourcentage de votre budget technologique annuel est alloué aux initiatives data et IA ?',
        type: 'radio',
        required: true,
        options: [
          '0–5%',
          '6–15%',
          '16–30%',
          'Over 30%',
          'No dedicated budget'
        ],
        optionsFr: [
          '0–5%',
          '6–15%',
          '16–30%',
          'Plus de 30%',
          'Aucun budget dédié'
        ]
      },
      {
        id: 'ai-funding-duration',
        text: 'With current resources, how long can you sustain AI/data spending?',
        textFr: 'Avec les ressources actuelles, combien de temps pouvez-vous maintenir vos dépenses en IA/data ?',
        type: 'radio',
        required: true,
        options: [
          'Less than 3 months',
          '3–6 months',
          '6–12 months',
          'Over 12 months',
          'Uncertain'
        ],
        optionsFr: [
          'Moins de 3 mois',
          '3–6 mois',
          '6–12 mois',
          'Plus de 12 mois',
          'Incertain'
        ]
      },
      {
        id: 'roi-investment-threshold',
        text: 'What would be your threshold for increasing AI/data investment?',
        textFr: 'Quel serait votre seuil pour augmenter l\'investissement en IA/data ?',
        type: 'radio',
        required: true,
        options: [
          'No additional investment planned',
          'Would invest if ROI is demonstrable',
          'Would invest if strategic alignment is clear',
          'Budget already in proactive increase',
          'Not sure'
        ],
        optionsFr: [
          'Aucun investissement supplémentaire prévu',
          'Investirais si le ROI est démontrable',
          'Investirais si l\'alignement stratégique est clair',
          'Budget déjà en augmentation proactive',
          'Pas sûr'
        ]
      },
      {
        id: 'investor-board-ai-support',
        text: 'How supportive are your investors or board of AI initiatives?',
        textFr: 'À quel point vos investisseurs ou votre conseil d\'administration soutiennent-ils les initiatives IA ?',
        type: 'radio',
        required: true,
        options: [
          'Yes – budget already approved',
          'Discussions ongoing',
          'Not yet – but openness possible',
          'No support currently'
        ],
        optionsFr: [
          'Oui – budget déjà approuvé',
          'Discussions en cours',
          'Pas encore – mais ouverture possible',
          'Pas de soutien actuellement'
        ]
      },
      {
        id: 'investor-sentiment-context',
        text: 'Share any insights, concerns, or enthusiasm your board/investors have expressed about AI.',
        textFr: 'Partagez tout aperçu, préoccupation ou enthousiasme que votre conseil/investisseurs ont exprimé concernant l\'IA.',
        type: 'textarea',
        required: false
      },
      {
        id: 'expected-ai-benefits-timeline',
        text: 'Within what timeframe do you expect concrete benefits from AI initiatives?',
        textFr: 'Dans quel délai attendez-vous des bénéfices concrets des initiatives IA ?',
        type: 'radio',
        required: true,
        options: [
          'Less than 1 month',
          '1–3 months',
          '3–6 months',
          '6–12 months',
          'Over 12 months'
        ],
        optionsFr: [
          'Moins d\'1 mois',
          '1–3 mois',
          '3–6 mois',
          '6–12 mois',
          'Plus de 12 mois'
        ]
      },
      {
        id: 'strategic-ai-partnerships',
        text: 'Do you currently have strategic partnerships to support your AI efforts (e.g., universities, consultants, vendors)?',
        textFr: 'Avez-vous actuellement des partenariats stratégiques pour soutenir vos efforts IA (ex. universités, consultants, fournisseurs) ?',
        type: 'radio',
        required: true,
        options: [
          'None currently',
          'Informal collaboration or vendor discussions',
          'Signed partnership(s) in place',
          'Multiple active partnerships across R&D, vendors, and services',
          'Not applicable'
        ],
        optionsFr: [
          'Aucun pour l\'instant',
          'Collaboration informelle ou discussions avec fournisseurs',
          'Partenariat(s) signé(s) en place',
          'Plusieurs partenariats actifs en R&D, fournisseurs et services',
          'Non applicable'
        ]
      },
      {
        id: 'applicable-legal-compliance',
        text: 'Which regulatory or legal frameworks are relevant to your AI and data use?',
        textFr: 'Quels cadres réglementaires ou juridiques sont pertinents pour votre utilisation de l\'IA et des données ?',
        type: 'multiselect',
        required: true,
        options: [
          'GDPR',
          'HIPAA',
          'SOC 2',
          'PCI-DSS',
          'AI Act (EU)',
          'ISO/IEC 27001',
          'None',
          'Uncertain / researching'
        ],
        optionsFr: [
          'RGPD',
          'HIPAA',
          'SOC 2',
          'PCI-DSS',
          'AI Act (UE)',
          'ISO/IEC 27001',
          'Aucun',
          'Incertain / en recherche'
        ]
      },
      {
        id: 'roi-proof-metrics',
        text: 'Which metrics will be used to evaluate AI initiative success?',
        textFr: 'Quelles métriques seront utilisées pour évaluer le succès des initiatives IA ?',
        type: 'multiselect',
        required: true,
        options: [
          'Time saved',
          'Cost reduction',
          'Revenue increase',
          'Lead generation / conversion',
          'Customer satisfaction / NPS',
          'Operational reliability',
          'Employee engagement',
          'Model performance (e.g., accuracy, recall)',
          'We don\'t measure success yet',
          'Other'
        ],
        optionsFr: [
          'Temps économisé',
          'Réduction des coûts',
          'Augmentation du chiffre d\'affaires',
          'Génération / conversion de prospects',
          'Satisfaction client / NPS',
          'Fiabilité opérationnelle',
          'Engagement des employés',
          'Performance du modèle (ex. précision, rappel)',
          'Nous ne mesurons pas encore le succès',
          'Autre'
        ]
      }
    ]
  },
  {
    id: 'data-maturity',
    title: 'Data Maturity & Governance',
    titleFr: 'Maturité des données et gouvernance',
    description: 'Assesses your data infrastructure, governance, privacy, and security controls to determine if your data foundation is ready for AI.',
    descriptionFr: 'Cette section évalue l\'architecture data de votre organisation, les contrôles qualité, les pratiques de gouvernance et la préparation en matière de confidentialité.',
    detailedDescription: 'Your data foundation is critical for AI success. This section evaluates how well-structured, governed, and secure your data is.',
    detailedDescriptionFr: 'Cette section évalue l\'architecture data de votre organisation, les contrôles qualité, les pratiques de gouvernance et la préparation en matière de confidentialité. Elle aide à évaluer si vos données peuvent soutenir de manière fiable les efforts d\'IA et d\'automatisation, tant sur le plan opérationnel que réglementaire.',
    weight: '25%',
    weightFr: '25%',
    estimatedTime: '6–8 minutes',
    estimatedTimeFr: '6–8 minutes',
    questions: [
      {
        id: 'data-storage',
        text: 'Where are your business-critical data stored?',
        textFr: 'Où sont stockées les données métier critiques de votre entreprise ?',
        type: 'multiselect',
        required: true,
        options: [
          'Google Sheets / Excel',
          'Airtable / Notion',
          'CRM (e.g. HubSpot, Salesforce)',
          'Internal database / data warehouse',
          'Cloud storage (e.g. Drive, Dropbox, S3)',
          'External SaaS tools / silos',
          'Not yet centralized',
          'Other'
        ],
        optionsFr: [
          'Google Sheets / Excel',
          'Airtable / Notion',
          'CRM (ex. HubSpot, Salesforce)',
          'Base de données interne / entrepôt de données',
          'Stockage cloud (ex. Drive, Dropbox, S3)',
          'Outils SaaS externes / silos',
          'Pas encore centralisé',
          'Autre'
        ]
      },
      {
        id: 'data-types-managed',
        text: 'What types of structured data does your team actively maintain?',
        textFr: 'Quels types de données structurées votre équipe maintient-elle activement ?',
        type: 'multiselect',
        required: true,
        options: [
          'Customer / user data',
          'Product usage events',
          'Operations / logistics data',
          'Financial and billing data',
          'Survey responses / feedback',
          'System logs / telemetry',
          'No structured data yet'
        ],
        optionsFr: [
          'Données clients / utilisateurs',
          'Événements d\'utilisation produit',
          'Données opérationnelles / logistiques',
          'Données financières et de facturation',
          'Réponses d\'enquêtes / commentaires',
          'Journaux système / télémétrie',
          'Aucune donnée structurée pour l\'instant'
        ]
      },
      {
        id: 'data-structure-types',
        text: 'What types of data structure do you regularly manage?',
        textFr: 'Quels types de structure de données gérez-vous régulièrement ?',
        type: 'multiselect',
        required: true,
        options: [
          'Structured (e.g. tables, CSV, SQL)',
          'Semi-structured (e.g. JSON, XML, YAML)',
          'Unstructured (e.g. PDFs, emails, images, audio)',
          'No classification done yet'
        ],
        optionsFr: [
          'Structurées (ex. tableaux, CSV, SQL)',
          'Semi-structurées (ex. JSON, XML, YAML)',
          'Non structurées (ex. PDF, emails, images, audio)',
          'Aucune classification effectuée pour l\'instant'
        ]
      },
      {
        id: 'data-ownership',
        text: 'Who is accountable for maintaining data quality and managing access?',
        description: 'Clear data ownership ensures accountability and proper maintenance of your AI data pipeline.',
        type: 'radio',
        required: true,
        options: [
          'No clear owner',
          'Tech / engineering team',
          'Department leads share responsibility',
          'Dedicated data steward / team'
        ]
      },
      {
        id: 'data-confidence',
        text: 'How confident are you in the quality and up-to-dateness of your data?',
        description: 'Data quality directly impacts AI model accuracy and business decision reliability.',
        type: 'radio',
        required: true,
        options: [
          'Low – frequent discrepancies',
          'Moderate – spot-checks only',
          'Good – basic validation rules in place',
          'High – automated tests and alerts'
        ]
      },
      {
        id: 'security-controls',
        text: 'What protective measures do you have in place for data?',
        description: 'Security controls are essential for protecting sensitive data used in AI systems.',
        type: 'multiselect',
        required: true,
        options: [
          'Encryption at rest',
          'Encryption in transit (TLS)',
          'Role-based access control',
          'Audit logs / access tracking',
          'Data-loss prevention tools',
          'Tokenization or anonymization',
          'None'
        ]
      },
      {
        id: 'pii-handling',
        text: 'Do you process personal or sensitive data, and if so, how do you manage it?',
        description: 'Proper PII handling is crucial for compliance and ethical AI deployment.',
        type: 'radio',
        required: true,
        options: [
          'No PII processed',
          'Yes, but no formal process',
          'Yes, with documented GDPR/CCPA compliance',
          'Not sure / reviewing'
        ]
      },
      {
        id: 'audit-readiness',
        text: 'Can you provide records of how AI systems use personal data in compliance with GDPR or AI Act?',
        description: 'Audit readiness ensures you can demonstrate compliance and explain AI decision-making processes.',
        type: 'radio',
        required: true,
        options: [
          'No tracking in place',
          'Partial logs or model usage documentation',
          'Logs available for critical use-cases',
          'Complete audit trail and explainability system in place'
        ]
      },
      {
        id: 'data-preprocessing-consistency',
        text: 'How consistently are your data sets pre-processed and cleaned to be AI-ready?',
        description: 'Consistent data preprocessing ensures reliable AI model performance and reduces time-to-deployment for new AI initiatives.',
        type: 'radio',
        required: true,
        options: [
          'Rarely pre-processed',
          'Sometimes, depending on project',
          'Mostly pre-processed and AI-ready',
          'Fully standardized and automated'
        ]
      },
      {
        id: 'analytics-tools-integration',
        text: 'How advanced and integrated are your analytics tools for AI-related data and projects?',
        description: 'Advanced, integrated analytics tools accelerate AI development and enable more sophisticated data science workflows.',
        type: 'radio',
        required: true,
        options: [
          'General purpose tools only, little AI capability',
          'Some AI-optimized tools, limited integration',
          'AI-optimized tools, moderate integration',
          'Fully integrated, advanced, and scalable for AI'
        ]
      },
      {
        id: 'data-lineage-tracking',
        text: 'Do you track the origin, transformation, and usage of your data (data lineage) for AI models?',
        description: 'Data lineage tracking ensures data quality, enables debugging of AI models, and supports regulatory compliance requirements.',
        type: 'radio',
        required: true,
        options: [
          'No tracking',
          'Some manual logs/project notes',
          'Automated tracking for critical projects only',
          'Comprehensive, automated lineage tracking'
        ]
      },
      {
        id: 'external-data-validation',
        text: 'How do you validate the quality and reliability of external data sources for AI?',
        description: 'External data validation prevents poor-quality data from compromising AI model accuracy and business decisions.',
        type: 'radio',
        required: true,
        options: [
          'No checks',
          'Basic manual checks',
          'Systematic, documented checks',
          'Peer review or third-party audit'
        ]
      },
      {
        id: 'data-anonymization',
        text: 'Are personal or sensitive data sets anonymized before being used in AI applications?',
        description: 'Data anonymization protects user privacy, ensures regulatory compliance, and reduces legal risks in AI deployments.',
        type: 'radio',
        required: true,
        options: [
          'Never',
          'Sometimes, depending on project',
          'Usually, but not always',
          'Always, as part of a formal policy'
        ]
      }
    ]
  },
  {
    id: 'technical-infrastructure',
    title: 'Technical Infrastructure',
    titleFr: 'Infrastructure technique',
    description: 'Assesses your technology stack, integration reliability, automation maturity, and readiness to scale AI-driven workflows.',
    descriptionFr: 'Cette section évalue la robustesse de votre stack technologique — comment les données circulent entre les outils, comment les intégrations sont maintenues, et si votre infrastructure peut supporter l\'IA évolutive, l\'automatisation et la prise de décision basée sur les données.',
    detailedDescription: 'Your technical foundation determines how easily we can integrate AI solutions and scale them across your organization.',
    detailedDescriptionFr: 'Cette section évalue la robustesse de votre stack technologique — comment les données circulent entre les outils, comment les intégrations sont maintenues, et si votre infrastructure peut supporter l\'IA évolutive, l\'automatisation et la prise de décision basée sur les données.',
    weight: '15%',
    estimatedTime: '5–6 minutes',
    estimatedTimeFr: '5–6 minutes',
    questions: [
      {
        id: 'digital-platforms',
        text: 'Which digital tools and platforms does your team rely on?',
        textFr: 'Quels outils et plateformes numériques votre équipe utilise-t-elle ?',
        description: 'Understanding your tech stack helps us recommend AI integrations that work seamlessly with your existing tools.',
        descriptionFr: 'Comprendre votre stack technologique nous aide à recommander des intégrations IA qui fonctionnent parfaitement avec vos outils existants.',
        type: 'multiselect',
        required: true,
        options: [
          'Communication (Slack, Teams, Discord)',
          'Docs & Knowledge (Google Docs, Notion, Office 365)',
          'Project & Issue Tracking (Trello, Asana, ClickUp, Jira)',
          'CRM & Revenue (HubSpot, Salesforce, Pipedrive)',
          'Design / Creative (Figma, Canva, Adobe XD)',
          'Development & Repos (GitHub, GitLab, Replit)',
          'Analytics & BI (GA4, Looker, Mixpanel, Amplitude)',
          'Advertising (Meta Ads, Google Ads, LinkedIn Ads)',
          'Marketing Automation (Brevo, Mailchimp, ActiveCampaign)',
          'E-commerce (Shopify, WooCommerce, Prestashop)',
          'Finance & Billing (Stripe, QuickBooks, Pennylane)',
          'Automation (Zapier, Make, n8n)',
          'Other'
        ],
        optionsFr: [
          'Communication (Slack, Teams, Discord)',
          'Docs & Connaissances (Google Docs, Notion, Office 365)',
          'Suivi de projets & problèmes (Trello, Asana, ClickUp, Jira)',
          'CRM & Revenus (HubSpot, Salesforce, Pipedrive)',
          'Design / Créatif (Figma, Canva, Adobe XD)',
          'Développement & Repos (GitHub, GitLab, Replit)',
          'Analytics & BI (GA4, Looker, Mixpanel, Amplitude)',
          'Publicité (Meta Ads, Google Ads, LinkedIn Ads)',
          'Automatisation marketing (Brevo, Mailchimp, ActiveCampaign)',
          'E-commerce (Shopify, WooCommerce, Prestashop)',
          'Finance & Facturation (Stripe, QuickBooks, Pennylane)',
          'Automatisation (Zapier, Make, n8n)',
          'Autre'
        ]
      },
      {
        id: 'tool-integration',
        text: 'How well are your tools and systems connected to each other?',
        textFr: 'À quel point vos outils et systèmes sont-ils connectés entre eux ?',
        description: 'Integration level affects how easily we can deploy AI solutions that work across your entire workflow.',
        descriptionFr: 'Le niveau d\'intégration affecte la facilité avec laquelle nous pouvons déployer des solutions IA qui fonctionnent dans l\'ensemble de votre workflow.',
        type: 'radio',
        required: true,
        options: [
          'Fully integrated – seamless data flow',
          'Partially integrated – key systems only',
          'Mostly siloed – manual exports needed',
          'Not sure'
        ],
        optionsFr: [
          'Entièrement intégré – flux de données transparent',
          'Partiellement intégré – systèmes clés uniquement',
          'Principalement en silos – exports manuels nécessaires',
          'Incertain'
        ]
      },
      {
        id: 'integration-reliability',
        text: 'How stable are your data connections and automations?',
        textFr: 'Quelle est la stabilité de vos connexions de données et automatisations ?',
        description: 'System reliability determines the level of AI automation we can recommend and trust for critical processes.',
        descriptionFr: 'La fiabilité du système détermine le niveau d\'automatisation IA que nous pouvons recommander et faire confiance pour les processus critiques.',
        type: 'radio',
        required: true,
        options: [
          'Frequently – weekly issues',
          'Occasionally – monthly issues',
          'Rarely – few problems per quarter',
          'Never – reliable'
        ],
        optionsFr: [
          'Fréquemment – problèmes hebdomadaires',
          'Occasionnellement – problèmes mensuels',
          'Rarement – quelques problèmes par trimestre',
          'Jamais – fiable'
        ]
      },
      {
        id: 'implementation-ownership',
        text: 'Who is responsible for implementing tools and integrations?',
        textFr: 'Qui est responsable de l\'implémentation des outils et intégrations ?',
        description: 'Understanding your technical resources helps us recommend the right level of AI solution complexity.',
        descriptionFr: 'Comprendre vos ressources techniques nous aide à recommander le bon niveau de complexité des solutions IA.',
        type: 'radio',
        required: true,
        options: [
          'Internal tech / engineering team',
          'Operations or product team',
          'External agency / contractor',
          'No dedicated owner'
        ],
        optionsFr: [
          'Équipe technique / ingénierie interne',
          'Équipe opérations ou produit',
          'Agence / contractant externe',
          'Aucun propriétaire dédié'
        ]
      },
      {
        id: 'manual-transfers',
        text: 'Where do you still manually move or copy-paste data?',
        textFr: 'Où déplacez-vous ou copiez-collez-vous encore manuellement des données ?',
        description: 'Manual data transfers are prime candidates for AI automation and efficiency improvements.',
        descriptionFr: 'Les transferts manuels de données sont des candidats prioritaires pour l\'automatisation IA et les améliorations d\'efficacité.',
        type: 'multiselect',
        required: true,
        options: [
          'CRM → spreadsheet',
          'Email → reports / docs',
          'Project tools → docs / slides',
          'Dashboard → dashboard consolidation',
          'Other'
        ],
        optionsFr: [
          'CRM → tableur',
          'Email → rapports / documents',
          'Outils de projet → docs / présentations',
          'Tableau de bord → consolidation de tableaux de bord',
          'Autre'
        ]
      },
      {
        id: 'automation-comfort',
        text: 'How comfortable are you personally with building automations?',
        textFr: 'À quel point êtes-vous à l\'aise personnellement avec la création d\'automatisations ?',
        description: 'Your technical comfort level helps us recommend the right balance of self-service vs. managed AI solutions.',
        descriptionFr: 'Votre niveau de confort technique nous aide à recommander le bon équilibre entre solutions IA en libre-service vs. gérées.',
        type: 'radio',
        required: true,
        options: [
          'Very comfortable – build from scratch',
          'Can follow guides',
          'Need support',
          'Not my role'
        ],
        optionsFr: [
          'Très à l\'aise – construction à partir de zéro',
          'Capable de suivre des guides',
          'Besoin de support',
          'Ce n\'est pas mon rôle'
        ]
      },
      {
        id: 'automation-platforms',
        text: 'Which automation tools are you currently using?',
        textFr: 'Quels outils d\'automatisation utilisez-vous actuellement ?',
        description: 'Existing automation experience indicates readiness for more advanced AI-powered workflow optimization.',
        descriptionFr: 'L\'expérience d\'automatisation existante indique la préparation pour une optimisation de workflow plus avancée alimentée par l\'IA.',
        type: 'multiselect',
        required: true,
        options: [
          'Zapier',
          'Make (Integromat)',
          'n8n',
          'None yet',
          'Other'
        ],
        optionsFr: [
          'Zapier',
          'Make (Integromat)',
          'n8n',
          'Aucun pour l\'instant',
          'Autre'
        ]
      },
      {
        id: 'system-reliability',
        text: 'How often do your critical systems experience downtime or performance issues?',
        textFr: 'À quelle fréquence vos systèmes critiques connaissent-ils des pannes ou des problèmes de performance ?',
        description: 'System reliability affects our AI deployment strategy and the level of redundancy we recommend.',
        descriptionFr: 'La fiabilité du système affecte notre stratégie de déploiement IA et le niveau de redondance que nous recommandons.',
        type: 'radio',
        required: true,
        options: [
          'Frequent issues (weekly problems affecting productivity)',
          'Occasional issues (monthly disruptions)',
          'Rare issues (quarterly minor problems)',
          'Highly reliable (minimal downtime, strong monitoring)'
        ],
        optionsFr: [
          'Problèmes fréquents (problèmes hebdomadaires affectant la productivité)',
          'Problèmes occasionnels (perturbations mensuelles)',
          'Problèmes rares (problèmes mineurs trimestriels)',
          'Très fiable (temps d\'arrêt minimal, surveillance solide)'
        ]
      },
      {
        id: 'gpu-compute-resources',
        text: 'Do you have access to dedicated GPU or high-performance compute resources for AI workloads?',
        textFr: 'Avez-vous accès à des GPU dédiés ou des ressources de calcul haute performance pour les charges de travail IA ?',
        description: 'High-performance computing resources are essential for training and running advanced AI models efficiently.',
        descriptionFr: 'Les ressources de calcul haute performance sont essentielles pour entraîner et exécuter efficacement des modèles IA avancés.',
        type: 'radio',
        required: true,
        options: [
          'None',
          'Experimental/sandbox only',
          'Sufficient for current projects',
          'Scalable and ready for future growth'
        ],
        optionsFr: [
          'Aucune',
          'Expérimental/bac à sable uniquement',
          'Suffisant pour les projets actuels',
          'Évolutif et prêt pour la croissance future'
        ]
      },
      {
        id: 'resource-allocation-scaling',
        text: 'How are compute/network resources allocated and scaled for new AI workloads?',
        textFr: 'Comment les ressources de calcul/réseau sont-elles allouées et mises à l\'échelle pour les nouvelles charges de travail IA ?',
        description: 'Resource allocation strategy affects how quickly you can deploy and scale AI solutions.',
        descriptionFr: 'La stratégie d\'allocation des ressources affecte la rapidité avec laquelle vous pouvez déployer et mettre à l\'échelle les solutions IA.',
        type: 'radio',
        required: true,
        options: [
          'Manual, ad hoc',
          'Automated for some workloads',
          'Mostly automated with some manual oversight',
          'Fully automated and demand-driven'
        ],
        optionsFr: [
          'Manuel, ad hoc',
          'Automatisé pour certaines charges de travail',
          'Principalement automatisé avec surveillance manuelle',
          'Entièrement automatisé et piloté par la demande'
        ]
      },
      {
        id: 'high-throughput-systems',
        text: 'Are your IT/network systems designed for high-throughput, low-latency AI data operations?',
        textFr: 'Vos systèmes IT/réseau sont-ils conçus pour des opérations de données IA à haut débit et faible latence ?',
        description: 'Network and data infrastructure capabilities determine real-time AI application performance.',
        descriptionFr: 'Les capacités d\'infrastructure réseau et de données déterminent les performances des applications IA en temps réel.',
        type: 'radio',
        required: true,
        options: [
          'Not at all',
          'Somewhat, only for pilot projects',
          'Designed for moderate scaling',
          'Fully designed for enterprise AI scale'
        ],
        optionsFr: [
          'Pas du tout',
          'Quelque peu, uniquement pour les projets pilotes',
          'Conçu pour une mise à l\'échelle modérée',
          'Entièrement conçu pour l\'échelle IA d\'entreprise'
        ]
      },
      {
        id: 'ai-specific-security',
        text: 'Do you have security measures specific to AI and ML workloads (beyond general IT security)?',
        textFr: 'Avez-vous des mesures de sécurité spécifiques aux charges de travail IA et ML (au-delà de la sécurité IT générale) ?',
        description: 'AI workloads require specialized security considerations for models, data, and inference pipelines.',
        descriptionFr: 'Les charges de travail IA nécessitent des considérations de sécurité spécialisées pour les modèles, les données et les pipelines d\'inférence.',
        type: 'radio',
        required: true,
        options: [
          'None',
          'Under review/consideration',
          'Some controls in place',
          'Comprehensive and regularly updated'
        ],
        optionsFr: [
          'Aucune',
          'En cours d\'examen/considération',
          'Quelques contrôles en place',
          'Complet et régulièrement mis à jour'
        ]
      },
      {
        id: 'power-energy-impact',
        text: 'Have you assessed and planned for the power/energy impact of scaling AI infrastructure?',
        textFr: 'Avez-vous évalué et planifié l\'impact énergétique de la mise à l\'échelle de l\'infrastructure IA ?',
        description: 'AI infrastructure can significantly impact energy consumption and operational costs.',
        descriptionFr: 'L\'infrastructure IA peut considérablement impacter la consommation d\'énergie et les coûts opérationnels.',
        type: 'radio',
        required: true,
        options: [
          'Not considered',
          'Limited awareness',
          'Under assessment/planning',
          'Fully planned and optimized'
        ],
        optionsFr: [
          'Non considéré',
          'Conscience limitée',
          'En cours d\'évaluation/planification',
          'Entièrement planifié et optimisé'
        ]
      }
    ]
  },
  {
    id: 'automation-ai-agents',
    title: 'Automation & AI Agents',
    titleFr: 'Automatisation et Agents IA',
    description: 'Surfaces workflow bottlenecks, automation opportunities, team readiness, and preferences for deploying AI assistants.',
    descriptionFr: 'Identifie les goulots d\'étranglement des workflows, les opportunités d\'automatisation, la préparation de l\'équipe et les préférences pour déployer des assistants IA.',
    detailedDescription: 'This section identifies the best opportunities for AI agents and automation to maximize your team\'s productivity and efficiency.',
    detailedDescriptionFr: 'Cette section identifie les meilleures opportunités pour les agents IA et l\'automatisation afin de maximiser la productivité et l\'efficacité de votre équipe.',
    weight: '20%',
    weightFr: '20%',
    estimatedTime: '6-8 minutes',
    estimatedTimeFr: '6-8 minutes',
    questions: [
      {
        id: 'repetitive-tasks',
        text: 'Which tasks regularly consume staff time and could be improved or automated?',
        textFr: 'Quelles tâches consomment régulièrement du temps personnel et pourraient être améliorées ou automatisées ?',
        description: 'Identifying repetitive tasks helps us prioritize the highest-impact AI automation opportunities.',
        descriptionFr: 'Identifier les tâches répétitives nous aide à prioriser les opportunités d\'automatisation IA à plus fort impact.',
        type: 'multiselect',
        required: true,
        options: [
          'Reporting / dashboard updates',
          'Scheduling meetings or reminders',
          'Email or Slack follow-ups',
          'Data entry / copy-paste',
          'Answering routine client questions / FAQs',
          'Internal status updates',
          'Ticket tagging or triage',
          'Other'
        ],
        optionsFr: [
          'Rapports / mises à jour de tableaux de bord',
          'Planification de réunions ou rappels',
          'Suivis par email ou Slack',
          'Saisie de données / copier-coller',
          'Réponses aux questions clients de routine / FAQ',
          'Mises à jour de statut interne',
          'Étiquetage ou triage de tickets',
          'Autre'
        ]
      },
      {
        id: 'manual-customer-journeys',
        text: 'Which customer-facing processes have excessive manual intervention?',
        textFr: 'Quels processus orientés client ont une intervention manuelle excessive ?',
        description: 'Customer journey automation can significantly improve experience while reducing team workload.',
        descriptionFr: 'L\'automatisation du parcours client peut considérablement améliorer l\'expérience tout en réduisant la charge de travail de l\'équipe.',
        type: 'multiselect',
        required: true,
        options: [
          'Onboarding',
          'Support request resolution',
          'Invoicing & payments',
          'FAQ handling',
          'Community moderation',
          'None / N.A.'
        ],
        optionsFr: [
          'Intégration',
          'Résolution de demandes de support',
          'Facturation et paiements',
          'Gestion des FAQ',
          'Modération communautaire',
          'Aucun / N.A.'
        ]
      },
      {
        id: 'automated-alerts',
        text: 'Have you set up automated alerts for your workflows?',
        textFr: 'Avez-vous configuré des alertes automatisées pour vos workflows ?',
        description: 'Existing alert systems indicate automation maturity and readiness for more sophisticated AI monitoring.',
        descriptionFr: 'Les systèmes d\'alerte existants indiquent la maturité d\'automatisation et la préparation pour une surveillance IA plus sophistiquée.',
        type: 'radio',
        required: true,
        options: [
          'Yes – fully reliable',
          'Partially – only for critical events',
          'None – manual monitoring'
        ],
        optionsFr: [
          'Oui – entièrement fiable',
          'Partiellement – uniquement pour les événements critiques',
          'Aucune – surveillance manuelle'
        ]
      },
      {
        id: 'top-automation-priority',
        text: 'Which process would you prioritize for automation?',
        textFr: 'Quel processus prioriseriez-vous pour l\'automatisation ?',
        description: 'Understanding your top priority helps us focus our AI recommendations on your most pressing needs.',
        descriptionFr: 'Comprendre votre priorité principale nous aide à concentrer nos recommandations IA sur vos besoins les plus urgents.',
        type: 'textarea',
        required: true
      },
      {
        id: 'never-automate',
        text: 'Which processes must remain human-managed?',
        textFr: 'Quels processus doivent rester gérés par des humains ?',
        description: 'Identifying processes that should stay human ensures our AI recommendations respect your business values and requirements.',
        descriptionFr: 'Identifier les processus qui doivent rester humains garantit que nos recommandations IA respectent vos valeurs métier et exigences.',
        type: 'textarea',
        required: true
      },
      {
        id: 'ai-agent-tasks',
        text: 'Identify areas where an AI assistant could provide immediate value.',
        textFr: 'Identifiez les domaines où un assistant IA pourrait apporter une valeur immédiate.',
        description: 'These represent the quickest wins for AI agent deployment in your organization.',
        descriptionFr: 'Celles-ci représentent les gains les plus rapides pour le déploiement d\'agents IA dans votre organisation.',
        type: 'multiselect',
        required: true,
        options: [
          'Customer support (chat / email)',
          'Report generation & insights',
          'Drafting emails or messages',
          'Lead qualification & scoring',
          'Summarizing meetings & action items',
          'Market / competitor research',
          'Onboarding flows & checklist enforcement',
          'Monitoring & alerts',
          'Other'
        ],
        optionsFr: [
          'Support client (chat / email)',
          'Génération de rapports et insights',
          'Rédaction d\'emails ou messages',
          'Qualification et scoring de prospects',
          'Résumé de réunions et actions',
          'Recherche marché / concurrents',
          'Flux d\'intégration et application de checklists',
          'Surveillance et alertes',
          'Autre'
        ]
      },
      {
        id: 'agent-autonomy',
        text: 'How much control should you retain when using AI assistants?',
        textFr: 'Combien de contrôle devriez-vous conserver lors de l\'utilisation d\'assistants IA ?',
        description: 'Your comfort with AI autonomy determines the type of agents we recommend and how they\'re deployed.',
        descriptionFr: 'Votre confort avec l\'autonomie IA détermine le type d\'agents que nous recommandons et comment ils sont déployés.',
        type: 'radio',
        required: true,
        options: [
          'Fully autonomous – end-to-end execution',
          'Human-in-the-loop – requires approval before action',
          'Assistant only – suggests, no execution',
          'Not sure yet'
        ],
        optionsFr: [
          'Entièrement autonome – exécution de bout en bout',
          'Humain dans la boucle – nécessite approbation avant action',
          'Assistant seulement – suggère, pas d\'exécution',
          'Pas encore sûr'
        ]
      },
      {
        id: 'agent-interface',
        text: 'How would you prefer to interact with an AI agent?',
        textFr: 'Comment préféreriez-vous interagir avec un agent IA ?',
        description: 'Interface preference affects user adoption and determines the best deployment approach for your team.',
        descriptionFr: 'La préférence d\'interface affecte l\'adoption utilisateur et détermine la meilleure approche de déploiement pour votre équipe.',
        type: 'multiselect',
        required: true,
        options: [
          'Chatbot in Slack / Teams',
          'Embedded widget (in Notion, CRM, etc.)',
          'Stand-alone dashboard interface',
          'Email-based assistant',
          'Command-line / API',
          'Need guidance'
        ],
        optionsFr: [
          'Chatbot dans Slack / Teams',
          'Widget intégré (dans Notion, CRM, etc.)',
          'Interface de tableau de bord autonome',
          'Assistant basé sur email',
          'Ligne de commande / API',
          'Besoin de conseils'
        ]
      },
      {
        id: 'deployment-blockers',
        text: 'What challenges could delay or complicate AI agent deployment?',
        textFr: 'Quels défis pourraient retarder ou compliquer le déploiement d\'agents IA ?',
        description: 'Understanding potential blockers helps us design implementation strategies that address your specific constraints.',
        descriptionFr: 'Comprendre les obstacles potentiels nous aide à concevoir des stratégies d\'implémentation qui répondent à vos contraintes spécifiques.',
        type: 'multiselect',
        required: true,
        options: [
          'Data not ready / too siloed',
          'Team not aligned on use-cases',
          'Lack of technical support',
          'Budget constraints',
          'Privacy or compliance concerns',
          'Unclear ROI',
          'Other'
        ],
        optionsFr: [
          'Données pas prêtes / trop en silos',
          'Équipe pas alignée sur les cas d\'usage',
          'Manque de support technique',
          'Contraintes budgétaires',
          'Préoccupations de confidentialité ou conformité',
          'ROI peu clair',
          'Autre'
        ]
      },
      {
        id: 'agent-data-access',
        text: 'Which data sources would an agent need access to?',
        textFr: 'À quelles sources de données un agent aurait-il besoin d\'accéder ?',
        description: 'Data access requirements help us design secure, effective AI agents that can provide meaningful assistance.',
        descriptionFr: 'Les exigences d\'accès aux données nous aident à concevoir des agents IA sécurisés et efficaces qui peuvent fournir une assistance significative.',
        type: 'multiselect',
        required: true,
        options: [
          'Customer records / CRM',
          'Product usage events',
          'Financial / billing data',
          'Knowledge base / Docs / FAQs',
          'Operations / logistics tables',
          'None / unsure yet',
          'Other'
        ],
        optionsFr: [
          'Dossiers clients / CRM',
          'Événements d\'utilisation produit',
          'Données financières / facturation',
          'Base de connaissances / Docs / FAQ',
          'Tables opérations / logistique',
          'Aucune / incertain pour l\'instant',
          'Autre'
        ]
      },
      {
        id: 'process-documentation',
        text: 'How well documented are your current workflows and processes?',
        textFr: 'À quel point vos workflows et processus actuels sont-ils bien documentés ?',
        description: 'Process documentation quality affects how quickly we can deploy AI agents and how accurately they can assist your team.',
        descriptionFr: 'La qualité de la documentation des processus affecte la rapidité avec laquelle nous pouvons déployer des agents IA et leur précision d\'assistance à votre équipe.',
        type: 'radio',
        required: true,
        options: [
          'Mostly undocumented – knowledge in people\'s heads',
          'Basic documentation for some key processes',
          'Good documentation that\'s regularly updated',
          'Comprehensive, detailed process documentation with clear standards'
        ],
        optionsFr: [
          'Principalement non documenté – connaissances dans la tête des gens',
          'Documentation de base pour certains processus clés',
          'Bonne documentation mise à jour régulièrement',
          'Documentation de processus complète et détaillée avec standards clairs'
        ]
      },
      {
        id: 'automation-maturity',
        text: 'How successful have your previous automation efforts been?',
        textFr: 'À quel point vos efforts d\'automatisation précédents ont-ils été réussis ?',
        description: 'Past automation experience indicates your team\'s readiness for more advanced AI-powered automation.',
        descriptionFr: 'L\'expérience d\'automatisation passée indique la préparation de votre équipe pour une automatisation plus avancée alimentée par l\'IA.',
        type: 'radio',
        required: true,
        options: [
          'No significant automation attempts yet',
          'Basic automation with mixed results and frequent maintenance needs',
          'Good automation success with reliable workflows for routine tasks',
          'Advanced automation with sophisticated workflows and monitoring',
          'Comprehensive automation strategy with continuous optimization'
        ],
        optionsFr: [
          'Aucune tentative d\'automatisation significative encore',
          'Automatisation de base avec résultats mitigés et besoins de maintenance fréquents',
          'Bon succès d\'automatisation avec workflows fiables pour tâches routinières',
          'Automatisation avancée avec workflows sophistiqués et surveillance',
          'Stratégie d\'automatisation complète avec optimisation continue'
        ]
      },
      {
        id: 'ai-agent-access-controls',
        text: 'How are permissions and access controls managed for AI agents interacting with sensitive data or systems?',
        textFr: 'Comment les permissions et contrôles d\'accès sont-ils gérés pour les agents IA interagissant avec des données ou systèmes sensibles ?',
        description: 'Proper access controls ensure AI agents operate securely within appropriate boundaries.',
        descriptionFr: 'Des contrôles d\'accès appropriés garantissent que les agents IA opèrent de manière sécurisée dans les limites appropriées.',
        type: 'radio',
        required: true,
        options: [
          'No specific controls',
          'Manual controls, project by project',
          'Automated access controls for critical systems',
          'Dynamic, real-time access control with auditing'
        ],
        optionsFr: [
          'Aucun contrôle spécifique',
          'Contrôles manuels, projet par projet',
          'Contrôles d\'accès automatisés pour systèmes critiques',
          'Contrôle d\'accès dynamique en temps réel avec audit'
        ]
      }
    ]
  },
  {
    id: 'team-ai-literacy',
    title: 'Team AI Literacy & Development',
    titleFr: 'Littératie IA et Développement d\'Équipe',
    description: 'Assesses team experience, skill levels, knowledge-sharing, upskilling, and responsibility for AI initiatives.',
    descriptionFr: 'Évalue l\'expérience de l\'équipe, les niveaux de compétences, le partage de connaissances, la montée en compétences et la responsabilité des initiatives IA.',
    detailedDescription: 'Understanding your team\'s AI experience and learning culture helps us recommend the right training and support approaches.',
    detailedDescriptionFr: 'Comprendre l\'expérience IA de votre équipe et la culture d\'apprentissage nous aide à recommander les bonnes approches de formation et de support.',
    weight: '15%',
    weightFr: '15%',
    estimatedTime: '5-6 minutes',
    estimatedTimeFr: '5-6 minutes',
    questions: [
      {
        id: 'current-ai-tools',
        text: 'Which AI-powered tools are already in use by your team?',
        textFr: 'Quels outils alimentés par l\'IA sont déjà utilisés par votre équipe ?',
        description: 'Current AI tool usage indicates your team\'s comfort level and existing familiarity with AI workflows.',
        descriptionFr: 'L\'utilisation actuelle d\'outils IA indique le niveau de confort de votre équipe et la familiarité existante avec les workflows IA.',
        type: 'multiselect',
        required: true,
        options: [
          'ChatGPT (OpenAI)',
          'Claude (Anthropic)',
          'Custom GPTs / assistants',
          'Notion AI',
          'Canva AI / Copy.ai (content creation)',
          'GitHub Copilot / Replit / Ghostwriter (coding)',
          'None yet',
          'Other'
        ],
        optionsFr: [
          'ChatGPT (OpenAI)',
          'Claude (Anthropic)',
          'GPT personnalisés / assistants',
          'Notion AI',
          'Canva AI / Copy.ai (création de contenu)',
          'GitHub Copilot / Replit / Ghostwriter (codage)',
          'Aucun pour l\'instant',
          'Autre'
        ]
      },
      {
        id: 'ai-usage-frequency',
        text: 'How often do team members use AI tools in their tasks?',
        textFr: 'À quelle fréquence les membres de l\'équipe utilisent-ils des outils IA dans leurs tâches ?',
        description: 'Usage frequency indicates adoption readiness and potential resistance to new AI implementations.',
        descriptionFr: 'La fréquence d\'utilisation indique la préparation à l\'adoption et la résistance potentielle aux nouvelles implémentations IA.',
        type: 'radio',
        required: true,
        options: [
          'Daily',
          'Weekly',
          'Occasionally',
          'Rarely',
          'Never'
        ],
        optionsFr: [
          'Quotidiennement',
          'Hebdomadairement',
          'Occasionnellement',
          'Rarement',
          'Jamais'
        ]
      },
          'Never'
        ]
      },
      {
        id: 'ai-use-cases',
        text: 'What do you currently use AI tools for?',
        textFr: 'À quoi utilisez-vous actuellement les outils IA ?',
        description: 'Current use cases help us understand where your team sees value and where we can expand AI adoption.',
        descriptionFr: 'Les cas d\'usage actuels nous aident à comprendre où votre équipe voit de la valeur et où nous pouvons étendre l\'adoption IA.',
        type: 'multiselect',
        required: true,
        options: [
          'Content creation & copywriting',
          'Data analysis & insights',
          'Coding & code review',
          'Brainstorming / ideation',
          'Summarizing meetings / memos',
          'Customer support responses',
          'Reporting & slide generation',
          'Other'
        ],
        optionsFr: [
          'Création de contenu et rédaction',
          'Analyse de données et insights',
          'Codage et révision de code',
          'Brainstorming / idéation',
          'Résumé de réunions / mémos',
          'Réponses de support client',
          'Génération de rapports et présentations',
          'Autre'
        ]
      },
      {
        id: 'skill-exposure-level',
        text: 'Which best describes your team\'s combined familiarity and practice with AI tools?',
        textFr: 'Qu\'est-ce qui décrit le mieux la familiarité et la pratique combinées de votre équipe avec les outils IA ?',
        description: 'Skill level determines the complexity of AI solutions we can recommend and the training support needed.',
        descriptionFr: 'Le niveau de compétence détermine la complexité des solutions IA que nous pouvons recommander et le support de formation nécessaire.',
        type: 'radio',
        required: true,
        options: [
          'Beginner – under 1 hour learning, basic usage',
          'Explorer – 1–5 hours, reuse & tweak prompts',
          'Practitioner – 6–20 hours, write structured prompts',
          'Power User – over 20 hours, builds prompt chains & workflows',
          'Highly varied across team'
        ],
        optionsFr: [
          'Débutant – moins d\'1 heure d\'apprentissage, usage basique',
          'Explorateur – 1-5 heures, réutilise et ajuste les prompts',
          'Praticien – 6-20 heures, écrit des prompts structurés',
          'Utilisateur avancé – plus de 20 heures, construit des chaînes de prompts et workflows',
          'Très varié dans l\'équipe'
        ]
      },
      {
        id: 'knowledge-sharing',
        text: 'How does your team share knowledge around AI usage?',
        textFr: 'Comment votre équipe partage-t-elle les connaissances autour de l\'usage IA ?',
        description: 'Knowledge sharing culture affects how quickly new AI tools and techniques will be adopted across your team.',
        descriptionFr: 'La culture de partage de connaissances affecte la rapidité avec laquelle les nouveaux outils et techniques IA seront adoptés dans votre équipe.',
        type: 'radio',
        required: true,
        options: [
          'Yes – regularly share tips, maintain a library',
          'Occasionally share tips',
          'Mostly siloed – minimal sharing',
          'Did not know this was possible / allowed'
        ],
        optionsFr: [
          'Oui – partage régulièrement des conseils, maintient une bibliothèque',
          'Partage occasionnellement des conseils',
          'Principalement en silos – partage minimal',
          'Ne savait pas que c\'était possible / autorisé'
        ]
      },
      {
        id: 'upskilling-approach',
        text: 'How is your team building skills around AI?',
        textFr: 'Comment votre équipe développe-t-elle des compétences autour de l\'IA ?',
        description: 'Your current upskilling approach helps us recommend appropriate training and support strategies.',
        descriptionFr: 'Votre approche actuelle de montée en compétences nous aide à recommander des stratégies de formation et de support appropriées.',
        type: 'radio',
        required: true,
        options: [
          'No formal upskilling approach yet',
          'Ad-hoc self-learning',
          'Dedicated training budget (courses, workshops)',
          'Cross-functional AI champions lead sessions',
          'Structured curriculum with certification roadmap'
        ],
        optionsFr: [
          'Pas encore d\'approche formelle de montée en compétences',
          'Auto-apprentissage ad hoc',
          'Budget de formation dédié (cours, ateliers)',
          'Champions IA transversaux dirigent les sessions',
          'Curriculum structuré avec feuille de route de certification'
        ]
      },
      {
        id: 'ai-ownership',
        text: 'How is responsibility for AI distributed in your organization?',
        textFr: 'Comment la responsabilité de l\'IA est-elle distribuée dans votre organisation ?',
        description: 'AI ownership structure affects implementation speed and the level of coordination needed for success.',
        descriptionFr: 'La structure de propriété IA affecte la vitesse d\'implémentation et le niveau de coordination nécessaire pour le succès.',
        type: 'radio',
        required: true,
        options: [
          'No owner yet – looking for one',
          'Single champion (part-time)',
          '2–3 cross-functional leads',
          'Dedicated AI / data squad',
          'Outsourced to external advisors or consultants'
        ],
        optionsFr: [
          'Pas encore de propriétaire – en recherche',
          'Champion unique (temps partiel)',
          '2-3 responsables transversaux',
          'Équipe IA / données dédiée',
          'Externalisé à des conseillers ou consultants externes'
        ]
      },
      {
        id: 'learning-adaptability',
        text: 'How quickly does your team typically adapt to new tools and technologies?',
        textFr: 'À quelle vitesse votre équipe s\'adapte-t-elle typiquement aux nouveaux outils et technologies ?',
        description: 'Learning pace affects our rollout strategy and the timeline for realizing AI benefits.',
        descriptionFr: 'Le rythme d\'apprentissage affecte notre stratégie de déploiement et le calendrier pour réaliser les bénéfices IA.',
        type: 'radio',
        required: true,
        options: [
          'Slow adoption (several months to see regular usage)',
          'Moderate adoption (4–8 weeks with training support)',
          'Fast adoption (2–4 weeks with good onboarding)',
          'Very fast adoption (within 1–2 weeks, largely self-directed)'
        ],
        optionsFr: [
          'Adoption lente (plusieurs mois pour voir usage régulier)',
          'Adoption modérée (4-8 semaines avec support de formation)',
          'Adoption rapide (2-4 semaines avec bon onboarding)',
          'Adoption très rapide (dans 1-2 semaines, largement auto-dirigée)'
        ]
      },
      {
        id: 'ai-accessibility',
        text: 'How does your organization ensure AI tools and workflows are accessible to differently abled employees?',
        textFr: 'Comment votre organisation s\'assure-t-elle que les outils et workflows IA sont accessibles aux employés ayant des capacités différentes ?',
        description: 'Inclusive AI design ensures all team members can benefit from AI tools and workflows.',
        descriptionFr: 'La conception IA inclusive garantit que tous les membres de l\'équipe peuvent bénéficier des outils et workflows IA.',
        type: 'radio',
        required: true,
        options: [
          'Not considered',
          'Limited awareness, no action',
          'Ad-hoc adjustments as needed',
          'Proactively included in all adoption and training'
        ],
        optionsFr: [
          'Non considéré',
          'Conscience limitée, aucune action',
          'Ajustements ad hoc selon les besoins',
          'Inclus proactivement dans toute adoption et formation'
        ]
      },
      {
        id: 'ai-talent-strategy',
        text: 'What is your approach to attracting and retaining top AI talent?',
        textFr: 'Quelle est votre approche pour attirer et retenir les meilleurs talents IA ?',
        description: 'Having the right AI talent is crucial for successful AI implementation and innovation.',
        descriptionFr: 'Avoir les bons talents IA est crucial pour une implémentation et innovation IA réussies.',
        type: 'radio',
        required: true,
        options: [
          'No specific strategy',
          'Rely on external partners',
          'Basic retention/hiring programs',
          'Comprehensive talent pipeline and retention plan'
        ],
        optionsFr: [
          'Pas de stratégie spécifique',
          'S\'appuie sur des partenaires externes',
          'Programmes de base de rétention/embauche',
          'Pipeline de talents complet et plan de rétention'
        ]
      }
    ]
  },
  {
    id: 'ethics-experimentation',
    title: 'Ethics & Experimentation',
    titleFr: 'Éthique et Expérimentation',
    description: 'Assesses how your organization manages AI risks, fairness, transparency, and experimentation practices.',
    descriptionFr: 'Évalue comment votre organisation gère les risques IA, l\'équité, la transparence et les pratiques d\'expérimentation.',
    detailedDescription: 'Responsible AI deployment requires proper risk management, ethics consideration, and systematic experimentation approaches.',
    detailedDescriptionFr: 'Le déploiement IA responsable nécessite une gestion appropriée des risques, des considérations éthiques et des approches d\'expérimentation systématiques.',
    weight: '10%',
    weightFr: '10%',
    estimatedTime: '5 minutes',
    estimatedTimeFr: '5 minutes',
    questions: [
      {
        id: 'ai-risk-management',
        text: 'How does your team handle risks, bias, and potential ethical concerns in AI systems?',
        description: 'Risk management approach determines the safeguards we need to build into your AI implementations.',
        type: 'radio',
        required: true,
        options: [
          'Reactive – fix issues as they appear',
          'Basic – pre-launch bias checks on models',
          'Regular – ethics reviews & audits each release cycle',
          'Integrated – formal risk framework and sign-off workflow'
        ]
      },
      {
        id: 'model-explainability',
        text: 'How transparent are your AI systems and outputs?',
        description: 'Explainability requirements affect the types of AI models and deployment approaches we can recommend.',
        type: 'radio',
        required: true,
        options: [
          'None – black-box models, no records kept',
          'Partial – logs only for major models',
          'Good – explanations available for critical models',
          'Comprehensive – explanations and audit logs for all models'
        ]
      },
      {
        id: 'experimentation-cadence',
        text: 'How often does your team experiment with new AI features or models?',
        description: 'Experimentation frequency indicates your organization\'s innovation culture and readiness for continuous AI improvement.',
        type: 'radio',
        required: true,
        options: [
          'Rare / ad-hoc',
          'Quarterly pilots',
          'Monthly experiments',
          'Continuous – weekly or faster iterations'
        ]
      },
      {
        id: 'failure-strategy',
        text: 'What happens when an AI model or feature doesn\'t work as expected?',
        description: 'Failure handling strategy affects the resilience and reliability of AI systems we can recommend.',
        type: 'radio',
        required: true,
        options: [
          'Manual fixes by the team',
          'Monitoring alerts + manual rollback',
          'Automated rollback to prior stable version',
          'Self-healing systems with automated rollback & logging'
        ]
      },
      {
        id: 'ethics-owner',
        text: 'Who is responsible for ensuring ethical AI practices in your company?',
        description: 'Ethics ownership ensures accountability and proper governance for your AI initiatives.',
        type: 'radio',
        required: true,
        options: [
          'No one yet',
          'Founder / C-level assumes role',
          'Dedicated ethics lead or committee',
          'External advisors / legal counsel'
        ]
      },
      {
        id: 'failure-tolerance',
        text: 'How does your organization handle failed experiments or unsuccessful pilots?',
        description: 'Failure tolerance affects the types of AI experiments we can recommend and the innovation pace we can achieve.',
        type: 'radio',
        required: true,
        options: [
          'Avoid failure – stick to proven approaches only',
          'Learn from failure but discourage risk-taking',
          'Encourage smart risks with systematic learning from failures',
          'Celebrate intelligent failures as essential for innovation'
        ]
      },
      {
        id: 'ai-bias-fairness',
        text: 'Do you regularly check for and address fairness and bias in your AI algorithms?',
        description: 'Regular bias monitoring ensures AI systems make fair decisions and avoid discriminatory outcomes.',
        type: 'radio',
        required: true,
        options: [
          'Never',
          'Occasionally, on a project basis',
          'Regularly, using automated tools or audits',
          'Continuously monitored and adjusted'
        ]
      },
      {
        id: 'cross-border-data-compliance',
        text: 'Do you have protocols for handling cross-border data transfers and compliance with data sovereignty laws?',
        description: 'International data compliance is crucial for global AI deployments and avoiding regulatory penalties.',
        type: 'radio',
        required: true,
        options: [
          'No protocols in place',
          'Limited awareness, ad hoc approach',
          'Formal protocols for key markets',
          'Comprehensive and regularly reviewed for all markets'
        ]
      }
    ]
  },
  {
    id: 'metadata-respondent-info',
    title: 'Metadata & Respondent Info',
    titleFr: 'Métadonnées et informations du répondant',
    description: 'Used to personalize your report, segment results, and ensure relevant recommendations.',
    descriptionFr: 'Cette section collecte les informations nécessaires pour personnaliser votre rapport de maturité IA, segmenter vos réponses par profil d\'entreprise, et suivre les niveaux de maturité par secteurs, géographies et tailles organisationnelles.',
    detailedDescription: 'This information helps us provide personalized insights and recommendations tailored to your specific context and industry.',
    detailedDescriptionFr: 'Cette section collecte les informations nécessaires pour personnaliser votre rapport de maturité IA, segmenter vos réponses par profil d\'entreprise, et suivre les niveaux de maturité par secteurs, géographies et tailles organisationnelles. Toutes les données sont stockées de manière sécurisée et utilisées uniquement pour générer des insights sur mesure.',
    weight: '5%',
    estimatedTime: '3-4 minutes',
    estimatedTimeFr: '3–4 minutes',
    questions: [
      {
        id: 'email',
        text: 'Where should we send your personalized report?',
        description: 'Required for delivering your assessment results and insights.',
        type: 'text',
        required: true
      },
      {
        id: 'full-name',
        text: 'Full Name',
        description: 'Used for personalization and direct communication.',
        type: 'text',
        required: true
      },
      {
        id: 'role',
        text: 'Select the option that best describes your role:',
        description: 'Your role helps us tailor recommendations to your perspective and responsibilities.',
        type: 'dropdown',
        required: true,
        options: [
          'Founder',
          'C-level / Executive',
          'Operations',
          'Product',
          'Technical',
          'Other'
        ]
      },
      {
        id: 'company-name',
        text: 'Company Name',
        description: 'Optional field for report personalization.',
        type: 'text',
        required: true
      },
      {
        id: 'company-size',
        text: 'How many people work at your company?',
        description: 'Company size affects our recommendations for AI implementation scale and approach.',
        type: 'dropdown',
        required: true,
        options: [
          '1–5',
          '6–10',
          '11–20',
          '21–50',
          '51–100',
          '101–250',
          '251+'
        ]
      },
      {
        id: 'country',
        text: 'Country',
        description: 'Used for regional compliance and regulatory considerations.',
        type: 'dropdown',
        required: true,
        options: [
          'Afghanistan',
          'Albania',
          'Algeria',
          'Andorra',
          'Angola',
          'Antigua and Barbuda',
          'Argentina',
          'Armenia',
          'Australia',
          'Austria',
          'Azerbaijan',
          'Bahamas, The',
          'Bahrain',
          'Bangladesh',
          'Barbados',
          'Belarus',
          'Belgium',
          'Belize',
          'Benin',
          'Bolivia',
          'Bosnia and Herzegovina',
          'Botswana',
          'Brazil',
          'Brunei',
          'Bulgaria',
          'Burkina Faso',
          'Burundi',
          'Cabo Verde',
          'Cambodia',
          'Cameroon',
          'Canada',
          'Central African Republic',
          'Chad',
          'Chile',
          'China',
          'Colombia',
          'Comoros',
          'Congo, Democratic Republic of the',
          'Congo, Republic of the',
          'Cook Islands',
          'Costa Rica',
          'Cote d\'Ivoire',
          'Croatia',
          'Cuba',
          'Cyprus',
          'Czechia',
          'Denmark',
          'Djibouti',
          'Dominica',
          'Dominican Republic',
          'Ecuador',
          'Egypt',
          'El Salvador',
          'Equatorial Guinea',
          'Eritrea',
          'Estonia',
          'Eswatini',
          'Ethiopia',
          'Fiji',
          'Finland',
          'France',
          'Gabon',
          'Gambia, The',
          'Georgia',
          'Germany',
          'Ghana',
          'Greece',
          'Grenada',
          'Guatemala',
          'Guinea',
          'Guinea-Bissau',
          'Guyana',
          'Haiti',
          'Holy See',
          'Honduras',
          'Hungary',
          'Iceland',
          'India',
          'Indonesia',
          'Iran',
          'Iraq',
          'Ireland',
          'Israel',
          'Italy',
          'Jamaica',
          'Japan',
          'Jordan',
          'Kazakhstan',
          'Kenya',
          'Kiribati',
          'Korea',
          'Kosovo',
          'Kuwait',
          'Kyrgyzstan',
          'Laos',
          'Latvia',
          'Lebanon',
          'Lesotho',
          'Liberia',
          'Libya',
          'Liechtenstein',
          'Lithuania',
          'Luxembourg',
          'Madagascar',
          'Malawi',
          'Malaysia',
          'Maldives',
          'Mali',
          'Malta',
          'Marshall Islands',
          'Mauritania',
          'Mauritius',
          'Mexico',
          'Micronesia',
          'Moldova',
          'Monaco',
          'Mongolia',
          'Montenegro',
          'Morocco',
          'Mozambique',
          'Namibia',
          'Nauru',
          'Nepal',
          'Netherlands, The',
          'New Zealand',
          'Nicaragua',
          'Niger',
          'Nigeria',
          'Niue',
          'North Macedonia',
          'Norway',
          'Oman',
          'Pakistan',
          'Palau',
          'Panama',
          'Papua New Guinea',
          'Paraguay',
          'Peru',
          'Philippines',
          'Poland',
          'Portugal',
          'Qatar',
          'Republic of Korea (South Korea)',
          'Romania',
          'Russia',
          'Rwanda',
          'Saint Kitts and Nevis',
          'Saint Lucia',
          'Saint Vincent and the Grenadines',
          'Samoa',
          'San Marino',
          'Sao Tome and Principe',
          'Saudi Arabia',
          'Senegal',
          'Serbia',
          'Seychelles',
          'Sierra Leone',
          'Singapore',
          'Slovakia',
          'Slovenia',
          'Solomon Islands, The',
          'Somalia',
          'South Africa',
          'South Sudan',
          'Spain',
          'Sri Lanka',
          'Sudan',
          'Suriname',
          'Sweden',
          'Switzerland',
          'Syria',
          'Tajikistan',
          'Tanzania',
          'Thailand',
          'Timor-Leste',
          'Togo',
          'Tonga',
          'Trinidad and Tobago',
          'Tunisia',
          'Turkey',
          'Turkmenistan',
          'Tuvalu',
          'Uganda',
          'Ukraine',
          'United Arab Emirates, The',
          'United Kingdom, The',
          'Uruguay',
          'Uzbekistan',
          'Vanuatu',
          'Venezuela',
          'Vietnam',
          'Yemen',
          'Zambia',
          'Zimbabwe'
        ]
      },
      {
        id: 'sector-industry',
        text: 'Sector / Industry',
        description: 'Industry context helps us provide sector-specific AI recommendations.',
        type: 'dropdown',
        required: true,
        options: [
          'Technology & Software',
          'Healthcare & Life Sciences',
          'Financial Services & Insurance',
          'Manufacturing & Industrial',
          'Retail & E-commerce',
          'Professional Services',
          'Education & Training',
          'Media & Entertainment',
          'Real Estate & Construction',
          'Transportation & Logistics',
          'Energy & Utilities',
          'Agriculture & Food',
          'Telecommunications',
          'Government & Public Sector',
          'Non-profit & NGO',
          'Automotive',
          'Aerospace & Defense',
          'Pharmaceuticals & Biotech',
          'Legal Services',
          'Marketing & Advertising',
          'Hospitality & Tourism',
          'Other'
        ]
      },
      {
        id: 'annual-revenue',
        text: 'What is your company\'s approximate annual revenue?',
        description: 'Revenue range helps us recommend AI solutions appropriate for your scale and budget.',
        type: 'dropdown',
        required: true,
        options: [
          'Less than €250k',
          '€250k–1M',
          '€1M–5M',
          '€5M–20M',
          'More than €20M'
        ]
      },
      {
        id: 'regulated-industry',
        text: 'Does your business operate in a regulated industry (e.g., healthcare, finance, etc.)?',
        description: 'Regulatory status affects compliance requirements for AI implementations.',
        type: 'radio',
        required: true,
        options: [
          'Yes',
          'No',
          'Not sure'
        ]
      },
      {
        id: 'website',
        text: 'Website',
        description: 'Optional field for additional context.',
        type: 'text',
        required: true
      },
      {
        id: 'personal-ai-maturity',
        text: 'How would you rate your personal familiarity with AI tools?',
        description: 'Your personal AI experience helps us calibrate recommendations to your knowledge level.',
        type: 'radio',
        required: true,
        options: [
          '1 (Beginner)',
          '2',
          '3',
          '4',
          '5 (Expert)'
        ]
      },
      {
        id: 'team-ai-maturity',
        text: 'How would you rate your team\'s overall AI familiarity and usage?',
        description: 'Team AI maturity affects implementation complexity and training requirements.',
        type: 'radio',
        required: true,
        options: [
          '1 (None)',
          '2',
          '3',
          '4',
          '5 (Fully integrated)'
        ]
      },
      {
        id: 'priority-timeframe',
        text: 'What timeframe best reflects your current AI priorities?',
        description: 'Priority timeframe helps us recommend the right balance of quick wins vs. strategic investments.',
        type: 'radio',
        required: true,
        options: [
          'Quick Wins (0–1 month)',
          'Mid-Term ROI (1–3 months)',
          'Long-Term Strategy (3–6 months)'
        ]
      }
    ]
  }
];