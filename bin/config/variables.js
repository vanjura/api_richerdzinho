const variables = {
    Api: {
        port: process.env.PORT || 3000,
        serv: 'http://localhost:'
    },
    Database: {
        connection: process.env.connection || 'mongodb+srv://admin:appdoacao2019@appdoacaodesangue-pueyv.mongodb.net/test?retryWrites=true'
    },
    Security:{
        secretKey: 'd41d8cd98f00b204e9800998ecf8427e' || 'f970e2767d0cfe75876ea857f92e319b'
    }
}

module.exports = variables;