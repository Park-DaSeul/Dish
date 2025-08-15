import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Backend 서버 실행 중!");
});

app.listen(PORT, () => {
  console.log(`서버 실행 중 포트: ${PORT}`);
});
