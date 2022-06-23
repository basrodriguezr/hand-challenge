require('jest');
const { translateHands, iterateArrayHands } = require('./mySolution');
const fs = require("fs");

test('Testeando el texto del path helloTest.hand',()=>{
    const readFile =  fs.readFileSync('./tests/helloTest.hand',{encoding:'utf8', flag:'r'});
    expect(translateHands(readFile)).toBe("Hello");
});



// test('Testeando el texto del path helloWorldTest.hand',()=>{
//     const readFile = await fs.readFileSync('./tests/helloWordlTest.hand',{encoding:'utf8', flag:'r'});
//     expect(translateHands(readFile)).toBe("Hello World!");
// });
