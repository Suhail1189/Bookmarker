var bookmarkName = document.getElementById('bookmarkName');
var bookmarkURL = document.getElementById('bookmarkURL');
var submitbtn = document.getElementById('submit');
var bookmarkTableBody = document.getElementById('bookmarkTableBody');
var errorMessage = document.getElementById('errorMessage');
var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
function isValidURL(url) {
    var pattern = /^(https?:\/\/)/i;
    return pattern.test(url);
}
function submit() {
    var name = bookmarkName.value.trim();
    var url = bookmarkURL.value.trim();
    if (!name || !url) {
        alert('Please fill in all fields');
        return;
    }
    if (!isValidURL(url)) {
        errorMessage.classList.remove('d-none');
        return;
    }
    errorMessage.classList.add('d-none');
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].name === name) {
            alert('A bookmark with this name already exists');
            return;
        }
    }
    bookmarks.push({ name: name, url: url });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
    bookmarkName.value = '';
    bookmarkURL.value = '';
}
function renderBookmarks() {
    bookmarkTableBody.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        var row = `
            <tr>
                <td>${i + 1}</td>
                <td>${bookmark.name}</td>
                <td><a href="${bookmark.url}" target="_blank" class="btn btn-success btn-sm">Visit</a></td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteBookmark(${i})">Delete</button></td>
            </tr>
        `;
        bookmarkTableBody.innerHTML += row;
    }
}
function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
}
submitbtn.addEventListener('click', submit);
window.onload = renderBookmarks;