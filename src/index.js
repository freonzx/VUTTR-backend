require("dotenv").config();
const mongoose = require("mongoose");
const server = require("./server");
const databaseConfig = require("./config/database");

// Conecting to DB
mongoose.connect(databaseConfig.uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

server.listen(process.env.PORT || 3000, () => {
    console.log(`🚀 Server listening at port ${process.env.PORT || 3000}`);
});
