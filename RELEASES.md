## VERSION 1.1.0 (2025-04-25)

### Features

- [UNICWEB-39](https://ferlab-crsj.atlassian.net/browse/UNICWEB-39) Feature: [Catalogue des variables] Exploration du Catalogue: Tableau Variables
- [UNICWEB-18](https://ferlab-crsj.atlassian.net/browse/UNICWEB-18) Feature: [Page entité] Page entité d’un projet
- [UNICWEB-19](https://ferlab-crsj.atlassian.net/browse/UNICWEB-19) Feature: [Page entité] Page entité système hospitalier
- [UNICWEB-20](https://ferlab-crsj.atlassian.net/browse/UNICWEB-20) Feature: [Page entité] Page entité table
- [UNICWEB-21](https://ferlab-crsj.atlassian.net/browse/UNICWEB-21) Feature: [Page entité] Page entité variables
- [UNICWEB-17](https://ferlab-crsj.atlassian.net/browse/UNICWEB-17) Feature: [Catalogue des variables] Page d’accueil
- [UNICWEB-37](https://ferlab-crsj.atlassian.net/browse/UNICWEB-37) Feature: [Catalogue des variables] Exploration du Catalogue: Tableau Ressource
- [UNICWEB-38](https://ferlab-crsj.atlassian.net/browse/UNICWEB-38) Feature: [Catalogue des variables] Exploration du Catalogue: Tableau Tables
- [UNICWEB-40](https://ferlab-crsj.atlassian.net/browse/UNICWEB-40) Feature: [Catalogue des variables] Exploration du Catalogue: Filtres
- [UNICWEB-41](https://ferlab-crsj.atlassian.net/browse/UNICWEB-41) Feature: [Catalogue des variables] Exploration du Catalogue: Hyperlinks inter-onglet
- [UNICWEB-36](https://ferlab-crsj.atlassian.net/browse/UNICWEB-36) Feature: [Catalogue des variables] Exploration du Catalogue: Boîte de recherche
- [UNICWEB-71](https://ferlab-crsj.atlassian.net/browse/UNICWEB-71) Feature: [Catalogue des variables] Le contenu des tableaux doivent être exportable en TSV
- [UNICWEB-137](https://ferlab-crsj.atlassian.net/browse/UNICWEB-137) Feature: [Page entité] Ajouter variable source page entité variables
- [UNICWEB-22](https://ferlab-crsj.atlassian.net/browse/UNICWEB-22) Feature: [Inscription et authentification] Page d'authentification
- [UNICWEB-33](https://ferlab-crsj.atlassian.net/browse/UNICWEB-33) Feature: [Inscription et authentification] Page de creation de compte utilisateur
- [UNICWEB-34](https://ferlab-crsj.atlassian.net/browse/UNICWEB-34) Feature: [Inscription et authentification] Formulaire d’édition du profil
- [UNICWEB-42](https://ferlab-crsj.atlassian.net/browse/UNICWEB-42) Feature: [Inscription et authentification] Page de destination (Landing page)
- [UNICWEB-118](https://ferlab-crsj.atlassian.net/browse/UNICWEB-118) Feature: [Page entité] Recherche dans les valeurs/catégorie de la page entité variable
- [UNICWEB-119](https://ferlab-crsj.atlassian.net/browse/UNICWEB-119) Feature: [Page entité] Export TSV de la liste des valeurs/catégorie de la page entité variable
- [UNICWEB-122](https://ferlab-crsj.atlassian.net/browse/UNICWEB-122) Feature: [Catalogue] Multiple fields querystring to filter Catalog


### Technical / Other changes

- [UNICWEB-55](https://ferlab-crsj.atlassian.net/browse/UNICWEB-55) Fix: [Inscription et authentification] Retour à la page d'authentification suivant inscription de l'utilisateur
- [UNICWEB-58](https://ferlab-crsj.atlassian.net/browse/UNICWEB-58) Fix: [Landing] Le background devrait être fixe (smallwidth)
- [UNICWEB-58](https://ferlab-crsj.atlassian.net/browse/UNICWEB-58) Fix: [Catalogue des variables]  Les valeurs vides devraient être considérées par le tri
- [UNICWEB-78](https://ferlab-crsj.atlassian.net/browse/UNICWEB-78) Fix: [Catalogue] Trie colonne date champs vide devrait être traité comme zero (plus vielle date possible)
- [UNICWEB-79](https://ferlab-crsj.atlassian.net/browse/UNICWEB-79) Fix: [Catalogue] Resources colonnes Updated On et Created On pas assez large
- [UNICWEB-99](https://ferlab-crsj.atlassian.net/browse/UNICWEB-99) Fix: [Catalogue] rs_name au lieu de rs_code dans tableau tables et variables
- [UNICWEB-82](https://ferlab-crsj.atlassian.net/browse/UNICWEB-82) Fix: [Catalogue] Les valeurs vides devraient être considérées par le tri
- [UNICWEB-94](https://ferlab-crsj.atlassian.net/browse/UNICWEB-94) Fix: [Page entité] Typo titre de section page entité projet
- [UNICWEB-99](https://ferlab-crsj.atlassian.net/browse/UNICWEB-99) Fix: [Catalogue] rs_name au lieu de rs_code dans tableau tables et variables
- [UNICWEB-101](https://ferlab-crsj.atlassian.net/browse/UNICWEB-101) Fix: [Page entité] Retirer la parenthèse de l'hyperlien
- [UNICWEB-102](https://ferlab-crsj.atlassian.net/browse/UNICWEB-102) Fix: [Page entité] Sur Safari, les Hospital Systems ne s'affichent pas sur la même ligne
- [UNICWEB-103](https://ferlab-crsj.atlassian.net/browse/UNICWEB-102) Fix: [Portail Accueil] Centrer le titre avec les cartes
- [UNICWEB-120](https://ferlab-crsj.atlassian.net/browse/UNICWEB-120) Fix: [Page entité] Page entité * : Mauvais hyperlink sur Count *
- [UNICWEB-124](https://ferlab-crsj.atlassian.net/browse/UNICWEB-124) Fix: [Page entité] Valeur au singulier dans titre colonne Page entité variables
- [UNICWEB-125](https://ferlab-crsj.atlassian.net/browse/UNICWEB-125) Fix: [Catalogue] Hyperlink Table Count in Resources Grid doit filtrer sur Ressource
- [UNICWEB-126](https://ferlab-crsj.atlassian.net/browse/UNICWEB-126) Fix: [Page entité] Cacher section Catégorie lorsqu'il n'y a pas de valeur dans Page entité variables
- [UNICWEB-127](https://ferlab-crsj.atlassian.net/browse/UNICWEB-127) Fix: [Page entité] Algorithme de dérivation en monospace dans Page entité variables
- [UNICWEB-128](https://ferlab-crsj.atlassian.net/browse/UNICWEB-128) Fix: [Typo] No Results au pluriel
- [UNICWEB-136](https://ferlab-crsj.atlassian.net/browse/UNICWEB-136) Fix: Hyperlien "À propos"
- [UNICWEB-141](https://ferlab-crsj.atlassian.net/browse/UNICWEB-141) Fix: [Page entité] Page entité système hospitalier: Champs à cacher lorsque vide
- [UNICWEB-134](https://ferlab-crsj.atlassian.net/browse/UNICWEB-134) Fix: Retirer le menu Accueil
- [UNICWEB-135](https://ferlab-crsj.atlassian.net/browse/UNICWEB-135) Fix: [Catalog] L'application des filtres par hyperlien s'interfèrent entre eux
- [UNICWEB-140](https://ferlab-crsj.atlassian.net/browse/UNICWEB-140) Fix: [Page entité] Page entité table: Champs à cacher lorsque vide
- [UNICWEB-132](https://ferlab-crsj.atlassian.net/browse/UNICWEB-132) Fix: [Page entité] Page entité: identificateur visuel
- [UNICWEB-142](https://ferlab-crsj.atlassian.net/browse/UNICWEB-142) Fix: [Page entité] Page entité variables: Champs à cacher lorsque vide
- [UNICWEB-145](https://ferlab-crsj.atlassian.net/browse/UNICWEB-145) Fix: [Ajustement des termes et libellés] Retirer le sous titre de la Page de destination
- [UNICWEB-146](https://ferlab-crsj.atlassian.net/browse/UNICWEB-146) Fix: [Ajustement des termes et libellés] Modifier le titre et le sous titre de la Page d’accueil du catalogue
- [UNICWEB-147](https://ferlab-crsj.atlassian.net/browse/UNICWEB-147) Fix: [Ajustement des termes et libellés] Changer l'ordre des carte dans page d’accueil du catalogue
- [UNICWEB-148](https://ferlab-crsj.atlassian.net/browse/UNICWEB-148) Fix: [Ajustement des termes et libellés] Modifier la description des carte de la page d’accueil du catalogue
- [UNICWEB-150](https://ferlab-crsj.atlassian.net/browse/UNICWEB-150) Fix: [Ajustement des termes et libellés] Modification du paramètre fictif pour les boîtes de recherche dans le catalogue
- [UNICWEB-151](https://ferlab-crsj.atlassian.net/browse/UNICWEB-151) Fix: [Ajustement des termes et libellés] Ajout de tooltip dans la page entité Table
- [UNICWEB-152](https://ferlab-crsj.atlassian.net/browse/UNICWEB-152) Fix: [Ajustement des termes et libellés] Ajout de tooltip dans la page entité Variable
- [UNICWEB-153](https://ferlab-crsj.atlassian.net/browse/UNICWEB-153) Fix: [Ajustement des termes et libellés] Ajout de tooltip sur colonne du tableau Tables dans le catalogue
- [UNICWEB-154](https://ferlab-crsj.atlassian.net/browse/UNICWEB-154) Fix: [Ajustement des termes et libellés] Ajout de tooltip sur colonne du tableau Variable dans le catalogue
- [UNICWEB-149](https://ferlab-crsj.atlassian.net/browse/UNICWEB-149) Fix: [Ajustement des termes et libellés] Ajout tooltip sur colonne de date dans les tableaux du catalogue
- [UNICWEB-155](https://ferlab-crsj.atlassian.net/browse/UNICWEB-155) Fix: [Ajustement des termes et libellés] Modifier l'ordre des filtres du tableau Variables dans le catalogue
- [UNICWEB-170](https://ferlab-crsj.atlassian.net/browse/UNICWEB-170) Fix: [Inscription et authentification] Modification paramètres fictifs et étiquettes dans Formulaire d’édition du profil
- [UNICWEB-173](https://ferlab-crsj.atlassian.net/browse/UNICWEB-173) Fix: [Inscription et authentification] Le champs Titre n'est pas dans la bonne section dans Page de creation de compte utilisateur
- [UNICWEB-174](https://ferlab-crsj.atlassian.net/browse/UNICWEB-174) Fix: [Typo] Titre de laPage d’accueil  UniC vs UnIC
- [UNICWEB-176](https://ferlab-crsj.atlassian.net/browse/UNICWEB-176) Fix: [Inscription et authentification] Modification paramètres fictifs et étiquettes dans Formulaire création d'un utlisateur
- [UNICWEB-180](https://ferlab-crsj.atlassian.net/browse/UNICWEB-180) Fix: [Entity] Mise à jour du bloc résumé de chaque page entité
- [UNICWEB-191](https://ferlab-crsj.atlassian.net/browse/UNICWEB-191) Fix: [Resource Entity] Corriger un bug sur la version du dictionnaire.
- [UNICWEB-195](https://ferlab-crsj.atlassian.net/browse/UNICWEB-195) Fix: [Catalog - Table] Wrong filter redirect on Variable Count