/* eslint-disable max-len */
const fr = {
  entities: {
    project: {
      project_id: 'Project ID',
      project: 'project',
      projects: 'projects',
      Projects: 'Projects',
    },
    source_system: {
      source_system_id: 'Système source ID',
      source_system: 'système source',
      source_systems: 'systèmes source',
      Source_systems: 'Systèmes source',
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
      domains: 'domains',
      Domains: 'Domains',
    },
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
    name: 'Nom',
    type: 'Type',
    updatedAt: 'Modifié le',
    description: 'Description',
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
      dataReleaseLink: 'Version 1.0',
      dataExploration: 'Exploration des données',
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
      signup: 'Créer compte',
      documentation: {
        title: 'Centre de documentation',
        description:
          'Pour savoir comment soumettre vos données, faire une demande d’accès ou pour consulter des guides d’utilisation du portail, visitez le centre de documentation.',
        button: 'Centre de documentation',
      },
    },
    home: {
      title: "Portail de l'UnIC",
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
