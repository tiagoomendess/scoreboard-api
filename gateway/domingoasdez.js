'use strict';

const axios = require('axios');
const config = require('../config');
const baseUrl = config.domingo_as_dez_base_url

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
        console.error("Error: ", err)
        throw new Error("Não foi possível obter informações do jogo através do Domingo às Dez");
    }
}

const updateGameScore = async (matchId, homeScore, awayScore, uuid = null) => {
    try {
        let body = {
            home_score: homeScore,
            away_score: awayScore,
            uuid: uuid
        }

        let response = await axios.put(`${baseUrl}/api/games/${matchId}/scoreboard-updated`, body, {
            headers: {
                'Authorization': process.env.DOMINGO_AS_DEZ_API_KEY || 'nothing',
            }
        });

        return response.data;
    } catch (err) {
        if (err.response) {
            let response = err.response;
            let errorMsg = response.data?.message ? response.data.message : "Erro desconhecido";

            switch (response.status) {
                case 304:
                    throw new Error("Resultado é o mesmo, não precisa de atualização");
                case 404:
                    throw new Error("Jogo não encontrado");
                case 400:
                    throw new Error(errorMsg);
                default:
                    throw new Error(errorMsg);
            }
        }

        console.error("Unknown Error Calling Domingo às Dez: ", err.message ? err.message : err)
        throw new Error("Não foi possível contactar Domingo às Dez");
    }
}

module.exports = {
    getGames: getGames,
    getGame: getGame,
    updateGameScore: updateGameScore
}
