document.addEventListener("DOMContentLoaded", function () {
    // Inputs for API
  const language = "JavaScript"; 
  const label = "good first issue";

  // Connect to HTML
  const feed = document.getElementById("issue-feed");
  const searchInput = document.getElementById("search-input");

  const filterZero = document.getElementById("filter-zero");
  const filterAll = document.getElementById("filter-all");
  const sortComments = document.getElementById("sort-comments");

  // all global data store
  let allIssues = [];

  // fetch data
  async function loadIssues() {

    feed.textContent = "Loading issues...";

    let issues = await fetchIssues(language, label);

    if (!issues || issues.length === 0) {
      feed.textContent = "No issues found ";
      return;
    }

    allIssues = issues;   // store data

    renderIssues(allIssues);  // show data
  }

  // Render funciton to show dat on screen 
  function renderIssues(issues) {if (issues.length === 0) {
  feed.textContent = "No matching results 😢";
  return;
}

    feed.innerHTML = "";

    issues.map(function (issue) {

      let card = document.createElement("div");
      card.className = "issue-card";

      let title = document.createElement("h3");
      title.textContent = issue.title;

      let comments = document.createElement("p");
      comments.textContent = "Comments: " + issue.comments;

      let link = document.createElement("a");
      link.href = issue.html_url;
      link.target = "_blank";
      link.textContent = "View Issue";

      card.appendChild(title);
      card.appendChild(comments);
      card.appendChild(link);

      feed.appendChild(card);
    });
  }

  // Search function usinf filter 
searchInput.addEventListener("input", function () {
  let value = searchInput.value.toLowerCase();
  let filteredIssues = allIssues.filter(function (issue) {
    let title = issue.title.toLowerCase();
    let repo = issue.repository_url.toLowerCase();
    return title.includes(value) || repo.includes(value);
  });

  renderIssues(filteredIssues);

});

  // Filter 
  filterZero.addEventListener("click", function () {

    let filtered = allIssues.filter(function (issue) {
      return issue.comments === 0;
    });

    renderIssues(filtered);
  });
  //Reset Filter
  filterAll.addEventListener("click", function () {
    renderIssues(allIssues);
  });
  //Sort by comments
   sortComments.addEventListener("click", function () {

    let sorted = allIssues.slice();

    sorted.sort(function (a, b) {
      return b.comments - a.comments;
    });

    renderIssues(sorted);
  });
  loadIssues();

});