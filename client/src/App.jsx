import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import StudentList from "./components/StudentList.jsx";
import StudentForm from "./components/StudentForm.jsx";
import ReportGenerator from "./components/ReportGenerator.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Modal from "./components/Modal.jsx";
import Header from "./components/Header.jsx";

function App() {
  const [students, setStudents] = useState([]);
  const [reports, setReports] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Using the search query to filter
      const response = await axios.get(
        `http://localhost:5001/api/students?search=${searchQuery}`
      );
      setStudents(response.data);
    } catch (err) {
      setError("Failed to fetch students. Please check the server.");
      console.error(err);
    }
    setIsLoading(false);
  }, [searchQuery]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // --- Modal Controls ---
  const openAddModal = () => {
    setStudentToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    setStudentToEdit(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStudentToEdit(null);
  };

  // --- CRUD Operations ---
  const handleFormSubmit = async (studentData) => {
    try {
      if (studentToEdit) {
        await axios.put(
          `http://localhost:5001/api/students/${studentToEdit.id}`,
          studentData
        );
      } else {
        await axios.post("http://localhost:5001/api/students", studentData);
      }
      fetchStudents();
      closeModal();
    } catch (err) {
      setError("Failed to save student.");
      console.error(err);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:5001/api/students/${id}`);
        fetchStudents();
      } catch (err) {
        setError("Failed to delete student.");
        console.error(err);
      }
    }
  };

  // --- Report Generation ---
  const handleGenerateReport = async (reportType) => {
    setIsLoading(true);
    setReports(null);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5001/api/reports/${reportType}`
      );
      setReports({ type: reportType, data: response.data });
    } catch (err) {
      setError("Failed to generate report.");
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />

        {/* --- Controls --- */}
        <div className="my-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchBar onSearch={setSearchQuery} />
            <div className="flex justify-end items-center">
              <button
                onClick={openAddModal}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Add New Student
              </button>
            </div>
          </div>
        </div>

        {/* --- Error Display --- */}
        {error && (
          <div className="my-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* --- Main Content Area (Reports & Student List) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Student Roster</h2>
            {isLoading && !reports ? (
              <p>Loading students...</p>
            ) : (
              <StudentList
                students={students}
                onEdit={openEditModal}
                onDelete={handleDeleteStudent}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <ReportGenerator
              onGenerate={handleGenerateReport}
              report={reports}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* --- Add/Edit Modal --- */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <StudentForm
          onSubmit={handleFormSubmit}
          studentToEdit={studentToEdit}
          onClose={closeModal}
        />
      </Modal>
    </div>
  );
}

export default App;
