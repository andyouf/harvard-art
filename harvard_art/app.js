// const BASE_URL = "https://api.harvardartmuseums.org";
// const KEY = "apikey=d7dead30-b303-11ea-8bfd-6d81a20286fa"; // USE KEY HERE
// const recordsElement = document.getElementById("records");

// *setup functions

// return the objects from fetchObjects so can use them in whatever calls this method ... done by returning data from try block

// async function fetchObjects() {
//   const url = `${BASE_URL}/object?${KEY}`;
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//     return data; //returns data
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function createElements() {
//   const { records } = await fetchObjects();

//   const elements = records.map((record) => {
//     const { primaryimageurl, title } = record;

//     const image = el("img");

//     image.src = !primaryimageurl
//       ? "https://via.placeholder.com/500x400"
//       : primaryimageurl;

//     const caption = el("figcaption");
//     caption.innerText = title;

//     const figure = el("figure");
//     figure.appendChild(image);
//     figure.appendChild(caption);

//     return figure;
//   });

//   Array.from(elements).forEach((el) => recordsElement.appendChild(el));
// }

// function el(tag) {
//   return document.createElement(tag);
// }

// document
//   .getElementById("get-records")
//   .addEventListener("click", createElements);

// async function fetchObjects() {
//   const url = `${BASE_URL}/object?${KEY}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//     return data; //returns data

//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// fetch start
// function onFetchStart() {
//   $("#loading").addClass("active");
// }

// fetch end
// function onFetchEnd() {
//   $("#loading").removeClass("active");
// }
// async function getData() {
//   const response = await fetch(url); // gets response using fetch & url
//   const data = await response.json(); // uses `response` to get data once we transform it to json format
// }

//   fetchObjects().then(x => console.log(x)); // { info: {}, records: [{}, {},]}

// function called to get the categories to be used in search bar ... will use the data they fetch in a third function called prefetchCategoryLists which takes them and adds the fields to search bar
// async function fetchAllCenturies() {
//   const url = `${BASE_URL}/century?${KEY}&size=100&sort=temporalorder`;

//   if (localStorage.getItem("centuries")) {
//     return JSON.parse(localStorage.getItem("centuries"));
//   } else {
//     const { records } = await fetch(url);
//     localStorage.setItem("centuries", JSON.stringify(records));
//     return records;
//   }
// }

// function called to get centuries for use in search bar
// async function fetchAllCenturies() {
//   const url = `${BASE_URL}/CENTURY?${KEY}&size=100&sort=temporalorder`;
//   if (localStorage.getItem("centuries")) {
//     return JSON.parse(localStorage.getItem("centuries"));
//   }
//   try {
//     const response = await fetch(url);
//     const { records } = await response.json();
//     localStorage.setItem("centuries", JSON.stringify(records));
//     return records;
//   } catch (error) {
//     console.error(error);
//   } finally {
//     onFetchEnd();
//     // onFetchStart();
//   }
// }
// fetchAllCenturies();

// async function fetchAllClassifications() {
//   const url = `${BASE_URL}/classification?${KEY}&size=100&sort=name`;

//   if (localStorage.getItem("classifications")) {
//     return JSON.parse(localStorage.getItem("classifications"));
//   } else {
//     const { records } = await fetch(url);
//     localStorage.setItem("classifications", JSON.stringify(records));
//     return records;
//   }
// }
// fetchAllClassification();

// function called to get classifications for use in search bar
// async function fetchAllClassifications() {
//   const url = `${BASE_URL}/classification?${KEY}&size=100&sort=name`;
//   if (localStorage.getItem("classification")) {
//     return JSON.parse(localStorage.getItem("classification"));
//   }
//   try {
//     const response = await fetch(url);
//     const { records } = await response.json();
//     localStorage.setItem("classification", JSON.stringify(records));
//     return records;
//   } catch (error) {
//     console.error(error);
//   } finally {
//     onFetchEnd();
//     // onFetchStart();
//   }
// }
// fetchAllClassifications();

// function adds the now resolved fetch for use in search bar
// async function prefetchCategoryLists() {
//   try {
// Promise.all takes an array of  promises (centuries and classifications) and resolves with an array of resolved values for each promise in the original array and rejects if any of the promises reject
// call each fetch, wrap them in an array, and pass them into Promise.all ... it makes a new promise which can await for the results on
// const [classifications, centuries] = await Promise.all([
//   fetchAllClassifications(),
//   fetchAllCenturies(),
// ]);
// inside the function need to loop over the two captured arrays, create an <option> tag for each item in them
// an options object is a normal JavaScript object that contains a set of named parameters that are passed into a function
// this provides a clue to the user that there are items in the dropdown
// $(".classification-count").text(`(${classifications.length})`);

// classifications.forEach((classification) => {
// append a correctly formatted option tag into the element with id select-classification
//     $("#select-classification")
//       .append(`<option value="${classification.name}">${classification.name}</option>
// `);
//   });
//   prefetchCategoryLists();
// this provides a clue to the user that there are items in the dropdown
// $(".century-count").text(`(${centuries.length})`);

// centuries.forEach((century) => {
// append a correctly formatted option tag into the element with id select-century
//       $("#select-century")
//         .append(`<option value="${century.name}">${century.name}</option>
//   `);
//     });
//   } catch (error) {
//     console.error(error); // check for issues with fetches
//   }
// }
// prefetchCategoryLists();

// function which will convert the form created into the actual search string
// function buildSearchString() {
//   const keyWord = $("#keywords").val();
//   const classification = $("#select-classification").val();
//   const century = $("#select-century").val();
//   const url = encodeURI(
//     `${BASE_URL}/object?${KEY}&classification=${classification}&century=${century}&keyword=${keyWord}`
//   );

//***make variable that return all parameters...can't get
//   let search = "";

//   return [url];
// }

// *Listeners
// listen to #search submissions
// $("#search").on("submit", async function (event) {
// prevent the default

// try {
// get the url from `buildSearchString`
// fetch it with await, store the result
// log out both info and records when you get them
// } catch (error) {
// log out the error
//   }
// });

// Bootstrap test
// prefetchCategoryLists();
