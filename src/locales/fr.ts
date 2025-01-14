/* eslint-disable max-len */
const fr = {
  entities: {
    project: {
      project_id: 'Project ID',
      project: 'Project',
      projects: 'Projects',
    },
    participant: {
      participant_id: 'Participant ID',
      participant: 'Participant',
      participants: 'Participants',
    },
    source: {
      participant_id: 'Source ID',
      source: 'Source',
      sources: 'Sources',
    },
    variable: {
      variable_id: 'Variable ID',
      variable: 'Variable',
      variables: 'Variables',
    },
    resource: {
      resources_id: 'Resources ID',
      resource: 'Resource',
      resources: 'Resources',
    },
    table: {
      table_id: 'Table ID',
      table: 'Table',
      tables: 'Tables',
    },
  },
  global: {
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
    viewInDataExploration: 'Voir sur la page Explorateur',
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
    main: {
      menu: {
        dashboard: 'Tableau de bord',
        studies: 'Études',
        website: 'Site web',
        documentation: 'Documentation',
        community: 'Communauté',
        resources: 'Ressources',
        contact: 'Contact',
      },
    },
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
      hosting: {
        title: 'Données à héberger ?',
        description:
          'Le UNIC offre aux chercheurs une plateforme idéale pour entreposer et diffuser les données génomiques générées par les études cliniques et de recherche.',
        button: 'Soumettre vos données',
      },
    },
  },
};

export default fr;
