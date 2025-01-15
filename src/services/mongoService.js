// Question: Pourquoi créer des services séparés ?
// Réponse: 

const mongoService = require('../services/mongoService');

async function getUserById(req, res) {
  const userId = req.params.id;

  try {
    const user = await mongoService.findOneById('users', userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
}