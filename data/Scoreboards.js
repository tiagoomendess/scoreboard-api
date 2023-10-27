'use strict';

const list = []
const reserved = []

const addNew = (object) => {
    let random;
    do {
        random = Math.floor(1000 + Math.random() * 9000);
    } while (list.find(x => x.code === random) || reserved.find(x => x.code === random));

    let newItem = {
        code: object.code ? object.code : random,
        homeEmblem: object.homeEmblem ? object.homeEmblem : "",
        awayEmblem: object.awayEmblem ? object.awayEmblem  : "",
        matchId: parseInt(object.matchId),
        homeScore: 0,
        awayScore: 0,
        isPaused: object.isPaused ? object.isPaused : false,
        isFinished: object.isFinished ? object.isFinished : false,
        timerStart: null,
        timerPausedAt: new Date().getTime(),
        createdAt: new Date(),
        lastUpdatedAt: new Date()
    }

    list.push(newItem);

    return newItem
}

const get = (code) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].code == code) {
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

            if (object.homeEmblem) {
                toUpdate.homeEmblem = object.homeEmblem
            }

            if (object.awayEmblem) {
                toUpdate.awayEmblem = object.awayEmblem
            }

            toUpdate.lastUpdatedAt = new Date()

            return true;
        }
    }

    toUpdate.homeScore = parseInt(object.homeScore)
    toUpdate.awayScore = parseInt(object.awayScore)
    toUpdate.isPaused = object.isPaused
    toUpdate.isFinished = object.isFinished
    toUpdate.timerStart = object.timerStart
    toUpdate.timerPausedAt = object.timerPausedAt

    return true;
}

const destroy = (code) => {
    let found = false;
    for (let i = 0; i < list.length; i++) {
        if (list[i].code === code) {
            list.splice(i, 1);
            found = true;
        }
    }

    for (let i = 0; i < reserved.length; i++) {
        if (reserved[i] === code) {
            reserved.splice(i, 1);
        }
    }

    return found;
}

const getReservedSpot = () => {
    let random;
    do {
        random = Math.floor(1000 + Math.random() * 9000);
    } while (list.find(x => x.code === random) || reserved.find(x => x === random));

    reserved.push(random);

    return random;
}

module.exports = {
    addNew: addNew,
    get: get,
    update: update,
    destroy: destroy,
    getReservedSpot: getReservedSpot
}
