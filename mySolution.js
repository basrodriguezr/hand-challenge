/*
    author: Bastian Rodríguez
    URL: https://github.com/basrodriguezr
    e-mail: basrodriguezr@gmail.com
*/

/*
 * 👉 : moves the memory pointer to the next cell
 * 👈 : moves the memory pointer to the previous cell
 * 👆 : increment the memory cell at the current position
 * 👇 : decreases the memory cell at the current position.
 * 🤜 : if the memory cell at the current position is 0, jump just after the corresponding 🤛
 * 🤛 : if the memory cell at the current position is not 0, jump just after the corresponding 🤜
 * 👊 : Display the current character represented by the ASCII code defined by the current position.
 * 
 * As memory cells are bytes, from 0 to 255 value, if you decrease 0 you'll get 255, if you increment 255 you'll get 0.
 * Loops of 🤜 and 🤛 can be nested.
*/

/*
 * Enunciado
 * 👉 : mueve el puntero de memoria hacia la celda siguiente .
 * 👈 : mueve el puntero de memoria hacia la celda anterior.
 * 👆 : incrementar la celda de memoria en la posición actual.
 * 👇 : disminuye la celda de memoria en la posición actual.
 * 🤜 : si la celda de memoria en la posición actual es 0, salta justo después del correspondiente 🤛
 * 🤛 : si la celda de memoria en la posición actual no es 0, salta justo después del correspondiente 🤜
 * 👊 : Muestra el carácter actual representado por el código ASCII definido por la posición actual.
 * 
 * Como las celdas de memoria son bytes, de 0 a 255 valores, si disminuyes 0 obtendrás 255, si incrementas 255 obtendrás 0
 * Se pueden anidar bucles de 🤜 y 🤛.
*/
require('dotenv').config();
const fs = require("fs");
/**
 * Array.from crea un array a partir de un string, 
 * los separa por el caracter que representa el ' '
*/
const readFile =  fs.readFileSync('./tests/helloTest.hand',{encoding:'utf8', flag:'r'});

const translateHands = (text) => {
    
    let output = '';
    let arrayHands = Array.from(text);    
    let memory = [0];
    let pointer = 0;
    let index=0;   

    while(index < arrayHands.length){
        switch (arrayHands[index]){
            case '👉':
                pointer++;
                if(memory[pointer]===undefined) memory.push(0);
            break;

            case '👈':
                pointer--;
                if(memory[pointer]===undefined) memory.push(0);
            break;

            case '👆':
                memory[pointer] = setMemorySpace(parseInt(memory[pointer]) + 1);
            break;

            case '👇':
                memory[pointer] = setMemorySpace(parseInt(memory[pointer]) - 1);                
            break;
            
            case '🤜':
                if(memory[pointer] === 0){
                    index = arrayHands.indexOf('🤛',index);
                }
            break;
            
            case '🤛':
                if(memory[pointer] !== 0){
                    index = arrayHands.lastIndexOf('🤜',index);
                }
            break;
            
            case '👊':
                output += String.fromCharCode(memory[pointer]);
            break;
        }
        
        index++;
    }
    
    return output;
}

setMemorySpace = (value) =>{
    if(value<process.env.MEMORY_MIN_VALUE) return process.env.MEMORY_MAX_VALUE;
    if(value>process.env.MEMORY_MAX_VALUE) return process.env.MEMORY_MIN_VALUE; 
    return value;
}

//console.log(translateHands(readFile));

module.exports = {
    translateHands
}