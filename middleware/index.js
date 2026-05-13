const express = require("express");
const fs = require('fs/promises');

function logData(){
    return async (req, res, next) =>{
        await fs.appendFile('./log.txt', JSON.stringify(`user logged at ${Date.now()}`, null, 2));
        next();
    }
}

module.exports = {
    logData
}

