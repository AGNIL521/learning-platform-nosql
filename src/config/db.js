// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : reponse dans readme
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : reponse dans readme

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  const maxRetries = 3; // Nombre maximum de tentatives de reconnexion
  const retryDelay = 2000; // Délai entre les tentatives (en millisecondes)

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const uri = config.mongoUri; // URI de connexion MongoDB (ex: "mongodb://localhost:27017")
      mongoClient = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await mongoClient.connect(); // Connexion au serveur MongoDB
      db = mongoClient.db(config.mongoDbName); // Sélection de la base de données

      console.log('Connected to MongoDB');
      return; // Connexion réussie, sortie de la fonction
    } catch (error) {
      console.error(`Attempt ${attempt} failed to connect to MongoDB:`, error);

      if (attempt === maxRetries) {
        console.error('Max retries reached. Giving up.');
        throw error; // Relancer l'erreur après avoir épuisé les tentatives
      }

      console.log(`Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay)); // Attendre avant de réessayer
    }
  }
}

async function connectRedis() {
  const maxRetries = 3; // Nombre maximum de tentatives de reconnexion
  const retryDelay = 2000; // Délai entre les tentatives (en millisecondes)

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      redisClient = redis.createClient({ url: config.redisUri }); // Création du client Redis

      // Gestion des erreurs Redis
      redisClient.on('error', (err) => {
        console.error('Redis error:', err);
      });

      await redisClient.connect(); // Connexion au serveur Redis
      console.log('Connected to Redis');
      return; // Connexion réussie, sortie de la fonction
    } catch (error) {
      console.error(`Attempt ${attempt} failed to connect to Redis:`, error);

      if (attempt === maxRetries) {
        console.error('Max retries reached. Giving up.');
        throw error; // Relancer l'erreur après avoir épuisé les tentatives
      }

      console.log(`Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay)); // Attendre avant de réessayer
    }
  }
}