// Helper function to get elements
function $(el) {
  if (el.charAt(0) === "#") {
    // if el begins with # then find element with id
    return document.getElementById(el.substring(1));
  } else if (el.charAt(0) === ".") {
    // if el begins with . then find element with class
    return document.querySelectorAll(el);
  }
}

// Helper function to create elements
// elString = "div.class-name1"
// returns a div element with class class-name1
function createEl(elString) {
  const elArray = elString.split(".");
  const el = document.createElement(elArray[0]);
  el.classList.add(elArray[1]);
  return el;
}

const resultsNav = $("#resultsNav");
const favoritesNav = $("#favoritesNav");
const imagesContainer = $(".images-container")[0];
const saveConfirmed = $(".save-confirmed")[0];
const loader = $(".loader")[0];

// NASA API
const apiKey = "DEMO_KEY";
const count = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function createDOMNodes(page) {
  console.log("page", page);
  const currentArray = page === "results" ? resultsArray : Object.values(favorites);
  console.log("currentArray", currentArray);

  currentArray.forEach((result) => {
    // Create Card Container
    const card = createEl("div.card");

    // Create Link
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";

    // Create Image
    const image = createEl("img.card-img-top");
    image.src = result.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";

    // Create Card Body
    const cardBody = createEl("div.card-body");

    // Create Card Title
    const cardTitle = createEl("h5.card-title");
    cardTitle.textContent = result.title;

    // Create Favorites Clickable
    const saveText = createEl("p.clickable");
    if (page === "results") {
      saveText.textContent = "Add To Favorites";
      saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);
    } else {
      saveText.textContent = "Remove Favorite";
      saveText.setAttribute("onclick", `removeFavorite('${result.url}')`);
    }

    // Create Card Text
    const cardText = createEl("p.card-text");
    cardText.textContent = result.explanation;

    // Create footer
    const footer = createEl("small.text-muted");

    // Create Date
    const date = document.createElement("strong");
    date.textContent = result.date;

    // Create Copyright
    const copyrightResult = result.copyright === undefined ? "" : result.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = ` ${copyrightResult}`;

    // Append all elements
    // date and copyright are inside footer
    footer.append(date, copyright);

    // Add to cardBody
    cardBody.append(cardTitle, saveText, cardText, footer);

    // Wrap Image inside of Link
    link.appendChild(image);

    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

function updateDOM(page) {
  // Get Favorites from Local Storage
  if (localStorage.getItem("nasaFavorites")) {
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
    console.log("favorites from localstorage", favorites);
  }
  createDOMNodes(page);
}

// Get 10 Images from NASA API
async function getNasaPictures() {
  try {
    console.log("inside getNasaPictures");
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    console.log(resultsArray);
    updateDOM("favorites");
  } catch (error) {
    // Catch Error Here
    console.log(error);
  }
}

// Add result to Favorites
function saveFavorite(itemUrl) {
  // Loop through Results Array to select Favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      console.log(JSON.stringify(favorites));

      // Show Save Confirmation for 2 seconds
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);

      // Save Favorites in localStorage
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
  });
}

// Remove Item from Favorites
function removeFavorite(itemUrl) {
  console.log(this);
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];

    // Save updated Favorites to localStorage
    localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    updateDOM("favorites");
  }
}

// On Load
getNasaPictures();
