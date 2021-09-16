const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;
app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});

let myArray = [
    {"name": "item 1", "id": 1, },
    {"name": "item 2", "id": 2, },
    {"name": "item 3", "id": 3, },
    {"name": "item 4", "id": 4, }
];

app.get("/", (req, res  ) => {
    res.send("empty get request blah blah blah");
})


app.get("/api/array", (req, res) => {
    res.send(myArray)
})

app.get("/api/array/:id", (req, res) => {
    const value = updateValue(req, res);
    res.send(value);  
})

// following is the stupid approach. According to internet. But why? Seems to work just fine?
app.post("/api/array/:id/:name", (req, res)=> {
    let object = {
        name: req.params.name,
        id: parseInt(req.params.id)
    };

    myArray.push(object);
    res.send(`${object.id} and ${object.name} \nwas added.`);
})

// following approach works
// the slash before "api" is cruicial. Trust me.
app.post("/api/array", (req, res)=> {
    let object = {
        name: req.body.name,
        id: parseInt(req.body.id)
    };

    myArray.push(object);
    res.send(`${object.id} and ${object.name} \nwas added.`);
})

app.put("/api/array/:id", (req, res) => {
    // refactor
    const value = updateValue(req, res);

    value.name = req.body.name;
    res.send(value)
})

function updateValue(req, res) {
    const value = myArray.find(current => current.id === parseInt(req.params.id));
    if (!value) {
        res.status(404).send("value not found");
    }
    return value;
}
