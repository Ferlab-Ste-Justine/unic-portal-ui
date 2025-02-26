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
      filterBy: 'Filtrer par variable',
    },
    resource: {
      resource: 'ressource',
      Resource: 'Ressource',
      resources: 'ressources',
      Resources: 'Ressources',
      typeOf: 'Type de ressource',
      filterBy: 'Filtrer par ressource',
    },
    table: {
      table: 'table',
      Table: 'Table',
      tables: 'tables',
      Tables: 'Tables',
      typeOf: 'Type de table',
      filterBy: 'Filtrer par table',
      tab_entity_type: 'Entité',
      variable_count: 'Nombre de variables',
    },
    domain: 'domaine',
    Domain: 'Domaine',
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
    createdAt: 'Créé le',
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
    home: 'Accueil',
    community: 'Communauté',
    resources: 'Ressources',
    contact: 'Contact',
    select: 'Sélectionner',
    currentVersion: 'Version courrante',
    history: 'Historique',
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
    notification: {
      genericError: 'Une erreur est apparue',
    },
    seeLess: 'Voir moins',
    seeMore: 'Voir plus',
    ferload: 'Ferload',
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
    home: {
      title: "Portail de données de l'UnIC",
      subTitle: 'Explorez le catalogue de données, gérez vos projets et accédez à vos jeux de données.',
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
