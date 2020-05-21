const express = require('express');
const app = express();
const userRoutes = require('./routes/userRouter');

app.use(express.json());

app.get('/', (req, resp) => resp.send('Olá mundo!'));
app.route('/users')
    .post(userRoutes.saveUser)
    .put(userRoutes.updateUser)
    .get(userRoutes.getusers)

app.route('/users/:id')
    .delete(userRoutes.removeUser)

app.listen(3000, () => console.log('Executando na porta 3000'));