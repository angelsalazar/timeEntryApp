function createTimeStamper(firebaseApp) {
  return {
    generate: () => {
      return firebaseApp.firestore.Timestamp.fromDate(new Date())
    }
  }
}


class Database {
  constructor(firebaseApp) {
    this._db = firebaseApp.firestore();
    this._timeStamp = createTimeStamper(firebaseApp);
  }

  create(table, data) {
    return (
      this._db
        .collection(table)
        .add({
          ...data,
          createdDate: this._timeStamp.generate()
        })
    );
  }

  update(table, data) {
    return (
      this._db
        .collection(table)
        .doc(data.id)
        .update(data)
    );
  }

  delete(table, id) {
    return (
      this._db
        .collection(table)
        .doc(id)
        .delete()
    );
  }

  get(table) {
    return this._db.collection(table)
  }

  subscribe(table, date, subscriber) {
    return (
      this._db
        .collection(table)
        .where('date', '==', date)
        .orderBy('createdDate')
        .onSnapshot((dataSnapshot) => {
          subscriber(dataSnapshot.docs.map(d => ({
            id: d.id,
            ...d.data()
          })));
        })
    );
  }
}


export default Database;
