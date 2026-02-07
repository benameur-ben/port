/**
 * Backend Server for Elite Portfolio System
 * Run with: node server.js
 */
import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Initialization
const db = new sqlite3.Database('./portfolio.db', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create Table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT,
      link TEXT
    )`, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        // Check if empty and seed initial data
        db.get("SELECT count(*) as count FROM projects", (err, row) => {
           if (row && row.count === 0) {
             const insert = 'INSERT INTO projects (title, description, category, link) VALUES (?,?,?,?)';
             
             // Developer Data
             db.run(insert, ["Enterprise FinTech Core", "Microservices architecture processing $1B+ daily volume.", "Developer", "#"]);
             
             // Automation Data
             db.run(insert, ["Supply Chain AI", "Automated procurement logic reducing waste by 40%.", "Automation", "#"]);
             
             // Mediator Data
             db.run(insert, ["Cross-Functional Bridge", "Led integration between Legacy Banking and Modern Crypto teams.", "Mediator", "#"]);

             // Buyer Data
             db.run(insert, ["SaaS Acquisition Audit", "Technical due diligence for $50M software acquisition.", "Buyer", "#"]);

             console.log("Seeded initial data.");
           }
        });
      }
    });
  }
});

// REST API Endpoints

// GET /api/projects - Fetch all works
app.get('/api/projects', (req, res) => {
  db.all("SELECT * FROM projects ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json(rows);
  });
});

// POST /api/projects - Add new work (Protected)
app.post('/api/projects', (req, res) => {
  // Simple auth simulation
  const authHeader = req.headers['authorization'];
  if (authHeader !== 'secret_key_123') { 
      return res.status(403).json({ error: 'Unauthorized: Invalid Auth Key' });
  }

  const { title, description, category, link } = req.body;
  if (!title || !category) {
      return res.status(400).json({ error: 'Title and Category are required' });
  }

  const sql = 'INSERT INTO projects (title, description, category, link) VALUES (?,?,?,?)';
  const params = [title, description, category, link];
  
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": req.body,
      "id": this.lastID
    });
  });
});

// DELETE /api/projects/:id - Remove work (Protected)
app.delete('/api/projects/:id', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (authHeader !== 'secret_key_123') { 
        return res.status(403).json({ error: 'Unauthorized' });
    }
    
    db.run("DELETE FROM projects WHERE id = ?", req.params.id, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", changes: this.changes });
    });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});