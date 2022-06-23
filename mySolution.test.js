require('jest');
const { translateWord } = require('./mySolution');
const fs = require("fs");

test('Testeando el texto del path helloTest.hand',()=>{
    const readFile =  fs.readFileSync('./tests/helloTest.hand',{encoding:'utf8', flag:'r'});
    expect(translateWord(readFile)).toBe("Hello");
});


test('Testeando el texto del path helloWorldTest.hand',()=>{
    const readFile2 = fs.readFileSync('./tests/helloWorldTest.hand',{encoding:'utf8', flag:'r'});
    expect(translateWord(readFile2)).toBe("Hello World!");
});
