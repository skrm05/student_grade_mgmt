import express from "express";
import cors from "cors";
import studentRoutes from "./routes/students.js";
import reportRoutes from "./routes/reports.js";

// --- Server Setup ---
const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
// Enable Cross-Origin Resource Sharing (CORS) so our React app can talk to this server
app.use(cors());
// Enable the server to understand JSON request bodies
app.use(express.json());

// --- API Routes ---
// All routes related to student CRUD operations will be prefixed with /api/students
app.use("/api/students", studentRoutes);
// All routes related to generating reports will be prefixed with /api/reports
app.use("/api/reports", reportRoutes);

// --- Global Error Handler (Simple) ---
// A fallback for any errors that occur in our routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
