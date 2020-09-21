import { getEl } from "./utils.js";
import { fetchResource } from "./api.js";
import events from "./events.js";

const paginationEl = getEl("#pagination");
const buttonNext = paginationEl.querySelector(".next");
const buttonPrev = paginationEl.querySelector(".prev");
const pageData = paginationEl.querySelector(".data");

export default function inti() {
  buttonNext.addEventListener("click", onNextClick);
  buttonPrev.addEventListener("click", onPrevClick);
  updatePagination();
}

async function onNextClick(event) {
  const url = event.target.dataset.next;
  const response = await fetchResource(url);
  // emit the event with response data
  events.emit("onSearch", response);
}

async function onPrevClick(event) {
  const url = event.target.dataset.prev;
  const response = await fetchResource(url);
  // emit the event with response data
  events.emit("onSearch", response);
}

export function updatePagination(info = {}) {
  const { prev, next, page, pages } = info;
  updatePaginationButtons(prev, next);
  updatePaginationData(page, pages);
}

function updatePaginationButtons(prev, next) {
  if (!next) {
    buttonNext.setAttribute("disabled", true);
  } else {
    buttonNext.removeAttribute("disabled");
    buttonNext.dataset.next = next;
  }
  if (!prev) {
    buttonPrev.setAttribute("disabled", true);
  } else {
    buttonPrev.removeAttribute("disabled");
    buttonPrev.dataset.prev = prev;
  }
}

function updatePaginationData(page, pages) {
  const dataText = !page || !pages ? "" : `Page ${page} of ${pages}`;
  pageData.innerText = dataText;
}
