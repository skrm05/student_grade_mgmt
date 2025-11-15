import { readData, writeData } from "./fileHandler.js";
import { Student } from "../models/Student.js";
import { randomUUID } from "crypto";

// --- DATA STRUCTURES & ALGORITHMS DEMONSTRATION ---
// This service file handles all business logic and demonstrates:
// 1. Data Structures (Lists, Dictionaries)
// 2. Sorting Algorithms (in getRankList)
// 3. Searching Algorithms (in getAllStudents)
// 4. OOP (by using the Student class)

/**
 * Retrieves all students, with optional search.
 * --- SEARCHING ALGORITHM ---
 * Uses Array.filter() to perform a linear search (O(n)).
 */
export const getAllStudents = async (searchQuery) => {
  const db = await readData();
  let students = db.students.map(
    (s) => new Student(s.id, s.name, s.rollNo, s.attendance, s.subjects)
  );

  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    students = students.filter(
      (student) =>
        student.name.toLowerCase().includes(lowerQuery) ||
        student.rollNo.toLowerCase().includes(lowerQuery)
    );
  }
  return students.map((s) => s.toObjectWithAverage());
};

/** Retrieves a single student by ID. */
export const getStudentById = async (id) => {
  const db = await readData();
  const studentData = db.students.find((s) => s.id === id);
  if (!studentData) {
    return null;
  }
  const student = new Student(
    studentData.id,
    studentData.name,
    studentData.rollNo,
    studentData.attendance,
    studentData.subjects
  );
  return student.toObjectWithAverage();
};

/** Adds a new student. */
export const addStudent = async (studentData) => {
  const db = await readData();
  const newStudent = new Student(
    randomUUID(),
    studentData.name,
    studentData.rollNo,
    studentData.attendance,
    studentData.subjects
  );

  db.students.push(newStudent);
  await writeData(db);
  return newStudent.toObjectWithAverage();
};

/** Updates an existing student by ID. */
export const updateStudent = async (id, studentData) => {
  const db = await readData();
  const index = db.students.findIndex((s) => s.id === id);
  if (index === -1) {
    return null; // Not found
  }

  // Update data
  const updatedStudentData = { ...db.students[index], ...studentData, id }; // Ensure ID is not overwritten
  const updatedStudent = new Student(
    updatedStudentData.id,
    updatedStudentData.name,
    updatedStudentData.rollNo,
    updatedStudentData.attendance,
    updatedStudentData.subjects
  );

  db.students[index] = updatedStudent;
  await writeData(db);
  return updatedStudent.toObjectWithAverage();
};

/** Deletes a student by ID. */
export const deleteStudent = async (id) => {
  const db = await readData();
  const initialLength = db.students.length;
  db.students = db.students.filter((s) => s.id !== id);

  if (db.students.length === initialLength) {
    return false; // Not found
  }

  await writeData(db);
  return true; // Deletion successful
};

// --- REPORTING LOGIC ---

/**
 * Generates a ranked list of all students.
 * --- SORTING ALGORITHM ---
 * Uses Array.sort() with a custom comparator (O(n log n)).
 */
export const getRankList = async () => {
  const students = await getAllStudents(); // This already includes averages

  // Sort by average grade, descending.
  students.sort((a, b) => b.averageGrade - a.averageGrade);

  return students;
};

/** Generates a list of the top 5 students. */
export const getTop5Students = async () => {
  const rankList = await getRankList();
  return rankList.slice(0, 5);
};

/**
 * Generates subject-wise average grades.
 * --- DATA STRUCTURE (HASHMAP) ---
 * Uses a plain object (`subjectStats`) as a "HashMap" or "Dictionary"
 * to aggregate totals and counts for each subject dynamically.
 */
export const getSubjectWiseAverage = async () => {
  const db = await readData();
  const subjectStats = {}; // This is our HashMap

  for (const student of db.students) {
    for (const subject of student.subjects) {
      const subjectName = subject.name;
      const grade = Number(subject.grade) || 0;

      if (!subjectStats[subjectName]) {
        // If subject is not in the map, add it
        subjectStats[subjectName] = { totalGrade: 0, count: 0 };
      }

      // Update the map entry
      subjectStats[subjectName].totalGrade += grade;
      subjectStats[subjectName].count += 1;
    }
  }

  // Convert the aggregated stats into a list of averages
  const averages = Object.keys(subjectStats).map((subjectName) => ({
    subject: subjectName,
    averageGrade:
      subjectStats[subjectName].totalGrade / subjectStats[subjectName].count,
  }));

  // Sort by average grade, descending
  averages.sort((a, b) => b.averageGrade - a.averageGrade);

  return averages;
};
