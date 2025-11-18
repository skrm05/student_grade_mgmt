export class Student {
  constructor(id, name, rollNo, attendance, subjects) {
    this.id = id;
    this.name = name;
    this.rollNo = rollNo;
    this.attendance = attendance;
   
    this.subjects = Array.isArray(subjects) ? subjects : [];
  }


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


  toObjectWithAverage() {
    return {
      ...this,
      averageGrade: this.calculateAverage(),
    };
  }
}
