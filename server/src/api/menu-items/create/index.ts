import express from "express"

const app = express();
app.post("/", (req, res) => {
    console.log(req.body);
    res.json(req.body);
    res.status(201);
})

export {app as createItemRouter}
