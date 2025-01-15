# Projet de fin de module NoSQL

Pour ce projet, vous allez créer une petite API qui va servir de backend à une plateforme d'apprentissage en ligne. J'ai préparé la structure du projet avec une organisation professionnelle du code, comme vous pouvez le constater dans ce dépôt Github.

Commençons par l'organisation pratique :

1. Création de votre dépôt :
   - Sur Github.com
   - Créez un nouveau dépôt public
   - Nommez-le "learning-platform-nosql"
   - Ne l'initialisez pas avec un README pour le moment

2. Configuration de votre environnement local :
   ```bash
   # Clonez mon dépôt template (ce dépôt)
   git clone https://github.com/pr-daaif/learning-platform-template
   
   # Renommez le dépôt origin
   cd learning-platform-template
   git remote remove origin
   
   # Ajoutez votre dépôt comme nouvelle origine
   git remote add origin https://github.com/[votre-compte]/learning-platform-nosql
   
   # Poussez le code vers votre dépôt
   git push -u origin main
   ```

3. Installation des dépendances :
   ```bash
   npm install
   ```

Je vous propose une structure de code qui suit les bonnes pratiques de développement. Vous trouverez dans le code des commentaires avec des **questions qui vous guideront dans votre réflexion**. Ces questions sont importantes car elles vous aideront à comprendre les choix d'architecture.

### Aspects professionnels à noter :
- Utilisation des variables d'environnement pour la configuration
- Séparation claire des responsabilités (routes, contrôleurs, services)
- Gestion propre des connexions aux bases de données
- Organisation modulaire du code
- Gestion des erreurs et des cas limites
- Documentation du code

### Pour le rendu, voici ce que j'attends :
1. Un dépôt public sur Github avec un historique de commits clair
2. Un README.md qui explique :
   - Comment installer et lancer le projet
   - La structure du projet
   - Les choix techniques que vous avez faits
   - Les réponses aux questions posées dans les commentaires
3. Le code complété avec tous les TODOs implémentés

### Je vous conseille de procéder étape par étape :
1. Commencez par lire et comprendre la structure du projet
2. Répondez aux questions des commentaires dans le README
3. Implémentez progressivement les TODOs
4. Testez chaque fonctionnalité au fur et à mesure
5. Documentez vos choix et vos réflexions en ajoutant des copies d'écrans à votre fichier README.md

#### Bon courage

### (db.js)

1. Pourquoi créer un module séparé pour les connexions aux bases de données ?

Créer un module séparé pour les connexions aux bases de données présente plusieurs avantages :

    Réutilisabilité 

    Maintenabilité 

    Séparation des responsabilités 

    Gestion des erreurs centralisée 

    Testabilité

2. Comment gérer proprement la fermeture des connexions ?

Pour gérer proprement la fermeture des connexions, il est important de :

    Fermer les connexions explicitement

    Utiliser des blocs try-catch-finally

    Implémenter une fonction de fermeture

    Gérer les événements de fermeture de l'application

### (env.js)

   1. Pourquoi est-il important de valider les variables d'environnement au démarrage ?

La validation des variables d'environnement au démarrage est cruciale pour plusieurs raisons :

    Garantir le bon fonctionnement de l'application 

    Prévenir les erreurs en production 

    Améliorer la sécurité 

    Faciliter le débogage 

    Respect des dépendances 

   2. Que se passe-t-il si une variable requise est manquante ?

Si une variable d'environnement requise est manquante, les conséquences peuvent varier en fonction de l'application et de la variable en question. Voici quelques scénarios possibles :

    L'application ne démarre pas 

    Fonctionnalités désactivées 

    Comportement inattendu 

    Problèmes de sécurité 

    Difficulté de débogage 

### (coursecontroller.js)

1. Quelle est la différence entre un contrôleur et une route ?

Route :

    Définit le point d'entrée d'une requête HTTP.

    Associe une URL et une méthode HTTP (GET, POST, etc.) à un gestionnaire de requête.

Contrôleur :

    Contient la logique pour gérer une requête spécifique.

    Reçoit la requête, interagit avec les modèles ou services, et renvoie une réponse.

Différence clé :

    Route : Définit où et comment une requête est reçue.

    Contrôleur : Définit ce qui se passe lorsque la requête est reçue.

2. Pourquoi séparer la logique métier des routes ?

Maintenabilité 

Réutilisabilité 

Testabilité

Séparation des responsabilités
   
Évolutivité

### (courseroutes.js)

