const express = require('express');
const mongodb = require('mongoose');

async function connectMongoDB(url){
    return await mongodb.connect(url);
}

module.exports = {
    connectMongoDB
}

