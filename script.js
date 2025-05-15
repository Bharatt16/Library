const form = document.querySelector("form");
const bookInput = document.querySelector("#book");
const authorInput = document.querySelector("#author");
const statusInput = document.querySelector("#status");
const records = document.querySelector(".records");

const myLibrary = [];

class Book {
  constructor(book,author,read){
    this.book = book ;                                 //USING CLASS
    this.author = author ;
    this.read = read ;
    this.id = crypto.randomUUID();
  }
}

// function Book(book, author, read) {
//   if (!new.target) {
//     throw Error("You must use the 'new' operator to call the constructor");
//   }
                                // USING CONSTRUCTORS
//   this.book = book;
//   this.author = author;
//   this.read = read;
//   this.id = crypto.randomUUID();
// }

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addBookToLibrary(
    bookInput.value,
    authorInput.value,
    statusInput.value
  );

  form.reset();
});

function addBookToLibrary(title, author, status) {
  const newBook = new Book(title, author, status);
  myLibrary.push(newBook);
  displayBook(newBook);
}

function displayBook(bookObj) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", bookObj.id);

    // Add class based on read status
    const readStatus = bookObj.read.trim().toLowerCase() === "read" ? "read" : "not-read";
    card.classList.add(readStatus);
      

  card.innerHTML = `
    <p class="name">${bookObj.book}</p>
    <p class="author">${bookObj.author}</p>
    <div class="readBox">${bookObj.read}</div>
    <button class="delete">Delete</button>
  `;

  records.appendChild(card);
}

records.addEventListener("click", (e) => {
    if (e.target.classList.contains("readBox")) {
      const card = e.target.closest(".card");
      const currentStatus = e.target.textContent.trim();
      const newStatus = currentStatus === "Read" ? "Not Read" : "Read";
  
      e.target.textContent = newStatus;
  
      // Toggle CSS classes
      card.classList.toggle("read");
      card.classList.toggle("not-read");
  
      // Update the book's status in myLibrary
      const id = card.getAttribute("data-id");
      const book = myLibrary.find(book => book.id === id);
      if (book) {
        book.read = newStatus;
      }
    }
  
    if (e.target.tagName === "BUTTON") {
      const card = e.target.closest(".card");
      const id = card.getAttribute("data-id");
      card.remove();
  
      const index = myLibrary.findIndex((book) => book.id === id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
      }
    }
  });
  

document.querySelector("#clear-all").addEventListener('click', ()=>{
         records.textContent="";
         myLibrary.length = 0;
});

document.querySelector("#show-all").addEventListener('click', ()=>{
    renderBooks(myLibrary);
});

document.querySelector("#show-read").addEventListener('click', ()=>{
     const readBooks = myLibrary.filter(book=>book.read==="Read");
     renderBooks(readBooks);
})
document.querySelector("#show-unread").addEventListener('click', ()=>{
     const unreadBooks = myLibrary.filter(book=>book.read==="Not Read");
     renderBooks(unreadBooks);
})

function renderBooks(bookList){
     records.textContent="";
     bookList.forEach(displayBook);
}
