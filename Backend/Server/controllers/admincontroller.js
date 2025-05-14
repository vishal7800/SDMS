const fs = require("fs");
const path = require("path");

const getStudentsByGroup = (req, res) => {

    let { groupNumber } = req.query;

    if (!groupNumber) {
        return res.status(400).json({ message: "Missing groupNumber query parameter" });
    }

    if (groupNumber.startsWith('G-')) {
        groupNumber = groupNumber.split('G-')[1];
    }

    const filePath = path.join(__dirname, "users.json");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Failed to read user data" });
        }

        let users;
        try {
            users = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).json({ message: "Failed to parse user data" });
        }

        const filteredStudents = users.filter(user => user.groupNumber == groupNumber);

        res.json(filteredStudents);
    });
};

const loadAttendanceFile = () => {
  const filePath = path.join(__dirname, "attendance.json");
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf8");
  if (!data.trim()) return [];
  return JSON.parse(data);
};

const saveToFile = (filename, data) => {
  const filePath = path.join(__dirname, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const saveAttendance = (req, res) => {
  console.log("✅ Control reached in saveAttendance");

  const { groupNumber, subject, date, attendance } = req.body;

  if (!groupNumber || !subject || !date || !attendance) {
      return res.status(400).json({ message: "Missing required attendance data" });
  }

  let existing = loadAttendanceFile();

  const existingIndex = existing.findIndex(
      record =>
          record.date === date &&
          record.subject === subject &&
          record.groupNumber === groupNumber
  );

  if (existingIndex !== -1) {
      existing[existingIndex].attendance = attendance;
  } else {
      existing.push({
          date,
          subject,
          groupNumber,
          attendance
      });
  }

  saveToFile("attendance.json", existing);

  res.status(200).json({ message: "Attendance saved successfully" });
};

module.exports = {
    getStudentsByGroup,
    saveAttendance
};
