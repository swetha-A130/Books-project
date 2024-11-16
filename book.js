import { api, showLoader, hideLoader } from "./main.js";

const getBook = async () => {
  const bookId = new URLSearchParams(location.search).get("id"); // get bookid from URL search params

  try {
    if (!bookId) throw new Error("BookId is not valid"); // if no book id in URL then throw
    showLoader();
    const res = await api({
      path: "/books/" + bookId,
    }); // load data for a book with given id

    if (!res || (res && !res.data)) throw new Error("BookId is not valid"); // if no data found then throw

    let book = res.data; // data found
    hideLoader();
    showDetails();
    showBook(book); // show book data
  } catch (e) {
    notFound(e);
  }
};
const notFound = (e) => {
  console.log(e.message);
  hideLoader();
  showError();
};

const showBook = (book) => {
  const { volumeInfo, id, saleInfo } = book;

  const {
    title,
    subtitle,
    authors,
    imageLinks,
    description,
    publisher,
    publishedDate,
    categories,
    previewLink,
    infoLink,
  } = volumeInfo;

  const { retailPrice } = saleInfo;
  const { amount, countryCode = "INR" } = retailPrice || {};

  document.title = title;
  $("#book_title").html(title);
  if (subtitle) {
    $("#book_subtitle").html(subtitle);
  } else {
    $("#book_subtitle").hide();
  }

  $("#book_description").html(description);

  const authorsEl = $("#book_autor");
  if (authors && authors.length) {
    let authorsName = authors.join(", ");
    authorsEl.html(authorsName);
  }

  const categoryEl = $("#book_categories");

  if (categories && categories.length) {
    let pills = categories.map((cname) => {
      return $(`<p class="book_category"> ${cname}</p>`);
    });
    categoryEl.append(pills);
  }

  const publishEl = $("#book_publisher");

  publishEl.html(publisher);

  const publishDateEl = $("#book_published_date");

  const date = new Date(publishedDate);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  publishDateEl.html(formattedDate);

  const price = $("#book_price");
  if (amount) {
    price.removeClass("not_for_sale");
    price.html(`${countryCode} ${Math.ceil(amount)}`);
  }

  const previewBtn = $("#book_preview");
  let link = previewLink || infoLink;
  if (link) {
    previewBtn.on("click", () => {
      window.open(link, "_blank").focus(); // open link in new tab
    });
  } else {
    alert("Oops the preview not available");
  }
};

const showError = () => {
  $("#book_error").show();
};
const showDetails = () => {
  $("#book_detials").show();
};
getBook();