const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql2")

const db = mysql.createConnection({
    host: 'localhost',
    user: 'devops',
    password: 'Gourob&1234',
    database: 'mydb'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})

// add movie
app.post("/api/movies", (req,res) => {
    const {movieName } = req.body
    const query = `INSERT INTO movie(name) values("${movieName}")`
    db.query(query, (err, result) => {
        res.send(result)
    })
})


//get all movies
app.get("/api/movies", (req, res) => {
    const query = "SELECT * FROM movie"
    db.query(query, (err, result) => {
        res.send(result)
    }) 
})

//delete a movie 
app.delete('/api/movies/:id', (req, res) => {
    const movieId = req.params.id
    const query = `DELETE FROM movie WHERE id= ${movieId} `
    db.query(query, (err, result) => {
       res.send(result)
    })
});