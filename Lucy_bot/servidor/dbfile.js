const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');

const uri = "mongodb+srv://rootDB:rootDB123@learning.xzqglbu.mongodb.net/?retryWrites=true&w=majority";


class LucyData {

    constructor(){
        this.keyacess = uri
        this.client = null

    }
    async getLogin(useremail){
        
        try {

            this.client = new MongoClient(uri)
            const database = this.client.db('db_lucy')
            const colection = database.collection('admin')
            let myquery = {
                usuario: useremail
            }
            const login =  await colection.findOne(myquery)
            if(login){
                this.client.close()
                return login
                
            }
            else{
                this.client.close()
                return null
            }
        }
        catch (error) {
            console.log('não foi possivel se conectar ao banco ' + error)
        }
        
        
    }

    async cadastrarImovel(Object){
        
        let {endereco, numero, bairro, preferencia, link_imovel, tipo_imovel , imovel_vazio, alugado, valor, contato_responsavel, coord, descricao, nome} =  Object

        try {

            this.client = new MongoClient(uri)
            const database = this.client.db('db_lucy')
            const colection = database.collection('imovel')
            let myquery = {
                'endereco': endereco,
                'numero':numero,
                'bairro':bairro, 
                'preferencia':preferencia,
                'link_imovel': link_imovel,
                'tipo_imovel': tipo_imovel,
                'imovel_vazio': Boolean(imovel_vazio),
                'alugado': Boolean(alugado),
                'valor': parseFloat(valor),
                'contato_responsavel': contato_responsavel,
                'coord': coord,
                'descricao': descricao,
                'nome': nome,
                
            }
            const result = await colection.insertOne(myquery);
            return result
        }
        catch (error) {
            console.log('não foi possivel se conectar ao banco ' + error)
        }
        finally{

            
        }
        
        
        
    }


    async deletarImovel(id) {
        try {
            this.client = new MongoClient(uri);
            const database = this.client.db('db_lucy');
            const collection = database.collection('imovel');
            
            const deleteQuery = { '_id': new ObjectId(id) };
            const result = await collection.deleteOne(deleteQuery);
            
            return result;
        } catch (error) {
            console.log('Não foi possível se conectar ao banco ' + error);
        } finally {
           // await this.client.close();
        }
    }

    async atualizarImovel(id, updatedData) {
        try {
            this.client = new MongoClient(uri);
            const database = this.client.db('db_lucy');
            const collection = database.collection('imovel');
            

            const filter = { '_id': new ObjectId(id) };
            const update = { $set: updatedData };

            const result = await collection.updateOne(filter, update);
            
            return result;
        } catch (error) {
            console.log('Não foi possível se conectar ao banco ' + error);
        } finally {
            await this.client.close();

        }
    }

    async getAllImoveis() {
        try {
            this.client = new MongoClient(uri);
            const database = this.client.db('db_lucy');
            const collection = database.collection('imovel');

            const imoveis = await collection.find({}).toArray();
            return imoveis;
        } catch (error) {
            console.log('Não foi possível se conectar ao banco ' + error);
            throw error;
        } finally {
            //await this.client.close();
        }
    }


    async getImovelById(id) {
        try {
          this.client = new MongoClient(uri);
          const database = this.client.db('db_lucy');
          const collection = database.collection('imovel');
    
          const imovel = await collection.findOne({ _id: new ObjectId(id) });
    
          return imovel;
        } catch (error) {
          console.log('Não foi possível se conectar ao banco ' + error);
          throw error;
        } finally {
          //await this.client.close();
        }
      }

}

module.exports = LucyData
