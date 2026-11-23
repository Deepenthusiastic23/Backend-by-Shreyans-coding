import express from "express";
  


const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Deepak", course: "MCA" },
  { id: 2, name: "Priya", course: "MCA" },
];

let nextId = 3;

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});


 // Get all students with filtering and pagination
app.get("/api/students", (req, res) => {
  const { course } = req.query;

  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);

  // 1. Validate pagination
  if (
    !Number.isInteger(page) ||
    !Number.isInteger(limit) ||
    page < 1 ||
    limit < 1 ||
    limit > 100
  ) {
    return res.status(400).json({
      success: false,
      message: "Page must be positive and limit must be between 1 and 100",
    });
  }

  // 2. Filter students
  let filteredStudents = students;

  if (course !== undefined) {
    if (typeof course !== "string" || !course.trim()) {
      return res.status(400).json({
        success: false,
        message: "Course filter must be a non-empty string",
      });
    }

    filteredStudents = students.filter(
      (student) =>
        student.course.toLowerCase() === course.trim().toLowerCase()
    );
  }

  // 3. Calculate total after filtering
  const total = filteredStudents.length;

  // 4. Apply pagination
  const startIndex = (page - 1) * limit;

  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + limit
  );

  // 5. Return response
  return res.status(200).json({
    success: true,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    data: paginatedStudents,
  });
});


// Get one student
app.get("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid student ID",
    });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: student,
  });
});

// Create student
app.post("/api/students", (req, res) => {
  const { name, course } = req.body ?? {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof course !== "string" ||
    !course.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Name and course are required",
    });
  }

  const newStudent = {
    id: nextId++,
    name: name.trim(),
    course: course.trim(),
  };

  students.push(newStudent);

  return res.status(201).json({
    success: true,
    data: newStudent,
  });
});

// Delete student
app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid student ID",
    });
  }

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  students.splice(index, 1);

  return res.status(204).end();
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});