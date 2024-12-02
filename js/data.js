"use strict";
const data = readData();
function writeData() {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem('data storage', dataJSON);
}
function readData() {
    const dataJSON = localStorage.getItem('data storage');
    if (dataJSON) {
        return JSON.parse(dataJSON);
    }
    else {
        return {
            authors: [],
            title: '',
            imageLinks: null,
            categories: [],
        };
    }
}
// async function fetchData(): Promise<void> {
//   try {
//     const response = await fetch(
//       'https://www.googleapis.com/books/v1/volumes?q=thriller&key=AIzaSyCKFQdUXH7FtHhegJ_aEvfXbYQPDqInJIM',
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = (await response.json()) as Data;
//     console.log(data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
// fetchData();
