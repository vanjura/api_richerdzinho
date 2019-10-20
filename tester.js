const request = require('request');
const variables = require('./bin/config/variables-tester');

const port = variables.Api.port;
const serv = variables.Api.serv;
const url = serv + port

var log = '';
var idValido = variables.idValido;

userInvalido(idValido);

function userInvalido(idValido) {
    request.post(url + "/user", function (error, response, body) {
        log = "\nRequisição CREATE com dados inválidos.";
        log += "\nStatus esperado: 405";
        log += "\nStatus retornado: " + (response && response.statusCode);
        if ((response && response.statusCode) == 405) {
            log += "\n\x1b[32mOK\x1b[37m";
        }
        else {
            log += "\n\x1b[33mCUIDADO: STATUS RETORNADO DIFERENTE DO ESPERADO\x1b[37m";
        }
        console.log(log);
        userValido(idValido);
    });
}

function userValido(idValido) {
    var user = {
        username: "Teste",
        email: "teste@teste.com",
        password: "teste",
        sex: "M",
        birthdate: Date.now()
    }
    request.post({
        headers: { 'content-type': 'application/json' },
        url: url + "/user",
        json: user
    }, function (error, response, body) {
        log = "\nRequisição CREATE com dados válidos.";
        log += "\nStatus esperado: 201";
        log += "\nStatus retornado: " + (response && response.statusCode);
        if ((response && response.statusCode) == 201) {
            log += "\n\x1b[32mOK\x1b[37m";
        }
        else {
            log += "\n\x1b[33mCUIDADO: STATUS RETORNADO DIFERENTE DO ESPERADO\x1b[37m";
        }
        console.log(log);
        userDuplicado(idValido);
    });
}

function userDuplicado(idValido) {
    var user = {
        username: "Teste",
        email: "teste@teste.com",
        password: "teste",
        sex: "M",
        birthdate: Date.now()
    }
    request.post({
        headers: { 'content-type': 'application/json' },
        url: url + "/user",
        json: user
    }, function (error, response, body) {
        log = "\nRequisição CREATE com dados duplicados.";
        log += "\nStatus esperado: 405";
        log += "\nStatus retornado: " + (response && response.statusCode);
        if ((response && response.statusCode) == 405) {
            log += "\n\x1b[32mOK\x1b[37m";
        }
        else {
            log += "\n\x1b[33mCUIDADO: STATUS RETORNADO DIFERENTE DO ESPERADO\x1b[37m";
        }
        console.log(log);
        userPutValido(idValido);
    });
}

function userPutValido(idValido) {
    var user = {
        id: idValido,
        username: "Testex",
        email: "testex@teste.com",
        password: "testex",
        sex: "M",
        birthdate: Date.now()
    }
    request.put({
        headers: { 'content-type': 'application/json' },
        url: url + "/user",
        json: user
    }, function (error, response, body) {
        log = "\nRequisição UPDATE com dados válidos.";
        log += "\nStatus esperado: 200";
        log += "\nStatus retornado: " + (response && response.statusCode);
        if ((response && response.statusCode) == 200) {
            log += "\n\x1b[32mOK\x1b[37m";
        }
        else {
            log += "\n\x1b[33mCUIDADO: STATUS RETORNADO DIFERENTE DO ESPERADO\x1b[37m";
        }
        console.log(log);
        userPutInvalido(idValido)
    });
}

function userPutInvalido(idValido) {
    var user = {
        id: '999',
        username: "Testex",
        email: "testex@teste.com",
        password: "testex",
        sex: "M",
        birthdate: Date.now()
    }
    request.put({
        headers: { 'content-type': 'application/json' },
        url: url + "/user",
        json: user
    }, function (error, response, body) {
        log = "\nRequisição UPDATE com id inválido.";
        log += "\nStatus esperado: 404";
        log += "\nStatus retornado: " + (response && response.statusCode);
        if ((response && response.statusCode) == 404) {
            log += "\n\x1b[32mOK\x1b[37m";
        }
        else {
            log += "\n\x1b[33mCUIDADO: STATUS RETORNADO DIFERENTE DO ESPERADO\x1b[37m";
        }
        console.log(log);
        userPutInvalidoAll(idValido)
    });
}

function userPutInvalidoAll(idValido) {
    var user = {}
    request.put({
        headers: { 'content-type': 'application/json' },
        url: url + "/user",
        json: user
    }, function (error, response, body) {
        log = "\nRequisição UPDATE com todos os dados inválidos.";
        log += "\nStatus esperado: 404 ou 405";
        log += "\nStatus retornado: " + (response && response.statusCode);
        if ((response && response.statusCode) == 404 || (response && response.statusCode) == 405) {
            log += "\n\x1b[32mOK\x1b[37m";
        }
        else {
            log += "\n\x1b[33mCUIDADO: STATUS RETORNADO DIFERENTE DO ESPERADO\x1b[37m";
        }
        console.log(log);
        getByIdValido(idValido)
    });
}