1. Pourquoi séparer les routes dans différents fichiers ?

    Maintenabilité 

    Modularité 

    Séparation des responsabilités 

    Testabilité 

    Évolutivité 

2. Comment organiser les routes de manière cohérente ?

    Regrouper par fonctionnalité 

    Utiliser des préfixes de route 

        Organiser les routes avec des préfixes cohérents (ex : /users, /courses).

    Centraliser les routes dans un fichier principal 

    Utiliser des middlewares communs 

    Documenter les routes 

    Structurer les contrôleurs 

    Utiliser des sous-routes 

    Gérer les erreurs de manière centralisée 

### (mongoservice.js)

    Réutilisabilité :

        Permet de réutiliser la logique métier dans plusieurs parties de l'application (ex : contrôleurs, tâches planifiées, scripts CLI).

    Séparation des responsabilités :

        Les contrôleurs gèrent les requêtes HTTP, tandis que les services gèrent la logique métier.

        Code plus clair et plus facile à comprendre.

    Maintenabilité :

        Facilite les modifications et les mises à jour de la logique métier sans affecter les routes ou les contrôleurs.

        Réduit la duplication de code.

    Testabilité :

        Les services peuvent être testés indépendamment des contrôleurs ou des routes.

        Simplifie les tests unitaires et d'intégration.

    Évolutivité :

        Permet d'ajouter de nouvelles fonctionnalités ou de modifier la logique métier sans impacter le reste de l'application.

        Facilite la migration vers une architecture microservices si nécessaire.

    Centralisation de la logique métier :

        Toute la logique métier est regroupée dans un seul endroit, ce qui facilite la gestion et la maintenance.

    Gestion des dépendances :

        Les services peuvent être injectés dans les contrôleurs ou d'autres services, ce qui facilite la gestion des dépendances.

    Performance :

        Les services peuvent être optimisés indépendamment des autres couches de l'application.

    Sécurité :

        La logique métier est encapsulée dans des services, ce qui réduit les risques de fuites de données ou d'erreurs de sécurité.

### (redisservice.js)

1. Comment gérer efficacement le cache avec Redis ?

    Utiliser des TTL (Time-To-Live) :

        Définir une durée de vie pour les clés Redis pour éviter de stocker des données obsolètes.

        Exemple : redisClient.set('key', 'value', 'EX', 3600) (expire après 1 heure).

    Mettre en cache les résultats coûteux :

        Stocker les résultats de requêtes complexes ou de calculs intensifs pour améliorer les performances.

    Invalidation du cache :

        Supprimer ou mettre à jour les clés Redis lorsque les données sous-jacentes changent.

        Exemple : Supprimer une clé après une mise à jour en base de données.

    Utiliser des structures de données appropriées :

        Choisir la bonne structure de données Redis (ex : chaînes, hachages, listes, ensembles) en fonction des besoins.

    Cache hiérarchique :

        Combiner Redis avec un cache local (ex : mémoire) pour réduire la latence.

    Gestion des erreurs :

        Gérer les erreurs de connexion Redis et prévoir un fallback (ex : requête directe à la base de données).

    Surveillance et métriques :

        Surveiller l'utilisation du cache (ex : taux de succès, mémoire utilisée) pour optimiser les performances.

    Éviter le sur-caching :

        Ne pas mettre en cache des données rarement utilisées ou peu coûteuses à recalculer.

2. Quelles sont les bonnes pratiques pour les clés Redis ?

    Utiliser des noms de clés descriptifs :

        Les clés doivent refléter leur contenu et leur contexte.

        Exemple : user:123:profile pour le profil de l'utilisateur avec l'ID 123.

    Éviter les clés trop longues :

        Les clés longues consomment plus de mémoire et peuvent réduire les performances.

        Exemple : Préférer user:123:profile à user_profile_data_for_user_id_123.

    Utiliser des espaces de noms :

        Structurer les clés avec des préfixes pour éviter les collisions.

        Exemple : app:user:123:profile.

    Éviter les caractères spéciaux :

        Utiliser des caractères alphanumériques et des deux-points (:) pour séparer les segments.

    Limiter la taille des clés :

        Les clés Redis ne doivent pas dépasser 512 Mo (limite technique de Redis).

    Utiliser des clés immuables :

        Éviter de modifier les clés existantes pour prévenir les incohérences.

    Gérer les TTL (Time-To-Live) :

        Définir une durée de vie pour les clés pour éviter de remplir la mémoire Redis.

    Éviter les clés trop nombreuses :

        Regrouper les données connexes dans des hachages ou des ensembles pour réduire le nombre de clés.

    Documenter les clés :

        Maintenir une documentation des clés Redis utilisées dans l'application.

