import { Router } from "express";
import * as studentService from "../services/studentService.js";

const router = Router();

// GET /api/students
// Get all students, with optional search query
router.get("/", async (req, res, next) => {
  try {
    const { search } = req.query;
    const students = await studentService.getAllStudents(search);
    res.json(students);
  } catch (err) {
    next(err);
  }
});

// POST /api/students
// Add a new student
router.post("/", async (req, res, next) => {
  try {
    // Basic validation
    if (!req.body.name || !req.body.rollNo) {
      return res
        .status(400)
        .json({ error: "Name and Roll Number are required." });
    }
    const newStudent = await studentService.addStudent(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    next(err);
  }
});

// GET /api/students/:id
// Get a single student by ID
router.get("/:id", async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// PUT /api/students/:id
// Update an existing student
router.put("/:id", async (req, res, next) => {
  try {
    const updatedStudent = await studentService.updateStudent(
      req.params.id,
      req.body
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found." });
    }
    res.json(updatedStudent);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/students/:id
// Delete a student
router.delete("/:id", async (req, res, next) => {
  try {
    const success = await studentService.deleteStudent(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Student not found." });
    }
    res.status(204).send(); // 204 No Content (standard for successful delete)
  } catch (err) {
    next(err);
  }
});

export default router;
