// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :

const redisClient = require('../config/redis'); // Import du client Redis configuré

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl = 3600) {
  try {
    // Convertir les données en chaîne JSON
    const dataString = JSON.stringify(data);

    // Mettre en cache les données avec un TTL (Time-To-Live) optionnel
    if (ttl) {
      await redisClient.set(key, dataString, 'EX', ttl); // 'EX' pour définir une expiration en secondes
    } else {
      await redisClient.set(key, dataString);
    }

    console.log(`Data cached with key: ${key}`);
  } catch (error) {
    console.error(`Error caching data with key ${key}:`, error);
    throw error; // Relancer l'erreur pour la gestion externe
  }
}

// Export des fonctions utilitaires
module.exports = {
  cacheData,
};