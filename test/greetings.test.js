let assert = require("assert");
let greetings = require("../greetings")
describe("greetings" , function(){
    it(' should be able to output a massage which greets in IsiZulu' , function(){
       let greet = greetings()
    
       greet.greetName("IsiZulu","xolile")
       assert.equal("Sawubona Xolile",greet.getMassage("IsiZulu","xolile"));


       
    });
    it(' should be able to output a massage which greets in English' , function(){
        let greet = greetings()
     
        greet.greetName("English","Zinhle")
        assert.equal('Hello Zinhle',greet.getMassage("Hello","Zinhle"));
 
 
        
     });
     it(' should be able to output a massage which greets in Italian' , function(){
        let greet = greetings()
     
        greet.greetName("Italian","Kamo")
        assert.equal("ciao Kamo",greet.getMassage("Italian","Kamo"));
 
 
        
     });
});
describe("error massages" , function(){
   it(' should be able to output a error massage if a name is not inputed' , function(){
      let greet = greetings()
   
      greet.greetErrors("IsiZulu",undefined)
      assert.equal('Please enter name',greet.greetErrors('IsiZulu',undefined));


      
   });
   it(' should be able to output a error massage if both language and name are not selected' , function(){
      let greet = greetings()
   
      greet.greetErrors("","")
       assert.equal('Please enter name and select language',greet.greetErrors("",""));


      
   });
   it(' should be able to output a error massage if a language is not selected' , function(){
      let greet = greetings()
   
      greet.greetErrors(null,"Xolile")
       assert.equal("Please select language",greet.greetErrors(null,"Xolile"));


      
   });
   it(' should be able to output a error massage if both language and name are not selected' , function(){
      let greet = greetings()
   
      greet.greetErrors("","")
       assert.equal('Please enter name and select language',greet.greetErrors("",""));


      
   });
   describe("counter" , function(){
      it(' should be able to count how many names are being entered in the intext box' , function(){
         let greet = greetings()
         
      
        greet.addUserName("xolile")
        assert.equal(1,greet.greetingcounter())
         
  
  
         
      });
      it(' should be able to count how many names are being entered in the intext box' , function(){
         let greet = greetings()
         
      
        greet.addUserName("xolile")
        greet.addUserName("zinhle")
        assert.equal(2,greet.greetingcounter())
         
  
  
         
      });
      it(' should be able to count how many names are being entered in the intext box' , function(){
         let greet = greetings()
         
      
        greet.addUserName("xolile")
        greet.addUserName("zinhle")
        greet.addUserName("sipho")
        assert.equal(3,greet.greetingcounter())
         
  
  
         
      });
      it(' should be able to stop counting if a name is repeated' , function(){
         let greet = greetings()
         
      
        greet.addUserName("xolile")
        greet.addUserName("xolile")
        assert.equal(1,greet.greetingcounter())
         
  
  
         
      });
    
     
      
});
});