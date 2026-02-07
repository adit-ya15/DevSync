const mongoose = require("mongoose")

const URL = "mongodb://aditya262701_db_user:aditya4648h@ac-mlbza8s-shard-00-00.ftcpklx.mongodb.net:27017,ac-mlbza8s-shard-00-01.ftcpklx.mongodb.net:27017,ac-mlbza8s-shard-00-02.ftcpklx.mongodb.net:27017/devSync?replicaSet=atlas-warjx4-shard-0&ssl=true&authSource=admin"

const connectDb = async() => {
    await mongoose.connect(URL)
}

module.exports = connectDb