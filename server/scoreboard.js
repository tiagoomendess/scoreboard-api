'use script';

const bodyParser = require('body-parser');
const express = require('express');
const data = require('../data/Scoreboards.js');
const domingoasdez = require("../gateway/domingoasdez.js");

function Scoreboard() {
    let router = express();
    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    router.route("/")
        .post(async (req, res) => {
            console.log("POST /scoreboards");
            try {
                let match = await domingoasdez.getGame(req.body.matchId);
                req.body.homeEmblem = match.home_emblem;
                req.body.awayEmblem = match.away_emblem;
                let newItem = data.addNew(req.body);
                res.send({
                    success: true,
                    created: newItem
                })
            } catch (err) {
                res.status(500).send({
                    success: false,
                    error: err.message ? err.message : "Cannot create new scoreboard"
                })
            }
        });

    router.route("/reserve")
        .get((req, res) => {
            console.log("GET /scoreboards/reserve");
            res.send({
                success: true,
                code: data.getReservedSpot()
            });
        });

    router.route("/:id(\\d+)$")
        .get((req, res) => {
            console.log("GET /scoreboards/" + req.params.id);
            let result = data.get(parseInt(req.params.id))

            if (result)
                res.send(result);
            else
                res.status(404).send({
                    success: false,
                    message: "Scoreboard not found"
                });
        })
        .put((req, res) => {
            console.log("PUT /scoreboards");
            let result = data.update(parseInt(req.params.id), req.body);

            // Try to update website
            domingoasdez.updateGameScore(req.body.matchId, req.body.homeScore, req.body.awayScore)
                .then(() => {
                    console.log(`Updated score on Domingo às Dez with ${req.body.homeScore} - ${req.body.awayScore}`)
                })
                .catch((err) => {
                    console.log(`Could not update score on Domingo às Dez: ${err}`)
                });

            res.send({
                success: result,
                updated: req.body
            });
        })
        .delete((req, res) => {
            console.log("DELETE /scoreboards/" + req.params.id);
            let result = data.destroy(parseInt(req.params.id));
            res.send({
                success: result
            });
        });



    return router;
}

module.exports = Scoreboard