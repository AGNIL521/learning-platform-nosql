// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : readmd
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : readmd

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  const missingVars = requiredEnvVars.filter(variable => !process.env[variable]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  console.log('All required environment variables are present');
}

// Appeler la fonction de validation au démarrage
try {
  validateEnv();
} catch (error) {
  console.error('Failed to start application:', error.message);
  process.exit(1); // Quitter l'application avec un code d'erreur
}

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};