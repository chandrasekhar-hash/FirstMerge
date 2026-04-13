// save user profile in browser storage
function saveProfile(profile) {
  // convert object to string and store it
  localStorage.setItem("fm_profile", JSON.stringify(profile));
}

// get user profile from browser storage
function getProfile() {
  // read saved data
  let data = localStorage.getItem("fm_profile");

  // if nothing is saved, return null
  if (!data) return null;

  try {
    // convert string back to object and return it
    return JSON.parse(data);

  } catch (error) {
    // if something goes wrong , show error
    console.error("Error reading profile:", error);

    // return null to avoid breaking app
    return null;
  }
}


// save bookmarked issues
function saveBookmarks(bookmarks) {
  // store bookmarks as string
  localStorage.setItem("fm_bookmarks", JSON.stringify(bookmarks));
}


// get bookmarked issues
function getBookmarks() {

  // read saved bookmarks
  let data = localStorage.getItem("fm_bookmarks");

  // if no bookmarks exist, return empty array
  if (!data) return [];

  try {
    // convert string back to array and return it
    return JSON.parse(data);

  } catch (error) {
    // if error occurs, log it
    console.error("Error reading bookmarks:", error);

    // return empty array to keep app safe
    return [];
  }
}