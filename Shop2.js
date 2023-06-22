const MongoClient = require('mongodb').MongoClient;
const prompt = require('prompt-sync')();

async function main() {
  try {
    // Connect to the MongoDB database
    const client = await MongoClient.connect('mongodb+srv://mustafahbsc22:Mongodb_786@hussaina.vy6d8tb.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    const db = client.db('Shops');
    const collection = db.collection('Rent');

    let running = true;

    while (running) {
      console.log('\n1. Create');
      console.log('2. Read');
      console.log('3. Update');
      console.log('4. Delete');
      console.log('5. Exit');

      const choice = parseInt(prompt('Enter your choice: '));

      switch (choice) {
        case 1:
          const newData = promptForData();
          await createRent(collection, newData);
          break;
        case 2:
          await readRent(collection);
          break;
        case 3:
          const queryToUpdate = promptForQuery();
          const updatedData = promptForData();
          await updateRent(collection, queryToUpdate, updatedData);
          break;
        case 4:
          const queryToDelete = promptForQuery();
          await deleteRent(collection, queryToDelete);
          break;
        case 5:
          running = false;
          break;
        default:
          console.log('Invalid choice');
          break;
      }
    }

    // Disconnect from the database
    client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function createRent(collection, data) {
  try {
    await collection.insertOne(data);
    console.log('Document inserted successfully');
  } catch (error) {
    console.error('Failed to insert document', error);
  }
}

async function readRent(collection) {
  try {
    const rents = await collection.find().toArray();
    console.log('Documents:', rents);
  } catch (error) {
    console.error('Failed to fetch documents', error);
  }
}

async function updateRent(collection, query, updateData) {
  try {
    await collection.updateOne(query, { $set: updateData });
    console.log('Document updated successfully');
  } catch (error) {
    console.error('Failed to update document', error);
  }
}

async function deleteRent(collection, query) {
  try {
    await collection.deleteOne(query);
    console.log('Document deleted successfully');
  } catch (error) {
    console.error('Failed to delete document', error);
  }
}

function promptForData() {
  const data = {};

  data.name = prompt('Enter name: ');
  data.rent = parseFloat(prompt('Enter rent: '));

  return data;
}

function promptForQuery() {
  const query = {};

  query.name = prompt('Enter name to query: ');

  return query;
}

// Calling the main function
main();
