'use script';

const express = require('express');

function Index() {
    let router = express();
    router.route('/').get((req, res) => {
        res.send({
            message: 'It works!'
        })
    })

    return router;
}

module.exports = Index;
