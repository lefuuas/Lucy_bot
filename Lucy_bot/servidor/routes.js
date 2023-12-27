
const express = require('express');
const jwt = require('jsonwebtoken');
const {pegarCoordenadas, gerarLinkImg, baixararquivo} = require('./auxiliar-functions')
const router = express.Router();
const LucyData = require('./dbfile')
const multer = require('multer');


const secretKey = 'fuuaslindoparacaraiu';

const Lucydb = new LucyData()

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    console.log(req.user)
    next();
  });
}

router.post('/login', (req, res) => {
    const { usuario, senha } = req.body;
    console.log(req.body)
    Lucydb.getLogin(usuario).then((response)=>{
        if (!response) {
            res.status(404).json({ mensagem: 'Erro de login: usuário não encontrado' });
        } else {
            if (senha === response.senha) {
                const user = { usuario: usuario, senha: senha }
                const token = jwt.sign(user, secretKey, { expiresIn: '1 day' });
                res.json({ token });
            } else {
                res.status(401).json({ mensagem: 'Erro de login: senha incorreta' });
            }
        }
    })
    
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, 'download.png');
  },
});
const upload = multer({ storage: storage });


router.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).send("Arquivo enviado com sucesso!");
});

router.post('/imovel/cadastrar' , (req, res) => {
    const Objectimovelcadastrado = req.body;
    console.log(req.body)
    let info_endereco = {
      endereco: Objectimovelcadastrado.endereco,
      numero: Objectimovelcadastrado.numero,
      bairro: Objectimovelcadastrado.bairro
    }
    
     gerarLinkImg('download.png').then((resolved)=>{
      Objectimovelcadastrado.link_imovel = resolved
      pegarCoordenadas(info_endereco).then((resolve)=>{
        Objectimovelcadastrado.coord = resolve
        console.log(Objectimovelcadastrado)
        Lucydb.cadastrarImovel(Objectimovelcadastrado)
        const currentTime = new Date().toLocaleTimeString();
        const currentDate = new Date().toLocaleDateString();
        const logMessage = "\x1b[42m" + `Operação: Imóvel Adicionado | ${Objectimovelcadastrado.endereco}, N° ${Objectimovelcadastrado.numero}, ${Objectimovelcadastrado.bairro} | Data: ${currentDate} | Horário: ${currentTime}` + "\x1b[0m";
        console.log(logMessage);
        res.sendStatus(200)
      })

     })


    
});


router.delete('/imovel/deletar/:id',authenticateToken, (req, res) => {
  const nomeImovel = req.params.id;

  Lucydb.deletarImovel(nomeImovel)
      .then(result => {
          if (result.deletedCount > 0) {
            const currentTime = new Date().toLocaleTimeString();
            const currentDate = new Date().toLocaleDateString();
            const logMessage = "\x1b[41m" + `Operação: Imóvel Removido | ${nomeImovel} | Data: ${currentDate} | Horário: ${currentTime}` + "\x1b[0m";
            console.log(logMessage);
              res.sendStatus(200);
          } else {
              res.status(404).json({ mensagem: 'Imóvel não encontrado para deletar' });
          }
      })
      .catch(error => {
          console.error('Erro ao deletar imóvel:', error);
          res.status(500).json({ mensagem: 'Erro interno do servidor' });
      });
});

router.put('/imovel/atualizar/:id', authenticateToken, (req, res) => {
  const nomeImovel = req.params.id;
  const updatedData = req.body;
  updatedData.imovel_vazio = Boolean(updatedData.imovel_vazio)
  updatedData.valor = parseFloat(updatedData.valor)
  

  Lucydb.atualizarImovel(nomeImovel, updatedData)
      .then(result => {
          if (result) {
            const currentTime = new Date().toLocaleTimeString();
            const currentDate = new Date().toLocaleDateString();
            const logMessage = "\x1b[43m" + `Operação: Imóvel Editado| ${updatedData.endereco}, N° ${updatedData.numero}, ${updatedData.bairro} | Data: ${currentDate} | Horário: ${currentTime}` + "\x1b[0m";
            console.log(logMessage);
              res.sendStatus(200);
          } else {
              res.status(404).json({ mensagem: 'Imóvel não encontrado para atualizar' });
          }
      })
      .catch(error => {
          console.error('Erro ao atualizar imóvel:', error);
          res.status(500).json({ mensagem: 'Erro interno do servidor' });
      });
});

router.get('/imovel/getall', authenticateToken, (req, res) => {
  try {
      Lucydb.getAllImoveis()
          .then((imoveis) => {
              res.json(imoveis);
          })
          .catch((error) => {
              console.error('Erro ao buscar todos os imóveis:', error);
              res.status(500).json({ mensagem: 'Erro interno do servidor' });
          });
  } catch (error) {
      console.error('Erro ao buscar todos os imóveis:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});




router.get('/imovel/:id', authenticateToken, async (req, res) => {
  try {
    const imovel = await Lucydb.getImovelById(req.params.id); 

    if (!imovel) {
      return res.status(404).json({ error: 'Imovel not found' });
    }

    res.json(imovel);
  } catch (error) {
    console.error( error.message);
    res.status(500).json({ error: 'erro interno' });
  }
});




module.exports = router;



