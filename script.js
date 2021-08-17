const newContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-qoute");
const loader = document.getElementById("loader");

let apiQuotes = [];

//  Show Loading
function loading() {
  loader.hidden = false;
  newContainer.hidden = true;
}

// Hide Loading
function complete() {
  newContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
getQuotes();
function newQuote() {
  loading();
  // Pick a rndom quote from apiQuotes array
  //   getQuotes();

  const quote =
    apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author field is blank and replace it with 'Unknowe'
  console.log(quote);
  if (!quote.author) {
    authorText.textContent = "Unknow";
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determain styiling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event listerners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// // Loading
// getQuotes();

newQuote();

// https://twitter.com/intent/tweet