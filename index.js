const express = require("express");
const data = require('./MOCK_DATA.json');
const fs = require('fs/promises');
const app=express();

app.use(express.urlencoded({extended:false}));
app.use(async (req, res, next)=>{
    const m1= {msg : "hi from middleware1" }
    data.push(m1);
    await fs.writeFile('./MOCK_DATA.json', JSON.stringify(data,null,2));
    next();
})

app.route('/api/users/:id')
    .get(async (req,res)=>{
        let num= Number(req.params.id);
        if(num>100)res.status(404).json({msg: `user : ${num} not found`});
        let user = data.find((data)=>data.id===num);
        await fs.writeFile('./log.txt', JSON.stringify(req.headers, null, 2))
        res.setHeader("name","rishav")
        return res.json(user); 
    })
    .put(async (req,res)=>{
        let num = Number(req.params.id);
        let body = req.body;
        let updateUser = {...body, "id":num};
        let ind = data.findIndex((data)=>data.id===num);
        data[ind]=updateUser;
        await fs.writeFile('./MOCK_DATA.json', JSON.stringify(data));
        return res.json(data);
    })
    .patch(async (req,res)=>{
        let num = Number(req.params.id);
        let body = req.body;
        let ind = data.findIndex((data)=>data.id===num);
        Object.keys(body).forEach(element => {
            data[ind][element] = body[element];
        });
        await fs.writeFile('./MOCK_DATA.json', JSON.stringify(data));
        return res.json(data);
    })
    .delete(async (req,res)=>{
        let num = Number(req.params.id);

        let ind = data.findIndex((data)=>data.id===num);
        data.splice(ind,1);
        
        await fs.writeFile('./MOCK_DATA.json', JSON.stringify(data));
        return res.json(data);
    });

app.get("/:id/search", (req, res)=>{
    res.end(`homepage ${req.params.id} ${req.query.q}`);
})

app.get("/api/users", (req, res)=>{
    return res.json(data);
})
app.get("/users", (req, res)=>{
    res.send(`
        <ul>
            ${data.map(users=>`<li>${users.first_name}</li>`).join("")}
        </ul>
    `);
})


app.listen(8080, ()=>{
    console.log('running on localhost:8080');
})


