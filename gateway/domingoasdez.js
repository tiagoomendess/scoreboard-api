'use strict';

const env = process.env.NODE_ENV ?? 'dev';
const axios = require('axios');
const baseUrl = env === 'dev' ? 'http://localhost:8000' : 'https://domingoasdez.com/';

const getGames = async () => {
    try {
        let games = await axios.get(`${baseUrl}/api/games/today`);
        games = games.data;

        for (let i = 0; i < games.length; i++) {
            games[i].home_emblem = games[i].home_emblem.startsWith('http') ? games[i].home_emblem : baseUrl + games[i].home_emblem;
            games[i].away_emblem = games[i].away_emblem.startsWith('http') ? games[i].away_emblem : baseUrl + games[i].away_emblem;
        }

        return games;
    } catch (err) {
        console.error(err)
        throw new Error("Não foi possível obter a lista de jogos. Pedido ao Domingo às Dez falhou");
    }
}

const getGame = async (matchId) => {
    try {
        let match = await axios.get(`${baseUrl}/api/games/${matchId}`);
        match = match.data.data;
        match.home_emblem = match.home_emblem.startsWith('http') ? match.home_emblem : baseUrl + match.home_emblem;
        match.away_emblem = match.away_emblem.startsWith('http') ? match.away_emblem : baseUrl + match.away_emblem;

        return match;
    } catch (err) {
        console.error(err)
        throw new Error("Não foi possível obter informações do jogo através do Domingo às Dez");
    }
}

module.exports = {
    getGames: getGames,
    getGame: getGame
}
