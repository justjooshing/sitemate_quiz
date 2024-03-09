import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

const port = 8080;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const clientUrl = "http://localhost:8081/";

const jsonObj = {
  id: "",
  title: "",
  description: "",
};
/**
 * 
The server should support these 4 standard operations:
Create: accepts a JSON object & prints/logs the object
Read: returns a static JSON object
Update: accepts a JSON object & prints/logs the object
Delete: prints/logs out the object or id to delete

 */

app.get("/api/issues", async (req, res) => {
  try {
    res.status(200).json(jsonObj);
  } catch (err) {
    console.log("get error", err);
  }
});

// can I combine these?
app.post("/api/issues/create", (req, res) => {
  try {
    const data = req.body.json();
    if (data.id) {
    }
    res.status(201).json(jsonObj);
  } catch (err) {
    console.log("post err", err);
  }
});

app.post("/api/issues", (req, res) => {
  try {
    const data = req.body.json();
    res.status(200).json(jsonObj);
  } catch (err) {
    console.log("post err", err);
  }
});

app.delete("/api/issues", () => {
  try {
    res.status(204);
  } catch (err) {
    console.log("post err", err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
