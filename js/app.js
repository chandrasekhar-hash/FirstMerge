document.addEventListener("DOMContentLoaded", function () {

    //saves user profile
    let user = getProfile();

    // set language 
    let language = user ? user.language : "";
    const label = "good first issue";

    // get main elements from HTML
    const feed = document.getElementById("issue-feed");
    const searchInput = document.getElementById("search-input");
    const languageFilter = document.getElementById("language-filter");

    // difficulty buttons
    const levelBeginner = document.getElementById("level-beginner");
    const levelIntermediate = document.getElementById("level-intermediate");
    const levelAdvanced = document.getElementById("level-advanced");
    const levelAll = document.getElementById("level-all");

    //stores all fetched issues
    let allIssues = [];


    // decide difficulty based on number of comments
    function getDifficulty(issue){
        if (issue.comments > 10) return "Advanced";
        if (issue.comments > 5) return "Intermediate";
        return "Beginner";
    }


    // filter issues based on preferred level
    function applyUserFilter(issues){
        if (!user) return issues; // if no profile show all

        return issues.filter(function(issue) {
            let difficulty = getDifficulty(issue);
            return difficulty === user.level;
        });
    }


    // give each issue a score (to rank them)
    function calculateScore(issue) {
        let score = 0;

        let difficulty = getDifficulty(issue);

        // if matches user level → high score
        if (user && difficulty === user.level) {
            score += 50;
        }

        // easy issues → more score
        if (issue.comments <= 5) {
            score += 20;
        }

        // medium issues → medium score
        if (issue.comments > 5 && issue.comments <= 10) {
            score += 10;
        }

        // too many comments → reduce score
        if (issue.comments > 15) {
            score -= 10;
        }

        return score;
    }


    // main function to fetch and prepare issues
    async function loadIssues() {

        //loading message
        feed.textContent = "Loading issues...";

        // fetch issues from API
        let issues = await fetchIssues(language, label);

        // if no issues found
        if (!issues || issues.length === 0) {
            feed.textContent = "No issues found ";
            return;
        }

        // add score to each issue
        allIssues = issues.map(function(issue) {
            issue.score = calculateScore(issue);
            return issue;
        });

        // sort issues by score (highest first)
        allIssues.sort(function(a, b) {
            return b.score - a.score;
        });

        // apply user filter only for first view
        let initialRenderIssues = applyUserFilter(allIssues);

        // display issues
        renderIssues(initialRenderIssues);
    }


    // show issues on screen
    function renderIssues(issues) {

        // if nothing to show
        if (issues.length === 0) {
            feed.textContent = "No matching results";
            return;
        }

        // clear old content
        feed.innerHTML = "";

        // loop through each issue
        issues.forEach(function (issue) {   

            // create card
            let card = document.createElement("div");
            card.className = "issue-card";

            // issue title
            let title = document.createElement("h3");
            title.textContent = issue.title;

            // comments count
            let comments = document.createElement("p");
            comments.textContent = "Comments: " + issue.comments;

            // extract repo name from URL
            let parts = issue.repository_url.split("/");
            let owner = parts[parts.length - 2];
            let repoNameOnly = parts[parts.length - 1];
            let repoName = owner + "/" + repoNameOnly;

            let repo = document.createElement("p");
            repo.textContent = "Repo: " + repoName;

            // difficulty
            let difficulty = getDifficulty(issue);
            let level = document.createElement("p");
            level.textContent = "Level: " + difficulty;

            // score
            let score = document.createElement("p");
            score.textContent = "Score: " + issue.score;

            // bookmark button
            let bookmarkBtn = document.createElement("button");
            bookmarkBtn.textContent = "⭐ Bookmark";

            // when bookmark is clicked
            bookmarkBtn.addEventListener("click", function () {

                let bookmarks = getBookmarks();

                // check if already bookmarked
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

            // link to open issue on GitHub
            let link = document.createElement("a");
            link.href = issue.html_url;
            link.target = "_blank";
            link.textContent = "View Issue";

            // add all elements to card
            card.appendChild(title);
            card.appendChild(comments);
            card.appendChild(repo);
            card.appendChild(level);
            card.appendChild(score);
            card.appendChild(bookmarkBtn);
            card.appendChild(link);

            // add card to page
            feed.appendChild(card);
        });
    }


    // search functionality
    searchInput.addEventListener("input", function () {

        let value = searchInput.value.toLowerCase();

        // filter based on title or repo
        let filteredIssues = allIssues.filter(function (issue) {
            let title = issue.title.toLowerCase();
            let repo = issue.repository_url.toLowerCase();
            return title.includes(value) || repo.includes(value);
        });

        renderIssues(filteredIssues);
    });


    // language dropdown change
    languageFilter.addEventListener("change", function () {
        language = languageFilter.value;
        loadIssues(); // reload issues with new language
    });


    // difficulty filters

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


    // run app when page loads
    loadIssues();


    // slow down background video
    let bgVideo = document.getElementById("bg-video");
    if (bgVideo) {
        bgVideo.playbackRate = 0.6;
    }

});