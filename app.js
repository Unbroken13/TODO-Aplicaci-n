const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
// import inquirerMenu from './helpers/inquirer';

require('colors');


const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ) {
        //si existen las tareas, entonces establecemos las tareas    
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        opt = await inquirerMenu();
        
        switch (opt){
            case '1':
                //crear opcion
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto();
            break;

            case '3': //listar tareas completadas
                tareas.listarPendientesCompletadas();
            break;

            case '4': //listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '6': //borrar tarea
                const id = await listadoTareasBorrar( tareas.listadoArr );
                const confirmarBorrar = await confirmar("¿Seguro de que desea borrar esta tarea? \n".red);
                if ( confirmarBorrar ) {
                    tareas.borrarTareas( id );
                    console.log(`Tarea borrada con éxito \n `.green)
                }
            break;
        }

        guardarDB( tareas.listadoArr );

        await pausa();

    } while ( opt !== '0');

    
    
    

}

main();