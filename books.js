import { api } from "./main.js";

const getBooks = async () => {
  try {
    const res = await api({
      path: "/books",
    }); // waiting for api to complete
    if (res && res.data && res.data.data) {
      // res object has nested data and grandchild data property
      const books = res.data.data;
      showBooks(books);
      return;
    }
    throw new Error("Books data not recieved");
  } catch (e) {
    console.log(e);
  }
};

const showBooks = (books) => {
  let bookStore = $("#book_store");
  if (books && books.length) {
    //there are some books

    let cards = books.map((book) => {
      let card = createBookCard(book);
      return card;
    });

    bookStore.append(...cards); // dom manipluation should be one time
  } else {
    // there is no book
    names.innerHTML = "No books available";
  }
};

const createBookCard = (book) => {
  const { volumeInfo, id, saleInfo } = book;

  const {
    title,
    authors,
    imageLinks,
    description,
    ratingsCount = 5,
    publishedDate,
  } = volumeInfo;

  const { thumbnail } = imageLinks;
  const { retailPrice } = saleInfo;
  const { amount, countryCode = "INR" } = retailPrice || {};
  let writter = "Unkown";

  if (authors && authors.length) {
    writter = authors[0];
  }

  let card = $(`<div data-id=${id} class="book_card">
            <div class="book_img_box">
              <img
                src=${thumbnail}
                class="book_img"
                alt=${title}
              />
            </div>
            <div class="book_card_content">
              <p class="book_title">${title}</p>
              <p class="book_description">
               ${description}
              </p>
              <p class="book_author">${writter}</p>
              <div class="book_price_date_section">
                <span>
                  Pub:<span class="book_publish_date"> ${publishedDate}</span>
                </span>
               ${
                 amount
                   ? `<span class="book_price"> ${Math.ceil(
                       amount
                     )} ${countryCode}</span>`
                   : `<span class="book_not_sale">Not For Sale</span>`
               }
              </div>
            </div>
            <p class="book_ratings">
              <span class="book_rating_star">${ratingsCount} star</span> Rating
            </p>
          </div>`);

  card.on("click", (event) => {
    location.href = location.href.replace("index", "book") + `?id=${id}`;
    window.book = "Hello";
  });
  return card;
};

getBooks();