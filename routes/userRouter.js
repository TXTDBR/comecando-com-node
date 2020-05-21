const fs = require('fs');
const { join } = require('path');

const filePath = join(__dirname, 'users.json');

const getusers = (req, resp) => {
    const data = (fs.existsSync(filePath)) ? fs.readFileSync(filePath) : [];

    try {
        return resp.json(data);
    } catch (error) {
        return resp.status(500).send('Erro Inesperado.');
    }
}

const saveUser = (req, resp) => {
    const users = (fs.existsSync(filePath)) ? JSON.parse(fs.readFileSync(filePath)) : [];
    try {
        users.push(req.body);
        fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'));
        return resp.send('Created');
    } catch (error) {
        return resp.status(500).send('Erro Inesperado.');
    }
}

const removeUser = (req, resp) => {
    try {
        const id = req.params.id;
        const users = (fs.existsSync(filePath)) ? JSON.parse(fs.readFileSync(filePath)) : [];
        const rs = users.filter(user => user.id != id);
        fs.writeFileSync(filePath, JSON.stringify(rs, null, '\t'));
        return resp.send();
    } catch (error) {
        return resp.status(500).send('Erro Inesperado.');
    }
}

const updateUser = (req, resp) => {
    try {
        const  id  = req.body.id;
        const users = (fs.existsSync(filePath)) ? JSON.parse(fs.readFileSync(filePath)) : [];
        const rs = users.filter(user => user.id != id);
        console.log(rs)
        rs.push(req.body);
        fs.writeFileSync(filePath, JSON.stringify(rs, null, '\t'));
        return resp.send();
    } catch (error) {
        return resp.status(500).send('Erro Inesperado.');
    }
}

module.exports = { getusers, saveUser, removeUser, updateUser };