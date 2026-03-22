# FirstMerge 🔀

A web app that helps developers find open source 
issues on GitHub that actually match their skill level.

---

## The Problem

If you've ever tried to contribute to open source,
you know how it goes. You search "good first issue"
on GitHub, get hundreds of results, spend 20 minutes
reading through them, and close the tab without doing
anything. Most issues are either too hard, in a language
you don't know, or the repo hasn't been touched in years.

There's no tool that filters issues based on *who you are*
as a developer. FirstMerge is that tool.

---

## What It Does

You tell the app your programming languages, your
experience level, and how much time you have per week.
It then pulls real issues from GitHub and shows you
only the ones that make sense for you — sorted, scored,
and flagged if they're stale or too complex.

You can bookmark issues you like, mark ones you've
worked on, and the app remembers your saved repos so
every time you come back there's something new waiting
from a codebase you already know.

---

## API Used

| API | Category | Purpose |
|-----|----------|---------|
| [GitHub REST API](https://docs.github.com/en/rest) | Development | Fetch live issues and repo data from GitHub |

---

## Features

**Core**
- Profile setup — pick your languages, level, and time
- Live issue feed from GitHub
- Search by keyword
- Filter by language and issue label
- Sort by newest, most stars, least competition

**Smart**
- Difficulty tag on each issue (Beginner / Intermediate / Advanced)
- Repo health score so you avoid dead projects
- Stale issue warning if nothing has moved in 60+ days

**Journey**
- Bookmark issues you want to work on
- Mark issues as contributed to track your progress
- Repo watchlist — come back and see new issues from repos you know
- README snippet generator for your portfolio

---

## Tech Stack

| | |
|---|---|
| HTML | Structure |
| CSS | Styling |
| JavaScript | Logic, API calls, data storage |
| React | UI components |

---

## Project Structure
```
firstmerge/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── typography.css
│   ├── layout.css
│   ├── components.css
│   ├── modal.css
│   ├── drawer.css
│   └── animations.css
├── js/
│   ├── api.js
│   ├── storage.js
│   ├── filters.js
│   ├── scoring.js
│   └── app.js
└── components/
    ├── header.js
    ├── sidebar.js
    ├── searchBar.js
    ├── issueFeed.js
    ├── issueCard.js
    ├── issueDrawer.js
    ├── profileModal.js
    └── snippetBox.js
```

---

## How To Run
```bash
git clone https://github.com/YOUR_USERNAME/firstmerge.git
cd firstmerge
```

Then just open `index.html` in your browser or use
Live Server in VS Code. No installs. No setup. Nothing.

If you want more API requests, add a free GitHub
Personal Access Token in the profile modal.
Without it you get 60 requests/hr which is fine for testing.

---

## What's Next

- GitHub login to auto-detect merged PRs
- Public portfolio page per developer
- GitLab support
- Email digest for watchlist updates

