const express = require('express');
const {usersDb} = require('../models/user')

async function handleGetRequest(req, res) {
    let Mydata = await usersDb.findById(req.params.id);
    return res.status(200).json(Mydata);
}

async function handlePutRequest(req, res){
    const user = await usersDb.findById(req.params.id);
    const body = req.body;
    Object.keys(body).forEach((key)=>{
        user[key] = body[key];
    })
    await usersDb.findByIdAndUpdate(req.params.id, user)
    res.status(200).json({msg : "done"})
}

async function handleDelRequest(req, res){
    await usersDb.findByIdAndDelete(req.params.id);
    res.status(200).json({msg : "done"})
}

async function newUserPost(req, res){
    const body = req.body;
    usersDb.create(body);
    return res.json({ msg: "done" });
}

async function showAllData(req, res){
    const d = await usersDb.find();
    return res.status(200).json(d);
}

module.exports = {
    handleGetRequest,
    handlePutRequest,
    handleDelRequest,
    newUserPost,
    showAllData,
}

