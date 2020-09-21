import events from "./events.js";
import { getEl } from "./utils.js";
import { fetchResource, createResourceUrl } from "./api.js";
import { updatePagination } from "./pagination.js";
import { updateGallery, onGalleryInit } from "./gallery.js";

// query the elements for search
const keywordEl = getEl("#keywords");
const classificationSelectEl = getEl("#classification-select");
const centurySelectEl = getEl("#century-select");
const searchResultsEl = getEl("#search-results");
const searchButton = getEl("#search-form button");

// initialize everything here, add event listeners
export default function init() {
  getEl("#search-form").addEventListener("submit", onSubmitSearch);
  events.on("onSearch", onSearchResultsUpdate);
}

async function onSubmitSearch(event) {
  event.preventDefault();

  // disabled the search button while it's busy
  searchButton.setAttribute("disabled", true);

  // get the values from the select options and keyword
  const url = createResourceUrl("object", {
    classification: classificationSelectEl.value,
    century: centurySelectEl.value,
    keyword: keywordEl.value,
    size: 8,
    page: 1,
  });

  // handing the errors, if any at the fetchResource function
  const response = await fetchResource(url);

  // emit the event with response data
  events.emit("onSearch", response);

  // remove the disabled attribute
  searchButton.removeAttribute("disabled");
}

function onSearchResultsUpdate(data) {
  updateResults(data.records);
  updatePagination(data.info);
  updateGallery(data.records);
  console.log(data);
}

function updateResults(records) {
  // clear the results container div ... make room for incoming data
  searchResultsEl.innerHTML = "";

  const noResults = records.length === 0;
  if (noResults) {
    searchResultsEl.innerHTML = `No Results for ${keywordEl.value}`;
  } else {
    records.forEach(createHTMLResults);
  }
}

function createHTMLResults(record, index) {
  const objectFeature = document.createElement("div");
  const figure = document.createElement("figure");
  const image = document.createElement("img");
  const caption = document.createElement("figcaption");
  const anchorLink = document.createElement("a");
  const meta = document.createElement("span");
  const century = document.createElement("small");
  const classification = document.createElement("small");
  const placeholderImage =
    "https://via.placeholder.com/1200x1200?text=Image+not+available";

  // add Classes
  figure.classList.add("photos");
  objectFeature.classList.add("object-feature");
  meta.classList.add("meta");
  caption.classList.add("title");

  // assign properties
  image.src = !record.primaryimageurl
    ? placeholderImage
    : record.primaryimageurl;
  image.dataset.index = index;
  anchorLink.href = record.url;
  century.innerText = record.century;
  classification.innerText = record.classification;
  anchorLink.innerText = record.title;
  anchorLink.setAttribute("target", "_blank");
  anchorLink.setAttribute("rel", "noopener");

  // append in the order you want them to appear
  caption.appendChild(anchorLink);
  caption.appendChild(meta);
  meta.appendChild(century);
  meta.appendChild(classification);
  figure.appendChild(image);
  figure.appendChild(caption);
  objectFeature.appendChild(figure);
  searchResultsEl.appendChild(objectFeature);

  if (record.primaryimageurl) {
    image.addEventListener("click", onGalleryInit);
    image.classList.add("has-gallery");
  }
}
