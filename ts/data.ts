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

const data = readData();

function writeData(): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data storage', dataJSON);
}

function readData(): Book {
  const dataJSON = localStorage.getItem('data storage');
  if (dataJSON) {
    return JSON.parse(dataJSON);
  } else {
    return {
      authors: [],
      title: '',
      imageLinks: null,
      categories: [],
    };
  }
}

writeData();
