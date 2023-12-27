const express = require('express');
const app = express();
const cors = require('cors');


const authRouter = require('./routes');
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});