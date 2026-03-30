document.addEventListener("DOMContentLoaded", function () {

    // inputs 
    let language = "JavaScript";
    let label = "good first issue";   // git hub label

    let feed = document.getElementById("issue-feed");

    async function loadIssues(){
        
        feed.innerHTML = "Loading issues..";

        
        let issues = await fetchIssues(language,label)

        if (issues == null) {
            feed.innerHTML = "No issues found 😢";
            return;
        }

        if(issues.length === 0){
            feed.innerHTML = "No issues found 😢";
            return
        }

        feed.innerHTML = "";

        for (let i = 0; i < issues.length; i++) {
            let issue = issues[i];
            let card = document.createElement("div");
            card.className = "issue-card";
            let title = document.createElement("h3");
            title.textContent = issue.title;
            let comments = document.createElement("p")
            comments.textContent = "Comments: " + issue.comments;

            let link = document.createElement("a");
            link.href = issue.html_url;
            link.target = "_blank";
            link.textContent = "View Issue";

            card.appendChild(title);
            card.appendChild(comments);
            card.appendChild(link);
            
            feed.appendChild(card);



        }
    }
    loadIssues();




});