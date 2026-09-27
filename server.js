const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// uploads folder না থাকলে তৈরি করে দেবে
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // uploads ফোল্ডারে সেভ হবে
  },
  filename: function (req, file, cb) {
    // অরিজিনাল নাম রাখতে চাইলে এভাবে:
    cb(null, file.originalname);

    // যদি ইউনিক নাম চান (একই নামের ফাইল ওভাররাইট এড়াতে), এটি ব্যবহার করুন:
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// শুধু একটি ইমেজ ফাইল আসবে, field name হবে "file"
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    message: "File uploaded successfully",
    fileName: req.file.filename,
    filePath: `uploads/${req.file.filename}`,
  });
});

app.get("/", (req, res) => {
  res.send("Express + Multer File Upload Server is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
