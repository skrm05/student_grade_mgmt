import express from "express";
import cors from "cors";
import studentRoutes from "./routes/students.js";
import reportRoutes from "./routes/reports.js";


const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());

app.use(express.json());


app.use("/api/students", studentRoutes);

app.use("/api/reports", reportRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
