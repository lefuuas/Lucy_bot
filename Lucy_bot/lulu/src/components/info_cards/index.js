import './index.css'

function Info_cards({value,infodata}) {
    return (
      <div className='container-info'>
        <h2>{infodata}</h2>
        <label>{value}</label>
        
      </div>
     
    );
  }
  
  export default Info_cards;