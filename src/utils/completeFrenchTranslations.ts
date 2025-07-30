import { AssessmentSectionData } from '@/data/assessmentData';

// Complete French translations to be applied
export const completeFrenchTranslations = {
  'data-maturity': {
    titleFr: 'Maturité des données et gouvernance',
    descriptionFr: 'Cette section évalue l\'architecture data de votre organisation, les contrôles qualité, les pratiques de gouvernance et la préparation en matière de confidentialité.',
    detailedDescriptionFr: 'Cette section évalue l\'architecture data de votre organisation, les contrôles qualité, les pratiques de gouvernance et la préparation en matière de confidentialité. Elle aide à évaluer si vos données peuvent soutenir de manière fiable les efforts d\'IA et d\'automatisation, tant sur le plan opérationnel que réglementaire.',
    weightFr: '25%',
    estimatedTimeFr: '6–8 minutes',
    questions: {
      'data-types-managed': {
        textFr: 'Quels types de données structurées votre équipe maintient-elle activement ?',
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
      'data-governance-policy': {
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
    estimatedTimeFr: '6–8 minutes'
  },
  'team-culture': {
    titleFr: 'Culture IA de l\'équipe et développement',
    descriptionFr: 'Cette section évalue la familiarité de votre équipe avec les outils IA, la répartition des responsabilités IA, la culture de partage de connaissances interne et la présence d\'efforts de montée en compétences structurés.',
    detailedDescriptionFr: 'Cette section évalue la familiarité de votre équipe avec les outils IA, la répartition des responsabilités IA, la culture de partage de connaissances interne et la présence d\'efforts de montée en compétences structurés. Elle identifie également à quel point la pensée IA est intégrée dans les rôles et départements.',
    weightFr: '20%',
    estimatedTimeFr: '5–6 minutes'
  },
  'ethics-experimentation': {
    titleFr: 'Éthique et expérimentation',
    descriptionFr: 'Cette section évalue l\'approche de votre organisation pour la gestion des risques IA, les pratiques de déploiement éthique, la transparence, l\'explicabilité, la conformité aux réglementations actuelles et à venir.',
    detailedDescriptionFr: 'Cette section évalue l\'approche de votre organisation pour la gestion des risques IA, les pratiques de déploiement éthique, la transparence, l\'explicabilité, la conformité aux réglementations actuelles et à venir (ex. RGPD, AI Act UE), et la cadence d\'expérimentation IA.',
    weightFr: '10%',
    estimatedTimeFr: '5–6 minutes'
  },
  'metadata-respondent-info': {
    titleFr: 'Métadonnées et informations du répondant',
    descriptionFr: 'Cette section collecte les informations nécessaires pour personnaliser votre rapport de maturité IA, segmenter vos réponses par profil d\'entreprise, et suivre les niveaux de maturité par secteurs, géographies et tailles organisationnelles.',
    detailedDescriptionFr: 'Cette section collecte les informations nécessaires pour personnaliser votre rapport de maturité IA, segmenter vos réponses par profil d\'entreprise, et suivre les niveaux de maturité par secteurs, géographies et tailles organisationnelles. Toutes les données sont stockées de manière sécurisée et utilisées uniquement pour générer des insights sur mesure.',
    weightFr: 'Requis pour soumission (non noté)',
    estimatedTimeFr: '3–4 minutes'
  }
};

// Apply French translations to sections that don't have them yet
export const applyMissingFrenchTranslations = (sections: AssessmentSectionData[]): AssessmentSectionData[] => {
  return sections.map(section => {
    const sectionTranslations = completeFrenchTranslations[section.id as keyof typeof completeFrenchTranslations];
    
    if (sectionTranslations && !section.titleFr) {
      return {
        ...section,
        titleFr: sectionTranslations.titleFr,
        descriptionFr: sectionTranslations.descriptionFr,
        detailedDescriptionFr: sectionTranslations.detailedDescriptionFr,
        weightFr: sectionTranslations.weightFr || section.weight,
        estimatedTimeFr: sectionTranslations.estimatedTimeFr || section.estimatedTime,
        // Add question-level translations if available
        questions: section.questions.map(question => {
          const questionTranslations = 'questions' in sectionTranslations ? 
            sectionTranslations.questions?.[question.id] : undefined;
          if (questionTranslations && !question.textFr) {
            return {
              ...question,
              textFr: questionTranslations.textFr,
              optionsFr: questionTranslations.optionsFr
            };
          }
          return question;
        })
      };
    }
    
    return section;
  });
};