/* exported data */
interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

interface Book {
  view: string;
  authors: string[];
  title: string;
  imageLinks: ImageLinks;
  categories: string[];
}

interface Item {
  volumeInfo: Book;
}

interface Data {
  items: Item[];
  kind: string;
  totalItems: number;
}

interface GlobalData {
  view: string;
  favorites: Book[];
}

const globalData = readData();

function writeData(): void {
  const dataJSON = JSON.stringify(globalData);
  localStorage.setItem('data storage', dataJSON);
}

function readData(): GlobalData {
  const dataJSON = localStorage.getItem('data storage');
  if (dataJSON) {
    return JSON.parse(dataJSON);
  } else {
    return {
      view: '',
      favorites: [],
    };
  }
}
