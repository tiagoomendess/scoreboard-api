'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const domingoasdez = require("../gateway/domingoasdez.js");

function Match() {
    let router = express();
    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    router.route("/")
        .get(async (req, res) => {
            console.log("GET /matches");
            try {
                let matches = await domingoasdez.getGames();
                res.send({
                    success: true,
                    matches: matches
                })
            } catch (err) {
                res.status(500).send({
                    success: false,
                    error: err.message ?? "Não foi possível obter a lista de jogos disponíveis"
                })
            }
        })

        return router;
}

module.exports = Match;