const Tarea = require('./tarea');


/*
    (el _ es para indicar que es privado)
    _listado:
    { 'uuid-123124-312312-2: {id:12, desc:lala, completadoEn:fechaActual}'  }
*/

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    };


    constructor() {

        this._listado = {};
    }

    //METODOS
    borrarTareas ( id = ''){

        if ( this._listado[id] ){
            delete this._listado[id];
        }

    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }


    crearTarea(desc = '') {
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(tarea) {

        //el i (indice) empieza en 0, entonces me puedo crear una const para aumentar el i y que empiece en 1.
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea; //es una desestructuración de las tareas. Es decir DENTRO de la tarea está la desc.
            const estado = (completadoEn)
                ? 'Completada'.blue
                : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);

        });
        console.log('\n');

    }

    listarPendientesCompletadas(completadas = true) {

        console.log();

        let contadorIndice = 0; //inicializamos el contador de indice en 0.

        this.listadoArr.forEach(tarea => {

            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            if (completadas) {
                //mostar completadas
                if (completadoEn) {
                    contadorIndice += 1; //el contador va ir subiendo +1 a medida de que existan casos.
                    console.log(`${(contadorIndice + '.').green} ${desc} :: ${completadoEn} `);
                }
            } else {
                //mostrar pendientes
                if (!completadoEn) {
                    contadorIndice += 1; //el contador va ir subiendo +1 a medida de que existan casos.
                    console.log(`${(contadorIndice + '.').green} ${desc} :: ${estado} `);
                }
            }


        })

    };


}


module.exports = Tareas;