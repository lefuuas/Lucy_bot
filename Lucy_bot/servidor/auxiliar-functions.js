const puppeteer = require('puppeteer');
const axios = require('axios');
const http = require('http');
const fs = require('fs');


async function pegarCoordenadas(obj){
    const url = `https://www.google.com.br/maps/search/${obj.endereco.replaceAll(' ', '+')},+${obj.numero}+-+${obj.bairro.replaceAll(' ', '+')},+Floriano+-+PI/`
    return new Promise(async (resolve,reject) => {
        const navegador = await puppeteer.launch({headless: false})
        const pagina = await navegador.newPage()
        await pagina.goto(url)
        await pagina.waitForNavigation()
        const novaURL = pagina.url()
        await navegador.close()
        const meuregex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
        const matches = novaURL.match(meuregex);

        if (matches && matches.length >= 3) {
        const latitude = parseFloat(matches[1]);
        const longitude = parseFloat(matches[2]);
        mycordenadas ={
            lat: latitude,
            longi:longitude
        }
        }

        resolve(mycordenadas)
    })
}

async function gerarLinkImg(nomeArquivo){
    return new Promise(async (resolve, reject) => {
        await axios({
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'https://api.imgur.com/3/image',
            headers: {
                'Authorization': 'Client-ID 682bded1dd7672d',
            },
            data: fs.readFileSync(`./uploads/${nomeArquivo}`, 'base64')
        }).then((result) => {
            resolve(result.data.data.link)
        }).catch((e) => {
            reject(e)
        })
    })
}






module.exports = {pegarCoordenadas,gerarLinkImg};