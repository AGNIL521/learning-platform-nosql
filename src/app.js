// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?


const express = require('express');
const config = require('./config/env');
const db = require('./config/db');
const mongoService = require('./services/mongoService');
const redisService = require('./services/redisService');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

async function startServer() {
  try {
    // Initialiser les connexions aux bases de données
    await db.connect(); // Connexion à MongoDB
    await redisService.connect(); // Connexion à Redis

    // Configurer les middlewares Express
    app.use(express.json()); // Middleware pour parser le JSON
    app.use(express.urlencoded({ extended: true })); // Middleware pour parser les données de formulaire

    // Monter les routes
    app.use('/courses', courseRoutes);
    app.use('/students', studentRoutes);

    // Middleware pour gérer les erreurs 404
    app.use((req, res) => {
      res.status(404).json({ message: 'Route not found' });
    });

    // Middleware pour gérer les erreurs globales
    app.use((err, req, res, next) => {
      console.error('Error:', err);
      res.status(500).json({ message: 'Internal server error' });
    });

    // Démarrer le serveur
    const port = config.port || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  console.log('Shutting down server...');

  try {
    // Fermer les connexions aux bases de données
    await db.disconnect(); // Déconnexion de MongoDB
    await redisService.disconnect(); // Déconnexion de Redis

    console.log('Server shut down gracefully');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

startServer();