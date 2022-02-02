exports.addMovie = async (collection, movieObj) => {
   await collection.insertOne(movieObj);
};

exports.addMovies = async (collection, movieObj) => {
   await collection.insertMany(movieObj);
};