import { getEl } from "./utils.js";

const loading = getEl("#loading");

export async function fetchResource(url) {
  // activate the loading element
  loading.classList.add("active");
  try {
    const response = await fetch(url);
    if (response.ok) {
      // disabled the loading element
      loading.classList.remove("active");
      return await response.json();
    } else {
      console.log(response);
    }
  } catch (error) {
    console.error(error);

    // disabled the loading element
    loading.classList.remove("active");
  }
}

export function createResourceUrl(resourceType = "object", queryParams = {}) {
  const baseUrl = "https://api.harvardartmuseums.org";
  const apikey = "d7dead30-b303-11ea-8bfd-6d81a20286fa";

  // merge the query params with the API Key
  const query = Object.assign({ apikey }, queryParams);

  // contruct and return the url
  return `${baseUrl}/${resourceType}?${parseQuery(query)}`;
}

// creates a query string from an object
// functionality example: { someParam: 'someValue' } will output "someParam=someValue"
function parseQuery(query = { example: "query" }) {
  return !query
    ? ""
    : Object.entries(query)
        .map(([val, entry]) => `${val}=${entry}`)
        .join("&");
}
