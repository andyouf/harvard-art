import { getEl } from "./utils.js";
import { fetchResource, createResourceUrl } from "./api.js";

export default async function init() {
  return prefetchCategoryLists().then(appendSelectOptions);
}

async function prefetchCategoryLists() {
  // create a url for both category resources
  const classificationUrl = createResourceUrl("classification", {
    size: 100,
    sort: "name",
  });
  const centuriesUrl = createResourceUrl("century", {
    size: 100,
    sort: "temporalorder",
  });

  try {
    const [classifications, centuries] = await Promise.all([
      fetchResource(classificationUrl),
      fetchResource(centuriesUrl),
    ]);
    return [classifications.records, centuries.records];
  } catch (error) {
    console.error(error);
  }
}

function appendSelectOptions([classifications = [], centuries = []]) {
  appendCategoryCount(getEl(".classification-count"), classifications.length);
  appendCategoryCount(getEl(".century-count"), centuries.length);

  appendOptions(
    getEl("#classification-select"),
    createOptions(classifications)
  );
  appendOptions(getEl("#century-select"), createOptions(centuries));

  return [classifications, centuries];
}

function appendCategoryCount(countElement, count) {
  countElement.innerText = count;
}

function createOptions(records) {
  // create options from classifications
  return records.map(({ name, id }) => {
    const option = document.createElement("option");
    option.value = name;
    option.innerText = name;
    option.dataset.id = id;
    return option;
  });
}

function appendOptions(el, options) {
  options.forEach((opt) => el.appendChild(opt));
}
