const express = require('express');
const router = express.Router();
const {usersDb} = require('../models/user')

router.get("/", async (req, res) => {
    const userData = await usersDb.find(); 
    return res.status(200).send(`
        <ul>
            ${userData.map((ob)=>{
                return `<li>${ob.first_name} - ${ob.email}</li>`
            })}
        </ul>
    `)

    // res.send(`
    //     <ul>
    //         ${data.map(users => `<li>${users.first_name}</li>`).join("")}
    //     </ul>
    // `);
})

module.exports = router

