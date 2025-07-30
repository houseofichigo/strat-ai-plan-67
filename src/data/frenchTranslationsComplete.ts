// Complete French translations update for all remaining sections
// This will merge the missing translations into the main assessment data

import { assessmentSections, AssessmentSectionData, AssessmentQuestion } from './assessmentData';

// All missing French translations in a structured format
export const completeMissingTranslations = {
  'data-maturity': {
    questions: {
      'data-structure-types': {
        textFr: 'Quels types de structure de données gérez-vous régulièrement ?',
        optionsFr: [
          'Structurées (ex. tableaux, CSV, SQL)',
          'Semi-structurées (ex. JSON, XML, YAML)',
          'Non structurées (ex. PDF, emails, images, audio)',
          'Aucune classification effectuée pour l\'instant'
        ]
      },
      'monthly-data-volume': {
        textFr: 'Quel volume de nouvelles données votre entreprise génère-t-elle mensuellement ?',
        optionsFr: [
          'Moins de 1 Go',
          '1–10 Go',
          '10–100 Go',
          '100 Go – 1 To',
          'Plus de 1 To',
          'Ne sais pas / non suivi'
        ]
      },
      'data-consistency': {
        textFr: 'À quel point votre structure de données et votre étiquetage sont-ils standardisés entre les systèmes ?',
        optionsFr: [
          'Pas du tout structurés',
          'Partiellement structurés dans certains outils',
          'Majoritairement structurés et étiquetés avec des conventions de nommage',
          'Entièrement standardisés, documentés et versionnés'
        ]
      },
      'data-lineage-documentation': {
        textFr: 'Suivez-vous la provenance de vos données et leur circulation entre les systèmes ?',
        optionsFr: [
          'Aucune documentation',
          'Notes partielles et ad hoc',
          'Documenté pour les jeux de données critiques',
          'Entièrement suivi et catalogué dans tous les systèmes'
        ]
      },
      'data-quality-ownership': {
        textFr: 'Qui est responsable du maintien de la qualité des données et de la gestion des accès ?',
        optionsFr: [
          'Aucun propriétaire clair',
          'Équipe technique / ingénierie',
          'Les responsables de département partagent la responsabilité',
          'Data steward dédié / équipe data'
        ]
      },
      'data-confidence': {
        textFr: 'Quel est votre niveau de confiance dans la précision et la ponctualité de vos données ?',
        optionsFr: [
          'Faible – écarts fréquents',
          'Modéré – vérifications ponctuelles uniquement',
          'Bon – règles de validation de base en place',
          'Élevé – tests automatisés et alertes'
        ]
      },
      'data-cleaning-frequency': {
        textFr: 'À quelle fréquence nettoyez-vous ou dédupliquez-vous vos données ?',
        optionsFr: [
          'Jamais',
          'Ad hoc lorsque des problèmes surviennent',
          'Routine mensuelle',
          'Continu – intégré dans les pipelines'
        ]
      },
      'data-governance': {
        textFr: 'Votre organisation suit-elle une politique formelle de gouvernance des données ?',
        optionsFr: [
          'Aucune en place',
          'Directives informelles',
          'Politique existante pour les actifs de données critiques uniquement',
          'Politique formelle appliquée à toutes les équipes avec application'
        ]
      },
      'metadata-naming-conventions': {
        textFr: 'Suivez-vous des conventions de nommage standardisées et un étiquetage de métadonnées pour les jeux de données ?',
        optionsFr: [
          'Aucune convention en place',
          'Étiquetage ad hoc ou nommage par équipe',
          'Conventions standard utilisées mais non appliquées',
          'Schéma de métadonnées et conventions entièrement appliqués'
        ]
      },
      'taxonomy-ontology-system': {
        textFr: 'Utilisez-vous des cadres de taxonomie métier ou d\'ontologie pour catégoriser vos données ?',
        optionsFr: [
          'Aucune structure',
          'Catégorisation manuelle uniquement',
          'Taxonomie métier de base utilisée dans certains domaines',
          'Ontologie et taxonomie d\'entreprise appliquées'
        ]
      },
      'privacy-security-controls': {
        textFr: 'Quelles protections sont mises en œuvre pour vos données ?',
        optionsFr: [
          'Chiffrement au repos',
          'Chiffrement en transit (TLS)',
          'Contrôle d\'accès basé sur les rôles (RBAC)',
          'Journaux d\'audit / suivi des accès',
          'Outils de prévention de perte de données (DLP)',
          'Tokenisation ou anonymisation',
          'Aucune'
        ]
      },
      'personal-sensitive-data-management': {
        textFr: 'Traitez-vous des données personnelles ou sensibles, et comment sont-elles gérées ?',
        optionsFr: [
          'Aucune donnée personnelle traitée',
          'Oui, mais aucun processus formel',
          'Oui, avec conformité RGPD/CCPA documentée',
          'Pas sûr / en cours d\'examen'
        ]
      },
      'gdpr-ai-act-audit-readiness': {
        textFr: 'Pouvez-vous fournir des registres de la façon dont les systèmes IA utilisent les données personnelles en conformité avec le RGPD ou l\'AI Act ?',
        optionsFr: [
          'Aucun suivi en place',
          'Journaux partiels ou documentation d\'utilisation de modèle',
          'Journaux disponibles pour les cas d\'usage critiques',
          'Piste d\'audit complète et système d\'explicabilité en place'
        ]
      }
    }
  },
  'automation-agents': {
    titleFr: 'Automatisation et agents IA',
    descriptionFr: 'Cette section évalue le niveau d\'automatisation de vos opérations, identifie les tâches et workflows à forte friction, et évalue votre préparation au déploiement d\'agents IA.',
    detailedDescriptionFr: 'Cette section évalue le niveau d\'automatisation de vos opérations, identifie les tâches et workflows à forte friction, et évalue votre préparation au déploiement d\'agents IA. Elle mesure également le confort de l\'équipe, les préférences d\'interface et les préoccupations de risque liées à l\'implémentation d\'agents.',
    weightFr: '20%',
    estimatedTimeFr: '6–8 minutes',
    questions: {
      'repetitive-tasks': {
        textFr: 'Quelles tâches consomment régulièrement du temps personnel et pourraient être améliorées ou automatisées ?',
        optionsFr: [
          'Mises à jour de rapports / tableaux de bord',
          'Planification de réunions ou rappels',
          'Relances par email ou Slack',
          'Saisie de données / copier-coller',
          'Réponse aux questions clients routinières / FAQ',
          'Mises à jour de statut internes',
          'Étiquetage ou triage de tickets',
          'Génération de documents (ex. propositions, contrats)',
          'Autre'
        ]
      },
      'manual-customer-journeys': {
        textFr: 'Quels processus côté client nécessitent actuellement une intervention manuelle excessive ?',
        optionsFr: [
          'Onboarding',
          'Résolution des demandes de support',
          'Facturation et paiements',
          'Gestion des FAQ',
          'Modération de communauté',
          'N/A – pas orienté client'
        ]
      },
      'automated-alerts': {
        textFr: 'Avez-vous mis en place des alertes ou notifications automatisées dans votre stack opérationnel ?',
        optionsFr: [
          'Oui – complètes et fiables',
          'Oui – mais seulement pour les événements critiques',
          'Aucune – surveillance manuelle en place',
          'En cours / phase de planification'
        ]
      },
      'top-automation-priority': {
        textFr: 'Si vous aviez des ressources illimitées, quel processus prioriseriez-vous pour l\'automatisation ?',
        type: 'textarea'
      },
      'never-automate': {
        textFr: 'Quel processus devrait toujours rester géré par l\'humain et pourquoi ?',
        type: 'textarea'
      },
      'ai-agent-tasks': {
        textFr: 'Quelles tâches un agent IA pourrait-il réalistiquement supporter ou prendre en charge aujourd\'hui ?',
        optionsFr: [
          'Support client (chat ou email)',
          'Génération de rapports et insights',
          'Rédaction d\'emails ou relances',
          'Qualification et scoring de prospects',
          'Synthèse de réunions et éléments d\'action',
          'Recherche marché / concurrentielle',
          'Flux d\'onboarding et application de checklist',
          'Surveillance et alertes',
          'Recherche / récupération de connaissances internes',
          'Aucune des précédentes'
        ]
      },
      'agent-autonomy': {
        textFr: 'Quel niveau de contrôle les agents IA devraient-ils avoir dans vos workflows ?',
        optionsFr: [
          'Entièrement autonome – exécution de bout en bout',
          'Humain dans la boucle – nécessite approbation avant d\'agir',
          'Assistant uniquement – suggère, mais n\'exécute pas',
          'Pas encore sûr'
        ]
      },
      'agent-interface': {
        textFr: 'Comment préféreriez-vous interagir avec un agent IA dans le workflow de votre équipe ?',
        optionsFr: [
          'Chatbot dans Slack / Teams',
          'Widget intégré (ex. dans Notion, CRM)',
          'Interface de tableau de bord autonome',
          'Assistant basé sur l\'email',
          'Intégration API / CLI',
          'Autre',
          'Besoin de conseils'
        ]
      },
      'agent-data-access': {
        textFr: 'À quels jeux de données internes ou systèmes un agent IA devrait-il pouvoir lire ou écrire ?',
        optionsFr: [
          'Fiches clients / CRM',
          'Journaux d\'utilisation produit',
          'Données financières / facturation',
          'Base de connaissances / docs / FAQ',
          'Tables d\'opérations ou logistique',
          'Systèmes RH ou people',
          'Aucun / incertain'
        ]
      },
      'deployment-blockers': {
        textFr: 'Quels sont les plus grands blocages ou préoccupations empêchant le déploiement d\'agents IA ?',
        optionsFr: [
          'Données pas prêtes / trop silotées',
          'Manque de support technique',
          'Équipe pas alignée sur les cas d\'usage',
          'Risques de confidentialité ou conformité',
          'ROI ou business case peu clair',
          'Contraintes budgétaires',
          'Peur de perdre le contrôle ou la supervision'
        ]
      },
      'agent-monitoring': {
        textFr: 'Comment la performance des agents sera-t-elle suivie ou surveillée ?',
        optionsFr: [
          'Aucune surveillance actuellement prévue',
          'Surveillance manuelle par les utilisateurs finaux',
          'Tableaux de bord KPI ou rapports d\'utilisation prévus',
          'Alertes + système d\'observabilité (journaux, rollback, versioning) déjà en place'
        ]
      },
      'risk-scenarios': {
        textFr: 'Quelles sont vos principales préoccupations lorsque vous donnez un pouvoir décisionnel aux agents ?',
        optionsFr: [
          'Agents prenant des décisions incorrectes sans examen humain',
          'Agents accédant à des données sensibles',
          'Agents agissant sur des informations obsolètes',
          'Agents affectant les interactions côté client',
          'Pas inquiet / cas d\'usage à faible risque uniquement'
        ]
      }
    }
  },
  'team-culture': {
    titleFr: 'Culture IA de l\'équipe et développement',
    descriptionFr: 'Cette section évalue la familiarité de votre équipe avec les outils IA, la répartition des responsabilités IA, la culture de partage de connaissances interne et la présence d\'efforts de montée en compétences structurés.',
    detailedDescriptionFr: 'Cette section évalue la familiarité de votre équipe avec les outils IA, la répartition des responsabilités IA, la culture de partage de connaissances interne et la présence d\'efforts de montée en compétences structurés. Elle identifie également à quel point la pensée IA est intégrée dans les rôles et départements.',
    weightFr: '20%',
    estimatedTimeFr: '5–6 minutes',
    questions: {
      'current-ai-tools': {
        textFr: 'Quels outils alimentés par l\'IA sont actuellement utilisés par votre équipe ?',
        optionsFr: [
          'ChatGPT (OpenAI)',
          'Claude (Anthropic)',
          'GPT personnalisés ou assistants',
          'Notion AI',
          'Canva AI / Copy.ai (génération de contenu)',
          'GitHub Copilot / Replit / Ghostwriter (codage)',
          'Fireflies / Otter.ai (transcription de réunions)',
          'Excel ou Google Sheets avec plugins IA',
          'Aucun pour l\'instant',
          'Autre'
        ]
      },
      'ai-usage-frequency': {
        textFr: 'À quelle fréquence les outils IA sont-ils utilisés dans les opérations quotidiennes de votre équipe ?',
        optionsFr: [
          'Quotidiennement',
          'Hebdomadairement',
          'Occasionnellement',
          'Rarement',
          'Jamais'
        ]
      },
      'ai-use-cases': {
        textFr: 'Quelles sont vos utilisations les plus courantes des outils IA aujourd\'hui ?',
        optionsFr: [
          'Création de contenu et rédaction',
          'Analyse et visualisation de données',
          'Brainstorming / idéation',
          'Synthèse de réunions, docs ou notes',
          'Réponses de support client',
          'Génération de rapports et slides',
          'Génération / révision de code',
          'Documentation interne ou création de SOP',
          'Recherche / récupération d\'informations',
          'Planification d\'entreprise ou prévisions'
        ]
      },
      'prompt-engineering-capability': {
        textFr: 'À quel point votre équipe est-elle confiante dans la rédaction de prompts efficaces pour les outils IA ?',
        optionsFr: [
          'Aucune exposition au prompting',
          'Utilise des prompts simples copiés d\'autres sources',
          'Peut modifier et itérer sur les prompts',
          'Peut concevoir des prompts structurés et spécifiques aux objectifs',
          'Expert – construit des workflows ou chaînes de prompts'
        ]
      },
      'skill-exposure-level': {
        textFr: 'Quel est le niveau d\'expérience moyen de votre équipe avec les outils IA ?',
        optionsFr: [
          'Débutant – moins d\'1 heure d\'utilisation',
          'Explorateur – 1–5 heures d\'utilisation, copie de prompts',
          'Praticien – 6–20 heures, rédaction de prompts adaptés',
          'Utilisateur avancé – 20+ heures, construction de workflows',
          'Varie énormément selon les départements'
        ]
      },
      'knowledge-sharing': {
        textFr: 'Comment votre équipe partage-t-elle les connaissances ou bonnes pratiques autour de l\'utilisation de l\'IA ?',
        optionsFr: [
          'Nous ne savions pas que le partage était encouragé',
          'Rarement partagé ou silotée',
          'Partage occasionnel de conseils ou liens de manière informelle',
          'Partage fréquent d\'exemples et discussion d\'outils',
          'Nous avons une base de connaissances IA structurée ou bibliothèque de prompts'
        ]
      },
      'upskilling-approach': {
        textFr: 'Comment soutenez-vous la croissance des compétences de l\'équipe autour de l\'IA et de l\'automatisation ?',
        optionsFr: [
          'Aucune approche formelle – auto-apprentissage ad hoc',
          'Certains membres de l\'équipe ont assisté à des webinaires ou événements IA',
          'Les champions IA transversaux dirigent des sessions internes',
          'Budget de formation dédié ou accès aux cours',
          'Programme structuré avec certifications ou suivi des compétences'
        ]
      },
      'ai-ownership': {
        textFr: 'Qui dirige ou possède actuellement les initiatives IA dans votre entreprise ?',
        optionsFr: [
          'Aucun propriétaire pour l\'instant – nous explorons',
          'Un champion informel (temps partiel)',
          'Plusieurs responsables transversaux ou conseil IA',
          'Squad IA ou Data dédiée',
          'Externalisé à des conseillers ou consultants externes'
        ]
      },
      'team-experimentation-willingness': {
        textFr: 'À quel point votre équipe est-elle ouverte aux tests ou pilotage d\'outils pilotés par l\'IA ?',
        optionsFr: [
          'Pas ouverte – préoccupations concernant la perturbation',
          'Prudemment ouverte – nécessite preuve de ROI',
          'Intéressée mais a besoin de conseils',
          'Proactive – impatiente d\'expérimenter',
          'Pilote et implémente déjà des initiatives IA'
        ]
      }
    }
  },
  'ethics-experimentation': {
    titleFr: 'Éthique et expérimentation',
    descriptionFr: 'Cette section évalue l\'approche de votre organisation pour la gestion des risques IA, les pratiques de déploiement éthique, la transparence, l\'explicabilité, la conformité aux réglementations actuelles et à venir.',
    detailedDescriptionFr: 'Cette section évalue l\'approche de votre organisation pour la gestion des risques IA, les pratiques de déploiement éthique, la transparence, l\'explicabilité, la conformité aux réglementations actuelles et à venir (ex. RGPD, AI Act UE), et la cadence d\'expérimentation IA. Elle détermine si vos systèmes sont conçus pour la confiance, la surveillance et l\'innovation sécurisée.',
    weightFr: '10%',
    estimatedTimeFr: '5–6 minutes',
    questions: {
      'ai-risk-management': {
        textFr: 'Comment votre équipe gère-t-elle les préoccupations de risque, biais et équité dans les systèmes IA ?',
        optionsFr: [
          'Réactive – ne corrige les problèmes que lorsqu\'ils sont signalés',
          'Basique – vérifications d\'équité ou biais pré-lancement',
          'Régulière – examine les risques à chaque cycle de release',
          'Intégrée – cadre formel de risque IA avec portes d\'approbation',
          'Conforme – mappée à l\'AI Act ou standard de gouvernance équivalent'
        ]
      },
      'model-explainability': {
        textFr: 'À quel point les sorties de vos systèmes IA sont-elles traçables et explicables ?',
        optionsFr: [
          'Aucune – modèles boîte noire utilisés sans piste d\'audit',
          'Partielle – journaux maintenus seulement pour les modèles majeurs',
          'Bonne – explications disponibles pour les modèles critiques',
          'Complète – explicabilité + journaux d\'audit sur tous les modèles',
          'Les décisions du système IA sont versionnées et observables'
        ]
      },
      'experimentation-cadence': {
        textFr: 'À quelle fréquence testez-vous ou déployez-vous de nouveaux modèles, agents ou fonctionnalités IA ?',
        optionsFr: [
          'Rare / ad hoc',
          'Pilotes trimestriels',
          'Expériences mensuelles',
          'Itérations hebdomadaires ou plus rapides',
          'Continu – avec tests A/B ou expériences parallèles'
        ]
      },
      'failure-strategy': {
        textFr: 'Que se passe-t-il lorsqu\'un modèle ou fonctionnalité IA ne répond pas aux attentes ?',
        optionsFr: [
          'Les problèmes sont corrigés manuellement par l\'équipe',
          'Alertes déclenchées, rollback manuel initié',
          'Rollback automatique vers la dernière version stable',
          'Logique d\'auto-guérison ou flux de secours en place',
          'Cadres de pré-mortem et post-mortem utilisés'
        ]
      },
      'ethics-owner': {
        textFr: 'Qui est responsable de l\'utilisation éthique et conforme de l\'IA dans votre organisation ?',
        optionsFr: [
          'Personne pour l\'instant',
          'Fondateur / Sponsor exécutif assume le rôle',
          'Comité d\'éthique ou de risque transversal',
          'Responsable conformité IA ou juridique dédié',
          'Conseiller juridique externe ou partenaire audit'
        ]
      },
      'ai-risk-categorization': {
        textFr: 'Avez-vous évalué et catégorisé vos systèmes IA selon les niveaux de risque réglementaire (ex. sous l\'AI Act UE) ?',
        optionsFr: [
          'Pas au courant de ces classifications',
          'Au courant mais n\'a pas commencé le mapping',
          'En cours – mapping partiel pour les systèmes clés',
          'Mapping complet par catégorie de risque IA',
          'Mappé et rapporté aux régulateurs ou conseil'
        ]
      },
      'regulatory-compliance-readiness': {
        textFr: 'À quel point êtes-vous préparé à démontrer la conformité avec les réglementations IA actuelles et à venir ?',
        optionsFr: [
          'Pas conforme ou en suivi',
          'Conduite d\'analyse des écarts',
          'Partiellement conforme avec documentation de base',
          'Entièrement conforme avec processus prêts pour audit',
          'Subissant ou ayant terminé un audit tiers'
        ]
      },
      'ethical-review-mechanisms': {
        textFr: 'Quels processus sont en place pour examiner les implications éthiques des déploiements IA ?',
        optionsFr: [
          'Aucun pour l\'instant',
          'Checklist interne ou directives',
          'Examens des parties prenantes avant release',
          'Implication de l\'équipe juridique ou conformité',
          'Évaluations d\'impact pour les cas d\'usage sensibles',
          'Supervision au niveau du conseil'
        ]
      },
      'public-stakeholder-communication': {
        textFr: 'Communiquez-vous l\'utilisation de l\'IA aux clients ou parties prenantes de manière transparente ?',
        optionsFr: [
          'Aucune communication pour l\'instant',
          'Mentionné indirectement dans les politiques',
          'Divulgué dans la documentation côté client',
          'Outils d\'explicabilité ou interfaces "Pourquoi cette décision ?" utilisés',
          'Divulgations d\'utilisation IA entièrement transparentes + mécanismes d\'opt-out'
        ]
      }
    }
  }
};

// Function to apply all the French translations
export const applyAllFrenchTranslations = () => {
  console.log("French translations are ready to be applied to all sections 3-7");
  return completeMissingTranslations;
};