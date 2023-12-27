import React, { useEffect, useState } from "react";
import axios from "axios";
import Fileenv from "../../components/fileenv";
import Sidebar from "../../components/sidebar/sidebar";
import Carregando from "../../components/Carregando";
import { useNavigate } from "react-router-dom";
import './index.css';
import { Logincontext } from "../../context/logincontext";
import { useContext } from "react";

function Formulario() {

  
  useEffect(()=>{
      islogin()

  });

const convertstringbol = (string) =>{
  if(string == 'sim'){
    return true
  }else{
    return false
  }
}
  const navigate = useNavigate()
  const {islogin,login} = useContext(Logincontext)
  const [preferencia, setPreferencia] = useState('');
  const [status, setStatus] = useState('true');
  const [bairro, setBairro] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nome, setNome] = useState('');
  const [rua, setRua] = useState('');
  const [contato, setContato] = useState('');
  const [numero, setNumero] = useState(0);
  const [tipo, setTipo] = useState('');
  const [alugado, setAlugado] = useState('');
  const [valor, setValor] = useState(0);
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alugadostr, setalugadostr] = useState('');

  

  const handleFileChange = (event) => {
    const arquivo = event.target.files[0];

    if (arquivo) {
      setArquivoSelecionado(arquivo);
    } else {
      setArquivoSelecionado(null);
    }
  };

  const handleBairroChange = (event) => {
    setBairro(event.target.value);
  };

  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value);
  };
  const handleRuaChange = (event) => {
    setRua(event.target.value);
  };

  const handleNumeroChange = (event) => {
    setNumero(event.target.value);
  };

  const handleContatoChange = (event) => {
    setContato(event.target.value);
  };

  

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleTipoChange = (event) => {
    setTipo(event.target.value);
  };

  const handleValorChange = (event) => {
    setValor(event.target.value);
  };

  const handlePreferenciaChange = (event) => {
    setPreferencia(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  
  
  const handleAlugadoChange = (event) => {
    
    console.log(event.target.value)
    if (event.target.value === 'sim') {
      console.log('entrei na verificação do "sim"')
      setalugadostr('sim')
      setAlugado(true);
      
      console.log(alugado)
      console.log(alugadostr)
    } 
    if(event.target.value === 'nao'){

      console.log('entrei na verificação do "não"')
      setalugadostr('nao')
      setAlugado(false);
      
      console.log(alugado)
      console.log(alugadostr)


    }     
  };

  const handleSubmit = async () => {
    const formData ={
      preferencia:preferencia,
      imovel_vazio:status,
      bairro: bairro,
      descricao:descricao,
      tipo_imovel:tipo,
      valor:valor,
      nome:nome,
      alugado:false,
      endereco:rua,
      numero:numero,
      contato_responsavel:contato,
      
    
    
      

    };
   
   const arquivoform = new FormData();
   arquivoform.append("file", arquivoSelecionado);
    try {
      setLoading(true)
      const token = localStorage.getItem("token");
      console.log(formData)

      await axios.post("http://localhost:3000/auth/upload", arquivoform);

      const response = await axios.post(`http://localhost:3000/auth/imovel/cadastrar`, formData, {
        headers: {
          'Authorization': `${token}`,
        },
      });

      
      
      if(response.status == 200){
      
      setLoading(false)
      navigate("/edit-itens");
      }
      
    } catch (error) {
      console.error("Erro ao fazer a solicitação POST:", error.message);
    }
  };

  return (
    <> 
    
    

{loading ? 
    <Carregando/>
  : 
  
  
  <section>
    <Sidebar/>
  <div className="maincenter">

  <div className="title-forms">
    <h1>Formulario de Cadastro</h1>
    <hr></hr>
  </div>


  <div className="static-container">

  <div className="formbold-main-wrapper fade-in-animation-ll">

   
<div className="formbold-form-wrapper">

<div className="addres-container">

<div className="formbold-mb-5">
<label htmlFor="nome" className="formbold-form-label">
  Nome
</label>
<input
  type="text"
  name="nome"
  id="nome"
  value={nome}
  onChange={handleNomeChange}
  placeholder="Nome"
  className="formbold-form-input"
/>
</div>


<div class="formbold-mb-5">
<label for="email" class="formbold-form-label">
Contato
</label>
<input
type="email"
name="contato"
id="contato"
onChange={handleContatoChange}
value={contato}
placeholder="Número"
class="formbold-form-input"
/>
</div>

<div class="formbold-mb-5" className="endereco-content">
<label for="email" class="formbold-form-label">
Rua
</label>
<input
type="text"
name="Rua"
id="Rua"
onChange={handleRuaChange}
value={rua}
placeholder="Nome da rua"
class="formbold-form-input"
/>

</div>
<br/>

<div className="formbold-mb-5">
  <label className="formbold-form-label">Bairro</label>
  <input
    type="text"
    name="bairro"
    id="bairro"
    placeholder="Bairro"
    value={bairro}
    onChange={handleBairroChange}
    className="formbold-form-input"
  />
</div>

<div class="formbold-mb-5 numero-style">
<label for="numero" class="formbold-form-label">
Número
</label>
<input
type="text"
name="numero"
id="numero"
value={numero}
onChange={handleNumeroChange}
placeholder="456"
class="formbold-form-input"
/>
</div>

</div>


<div className="forms-sectiontwo">



<div className="formbold-mb-5">
<label className="formbold-form-label">Preferência</label>
<select
    name="preferencia"
    id="preferencias"
    value={preferencia}
    onChange={handlePreferenciaChange}
    className="formbold-form-input"
  >
    <option value="">Selecione uma preferência</option>
    <option value="universidade">Universidade</option>
    <option value="centro">Centro</option>
  </select>
</div>




<div className="formbold-mb-5">
<label className="formbold-form-label">Descrição</label>
<input
    type="text"
    name="descricao"
    id="descricao"
    placeholder="Descrição"
    value={descricao}
    onChange={handleDescricaoChange}
    className="formbold-form-input"
  />
</div>

<div className="formbold-mb-5">
<label className="formbold-form-label">Tipo</label>
<select
    name="tipo"
    id="tipo"
    value={tipo}
    onChange={handleTipoChange}
    className="formbold-form-input"
  >
    <option value="">Selecione um tipo</option>
    <option value="casa">Casa</option>
    <option value="kitnet">kitnet</option>
    <option value="apartamento">Apartamento</option>
  </select>
</div>




<div className="formbold-mb-5">
<label className="formbold-form-label">Valor</label>
<input
    type="number"
    name="valor"
    id="valor"
    placeholder="Valor"
    value={valor}
    onChange={handleValorChange}
    className="formbold-form-input"
  />
</div>

{/* <label className="formbold-form-label">Alugado</label>
<select
  
  name="alugado"
  id="alugado"
  value={convertbolstring(alugado)}
  onChange={handleAlugadoChange}
  className="formbold-form-input"
>
  <option value='nao'>Sim</option>
  <option value='sim'>Nao</option>
  
</select> */}


<div className="formbold-mb-5">
  <label className="formbold-form-label">Imóvel vazio?</label>
  <div className="formbold-status-radio">
    <label id="radio-true">
      <input
        type="radio"
        name="status"
        value="true"
        checked={status === 'true'}
        onChange={handleStatusChange}
      />
      Sim
    </label>
    <label id="radio-false">
      <input
        type="radio"
        name="status"
        value="false"
        checked={status === 'false'}
        onChange={handleStatusChange}
      />
      Não
    </label>
  </div>
</div>


</div>





</div>

</div>

<div className="env-forms">
<div className="mb-6 pt-4">
<label className="formbold-form-label formbold-form-label-2">
  Upload Foto
</label>

<div className="formbold-mb-6 formbold-file-input">
  <input type="file" name="file" id="file" onChange={handleFileChange} />
  <label htmlFor="file">
    <div>
      <span className="formbold-drop-file"> Drop files here </span>
      <span className="formbold-or"> Or </span>
      <span className="formbold-browse"> Browse </span>
    </div>
  </label>
</div>
</div>

{arquivoSelecionado && <Fileenv nome={arquivoSelecionado.name} />}

<div>

</div>


</div>

<button className="formbold-btn w-full" onClick={handleSubmit}>
  Enviar Dados
</button>


  </div>
  
  </div>
  </section>
  
  }

    
      
      
      </>

  );
}

export default Formulario;
