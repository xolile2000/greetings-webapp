
module.exports = function routes(greetings){
    
  async function home (req, res) {

      res.render("index",{
          greetMe: greetings.getMassage(),
          counter: await  greetings.greetingcounter(),
        
      }); 
  };
  async function  greet(req, res) {

      var name1 = req.body.enterName;
      var lang = req.body.language;
      
      await greetings.greetName(name1, lang);
    
      if(!name1 || name1 === undefined ){
        req.flash('error1',"please enter name")
     

      }else if(!lang && name1){
        req.flash('error1',"please select language")
        
           
      
          }else{
          greetings.greetName(req.body.language,req.body.enterName);
          await greetings.addNames(req.body.enterName)
      }
            res.redirect("/")
    };
  

    async function listName(req,res){
      const names = await greetings.list();
    
    
    res.render('greeted',{nameList: names
    
    });
  };
  async function counter(req,res){
      let greetedNames = req.params.enterName
       let counters = await greetings.displayCount(greetedNames)
      
          res.render("counters", {
          enterName : greetedNames,
          counter :counters
      
        });
      }
      async function reset(req,res){
          await greetings.remove();
      
         res.redirect("/")
      }
  return{
      home,
      greet,
      listName,
      counter,
      reset
  }

};