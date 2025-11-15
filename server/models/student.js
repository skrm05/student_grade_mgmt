export class Student {
  constructor(id, name, rollNo, attendance, subjects) {
    this.id = id;
    this.name = name;
    this.rollNo = rollNo;
    this.attendance = attendance;
    // Ensure subjects is always an array
    this.subjects = Array.isArray(subjects) ? subjects : [];
  }

  /**
   * Calculates the average grade for the student.
   * @returns {number} The average grade, or 0 if no subjects.
   */
  calculateAverage() {
    if (this.subjects.length === 0) {
      return 0;
    }
    const total = this.subjects.reduce(
      (sum, subject) => sum + (Number(subject.grade) || 0),
      0
    );
    return total / this.subjects.length;
  }

  /**
   * Returns a plain object representation of the student,
   * including the calculated average.
   */
  toObjectWithAverage() {
    return {
      ...this,
      averageGrade: this.calculateAverage(),
    };
  }
}
