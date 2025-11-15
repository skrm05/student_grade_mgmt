import React from "react";

function ReportGenerator({ onGenerate, report, isLoading }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>

      <div className="grid grid-cols-1 gap-3">
        <button
          onClick={() => onGenerate("ranklist")}
          disabled={isLoading}
          className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
        >
          Generate Rank List
        </button>
        <button
          onClick={() => onGenerate("top5")}
          disabled={isLoading}
          className="w-full px-4 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300 disabled:opacity-50"
        >
          Show Top 5 Students
        </button>
        <button
          onClick={() => onGenerate("subject-averages")}
          disabled={isLoading}
          className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 disabled:opacity-50"
        >
          Subject-wise Averages
        </button>
      </div>

      {/* --- Report Display Area --- */}
      <div className="mt-6">
        {isLoading && !report && <p>Generating report...</p>}
        {report && (
          <div className="border-t dark:border-gray-700 pt-4">
            <h3 className="text-xl font-semibold mb-3 capitalize">
              {report.type.replace("-", " ")}
            </h3>
            <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {report.data.length === 0 ? (
                <li className="text-gray-500 dark:text-gray-400">
                  No data available for this report.
                </li>
              ) : (
                report.data.map((item, index) => (
                  <ReportItem
                    key={index}
                    item={item}
                    type={report.type}
                    index={index}
                  />
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Rank List  Top 5 ---
function ReportItem({ item, type, index }) {
  if (type === "ranklist" || type === "top5") {
    return (
      <li className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
        <div className="flex items-center">
          <span className="text-sm font-bold text-gray-600 dark:text-gray-300 w-6">
            {index + 1}.
          </span>
          <div>
            <div className="font-medium">{item.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {item.rollNo}
            </div>
          </div>
        </div>
        <span className="font-bold text-green-600 dark:text-green-400">
          {item.averageGrade.toFixed(2)}
        </span>
      </li>
    );
  }

  // --- Render for Subject Averages ---
  if (type === "subject-averages") {
    return (
      <li className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
        <div className="font-medium">{item.subject}</div>
        <span className="font-bold text-blue-600 dark:text-blue-400">
          {item.averageGrade.toFixed(2)}
        </span>
      </li>
    );
  }

  return null;
}

export default ReportGenerator;
