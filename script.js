const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function render() {
  let library = document.querySelector(".library");
  library.innerHTML = ""; // Clear the library before rendering

  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookEl = document.createElement("div");
    bookEl.setAttribute("class", "book-card");

    bookEl.innerHTML = ` 
    <div class="card-header">
      <h3 class="title">${book.title}</h3>
      <h5 class="author">by ${book.author}</h5>
    </div>
    <div class="card-body">
      <p>${book.pages} pages</p>
      <label for="read-status-${i}">Read:</label>
      <input type="checkbox" class="read-status" id="read-status-${i}" ${book.read ? "checked" : ""}>
      <button class="remove">Remove</button>
    </div>
    `;

    // Append the book card to the library
    library.appendChild(bookEl);

    // Add an event listener to toggle the read status
    let checkbox = bookEl.querySelector(`#read-status-${i}`);
    checkbox.addEventListener("change", () => {
      book.read = checkbox.checked; // Update the book's read status
    });

    // Add an event listener to the remove button to remove the book
    let removeButton = bookEl.querySelector(".remove");
    removeButton.addEventListener("click", function () {
      myLibrary.splice(i, 1); // Remove the book from the library array
      render(); // Re-render the library
    });
  }
}

function addBookToLibrary() {
  let title = document.querySelector(".title").value;
  let author = document.querySelector(".author").value;
  let pages = document.querySelector(".number").value;
  let read = document.querySelector("#optionA").checked; // Check if the read checkbox is checked

  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);

  // Clear the input fields after adding the book
  document.querySelector(".title").value = "";
  document.querySelector(".author").value = "";
  document.querySelector(".number").value = "";
  document.querySelector("#optionA").checked = false;

  render();
}

// Show the form when "Add Book" button is clicked
let newBookButton = document.querySelector("#new-book-button");
newBookButton.addEventListener("click", function () {
  let newBookForm = document.querySelector(".new-book-form");
  newBookForm.style.display = "block";
});

// Handle the form submission
let addNewBookForm = document.querySelector(".new-book-form");
addNewBookForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission from refreshing the page
  addBookToLibrary();
});
