const variables = {
    Api: {
        port: process.env.PORT || 3000,
        serv: 'http://localhost:'
    },
    Database: {
        connection: process.env.connection || 'mongodb://localhost:27017/honoo'
    },
    Security:{
        secretKey: 'd41d8cd98f00b204e9800998ecf8427e' || 'f970e2767d0cfe75876ea857f92e319b'
    }
}

module.exports = variables;