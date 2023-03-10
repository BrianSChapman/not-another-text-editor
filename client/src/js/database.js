import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: 'id', autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    console.log("Let's store some content in the database!");
    const jateDB = await openDB("jate", 1);
    const putData = jateDB.transaction("jate", "readwrite");
    const store = putData.objectStore("jate");
    const request = store.put({ jate: content });
    const result = await request;
    console.log("Successfully saved the data!", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log("Let's GET this stuff from the database");
    // referencing the database and which version we want.
    const jateDb = await openDB("jate", 1);
    const getData = jateDb.transaction("jate", "readonly");
    const store = getData.objectStore("jate");
    const request = store.getAll();
    const result = await request;
    console.log(result)
};

initdb();
