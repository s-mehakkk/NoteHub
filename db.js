const mongoose = require('mongoose');

const URIstring = 'mongodb://localhost:27017/inotebookTest';

// const connectToMongo = async()=>{
//     await mongoose.connect(URIstring);
// }

const connectToMongo = ()=>{
    mongoose.connect(URIstring, ()=>{
        console.log('connected to db');
    })
}

module.exports = connectToMongo;