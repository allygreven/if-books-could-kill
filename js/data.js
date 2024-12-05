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
writeData();
