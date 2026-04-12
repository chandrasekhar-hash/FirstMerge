// use of github api 
const GITHUB_API = "https://api.github.com/search/issues";

async function fetchIssues(language, label) {
    try {
        // build query
        let query = 'label:"' + label + '" state:open';

        // add language if provided
        if (language && language !== "All") {
            query += ' ' + language;
        }

        // build full url
        let url = GITHUB_API + "?q=" + encodeURIComponent(query) + "&per_page=20";

        let response = await fetch(url);   // api fetch

        let data = await response.json();   // converts response to json so that we can read

        return data.items;   // return issues array 

    } catch (error) {
        console.error("Error fetching issues:", error);
        return [];
    }
}