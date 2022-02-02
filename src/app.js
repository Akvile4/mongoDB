const yargs = require("yargs");
const { client, connection } = require("./db/connection");
const { addMovie } = require("./utils");
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
        else if (yargsObj.read) {
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
        
        
        else {
            console.log("That is not the right command");
        }
        client.close();
    } catch (error) {
        console.log(error)
    }
}

app(yargs.argv);