const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "123456"; 

const registerUser = (req, res) => {
    const { name, rollNumber, email, groupNumber, password } = req.body;

    if (!name || !rollNumber || !email || !groupNumber || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const filePath = path.join(__dirname, "users.json");
    const userData = { name, rollNumber, email, groupNumber, password };

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err && err.code !== "ENOENT") {
            return res.status(500).json({ message: "Failed to read user data" });
        }

        const users = data ? JSON.parse(data) : [];
        users.push(userData);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: "Failed to save user data" });
            }
            res.status(200).json({ message: "Registration successful" });
        });
    });
};



const loginUser = (req, res) => {
    console.log("control reached in login ");
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Roll number and password are required" });
    }

    const filePath = path.join(__dirname, "users.json");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Failed to read user data" });
        }

        const users = data ? JSON.parse(data) : [];
        const user = users.find(
            (user) => user.rollNumber === username && user.password === password
        );

        if (user) {
            const token = jwt.sign({ rollNumber: user.rollNumber }, SECRET_KEY, {
                expiresIn: "1d",
            });
            console.log(token);

            res.status(200).json({ message: "Login successful", token });
        } else {
            res.status(401).json({ message: "Invalid roll number or password" });
        }
    });
};

const getUsers = (req, res) => {
    const filePath = path.join(__dirname, "users.json");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Failed to read user data" });
        }

        const users = data ? JSON.parse(data) : [];
        res.json(users);
    });
};

module.exports = {
    registerUser,
    getUsers,
    loginUser
};