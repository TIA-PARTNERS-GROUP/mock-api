const express = require('express');
const db = require('./db');
const app = express();


app.get("/users/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);

        if (rows.length === 0) {
            return res.status(404).json({error: "User not found"});
        }

        res.json(rows[0])

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({error: "Internal server error"})
    }
});


app.listen(3000, () => {
 console.log("Server running on port 3000");
});
    