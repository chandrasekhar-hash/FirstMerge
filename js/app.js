document.addEventListener("DOMContentLoaded", function () {
let user = getProfile();
let language = user ? user.language : "";
const label = "good first issue";
const feed = document.getElementById("issue-feed");
const searchInput = document.getElementById("search-input");
const languageFilter = document.getElementById("language-filter");
const levelBeginner = document.getElementById("level-beginner");
const levelIntermediate = document.getElementById("level-intermediate");
const levelAdvanced = document.getElementById("level-advanced");
const levelAll = document.getElementById("level-all");
let allIssues = [];
function getDifficulty(issue){
    if (issue.comments > 10) return "Advanced";
    if (issue.comments > 5) return "Intermediate";
    return "Beginner";
}
function applyUserFilter(issues){
    if (!user) return issues;
    return issues.filter(function(issue) {
        let difficulty = getDifficulty(issue);
        return difficulty === user.level;
    });
}
function calculateScore(issue) {
    let score = 0;
    let difficulty = getDifficulty(issue);
    if (user && difficulty === user.level) {
        score += 50;
    }
    if (issue.comments <= 5) {
        score += 20;
    }
    if (issue.comments > 5 && issue.comments <= 10) {
        score += 10;
    }
    if (issue.comments > 15) {
        score -= 10;
    }
    return score;
}
async function loadIssues() {
    feed.textContent = "Loading issues...";
    let issues = await fetchIssues(language, label);
    if (!issues || issues.length === 0) {
        feed.textContent = "No issues found ";
        return;
    }
    allIssues = issues.map(function(issue) {
        issue.score = calculateScore(issue);
        return issue;
    });
    allIssues.sort(function(a, b) {
        return b.score - a.score;
    });
    let initialRenderIssues = applyUserFilter(allIssues);
    renderIssues(initialRenderIssues);
}
function renderIssues(issues) {
    if (issues.length === 0) {
        feed.textContent = "No matching results";
        return;
    }
    feed.innerHTML = "";
    issues.forEach(function (issue) {   
        let card = document.createElement("div");
        card.className = "issue-card";
        let title = document.createElement("h3");
        title.textContent = issue.title;
        let comments = document.createElement("p");
        comments.textContent = "Comments: " + issue.comments;
        let parts = issue.repository_url.split("/");
        let owner = parts[parts.length - 2];
        let repoNameOnly = parts[parts.length - 1];
        let repoName = owner + "/" + repoNameOnly;
        let repo = document.createElement("p");
        repo.textContent = "Repo: " + repoName;
        let difficulty = getDifficulty(issue);
        let level = document.createElement("p");
        level.textContent = "Level: " + difficulty;
        let score = document.createElement("p");
        score.textContent = "Score: " + issue.score;
        let bookmarkBtn = document.createElement("button");
        bookmarkBtn.textContent = "⭐ Bookmark";
        bookmarkBtn.addEventListener("click", function () {
            let bookmarks = getBookmarks();
            let exists = bookmarks.find(function(item) {
                return item.id === issue.id;
            });
            if (!exists) {
                bookmarks.push(issue);
                saveBookmarks(bookmarks);
                alert("Bookmarked!");
            } else {
                alert("Already bookmarked!");
            }
        });
        let link = document.createElement("a");
        link.href = issue.html_url;
        link.target = "_blank";
        link.textContent = "View Issue";
        card.appendChild(title);
        card.appendChild(comments);
        card.appendChild(repo);
        card.appendChild(level);
        card.appendChild(score);
        card.appendChild(bookmarkBtn);
        card.appendChild(link);
        feed.appendChild(card);
    });
}
searchInput.addEventListener("input", function () {
    let value = searchInput.value.toLowerCase();
    let filteredIssues = allIssues.filter(function (issue) {
        let title = issue.title.toLowerCase();
        let repo = issue.repository_url.toLowerCase();
        return title.includes(value) || repo.includes(value);
    });
    renderIssues(filteredIssues);
});
languageFilter.addEventListener("change", function () {
    language = languageFilter.value;
    loadIssues();
});
levelBeginner.addEventListener("click", function () {
    let filtered = allIssues.filter(function (issue) {
        return issue.comments <= 5;
    });
    renderIssues(filtered);
});
levelIntermediate.addEventListener("click", function () {
    let filtered = allIssues.filter(function (issue) {
        return issue.comments > 5 && issue.comments <= 10;
    });
    renderIssues(filtered);
});
levelAdvanced.addEventListener("click", function () {
    let filtered = allIssues.filter(function (issue) {
        return issue.comments > 10;
    });
    renderIssues(filtered);
});
levelAll.addEventListener("click", function () {
    renderIssues(allIssues);
});
loadIssues();
let bgVideo = document.getElementById("bg-video");
if (bgVideo) {
    bgVideo.playbackRate = 0.6;
}
});