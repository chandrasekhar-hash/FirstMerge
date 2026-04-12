function saveProfile(profile) {
  localStorage.setItem("fm_profile", JSON.stringify(profile));
}
function getProfile() {
  let data = localStorage.getItem("fm_profile");
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading profile:", error);
    return null;
  }
}
function saveBookmarks(bookmarks) {
  localStorage.setItem("fm_bookmarks", JSON.stringify(bookmarks));
}
function getBookmarks() {
  let data = localStorage.getItem("fm_bookmarks");
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading bookmarks:", error);
    return [];
  }
}