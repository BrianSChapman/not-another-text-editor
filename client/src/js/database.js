import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log("Let's store some content in the database!");
    const jateDB = await openDB("jate", 1);
    const putData = jateDB.transaction("jate", "readwrite");
    const store = putData.objectStore("jate");
    const request = store.put(content);
    const result = await request;
    console.log("result.value", result);
    return result;
  } catch (err) {
    console.error("Content could not be saved. Please try again.");
  }
};
console.error("putDb not implemented");

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log("Let's GET this stuff from the database");
    // referencing the database and which version we want.
    const jateDb = await openDB("jate", 1);
    const getData = jateDb.transaction("jate", "readonly");
    const store = getData.objectStore("jate");
    const request = store.getAll();
    const result = await request;
    console.log("result.value", result);
    return result;
  } catch (err) {
    console.error("Database not implemented");
  }
};

initdb();
