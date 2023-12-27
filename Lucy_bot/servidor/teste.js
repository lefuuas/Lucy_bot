const axios = require('axios');


const apiUrl = 'http://localhost:3000/auth'; 

const loginData = {
  usuario: 'admlucy',
  senha: 'LucyBot5!AJpsW',
};

const imovelData = {
  
endereco:"Rua Maestro Eugênio Pereira",
numero:"180",
bairro:"Campo Velho",
preferencia:"universidade",
link_imovel:"https://images.adsttc.com/media/images/64f0/f509/9e3f/b901/7c1c/1751/s…",
tipo:"casa",
imovel_vazio:true,
alugado:false,
valor:450,
contato_responsavel:"89994556655",

coord: {},
descricao:"2 Quartos Suite, TOP TOP TOP!",
nome:"Cláudia Pereira",
};


async function login() {
  try {
    const response = await axios.post(`${apiUrl}/login`, loginData);
    const token = response.data.token;
    console.log('Token JWT:', token);
    return token;
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
  }
}


async function cadastrarImovel(token) {
  try {
    const response = await axios.post(`${apiUrl}/imovel/cadastrar`, imovelData, {
      headers: {
        'Authorization': `${token}`,
      },
    });
    console.log('Resposta da rota protegida:', response.data);
  } catch (error) {
    console.error('Erro ao acessar a rota protegida:', error.message);
  }
}

(async () => {
  const token = await login();
  if (token) {
    await cadastrarImovel(token);
  }
})();