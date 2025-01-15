// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: readmd
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : readmd

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  const { title, description, instructorId } = req.body;

  // Validation des champs requis
  if (!title || !description || !instructorId) {
    return res.status(400).json({ message: 'Title, description, and instructorId are required' });
  }

  try {
    // Vérifier si l'instructeur existe
    const instructor = await mongoService.findById('users', new ObjectId(instructorId));
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    // Créer le cours dans MongoDB
    const newCourse = {
      title,
      description,
      instructorId: new ObjectId(instructorId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const courseId = await mongoService.insertOne('courses', newCourse);

    // Mettre en cache le cours dans Redis
    await redisService.set(`course:${courseId}`, JSON.stringify(newCourse));

    // Réponse au client
    res.status(201).json({
      message: 'Course created successfully',
      courseId,
      course: newCourse,
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Failed to create course' });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
};