const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Add your MongoDB Atlas connection string here
mongoose.connect("YOUR_MONGODB_CONNECTION_STRING")

.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.error("❌ MongoDB Error:", err);
});

// Lead Schema
const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "New"
  },
  notes: {
    type: String
  }
});

const Lead = mongoose.model("Lead", LeadSchema);

// GET ALL LEADS
app.get("/api/leads", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ADD LEAD
app.post("/api/leads", async (req, res) => {
  try {
    const lead = new Lead(req.body);
    const savedLead = await lead.save();

    res.status(201).json(savedLead);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// DELETE LEAD
app.delete("/api/leads/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      message: "Lead Deleted Successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// UPDATE LEAD STATUS
app.put("/api/leads/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});