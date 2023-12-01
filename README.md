#### Mongodb with express

## What is mongoose?

For accessing MongoDB database from express, we use Mongoose which is an Object Data Modelling library providing all necessary functions to access and work with MongoDB.

# Installing Mongoose and MongoDB

npm install mongoose

# Connecting to MongoDB

- Mongoose requires a connection to a MongoDB database.

import mongoose from "mongoose";
mongoose.connect(process.env.DB_CONNECTION, () => {
console.log("Connected to DB");
});

## Defining and creating models

- Models are defined using the "Schema" interface.

# Defining schemas

- Each model maps to a collection of documents in the MongoDB database. The documents will contain the fields/schema types defined in the model "Schema".

import mongoose from "mongoose";
const Schema = mongoose.Schema;
const SomeModelSchema = new Schema({
a_string: String,
a_date: Date,
});
// Compile model from schema
const SomeModel = mongoose.model("SomeModel", SomeModelSchema);

# Schema types (fields)

const schema = new Schema({
name: String,
binary: Buffer,
living: Boolean,
updated: { type: Date, default: Date.now() },
age: { type: Number, min: 18, max: 65, required: true },
mixed: Schema.Types.Mixed,
some_Id: Schema.Types.ObjectId,
array: [],
ofString: [String], // You can also have an array of each of the other types too.
nested: { stuff: { type: String, lowercase: true, trim: true } },
});

# When to use ORM?

- ORM is good to use if your Database is small and your data model is quite straightforward but things can get hairy when you do complicated things like working with triggers, stored procedures etc.
- ORMs do better in "preventing SQL injections" than your query possibly can with a bunch of revisions.
