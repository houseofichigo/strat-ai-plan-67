import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Language resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'Dashboard',
        assessment: 'Assessment',
        workflows: 'Workflows',
        agents: 'AI Agents',
        solutions: 'Agents & Workflows',
        useCases: 'Use Cases',
        training: 'Training',
        resources: 'Resources',
        playground: 'Playground',
        reports: 'Reports',
        roadmap: 'Roadmap',
        admin: 'Admin',
        services: 'Services',
        gdpr: 'GDPR',
      },
      // Onboarding
      onboarding: {
        welcome: 'Welcome to AI Readiness Platform',
        step1Title: 'Take Your Assessment',
        step1Content: 'Start by completing the AI readiness assessment to understand your current capabilities.',
        step2Title: 'Review Your Results',
        step2Content: 'Analyze your readiness scores and identify key areas for improvement.',
        step3Title: 'Build Your Action Plan',
        step3Content: 'Create a personalized roadmap based on your assessment results.',
        skip: 'Skip Tour',
        next: 'Next',
        back: 'Back',
        finish: 'Get Started',
      },
      // Progress
      progress: {
        notStarted: 'Not Started',
        inProgress: 'In Progress',
        completed: 'Completed',
        overall: 'Overall Progress',
        assessment: 'Assessment Progress',
        training: 'Training Progress',
        workflows: 'Workflow Progress',
      },
      // Notifications
      notifications: {
        title: 'Notifications',
        markAllRead: 'Mark All as Read',
        noNotifications: 'No new notifications',
        compliance: 'Compliance Update',
        resources: 'New Resources',
        completion: 'Completion Reminder',
        general: 'General',
      },
      // Common
      common: {
        save: 'Save',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        warning: 'Warning',
        info: 'Information',
        yes: 'Yes',
        no: 'No',
        continue: 'Continue',
        close: 'Close',
      },
      // Assessment
      assessment: {
        title: 'AI Readiness Assessment',
        subtitle: 'Discover your organization\'s AI maturity and receive personalized recommendations',
        welcome: 'Welcome to our AI Readiness Assessment',
        description: 'This comprehensive assessment will analyze your organization\'s AI capabilities and provide tailored recommendations.',
        getStarted: 'Start Assessment',
        progress: 'Progress',
        section: 'Section',
        of: 'of',
        next: 'Next',
        back: 'Previous',
        submit: 'Submit',
        completeAssessment: 'Complete Assessment',
        submitting: 'Submitting...',
        required: 'Required',
        optional: 'Optional',
        skipSection: 'Skip This Section',
        sectionComplete: 'Section Complete',
        allSectionsComplete: 'All Sections Complete',
        validationError: 'Please answer all required questions before continuing.',
        submissionSuccess: 'Assessment submitted successfully!',
        submissionError: 'Error submitting assessment',
        draftSaved: 'Draft saved automatically',
        draftRestored: 'Your draft has been restored',
        sections: {
          'business-strategy': 'Business Strategy & Use-Case Readiness',
          'financial-readiness': 'Financial Capacity & Strategic Readiness',
          'data-governance': 'Data Maturity & Governance',
          'technical-infrastructure': 'Technical Infrastructure',
          'automation-agents': 'Automation & AI Agents',
          'team-culture': 'Team AI Culture & Development',
          'ethics-experimentation': 'Ethics & Experimentation',
          'metadata': 'Metadata & Respondent Information'
        },
        sectionDescriptions: {
          'business-strategy': 'Evaluates if your organization has a clear understanding of how AI can support business growth, operational efficiency, or customer impact.',
          'financial-readiness': 'Evaluates your organization\'s current and future capacity to fund data and AI initiatives.',
          'data-governance': 'Evaluates your organization\'s data architecture, quality controls, governance practices, and privacy readiness.',
          'technical-infrastructure': 'Evaluates the robustness of your tech stack — how data flows between tools, how integrations are maintained.',
          'automation-agents': 'Evaluates the level of automation in your operations, identifies high-friction tasks and workflows.',
          'team-culture': 'Evaluates your team\'s familiarity with AI tools, distribution of AI responsibilities.',
          'ethics-experimentation': 'Evaluates your organization\'s approach to AI risk management, ethical deployment practices.',
          'metadata': 'Collects necessary information to personalize your AI maturity report.'
        }
      },
      // Solutions
      solutions: {
        title: 'Agents and Workflows',
        allSolutions: 'All Solutions',
        aiAgents: 'AI Agents',
        workflows: 'Workflows',
        totalSolutions: 'Total Solutions',
        featured: 'Featured Solutions',
        trending: 'Trending Now',
        quickWins: 'Quick Wins',
        highROI: 'High ROI Solutions',
        newArrivals: 'New Arrivals',
      },
      // Thank You Page
      thankYou: {
        title: 'Assessment Complete',
        subtitle: '8 key areas evaluated with detailed analysis',
        message: 'Your report is being prepared',
        whatNext: 'Report Available Soon',
        reportDescription: 'Our AI experts are analyzing your responses to create a comprehensive, personalized maturity report with concrete recommendations specifically tailored to your organization.',
        timeframe: '📧 We will send you your detailed AI readiness report within 3 business days',
        emailNote: 'Please check your inbox (and spam folder) to receive your personalized assessment results',
        reportIncludes: 'Your report includes',
        maturityScore: '✓ AI Maturity Score',
        maturityScoreDesc: 'Overall assessment of the 8 key areas',
        detailedAnalysis: '✓ Detailed Analysis by Section',
        detailedAnalysisDesc: 'Identification of strengths and areas for improvement',
        operationalRecommendations: '✓ Operational Recommendations',
        operationalRecommendationsDesc: 'Concrete steps to advance your AI journey',
        implementationRoadmap: '✓ Implementation Roadmap',
        implementationRoadmapDesc: 'Prioritized timeline for AI adoption',
        retakeAssessment: 'Retake Assessment',
        visitWebsite: 'Visit Our Website',
        thankYouNote: 'Thank you for your participation',
        dataHelp: 'Your data helps us improve our assessment and provide more relevant insights on AI readiness.',
        keyTakeaways: 'Take Action',
        takeaway1: 'Implement recommendations to advance your AI journey',
        takeaway2: 'We will email your personalized report within 3 business days',
        takeaway3: 'Prepare for digital transformation'
      }
    }
  },
  fr: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'Tableau de Bord',
        assessment: 'Évaluation',
        workflows: 'Flux de Travail',
        agents: 'Agents IA',
        solutions: 'Agents et Flux',
        useCases: "Cas d'Usage",
        training: 'Formation',
        resources: 'Ressources',
        playground: "Aire d'Essai",
        reports: 'Rapports',
        roadmap: 'Feuille de Route',
        admin: 'Administrateur',
        services: 'Services',
        gdpr: 'RGPD',
      },
      // Assessment
      assessment: {
        title: "Évaluation de la maturité Data & IA",
        subtitle: 'Découvrez la maturité de votre organisation en matière d\'IA et obtenez des recommandations personnalisées',
        welcome: 'Bienvenue dans notre évaluation de maturité Data & IA',
        description: 'Cette évaluation complète analysera les capacités de votre organisation en matière d\'IA et fournira des recommandations sur mesure.',
        getStarted: 'Commencer l\'Évaluation',
        progress: 'Progression',
        section: 'Section',
        of: 'sur',
        next: 'Suivant',
        back: 'Précédent',
        submit: 'Soumettre',
        completeAssessment: 'Terminer l\'Évaluation',
        submitting: 'Soumission en cours...',
        required: 'Obligatoire',
        optional: 'Optionnel',
        skipSection: 'Ignorer cette Section',
        sectionComplete: 'Section Terminée',
        allSectionsComplete: 'Toutes les Sections Terminées',
        validationError: 'Veuillez répondre à toutes les questions obligatoires avant de continuer.',
        submissionSuccess: 'Évaluation soumise avec succès !',
        submissionError: 'Erreur lors de la soumission de l\'évaluation',
        draftSaved: 'Brouillon sauvegardé automatiquement',
        draftRestored: 'Votre brouillon a été restauré',
        sections: {
          'business-strategy': 'Stratégie métier et préparation des cas d\'usage',
          'financial-readiness': 'Capacité financière et préparation stratégique',
          'data-governance': 'Maturité des données et gouvernance',
          'technical-infrastructure': 'Infrastructure technique',
          'automation-agents': 'Automatisation et agents IA',
          'team-culture': 'Culture IA de l\'équipe et développement',
          'ethics-experimentation': 'Éthique et expérimentation',
          'metadata': 'Métadonnées et informations du répondant'
        },
        sectionDescriptions: {
          'business-strategy': 'Cette section évalue si votre organisation possède une compréhension claire de la façon dont l\'IA peut soutenir la croissance de l\'entreprise, l\'efficacité opérationnelle ou l\'impact client.',
          'financial-readiness': 'Cette section évalue la capacité actuelle et future de votre organisation à financer les initiatives data et IA.',
          'data-governance': 'Cette section évalue l\'architecture data de votre organisation, les contrôles qualité, les pratiques de gouvernance et la préparation en matière de confidentialité.',
          'technical-infrastructure': 'Cette section évalue la robustesse de votre stack technologique — comment les données circulent entre les outils, comment les intégrations sont maintenues.',
          'automation-agents': 'Cette section évalue le niveau d\'automatisation de vos opérations, identifie les tâches et workflows à forte friction.',
          'team-culture': 'Cette section évalue la familiarité de votre équipe avec les outils IA, la répartition des responsabilités IA.',
          'ethics-experimentation': 'Cette section évalue l\'approche de votre organisation pour la gestion des risques IA, les pratiques de déploiement éthique.',
          'metadata': 'Cette section collecte les informations nécessaires pour personnaliser votre rapport de maturité IA.'
        }
      },
      // Onboarding
      onboarding: {
        welcome: "Bienvenue sur la Plateforme de Préparation à l'IA",
        step1Title: 'Effectuez votre Évaluation',
        step1Content: "Commencez par compléter l'évaluation de préparation à l'IA pour comprendre vos capacités actuelles.",
        step2Title: 'Examinez vos Résultats',
        step2Content: "Analysez vos scores de préparation et identifiez les domaines clés d'amélioration.",
        step3Title: "Construisez votre Plan d'Action",
        step3Content: 'Créez une feuille de route personnalisée basée sur les résultats de votre évaluation.',
        skip: 'Ignorer la Visite',
        next: 'Suivant',
        back: 'Retour',
        finish: 'Commencer',
      },
      // Progress
      progress: {
        notStarted: 'Non Commencé',
        inProgress: 'En Cours',
        completed: 'Terminé',
        overall: 'Progrès Global',
        assessment: "Progrès de l'Évaluation",
        training: 'Progrès de Formation',
        workflows: 'Progrès des Flux',
      },
      // Notifications
      notifications: {
        title: 'Notifications',
        markAllRead: 'Tout Marquer comme Lu',
        noNotifications: 'Aucune nouvelle notification',
        compliance: 'Mise à jour de Conformité',
        resources: 'Nouvelles Ressources',
        completion: 'Rappel de Finalisation',
        general: 'Général',
      },
      // Common
      common: {
        save: 'Enregistrer',
        cancel: 'Annuler',
        edit: 'Modifier',
        delete: 'Supprimer',
        loading: 'Chargement...',
        error: 'Erreur',
        success: 'Succès',
        warning: 'Avertissement',
        info: 'Information',
        yes: 'Oui',
        no: 'Non',
        continue: 'Continuer',
        close: 'Fermer',
      },
      // Solutions
      solutions: {
        title: 'agents et flux de travail',
        allSolutions: 'Toutes les Solutions',
        aiAgents: 'Agents IA',
        workflows: 'Flux de Travail',
        totalSolutions: 'Total des Solutions',
        featured: 'Solutions Vedettes',
        trending: 'Tendances Actuelles',
        quickWins: 'Gains Rapides',
        highROI: 'Solutions à ROI Élevé',
        newArrivals: 'Nouveautés',
      },
      // Thank You Page
      thankYou: {
        title: 'Évaluation terminée',
        subtitle: '8 domaines clés évalués avec une analyse détaillée',
        message: 'Votre rapport est en cours de préparation',
        whatNext: 'Rapport bientôt disponible',
        reportDescription: 'Nos experts IA analysent vos réponses pour créer un rapport de maturité complet et personnalisé, avec des recommandations concrètes adaptées spécifiquement à votre organisation.',
        timeframe: '📧 Nous vous enverrons votre rapport détaillé de préparation IA sous 3 jours ouvrés',
        emailNote: 'Veuillez vérifier votre boîte de réception (et votre dossier spam) pour recevoir les résultats de votre évaluation personnalisée',
        reportIncludes: 'Votre rapport comprend',
        maturityScore: '✓ Score de maturité IA',
        maturityScoreDesc: 'Évaluation globale des 8 domaines clés',
        detailedAnalysis: '✓ Analyse détaillée par section',
        detailedAnalysisDesc: 'Identification des points forts et des axes d\'amélioration',
        operationalRecommendations: '✓ Recommandations opérationnelles',
        operationalRecommendationsDesc: 'Étapes concrètes à suivre pour avancer dans votre parcours IA',
        implementationRoadmap: '✓ Feuille de route de mise en œuvre',
        implementationRoadmapDesc: 'Calendrier priorisé pour l\'adoption de l\'IA',
        retakeAssessment: 'Refaire l\'évaluation',
        visitWebsite: 'Visiter notre site web',
        thankYouNote: 'Merci pour votre participation',
        dataHelp: 'Vos données nous aident à améliorer notre évaluation et à fournir des insights plus pertinents sur la préparation à l\'IA.',
        keyTakeaways: 'Passez à l\'action',
        takeaway1: 'Mettez en œuvre les recommandations pour faire progresser votre parcours IA',
        takeaway2: 'Nous vous enverrons votre rapport personnalisé par e-mail sous 3 jours ouvrés',
        takeaway3: 'Préparez-vous pour la transformation numérique'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;