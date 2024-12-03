/* exported data */
interface ImageLinks {
  small: string;
}

interface Data {
  authors: string[];
  title: string;
  imageLinks: ImageLinks | null;
  categories: string[];
}

const data = readData();

function writeData(): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data storage', dataJSON);
}

function readData(): Data {
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
