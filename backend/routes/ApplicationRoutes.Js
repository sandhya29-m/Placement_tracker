const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// CREATE (FIXED)
router.post("/", async (req, res) => {
    try {
        console.log("Incoming Data:", req.body);

        const data = await Application.create(req.body);
        res.status(201).json(data);

    } catch (err) {
        console.error("POST ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// READ (SAFE)
router.get("/", async (req, res) => {
    try {
        const data = await Application.find();
        res.json(data);
    } catch (err) {
        console.error("GET ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const data = await Application.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(data);
    } catch (err) {
        console.error("UPDATE ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Application.findByIdAndDelete(req.params.id);
        res.json({ msg: "Deleted" });
    } catch (err) {
        console.error("DELETE ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;