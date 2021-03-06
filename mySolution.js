/*
    author: Bastian Rodr铆guez
    URL: https://github.com/basrodriguezr
    e-mail: basrodriguezr@gmail.com
*/

/*
 * 馃憠 : moves the memory pointer to the next cell
 * 馃憟 : moves the memory pointer to the previous cell
 * 馃憜 : increment the memory cell at the current position
 * 馃憞 : decreases the memory cell at the current position.
 * 馃 : if the memory cell at the current position is 0, jump just after the corresponding 馃
 * 馃 : if the memory cell at the current position is not 0, jump just after the corresponding 馃
 * 馃憡 : Display the current character represented by the ASCII code defined by the current position.
 * 
 * As memory cells are bytes, from 0 to 255 value, if you decrease 0 you'll get 255, if you increment 255 you'll get 0.
 * Loops of 馃 and 馃 can be nested.
*/

/*
 * Enunciado
 * 馃憠 : mueve el puntero de memoria hacia la celda siguiente .
 * 馃憟 : mueve el puntero de memoria hacia la celda anterior.
 * 馃憜 : incrementar la celda de memoria en la posici贸n actual.
 * 馃憞 : disminuye la celda de memoria en la posici贸n actual.
 * 馃 : si la celda de memoria en la posici贸n actual es 0, salta justo despu茅s del correspondiente 馃
 * 馃 : si la celda de memoria en la posici贸n actual no es 0, salta justo despu茅s del correspondiente 馃
 * 馃憡 : Muestra el car谩cter actual representado por el c贸digo ASCII definido por la posici贸n actual.
 * 
 * Como las celdas de memoria son bytes, de 0 a 255 valores, si disminuyes 0 obtendr谩s 255, si incrementas 255 obtendr谩s 0
 * Se pueden anidar bucles de 馃 y 馃.
*/
require('dotenv').config();
const fs = require("fs");
/**
 * Array.from crea un array a partir de un string, 
 * los separa por el caracter que representa el ' '
*/
const readFile =  fs.readFileSync('./tests/helloTest.hand',{encoding:'utf8', flag:'r'});
const readFile2 =  fs.readFileSync('./tests/helloWorldTest.hand',{encoding:'utf8', flag:'r'});
const readFile3 =  fs.readFileSync('./tests/code.hand',{encoding:'utf8', flag:'r'});

const getNextFistIndex = (index,instructions) => {
    let fist=1;
    
    for(let i = index+1;i<instructions.length;i++){
        if(instructions[i] == '馃') fist++;
        if(instructions[i] == '馃') fist--;
        if(fist==0) return i;
    }
}

const getPrevFistIndex = (index,instructions) => {
    let fist=1;

    for(let i = index-1; i > 0;i--){
        if(instructions[i] == '馃') fist--;
        if(instructions[i] == '馃') fist++;
        if(fist==0) return i;
    }
}

const setMemorySpace = (value) =>{
    if(value<process.env.MEMORY_MIN_VALUE) return process.env.MEMORY_MAX_VALUE;
    if(value>process.env.MEMORY_MAX_VALUE) return process.env.MEMORY_MIN_VALUE; 
    return value;
}

const translateWord = (word) => {       
    const arrayHands = Array.from(word); 
    let memory = [0];
    let pointer = 0;
    let index=0;   
    let output = '';

    while(index < arrayHands.length){
        let action = arrayHands[index];
        switch (action){
            case '馃憠':
                pointer++;
                if(memory[pointer]===undefined) memory.push(0);
            break;
            case '馃憟':
                pointer--;
                if(memory[pointer]===undefined) memory.push(0);
            break;
            case '馃憜':
                memory[pointer] = setMemorySpace(parseInt(memory[pointer] + 1));
            break;
            case '馃憞':
                memory[pointer] = setMemorySpace(parseInt(memory[pointer] - 1));                
            break;            
            case '馃':
                if(memory[pointer] == 0){
                    index = getNextFistIndex(index,arrayHands);
                    //index = arrayHands.indexOf('馃',index);
                }
            break;            
            case '馃':
                if(memory[pointer] != 0){
                    index = getPrevFistIndex(index,arrayHands);
                    //index = arrayHands.lastIndexOf('馃',index);
                }
            break;            
            case '馃憡':
                output += String.fromCharCode(memory[pointer]);
            break;
        }
        //console.log(`action: ${action}, index: ${index}, pointer: ${pointer}, memory[pointer]: ${memory[pointer]} ,output: ${output}`);
        
        index++;
    }
    return output.replace('\n','');
}

module.exports = {
    translateWord
}