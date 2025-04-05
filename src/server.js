const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/aiModelsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema & Model
const aiModelSchema = new mongoose.Schema({
  name: String,
  url: String,
});

const AIModel = mongoose.model("AIModel", aiModelSchema);

// Preload AI Models
const preloadModels = async () => {
  const existingModels = await AIModel.find();
  if (existingModels.length === 0) {
    await AIModel.insertMany([
      { name: "PerplexityAI", url: "https://www.perplexity.ai/search?q=" },
      { name: "Phind", url: "https://www.phind.com/search?q=" },
    ]);
    console.log("Preloaded AI models into database.");
  }
};

preloadModels();

// API Endpoints
app.get("/models", async (req, res) => {
  const models = await AIModel.find();
  res.json(models);
});

app.post("/models", async (req, res) => {
  const { name, url } = req.body;
  if (!name || !url) return res.status(400).send("Name and URL required");

  const newModel = new AIModel({ name, url });
  await newModel.save();
  res.status(201).json(newModel);
});

app.delete("/models/:id", async (req, res) => {
  await AIModel.findByIdAndDelete(req.params.id);
  res.status(200).send("Model deleted");
});

app.listen(5000, () => console.log("Server running on port 5000"));