function getByIdValido(idValido) {
    request.get({
        headers: { 'content-type': 'application/json' },
        url: url + `/user/${idValido}`
    }, function (error, response, body) {
        log = "\nRequisição GET com id válido.";
        log += "\nStatus esperado: 200";
        log += "\nStatus retornado: " + (response && response.statusCode);
        if ((response && response.statusCode) == 200) {
            log += "\n\x1b[32mSTATUS OK\x1b[37m";
        }
        else {
            log += "\n\x1b[33mCUIDADO: STATUS RETORNADO DIFERENTE DO ESPERADO\x1b[37m";
        }
        if (body) {
            var err = false;
            body = JSON.parse(body);
            if (!body.password) {
                log += "\n\x1b[31mERRO: O PASSWORD NÃO ESTÁ SENDO RETORNADO.\x1b[37m";
                err = true;
            }
            if (!body.birthdate) {
                log += `\n\x1b[33mCUIDADO: O BIRTHDATE ESTÁ IGUAL A "${body.birthdate}".\x1b[37m`;
            }
            if (!body.sex) {
                log += `\n\x1b[33mCUIDADO: O SEX ESTÁ IGUAL A "${body.sex}".\x1b[37m`;
            }
            if (!body.id) {
                log += "\n\x1b[31mERRO: O ID NÃO ESTÁ SENDO RETORNADO.\x1b[37m";
                err = true;
            }
            if (!body.email) {
                log += "\n\x1b[31mERRO: O EMAIL NÃO ESTÁ SENDO RETORNADO.\x1b[37m";
                err = true;
            }
            if (!body.username) {
                log += "\n\x1b[33mCUIDADO: O USERNAME NÃO ESTÁ SENDO RETORNADO.\x1b[37m";
                err = true;
            }
            if (!err) {
                log += "\n\x1b[32mDADOS OK\x1b[37m";
            }
        } else {
            log += "\n\x1b[33mCUIDADO: NENHUM DADO FOI RETORNADO NA REQUISIÇÃO.\x1b[37m";
        }
        console.log(log);
        getByIdInvalido(idValido)
    });
}

function getByIdInvalido(idValido) {
    request.get({
        headers: { 'content-type': 'application/json' },
        url: url + "/user/999"
    }, function (error, response, body) {
        log = "\nRequisição GET com id inválido.";
        log += "\nStatus esperado: 204 ou 400 ou 404";
        log += "\nStatus retornado: " + (response && response.statusCode);
        if ((response && response.statusCode) == 204 || (response && response.statusCode) == 400 || (response && response.statusCode) == 404) {
            log += "\n\x1b[32mSTATUS OK\x1b[37m";
        }
        else {
            log += "\n\x1b[33mCUIDADO: STATUS RETORNADO DIFERENTE DO ESPERADO\x1b[37m";
        }
        console.log(log);
        loginValido(idValido)
    });
}

function loginValido(idValido) {
    var user = {
        login: "teste@teste.com",
        password: "teste",
    }
    request.post({
        headers: { 'content-type': 'application/json' },
        url: url + "/user/login",
        json: user
    }, function (error, response, body) {
        log = "\nRequisição LOGIN com dados válidos.";
        log += "\nStatus esperado: 200";
        log += "\nStatus retornado: " + (response && response.statusCode);
        if ((response && response.statusCode) == 200) {
            log += "\n\x1b[32mOK\x1b[37m";
        }
        else {
            log += "\n\x1b[33mCUIDADO: STATUS RETORNADO DIFERENTE DO ESPERADO\x1b[37m";
        }
        if (body) {
            log += "\n\x1b[32mDADO RETORNADO OK\x1b[37m";
        } else {
            log += "\n\x1b[33mCUIDADO: NENHUM DADO FOI RETORNADO NA REQUISIÇÃO.\x1b[37m";
        }
        console.log(log);
        loginInvalido(idValido)
    });
}

function loginInvalido(idValido) {
    var user = {
        login: "teste@teste.com",
        password: "1234",
    }
    request.post({
        headers: { 'content-type': 'application/json' },
        url: url + "/user/login",
        json: user
    }, function (error, response, body) {
        log = "\nRequisição LOGIN com dados inválidos.";
        log += "\nStatus esperado: 400";
        log += "\nStatus retornado: " + (response && response.statusCode);
        if ((response && response.statusCode) == 400) {
            log += "\n\x1b[32mOK\x1b[37m";
        }
        else {
            log += "\n\x1b[33mCUIDADO: STATUS RETORNADO DIFERENTE DO ESPERADO\x1b[37m";
        }
        console.log(log);
        deleteInvalido(idValido)
    });
}

function deleteInvalido(idValido){
    request.delete({
        headers: { 'content-type': 'application/json' },
        url: url + "/user/999"
    }, function (error, response, body) {
        log = "\nRequisição DELETE com dados inválidos.";
        log += "\nStatus esperado: 404 ou 400";
        log += "\nStatus retornado: " + (response && response.statusCode);
        if ((response && response.statusCode) == 404 || (response && response.statusCode) == 400) {
            log += "\n\x1b[32mOK\x1b[37m";
        }
        else {
            log += "\n\x1b[33mCUIDADO: STATUS RETORNADO DIFERENTE DO ESPERADO\x1b[37m";
        }
        console.log(log);
        deleteValido(idValido)
    });
}

function deleteValido(idValido){
    request.delete({
        headers: { 'content-type': 'application/json' },
        url: url + `/user/${idValido}`
    }, function (error, response, body) {
        log = "\nRequisição DELETE com dados válidos.";
        log += "\nStatus esperado: 200";
        log += "\nStatus retornado: " + (response && response.statusCode);
        if ((response && response.statusCode) == 200) {
            log += "\n\x1b[32mOK\x1b[37m";
        }
        else {
            log += "\n\x1b[33mCUIDADO: STATUS RETORNADO DIFERENTE DO ESPERADO\x1b[37m";
        }
        console.log(log);
    });
}