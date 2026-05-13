const mongodb = require('mongoose');

const mySchema = new mongodb.Schema(
{
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    gender: { type: String },
    ip_address: { type: String }
}, 
{ 
    timestamps: true 
})

const usersDb = mongodb.model("userDb", mySchema);

module.exports = {usersDb}
