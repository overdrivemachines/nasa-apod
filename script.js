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

console.log("images-container");
console.log($(".images-container")[0]);

// NASA API
const apiKey = "DEMO_KEY";
const count = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

function updateDOM() {
  resultsArray.forEach((result) => {
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
    saveText.textContent = "Add To Favorites";

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

// Get 10 Images from NASA API
async function getNasaPictures() {
  try {
    console.log("inside getNasaPictures");
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    console.log(resultsArray);
    updateDOM();
  } catch (error) {
    // Catch Error Here
    console.log(error);
  }
}

// On Load
getNasaPictures();
