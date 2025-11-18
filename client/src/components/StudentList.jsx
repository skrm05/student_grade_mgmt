import React from "react";

function StudentList({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No students found. Try a different search or add a new student.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-left">
          <thead className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
                Name
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
                Roll No.
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
                Avg. Grade
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
                Attendance
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {students.map((student) => (
              <StudentItem
                key={student.id}
                student={student}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function StudentItem({ student, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <td className="px-6 py-4">
        <div className="font-medium">{student.name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {student.subjects.length} Subjects
        </div>
      </td>
      <td className="px-6 py-4">{student.rollNo}</td>
      <td className="px-6 py-4">
        <span
          className={`font-bold ${
            student.averageGrade >= 80
              ? "text-green-600 dark:text-green-400"
              : "text-yellow-600 dark:text-yellow-400"
          }`}
        >
          {student.averageGrade.toFixed(2)}
        </span>
      </td>
      <td className="px-6 py-4">{student.attendance}%</td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(student)}
            className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 dark:bg-yellow-600 dark:text-white dark:hover:bg-yellow-500"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(student.id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200 dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default StudentList;
