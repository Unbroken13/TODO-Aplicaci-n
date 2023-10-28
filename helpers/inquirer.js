const inquirer = require('inquirer');
// import inquirer from 'inquirer';
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
];
// 1. crear lista','opt2','opt3','opt4'
const inquirerMenu= async()=>{
    
    console.clear();
    console.log('======================='.green);
    console.log(' Seleccione una opción'.white);
    console.log('======================='.green);


    // const opt = await inquirer.promp
    const { opcion } = await inquirer.prompt(preguntas);
    

    return opcion;

};

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.blue} para continuar`
        }
    ]

    await inquirer.prompt(question);

};

const leerInput = async (mensaje) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value){
                if (value.length === 0 ){
                    return 'por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

const listadoTareasBorrar = async( tareas = []) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}` 
        }
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;


}

const mostrarListadoChecklist = async( tareas = []) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) 
                            ? true 
                            :false
        }
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
};