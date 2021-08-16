let assert = require("assert");
let greetings = require("../greetings")
describe("greetings" , function(){
    it(' should be able to output a massage which greets in IsiZulu' , function(){
       let greet = greetings()
    
       greet.greetName("IsiZulu","xolile")
       assert.equal("Sawubona Xolile",greet.greetName("IsiZulu","xolile"));


       
    });
    it(' should be able to output a massage which greets in English' , function(){
        let greet = greetings()
     
        greet.greetName("English","Zinhle")
        assert.equal("Hello Xolile",greet.greetName("English","xolile"));
 
 
        
     });
});