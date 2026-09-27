# Express + Multer File Upload System

## ১. প্রজেক্ট সেটআপ

```bash
npm install
```

এটি `express` এবং `multer` ইনস্টল করবে (package.json এ দেওয়া আছে)।

## ২. সার্ভার চালু করুন

```bash
node server.js
```

অথবা:

```bash
npm start
```

সার্ভার চালু হলে দেখাবে:
```
Server is running on http://localhost:3000
```

## ৩. Postman দিয়ে টেস্ট করার নিয়ম

1. Postman ওপেন করুন।
2. একটি নতুন request তৈরি করুন:
   - Method: **POST**
   - URL: `http://localhost:3000/upload`
3. **Body** ট্যাবে যান → **form-data** সিলেক্ট করুন।
4. একটি key যোগ করুন:
   - Key: `file`
   - Type: **File** (ড্রপডাউন থেকে Text এর বদলে File সিলেক্ট করুন)
   - Value: আপনার কম্পিউটার থেকে যেকোনো একটি ইমেজ ফাইল সিলেক্ট করুন
5. **Send** বাটনে ক্লিক করুন।

## ৪. Expected Response

```json
{
  "message": "File uploaded successfully",
  "fileName": "image.jpg",
  "filePath": "uploads/image.jpg"
}
```

এবং ফাইলটি প্রজেক্টের `uploads/` ফোল্ডারের মধ্যে সেভ হয়ে যাবে:

```
uploads/
   └── image.jpg
```

## কোড এর সংক্ষিপ্ত ব্যাখ্যা

- `multer.diskStorage()` ব্যবহার করে আমরা বলে দিয়েছি ফাইল কোথায় (`destination`) এবং কোন নামে (`filename`) সেভ হবে।
- `upload.single("file")` মিডলওয়্যার শুধুমাত্র একটি ফাইল গ্রহণ করে, যার form-data key হতে হবে `file`।
- সার্ভার কোড চালু হওয়ার সময় `uploads` ফোল্ডার না থাকলে নিজে থেকেই তৈরি করে নেয় (`fs.existsSync` + `fs.mkdirSync`)।
- আপলোড সফল হলে `req.file` অবজেক্টে ফাইলের তথ্য (নাম, পাথ, সাইজ ইত্যাদি) পাওয়া যায়, যা রেসপন্সে পাঠানো হয়েছে।
