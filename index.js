const express = require("express");
const data = require('./MOCK_DATA.json');
const fs = require('fs/promises');
const mongodb = require('mongoose');


const app = express();
mongodb.connect('mongodb://127.0.0.1:27017/myApp')

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


app.use(express.urlencoded({ extended: false }));
app.use(async (req, res, next) => {
    const m1 = { msg: "hi from middleware1" }
    data.push(m1);
    await fs.appendFile('./log.txt', JSON.stringify(data, null, 2));
    next();
})

app.route('/api/users/:id')
    .get(async (req, res) => {
        let Mydata = await usersDb.findById(req.params.id);
        return res.status(200).json(Mydata);

        // let num= Number(req.params.id);
        // if(num>100)res.status(404).json({msg: `user : ${num} not found`});
        // let user = data.find((data)=>data.id===num);
        // await fs.writeFile('./log.txt', JSON.stringify(req.headers, null, 2))
        // res.setHeader("name","rishav")
        // return res.json(user); 
    })
    .put(async (req, res) => {
        const user = await usersDb.findById(req.params.id);
        const body = req.body;
        Object.keys(body).forEach((key)=>{
            user[key] = body[key];
        })
        await usersDb.findByIdAndUpdate(req.params.id, user)
        res.status(200).json({msg : "done"})

        // let num = Number(req.params.id);
        // let body = req.body;
        // let updateUser = {...body, "id":num};
        // let ind = data.findIndex((data)=>data.id===num);
        // data[ind]=updateUser;
        // await fs.writeFile('./MOCK_DATA.json', JSON.stringify(data));
        // return res.json(data);
    })
    .delete(async (req, res) => {
        await usersDb.findByIdAndDelete(req.params.id);
        res.status(200).json({msg : "done"})

        // let num = Number(req.params.id);

        // let ind = data.findIndex((data) => data.id === num);
        // data.splice(ind, 1);

        // await fs.writeFile('./MOCK_DATA.json', JSON.stringify(data));
        // return res.json(data);
    });

app.get("/:id/search", (req, res) => {
    res.end(`homepage ${req.params.id} ${req.query.q}`);
})

app.post("/api/new_user", async (req, res) => {
    const body = req.body;
    usersDb.create(body);
    return res.json({ msg: "done" });
})

app.get("/api/users", async (req, res) => {
    const d = await usersDb.find();
    return res.status(200).json(d);
})
app.get("/users", async (req, res) => {
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


app.listen(8080, () => {
    console.log('running on localhost:8080');
})


