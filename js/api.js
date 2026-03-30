const GITHUB_API = "https://api.github.com";    // use of github api 
async function fetchIssues(language, label) {
    try{
    let query = 'label:"' + label + '" state:open language:' + language;
    let url = GITHUB_API + "/search/issues?q=" + encodeURIComponent(query) + "&per_page=20";

    let response = await fetch(url);   // api fetch

    let data = await response.json();   //converts response to json so that we can read
    return data.items;   // return issues array 
} catch (error) {
    console.error("Error fetching issues:", error);
    return [];
}
}
