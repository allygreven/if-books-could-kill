"use strict";
const globalData = readData();
function writeData() {
    const dataJSON = JSON.stringify(globalData);
    localStorage.setItem('data storage', dataJSON);
}
function readData() {
    const dataJSON = localStorage.getItem('data storage');
    if (dataJSON) {
        return JSON.parse(dataJSON);
    }
    else {
        return {
            view: '',
            favorites: [],
        };
    }
}
