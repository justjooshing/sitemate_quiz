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
  id: "123",
  title: "Title of this issue",
  description: "An issue description",
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
    res.status(400).send(err);
  }
});

// can I combine these?
app.post("/api/issues/create", (req, res) => {
  try {
    const data = req.body;
    console.log("This is the created data", data);
    if (data.id) {
    }
    res.status(201).json(jsonObj);
  } catch (err) {
    console.log("create err", err);
    res.status(400).send(err);
  }
});

app.post("/api/issues/update", (req, res) => {
  try {
    const data = req.body;
    console.log("This is the updated data", data);
    res.status(200).json(jsonObj);
  } catch (err) {
    console.log("update err", err);
    res.status(400).send(err);
  }
});

app.delete("/api/issues/delete", (req, res) => {
  try {
    const { issueid } = req.query;
    if (!issueid) {
      throw new Error("No issue id");
    }
    console.log("deleted issue with id:", issueid);
    res.status(204);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
