const getNextID = (db, collectionName) => {
  return new Promise((resolve, reject) => {
    let counters = db.collection("counters");
    return counters.findOneAndUpdate(
      { field: `${collectionName}` },
      { $inc: { value: 1 } },
      { new: true },
      (err, response) => {
        if (err) reject(err);
        else resolve(response);
      }
    );
  })
}

module.exports = {
  getNextID: getNextID
}
