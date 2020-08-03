const quoteContainer = document.getElementById('quote-container');
const authorText = document.getElementById('author');
const quoteText = document.getElementById('quote');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show Loading
function loading () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
    loading();
    // using a proexy URL to bypass CORS error
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
      const response = await fetch(proxyUrl + apiUrl);
      const data = await response.json();
      // Check if Author field is blank and replace it with 'Unknown'
      if (data.quoteAuthor === '') {
        authorText.innerText = 'Unknown';
      } else {
        authorText.innerText = data.quoteAuthor;
      }
      // Reduce font-size for longer quotes
      if (data.quoteText.length > 120) {
        quoteText.classList.add('long-quote');
      } else {
        quoteText.classList.remove('long-quote');
      }
      quoteText.innerText = data.quoteText;
      //Stop loader and show quote
      complete();
    } catch (error) {
      getQuote();
    }
  }

  //Tweet Quote
  function tweetQuote() {
      const quote = quoteText.innerText;
      author = authorText.innerText;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
      window.open(twitterUrl, '_blank');
  }

  //Event Listeners
  newQuoteBtn.addEventListener('click', getQuote);
  twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();