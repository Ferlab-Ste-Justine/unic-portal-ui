/* eslint-disable max-len */
const fr = {
  entities: {
    project: {
      project_id: 'Project ID',
      project: 'projet',
      projects: 'projets',
      Projects: 'Projets',
    },
    source_system: {
      source_system_id: 'Système hospitalier ID',
      source_system: 'système hospitalier',
      source_systems: 'systèmes hospitaliers',
      Source_systems: 'Systèmes hospitaliers',
      systems: 'systèmes',
    },
    variable: {
      variable_id: 'Variable ID',
      variable: 'variable',
      variables: 'variables',
      Variables: 'Variables',
    },
    resource: {
      resources_id: 'Resources ID',
      resource: 'resource',
      resources: 'resources',
      Resources: 'Resources',
    },
    table: {
      table_id: 'Table ID',
      table: 'table',
      tables: 'tables',
      Tables: 'Tables',
    },
    domain: {
      domain_id: 'Domaine ID',
      domain: 'domaine',
      domains: 'domaines',
      Domains: 'Domaines',
    },
    code: 'Code',
    name: 'Nom',
    type: 'Type',
    updatedAt: 'Modifié le',
    createdAt: 'Créé le',
    approvedAt: 'Approuvé le',
    description: 'Description',
    rs_system_collection_starting_year: 'Année de début de la collecte de données',
    rs_dict_current_version: 'Version',
    rs_project_erb_id: 'ID Nagano',
    rs_project_pi: 'Chercheur principal',
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
    other: 'Autre',
    delete: 'Supprimer',
    unknown: 'Inconnu',
    summary: 'Résumé',
    catalog: 'Catalogue',
    home: 'Accueil',
    community: 'Communauté',
    resources: 'Ressources',
    contact: 'Contact',
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
      resources: {
        search: 'Ressources',
        searchPlaceholder: 'Filtrer par ressource',
        select: 'Type de ressource',
        selectPlaceholder: 'Sélectionner',
      },
    },
  },
};

export default fr;
