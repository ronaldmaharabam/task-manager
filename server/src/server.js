const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "task",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL");
});
app.use(cors());
app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use('*', express.static(path.join(__dirname, 'path-to-your-assets'), { 
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.css')) {
        res.set('Content-Type', 'text/css');
      }
    }
  }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//     const filePath = path.join(__dirname, 'public', req.url);
//     const contentType = mime.getType(filePath);
  
//     // Set explicit Content-Type header
//     if (contentType) {
//       res.setHeader('Content-Type', contentType);
//     }
  
//     next();
//   });
app.use("/assets", express.static(path.join(__dirname, 'dist', 'assets')));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      req.session.user = { username: results[0].username };
      res.redirect("/dashboard");
    } else {
      res.send("Invalid login credentials");
    }
  });
});

app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.sendFile(__dirname + "/dist/index.html");
  } else {
    res.redirect("/");
  }
});

app.get("/api/data", (req, res) => {
  const query = "SELECT * FROM tasks";
  db.query(query, (err, results) => {
    if (err) throw err;
    const ret = {};
    results.forEach((item) => {
      console.log(item);
      ret[item.id] = item;
    });
    res.json(ret);
  });
});

app.get("/api/priority", (req, res) => {
  const query = "SELECT * FROM priority";
  db.query(query, (err, results) => {
    if (err) throw err;
    const ret = { priority: [] };
    results.forEach((item) => {
      ret.priority.push(item.value);
    });
    res.json(ret);
  });
});

app.get("/api/team", (req, res) => {
  const query = "SELECT * FROM team"; 
  db.query(query, (err, results) => {
    if (err) throw err;
    const ret = { team: [] };
    results.forEach((item) => {
      ret.team.push(item.team_member);
    });
    res.json(ret);
  });
});

app.get("/api/status", (req, res) => {
  const query = "SELECT * FROM status";
  db.query(query, (err, results) => {
    if (err) throw err;
    const ret = { status: [] };
    results.forEach((item) => {
      ret.status.push(item.task_status);
    });
    res.json(ret);
  });
});

// app.post("/add-item", (req, res) => {
//   const newItem = req.body;

//   const query = "INSERT INTO tasks SET ?";
//   db.query(query, newItem, (err, results) => {
//     if (err) throw err;
//     res.send("Item added successfully");
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
