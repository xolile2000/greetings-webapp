let assert = require("assert");
let greetings = require("../greetings")

const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
 const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings';

const pool = new Pool({
    connectionString
});
beforeEach(async function(){
   console.log("*****")
   await pool.query("delete from users;");
});

describe("greetings" , function(){
 
    it(' should be able to output a massage which greets in IsiZulu' , function(){
       let greet = greetings(pool)
    
       greet.greetName("xolile","IsiZulu")
       assert.equal("Sawubona Xolile", greet.getMassage("IsiZulu","xolile"));


       
    });
    it(' should be able to output a massage which greets in English' , function(){
        let greet = greetings(pool)
     
        greet.greetName("Zinhle","English")
        assert.equal('Hello Zinhle',greet.getMassage("Hello","Zinhle"));
 
 
        
     });
     it(' should be able to output a massage which greets in Italian' , function(){
        let greet = greetings(pool)
     
        greet.greetName("Kamo","Italian")
        assert.equal("ciao Kamo",greet.getMassage("Italian","Kamo"));
 
 
        
     });
});
describe("error massages" , function(){
   it(' should be able to output a error massage if a name is not inputed' , function(){
      let greet = greetings()
   
      greet.greetErrors("IsiZulu",undefined)
      assert.equal('Please enter name',greet.greetErrors('IsiZulu',undefined));


      
   });
  
describe("counter" , function(){
      it(' should be able to count how many names are being entered in the intext box' , async function(){
         let greet = greetings(pool)
         
      
       await greet.addNames("xolile")
        assert.equal(1,await greet.greetingcounter())
         
  
  
         
      });
      it(' should be able to count how many names are being entered in the intext box' ,async function(){
         let greet = greetings(pool)
         
   
       await greet.addNames("xolile")
       await greet.addNames("zinhle")
        assert.equal(2,await greet.greetingcounter())
         
  
  
         
      });
      it(' should be able to count how many names are being entered in the intext box' , async function(){
         let greet = greetings(pool)
         
      
       await greet.addNames("xolile")
       await greet.addNames("zinhle")
       await greet.addNames("sipho")
        assert.equal(3,await greet.greetingcounter())
         
  
  
         
      });
      it(' should be able to stop counting if a name is repeated' , async function(){
         let greet = greetings(pool)
         
      
       await greet.addNames("xolile")
       await greet.addNames("xolile")
      
        assert.equal(1,await greet.greetingcounter())
         
  
  
         
      });
      describe(" clear counter" , function(){
         it(' should  delete counter' , async function(){
            let greet = greetings(pool);
           
    
            
           await pool.query(`delete  from users`);
            
            
            assert.equal('',await greet.remove());

            
     
     
            
         });
      });
     
      
   
    
    
     
      
});
after(function(){
   pool.end();
})

});