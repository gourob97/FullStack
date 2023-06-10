const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const redis = require("redis");

const db = mysql.createConnection({
  host: "localhost",
  user: "devops",
  password: "Gourob&1234",
  database: "mydb",
});

let redisClient;
(async () => {
  redisClient = redis.createClient();
  redisClient.connect();

  redisClient.on("error", (error) => console.error(`Error: ${error}`));

  redisClient.on("connect", () => console.log("Redis connected"));
})();

redisClient.on("disconnect", () => {
  console.log("redis client disconnected");
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});

// add movie
app.post("/api/movies", async (req, res) => {
  const { movieName } = req.body;
  const query = `INSERT INTO movie(name) values("${movieName}")`;
  db.query(query, (err, result) => {
    if (err) {
      console.log("Error in db call");
    } else {
      res.send(result);
    }
  });
  await new Promise((resolve, reject) => {
    redisClient.del("data", (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
});

//get all movies
app.get("/api/movies", async (req, res) => {
  const data = await redisClient.get("data");
  if (data) {
    console.log("Got data from redis");
    res.send(JSON.parse(data));
  } else {
    const query = "SELECT * FROM movie";
    db.query(query, async (err, result) => {
      res.send(result);
      console.log("Got data from DB");
      await new Promise((resolve, reject) => {
        redisClient.set("data", JSON.stringify(result), (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      });
    });
  }
});

//delete a movie
app.delete("/api/movies/:id", async (req, res) => {
  const movieId = req.params.id;
  const query = `DELETE FROM movie WHERE id= ${movieId} `;
  db.query(query, (err, result) => {
    res.send(result);
  });

  await new Promise((resolve, reject) => {
    redisClient.del("data", (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
});
