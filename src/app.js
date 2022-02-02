const yargs = require("yargs");
const { client, connection } = require("./db/connection");
const { addMovie, addMovies } = require("./utils");
// index.js is a default that it will be searched automatically 

const app = async (yargsObj) => {
    try {
        const collection = await connection();
        if (yargsObj.add) {
                // add movie to mongodb database, needs collection and success message
            await addMovie(collection, {
                title: yargsObj.title, 
                actor: yargsObj.actor,
            });
        } 
        else if (yargsObj.addMany) {
            // we have to add into the array
            await addMovies(collection, [ {
                title: yargsObj.title,
                actor: yargsObj.actor,
                year: yargsObj.year,
            } ] );
        }
        else if (yargsObj.readOne) {
                // we ask MondoDB to find our Cllection named "Movies" (if there is none it will create for us)
            const database = client.db("Movies");
                // we ask MongoDB to access the child in our collection (-"- will create one)
            const collection = database.collection("Movie");
                // we asking to find what is in {}
            const findThis = { title: "The Dressmaker", actor: "Kate Winslet"};
                // we using findOne method
            const foundThis = await collection.findOne(findThis);
                // print it in the terminal
            console.log(foundThis);
        }
        else if (yargsObj.update) {
            const database = client.db("Movies");
            const collection = database.collection("Movie");
                // we using $set to set the new values of our keys
                // it will update the first document 
            const updateMovie = {
                $set: {
                    title: "Mamma mia",
                    actor: "Meryl Streep",
                }
            }
                // specify the first document {} to update the first document returned in the collection
            const updatedMovie = await collection.updateOne({}, updateMovie, {})
                // logs 1 that means that first id was updated
            console.log(updatedMovie.modifiedCount);
        }
        else if (yargsObj.delete) {
            const database = client.db("Movies");
            const collection = database.collection("Movie");
                // we trying to find what we want to delete
            const deleteThis = { title: "Mamma mia" };
                // if the title was found it would be deleted
            const deleted = await collection.deleteOne(deleteThis);
        }
        else {
            console.log("That is not the right command");
        }
        client.close();
    } catch (error) {
        console.log(error)
    }
}

app(yargs.argv);

// added both movies into arrays
// node src/app.js --addMany --title="Devil wears Prada" --actor="Meryl Streep" --year=2006  --title="Harry Potter" --actor="Emma Watson" --year=2011