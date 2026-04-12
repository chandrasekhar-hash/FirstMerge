# FirstMerge 🔀

A simple web app that helps developers find beginner-friendly open source issues on GitHub based on their skill level.

---

## The Problem

If you've ever tried contributing to open source, you probably faced this:

You search *"good first issue"* on GitHub, open a few links, get confused, and then give up.

Most issues:
- are too hard  
- use languages you don’t know  
- or belong to inactive projects  

There’s no simple way to find issues that actually match your level.

**That’s why I built FirstMerge.**

---

## What It Does

FirstMerge makes it easier to explore open source issues in a clean and simple way.

- It fetches real-time issues from GitHub  
- Shows only beginner-friendly issues  
- Helps you understand difficulty based on activity (comments)  
- Lets you search and filter easily  
- You can bookmark issues to come back later  

It also has a modern UI with a video background and glass-style cards to make the experience feel smooth and engaging.

---

## API Used

| API | Purpose |
|-----|--------|
| GitHub REST API | Fetches live issues using `/search/issues` |

---

## Features

### 🔹 Core Features
- Live issue feed from GitHub  
- Search issues by keyword  
- Bookmark issues using local storage  
- Clean and simple UI  

### 🔹 Smart Features
- Language selection (JavaScript, Python, HTML, CSS, TypeScript, etc.)  
- Difficulty levels based on comments:
  - Beginner → 0–5 comments  
  - Intermediate → 6–10 comments  
  - Advanced → 10+ comments  

---

## Tech Stack

| Technology | Use |
|-----------|-----|
| HTML | Structure |
| CSS | Styling (glassmorphism, layout) |
| JavaScript | Logic, API calls, filtering, local storage |

---

## Project Structure
merge/
├── index.html
├── backgroundUi.mp4
├── css/
│ ├── reset.css
│ ├── variables.css
│ ├── layout.css
│ └── components.css
└── js/
├── api.js
├── storage.js
└── app.js


---

## How To Run

Just open `index.html` in your browser.

No installation, no setup — everything runs directly in the browser using vanilla JavaScript.

---

## Final Note

This project was built to solve a real beginner problem — making open source contributions easier to start.

It focuses on simplicity, clarity, and real usability instead of complexity.