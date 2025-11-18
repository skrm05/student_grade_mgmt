import { readData, writeData } from "./fileHandler.js";
import { Student } from "../models/Student.js";
import { randomUUID } from "crypto";


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


export const updateStudent = async (id, studentData) => {
  const db = await readData();
  const index = db.students.findIndex((s) => s.id === id);
  if (index === -1) {
    return null; 
  }


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


export const deleteStudent = async (id) => {
  const db = await readData();
  const initialLength = db.students.length;
  db.students = db.students.filter((s) => s.id !== id);

  if (db.students.length === initialLength) {
    return false; 
  }

  await writeData(db);
  return true; 
};


export const getRankList = async () => {
  const students = await getAllStudents(); 

  
  students.sort((a, b) => b.averageGrade - a.averageGrade);

  return students;
};


export const getTop5Students = async () => {
  const rankList = await getRankList();
  return rankList.slice(0, 5);
};


export const getSubjectWiseAverage = async () => {
  const db = await readData();
  const subjectStats = {};
  for (const student of db.students) {
    for (const subject of student.subjects) {
      const subjectName = subject.name;
      const grade = Number(subject.grade) || 0;

      if (!subjectStats[subjectName]) {
       
        subjectStats[subjectName] = { totalGrade: 0, count: 0 };
      }

    
      subjectStats[subjectName].totalGrade += grade;
      subjectStats[subjectName].count += 1;
    }
  }

  
  const averages = Object.keys(subjectStats).map((subjectName) => ({
    subject: subjectName,
    averageGrade:
      subjectStats[subjectName].totalGrade / subjectStats[subjectName].count,
  }));

 
  averages.sort((a, b) => b.averageGrade - a.averageGrade);

  return averages;
};
