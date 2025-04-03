/* eslint-disable max-len */
const fr = {
  entities: {
    project: {
      project: 'projet',
      projects: 'projets',
      Projects: 'Projets',
    },
    source_system: {
      source_system: 'système hospitalier',
      source_systems: 'systèmes hospitaliers',
      Source_system: 'Système hospitalier',
      Source_systems: 'Systèmes hospitaliers',
      systems: 'systèmes',
      tooltip: 'Systèmes hospitaliers utilisés pour générer les variables de ce projet.',
    },
    variable: {
      variable: 'variable',
      Variable: 'Variable',
      variables: 'variables',
      Variables: 'Variables',
      typeOf: 'Type de variable',
      filterBy: 'Chercher une variable par mot-clé',
    },
    resource: {
      resource: 'ressource',
      Resource: 'Ressource',
      resources: 'ressources',
      Resources: 'Ressources',
      typeOf: 'Type de ressource',
      filterBy: 'Chercher une ressource par mot-clé',
    },
    table: {
      table: 'table',
      Table: 'Table',
      tables: 'tables',
      Tables: 'Tables',
      typeOf: 'Type de table',
      filterBy: 'Chercher une table par mot-clé',
      tab_entity_type: 'Entité',
      tab_entity_type_info:
        'L’entité fait référence à l’objet auquel la variable est associée (ex : la variable «âge» est associée au «patient»). L’entité décrit le contexte ou le niveau auquel les données se rapportent.',
      variable_count: 'Nombre de variables',
    },
    domain: 'domaine',
    Domain: 'Domaine',
    DomainInfo:
      'Le domaine fait référence au champ thématique spécifique dans lequel les variables sont collectées ou appliquées.',
    domains: 'domaines',
    Domains: 'Domaines',
    warehouse: 'Entrepôt',
    research_project: 'Recherche',
    eqp: 'EQP',
    code: 'Code',
    name: 'Nom',
    title: 'Titre',
    type: 'Type',
    rowFilter: 'Filtre de ligne',
    rowFilterTooltip: 'Filtre appliqué aux entités de la table',
    updatedAt: 'Modifié le',
    updatedAtInfo: 'Date de la dernière modification du dictionnaire de cette table',
    createdAt: 'Créé le',
    createdAtInfo: 'Date de création du dictionnaire de cette table',
    approvedAt: 'Approuvé le',
    startingYear: 'Début de la collecte',
    publishedOn: 'Publiée le',
    description: 'Description',
    number_variables: 'Nombre de variables',
    versionTooltip: 'Version du dictionnaire pour ce projet',
    researcher: 'Chercheur / responsable',
    rs_system_collection_starting_year: 'Année de début de la collecte de données',
    rs_dict_current_version: 'Version',
    rs_project_erb_id: 'ID Nagano',
    rs_project_pi: 'Chercheur principal',
    no_data: 'Aucune donnée',
    label: 'Libellé',
    source: 'Source',
    source_name: 'Nom de la source',
    algorithmDerivation: 'Algorithme de dérivation',
    notes: 'Notes',
    value: 'Valeur',
  },
  global: {
    participants: 'Participants',
    back: 'Retour',
    retry: 'Recommencer',
    create: 'Créer',
    close: 'Fermer',
    cancel: 'Annuler',
    yes: 'Oui',
    no: 'Non',
    in: 'dans',
    other: 'Autre',
    delete: 'Supprimer',
    unknown: 'Inconnu',
    summary: 'Résumé',
    catalog: 'Catalogue',
    categories: 'Catégories',
    home: 'Accueil',
    community: 'Communauté',
    resources: 'Ressources',
    research: 'Rechercher...',
    contact: 'Contact',
    select: 'Sélectionner',
    currentVersion: 'Version courante',
    history: 'Historique',
    download: 'Télécharger',
    about: 'À propos',
    proTable: {
      results: 'Résultats',
      result: 'Résultat',
      noResults: 'Aucun résultat',
      of: 'de',
      selected: 'élément sélectionné',
      selectedPlural: 'éléments sélectionnés',
      selectAllResults: 'Sélectionner tous les résultats',
      clear: 'Effacer',
      clearFilters: 'Réinitialiser les filtres',
      tableExport: 'Exporter en TSV',
      reset: 'Réinitialiser',
      columns: 'Colonnes',
      first: 'Début',
      previous: 'Précédent',
      next: 'Suivant',
      view: '{value} / écran',
    },
    errors: {
      403: "Désolé, vous n'êtes pas autorisé à accéder à cette page.",
      404: "Désolé, cette page n'existe pas.",
      500: 'Désolé, quelque chose en va pas.',
      backHome: 'Retour accueil',
      query: {
        notFound: {
          title: 'Requête introuvable',
          content: `Nous n'avons pas pu charger votre requête. Veuillez réessayer ou <a href="{href}" style="text-decoration: underline;" target="_blank">contacter le support</a>.`,
          okText: 'Fermer',
        },
      },
    },
    report: {
      error: {
        title: 'Erreur',
        message: "Nous n'avons pas pu générer le rapport pour le moment. Veuillez réessayer plus tard.",
      },
      inProgress: {
        title: 'Traitement',
        fetchReport: 'Récupération du rapport, veuillez patienter',
      },
      onSuccess: {
        title: 'Succès',
        fetchReport: 'Rapport téléchargé avec succès',
      },
      exportTSV: 'Exporter en TSV',
    },
    notification: {
      genericError: 'Une erreur est apparue',
    },
    seeLess: 'Voir moins',
    seeMore: 'Voir plus',
    forms: {
      errors: {
        minCharacters: 'caractères minimum',
        requiredField: 'Ce champ est requis',
        enterValidEmail: 'Entrer un courriel valide',
        enterValidUrl: 'Entrer une url valide',
      },
    },
  },
  components: {
    dataRelease: {
      title: 'Données disponibles',
    },
  },
  layout: {
    user: {
      menu: {
        settings: 'Paramètres de profil',
        logout: 'Se déconnecter',
        signedWith: 'Connecté en tant que',
      },
    },
  },
  screen: {
    loginPage: {
      title: "Portail de données de l'Univers Informationnel du CHU Sainte-Justine.",
      subTitle: 'Explorez le catalogue de données, gérez vos projets et accédez à vos jeux de données.',
      login: 'Connexion',
      signup: 'Créer un compte',
      documentation: {
        title: 'Centre de documentation',
        description:
          'Pour savoir comment soumettre vos données, faire une demande d’accès ou pour consulter des guides d’utilisation du portail, visitez le centre de documentation.',
        button: 'Centre de documentation',
      },
    },
    profileSettings: {
      title: 'Paramètres de profil',
      viewProfile: 'Voir le profil',
      update: {
        success: 'Votre profil a été mis à jour avec succès.',
      },
      cards: {
        deleteAccount: {
          title: 'Supprimer le compte',
          button: 'Supprimer mon compte',
          notice:
            'Vous ne pourrez plus vous connecter. Toutes vos informations seront supprimées. Vous pouvez créer un nouveau compte à tout moment.',
          confirm: {
            content: 'Êtes-vous sûr de vouloir supprimer définitivement votre compte ?',
          },
        },
        identification: {
          title: 'Identification',
          alert:
            "Vous êtes authentifié(e) avec <strong>{provider}</strong> utilisant <strong>{email}</strong>. Cet e-mail n'est jamais affiché au public et ne peut pas être modifié.",
          firstName: 'Prénom',
          yourFirstName: 'Votre prénom',
          lastName: 'Nom',
          yourLastName: 'Votre nom',
          title2: 'Titre',
          yourTitle: 'Ex : Chercheur',
          institution: 'Institution/Entreprise',
          yourInstitution: 'Ex : CHUS Sainte-Justine',
          institutionEmail: 'Courriel professionnel',
          yourInstitutionEmail: 'email@domain.com',
          editPhotoModalTitle: 'Modifier photo',
          uploadImageError: 'Impossible de télécharger votre image pour le moment',
          removePhotoModalTitle: 'Supprimer la photo de profil ?',
          removePhotoModalButton: 'Oui supprimer la photo',
          removePhotoModalMessage:
            'Voulez-vous vraiment supprimer votre photo ? Nous le remplacerons par un avatar par défaut.',
          uploadPhotoButton: 'Envoyer la photo',
          removePhotoButton: 'Supprimer la photo',
          linkedinUrl: 'Veuillez entrer une URL LinkedIn valide',
        },
        roleAffiliation: {
          title: 'Fonction',
          iama: 'Je suis un(e) :',
          bioinformatician_software_developer: 'Bioinformaticien(ne), analyste de données, statisticien(ne)',
          researcher_in_academic_or_non_profit_institution:
            'Chercheur(e) dans une institution académique ou sans but lucratif',
          clinician: 'Clinicien(ne)',
          employee_in_governmental_agency: 'Employé(e) d’un organisme gouvernemental',
          representative_of_commercial_or_for_profit_company:
            "Représentant(e) d'une entreprise commerciale ou à but lucratif",
          manager: 'Gestionnaire',
          student: 'Étudiant(e)',
          other: 'Autre',
        },
        researchDomain: {
          title: 'Domaine de recherche',
          label: 'Domaine(s) de recherche ou domaine(s) d’intérêt',
          bioinformatics: 'Bioinformatique',
          cancer: 'Cancer',
          neurodevelopmental_conditions: 'Conditions neuro-développementales',
          population_genomics: 'Génomique des populations',
          infection_immunity: 'Infection et immunité',
          ia: 'Intelligence artificielle',
          rare_diseases: 'Maladies rares',
          birth_defects: 'Malformations congénitales',
          neurosciences_mental_health_addiction: 'Neurosciences, santé mentale et toxicomanie',
          nutrition_metabolism_diabetes: 'Nutrition, métabolisme et diabète',
          circulatory_respiratory_health: 'Santé circulatoire et respiratoire',
          general_health: 'Santé générale',
          musculoskeletal_health_arthritis: 'Santé musculo-squelettique et arthrite',
          aging: 'Vieillissement',
          not_applicable: "Ne s'applique pas",
          other: 'Autre',
        },
        pleaseDescribe: 'Veuillez décrire',
        checkAll: 'Cochez tout ce qui s’applique',
        saveChanges: 'Sauvegarder les modifications',
        discardChanges: 'Annuler les modifications',
      },
    },
    home: {
      title: "Catalogue de l'UniC",
      subTitle: 'Explorez les dictionnaires de données de l’UnIC par type de ressource :',
      explore: 'Explorer',
      warehouse: {
        title: 'Entrepôt',
        description: 'Explorez l’ensemble des variables de l’entrepôt de données par domaine',
      },
      researchProjects: {
        title: 'Projets de recherche',
        description: 'Explorez les dictionnaires de données des projets de recherche',
      },
      EQPProjects: {
        title: 'Projets EQP',
        description: 'Explorez les dictionnaires de données des projets d’amélioration de la qualité ',
      },
      hospitalSystems: {
        title: 'Systèmes hospitaliers',
        description: 'Explorez la liste des tables et variables des systèmes hospitaliers',
      },
    },
    catalog: {
      title: "Catalogue de l'UnIC",
    },
  },
};

export default fr;