### (app.js)

1. Comment organiser le point d'entrée de l'application ?

    Centraliser la configuration :

        Utiliser un fichier de configuration (ex : config/env.js) pour stocker les variables d'environnement et les paramètres de l'application.

    Séparer les responsabilités :

        Créer des modules distincts pour les routes, les contrôleurs, les services, et les connexions aux bases de données.

    Initialiser les connexions aux bases de données :

        Connecter l'application à MongoDB, Redis, ou d'autres services externes avant de démarrer le serveur.

    Configurer les middlewares :

        Ajouter les middlewares Express (ex : express.json(), express.urlencoded()) pour gérer les requêtes et les réponses.

    Monter les routes :

        Importer et utiliser les routes dans le point d'entrée (ex : app.use('/courses', courseRoutes)).

    Gérer les erreurs :

        Ajouter des middlewares pour gérer les erreurs 404 (route non trouvée) et les erreurs globales (500).

    Démarrer le serveur :

        Lancer le serveur sur le port spécifié dans la configuration.

    Gestion propre de l'arrêt :

        Implémenter une gestion propre de l'arrêt pour fermer les connexions aux bases de données et libérer les ressources.

2. Quelle est la meilleure façon de gérer le démarrage de l'application ?

    Validation des variables d'environnement :

        Vérifier que toutes les variables d'environnement requises sont présentes et valides avant de démarrer l'application.

    Initialisation asynchrone :

        Utiliser des fonctions asynchrones pour initialiser les connexions aux bases de données et d'autres services.

    Gestion des erreurs de démarrage :

        Capturer et gérer les erreurs pendant le démarrage pour éviter des plantages inattendus.

    Journalisation :

        Ajouter des messages de journalisation pour suivre les étapes du démarrage et détecter les problèmes.

    Gestion des dépendances :

        S'assurer que toutes les dépendances (ex : bases de données, services externes) sont disponibles avant de démarrer le serveur.

    Gestion propre de l'arrêt :

        Implémenter des gestionnaires pour les signaux SIGTERM et SIGINT afin de fermer proprement les connexions et libérer les ressources.

    Tests de santé :

        Ajouter des tests de santé (health checks) pour vérifier que l'application est prête à accepter des requêtes.

    Documentation :

        Documenter les étapes de démarrage et les dépendances pour faciliter le déploiement et la maintenance.

### (.env)

1. Quelles sont les informations sensibles à ne jamais commiter ?

    Clés d'API :

        Clés pour les services externes (ex : Google Maps, Stripe, SendGrid).

    Identifiants de base de données :

        URL de connexion, noms d'utilisateur, mots de passe.

    Clés de chiffrement :

        Clés secrètes pour le chiffrement des données (ex : JWT secret, clés AES).

    Certificats SSL/TLS :

        Certificats et clés privées pour HTTPS.

    Identifiants OAuth :

        Client ID et Client Secret pour les services d'authentification tiers.

    Mots de passe d'administrateur :

        Mots de passe pour les comptes privilégiés.

    Informations personnelles :

        Données sensibles comme les adresses e-mail, numéros de téléphone, etc.

    Configurations critiques :

        Paramètres de configuration spécifiques à l'environnement (ex : production, développement).

2. Pourquoi utiliser des variables d'environnement ?

    Sécurité :

        Évite de stocker des informations sensibles dans le code source.

        Permet de gérer les secrets de manière sécurisée (ex : outils comme Vault, AWS Secrets Manager).

    Configuration par environnement :

        Permet de définir des configurations spécifiques pour chaque environnement (ex : développement, test, production).

    Portabilité :

        Facilite le déploiement de l'application sur différentes plateformes (ex : local, cloud, conteneurs).

    Facilité de maintenance :

        Les configurations sont centralisées et faciles à modifier sans toucher au code source.

    Conformité :

        Respecte les bonnes pratiques de sécurité et les normes de conformité (ex : GDPR, HIPAA).

    Collaboration :

        Permet aux développeurs de travailler avec des configurations locales sans partager de secrets.

    Tests et débogage :

        Facilite les tests en utilisant des configurations spécifiques (ex : base de données de test).

    Évolutivité :

        Permet de gérer des configurations complexes pour des applications à grande échelle.