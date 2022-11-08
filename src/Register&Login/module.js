
function studntdb (dbname, table) {
   console.log(crossOriginIsolated = true)
  // create Database

  const db = new Dexie(dbname);
  db.version(1).stores(table);
  db.open();

//   const db = new Dexie('mydb');
//   db.version(1).stores({
//       friends:`name, age`
//   })

//   db.open();

  return db;
};

export default studntdb;
