const { Console } = require('console');
const fs = require('fs');

const archivo = './database/data.JSON';

const guardarDB = (data) => {
    
    // const archivo = './database/data.JSON'; como necesito exactamente la misma constante tanto para guardarDB como para leer DB,
    // en lugar de crear dos veces la misma const, puedo crear una afuera, y utilizar la misma en ambos lados. 
    
    fs.writeFileSync( archivo, JSON.stringify(data) );

}

const leerDB = () => {
    // const archivo = './database/data.JSON';

    if ( !fs.existsSync(archivo) ) {
        return null //si no existe el archivo, retornar null, quiere decir que se acaba el condicional.
    }
    //pero si SÍ existe el archivo, entonces...:
    const info = fs.readFileSync ( archivo, { encoding: 'utf-8'} );
    const data = JSON.parse( info );

    return data;

}



module.exports = {
    guardarDB,
    leerDB
}