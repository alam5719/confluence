 
import dotenv from "dotenv";
dotenv.config();

 
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());  

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/DB";  
// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });


//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Error:", err);
//     process.exit(1);
//   });

 
const fileSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const File = mongoose.model("File", fileSchema);

 

 
app.get("/api/files", async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
app.post("/api/files", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newFile = new File({ name, description });
    await newFile.save();
    res.status(201).json(newFile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
app.put("/api/files/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedFile = await File.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    res.json(updatedFile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
app.delete("/api/files/:id", async (req, res) => {
  try {
    await File.findByIdAndDelete(req.params.id);
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
