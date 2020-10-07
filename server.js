const express = require("express");
const path = require("path");
const notes = require("./db/db.json")
const { v4: uuidv4 } = require('uuid')

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
  res.json(notes)
})

app.post("/api/notes", (req, res) => {
  const note = req.body;
  note.id = uuidv4();
  notes.push(note);
})

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id
  for(let i = 0; i < notes.length; i++) {
    if(notes[i].id === id){
      notes.splice(i, 1);
    }
  }
})

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
})