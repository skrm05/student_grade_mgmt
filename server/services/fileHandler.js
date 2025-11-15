import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// --- FILE HANDLING & PERSISTENCE ---
// This module demonstrates the "File Handling" requirement.
// It provides async functions to read from and write to the JSON "database".

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct the path to the db.json file
const DB_PATH = path.join(__dirname, "..", "data", "db.json");

/**
 * Reads the entire database from db.json.
 * @returns {Promise<object>} A promise that resolves to the parsed JSON data.
 */
export const readData = async () => {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading from database:", error);
    // If the file doesn't exist or is empty, return a default structure
    return { students: [] };
  }
};

/**
 * Writes the entire database object to db.json.
 * @param {object} data - The complete data object to write.
 * @returns {Promise<void>} A promise that resolves when writing is complete.
 */
export const writeData = async (data) => {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to database:", error);
  }
};
