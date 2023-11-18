const axios = require('axios');

const SPORTS_DATA_IO_API_KEY = process.env.SPORTS_DATA_IO_API_KEY;
const NFL_TEAMS_ENDPOINT = `https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=${SPORTS_DATA_IO_API_KEY}`;
const GAMES_IN_PROGRESS_ENDPOINT = `https://api.sportsdata.io/v3/nfl/scores/json/AreAnyGamesInProgress?key=${SPORTS_DATA_IO_API_KEY}`;

// Function to get all active NFL teams
const getActiveNflTeams = async () => {
  try {
    const response = await axios.get(NFL_TEAMS_ENDPOINT);
    return response.data; // The list of teams
  } catch (error) {
    console.error('Error fetching NFL teams:', error);
    throw error;
  }
};

// Function to check if any NFL games are currently in progress
const checkForLiveGames = async () => {
  try {
    const response = await axios.get(GAMES_IN_PROGRESS_ENDPOINT);
    return response.data; // Returns true or false
  } catch (error) {
    console.error('Error checking for live games:', error);
    throw error;
  }
};

module.exports = {
  getActiveNflTeams,
  checkForLiveGames,
};