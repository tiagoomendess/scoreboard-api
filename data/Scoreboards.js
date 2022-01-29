'use strict';

const list = []

const addNew = (object) => {
    let random;
    do {
        random = Math.floor(1000 + Math.random() * 9000);
    } while (list.find(x => x.code === random));

    let newItem = {
        code: random,
        homeEmblem: object.homeEmblem ?? "",
        awayEmblem: object.awayEmblem ?? "",
        matchId: parseInt(object.matchId),
        homeScore: 0,
        awayScore: 0,
        isPaused: object.isPaused ?? false,
        isFinished: object.isFinished ?? false,
        timerStart: null,
        timerPausedAt: new Date().getTime(),
        createdAt: new Date(),
    }
    list.push(newItem);

    return newItem
}

const get = (code) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].code === code) {
            return list[i];
        }
    }

    return undefined;
}

const update = (code, object) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].code === code) {
            let toUpdate = list[i]
            toUpdate.homeScore = parseInt(object.homeScore)
            toUpdate.awayScore = parseInt(object.awayScore)
            toUpdate.isPaused = object.isPaused
            toUpdate.isFinished = object.isFinished
            toUpdate.timerStart = object.timerStart
            toUpdate.timerPausedAt = object.timerPausedAt
            list[i] = toUpdate;
            return true;
        }
    }

    return false;
}

const destroy = (code) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].code === code) {
            list.splice(i, 1);
            return true;
        }
    }

    return false;
}

module.exports = {
    addNew: addNew,
    get: get,
    update: update,
    destroy: destroy
}