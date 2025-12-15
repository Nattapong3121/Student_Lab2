const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Fake data
let students = [
    { id: 1, name: 'Ram', height: 170 },
    { id: 2, name: 'John', height: 165 },
    { id: 3, name: 'Anna', height: 160 },
    { id: 4, name: 'Mike', height: 175 },
    { id: 5, name: 'Lisa', height: 158 },
    { id: 6, name: 'Tom', height: 180 }
    
];

app.get('/', (req, res) => {
    res.send('Hello, REST APIs!');
});

// 1. Get all students
// Endpoint: GET /api/students
app.get('/api/students', (req, res) => {
    res.json(students);
});

// 2. Get student by ID
// Endpoint: GET /api/students/:id
app.get('/api/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

// 3. Create a new student
// Endpoint: POST /api/students
app.post('/api/students', (req, res) => {
    const newStudent = req.body;
    newStudent.id = students.length
        ? students[students.length - 1].id + 1
        : 1;

    students.push(newStudent);
    res.status(201).json(newStudent);
});

// 4. Update a student by ID
// Endpoint: PUT /api/students/:id
app.put('/api/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex !== -1) {
        students[studentIndex] = { id: studentId, ...req.body };
        res.json(students[studentIndex]);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

// 5. Delete a student by ID
// Endpoint: DELETE /api/students/:id
app.delete('/api/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex !== -1) {
        const deletedStudent = students.splice(studentIndex, 1);
        res.json(deletedStudent[0]);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} at http://localhost:${PORT}/`);
});
