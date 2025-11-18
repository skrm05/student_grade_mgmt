import React, { useState, useEffect } from "react";

function StudentForm({ onSubmit, studentToEdit, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    attendance: "",
    subjects: [{ name: "", grade: "" }],
  });

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name,
        rollNo: studentToEdit.rollNo,
        attendance: studentToEdit.attendance,
        subjects:
          studentToEdit.subjects.length > 0
            ? studentToEdit.subjects
            : [{ name: "", grade: "" }],
      });
    } else {
      setFormData({
        name: "",
        rollNo: "",
        attendance: "",
        subjects: [{ name: "", grade: "" }],
      });
    }
  }, [studentToEdit]);

  const handleBaseChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (index, e) => {
    const { name, value } = e.target;
    const newSubjects = [...formData.subjects];
    newSubjects[index][name] = value;
    setFormData((prev) => ({ ...prev, subjects: newSubjects }));
  };

  const addSubject = () => {
    setFormData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { name: "", grade: "" }],
    }));
  };

  const removeSubject = (index) => {
    const newSubjects = formData.subjects.filter((_, i) => i !== index);

    if (newSubjects.length === 0) {
      setFormData((prev) => ({ ...prev, subjects: [{ name: "", grade: "" }] }));
    } else {
      setFormData((prev) => ({ ...prev, subjects: newSubjects }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      subjects: formData.subjects.filter((s) => s.name && s.grade),
    };
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center">
        {studentToEdit ? "Edit Student" : "Add New Student"}
      </h2>

   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleBaseChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label
            htmlFor="rollNo"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Roll Number
          </label>
          <input
            type="text"
            name="rollNo"
            id="rollNo"
            value={formData.rollNo}
            onChange={handleBaseChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="attendance"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Attendance (%)
        </label>
        <input
          type="number"
          name="attendance"
          id="attendance"
          value={formData.attendance}
          onChange={handleBaseChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

  
      <hr className="dark:border-gray-600" />
      <h3 className="text-lg font-medium">Subjects & Grades</h3>
      <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
        {formData.subjects.map((subject, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              name="name"
              placeholder="Subject Name"
              value={subject.name}
              onChange={(e) => handleSubjectChange(index, e)}
              className="grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="number"
              name="grade"
              placeholder="Grade"
              value={subject.grade}
              onChange={(e) => handleSubjectChange(index, e)}
              className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <button
              type="button"
              onClick={() => removeSubject(index)}
              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addSubject}
        className="w-full px-4 py-2 border border-dashed border-gray-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        + Add Subject
      </button>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
        >
          {studentToEdit ? "Update Student" : "Save Student"}
        </button>
      </div>
    </form>
  );
}

export default StudentForm;
