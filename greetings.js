    module.exports = function greetings(existingNames) {
        var namesGreeted = existingNames || {};
        var massage = ""
        
     
        function greetName(greetme, names) {
           
            addUserName(names)
            var names = names.charAt(0).toUpperCase() + 
            names.slice(1).toLowerCase();
            
            if (greetme === "IsiZulu") {
                massage = "Sawubona " + names
            }
    
            else if (greetme === "English") {
                massage = "Hello " + names
            }
            else if (greetme === "Italian") {
                massage = "ciao " + names
            }    
    
        }
    
        function greetErrors(language,name1){
            if(name1 === undefined){
                return "Please enter name";
            }
             else if(language === null){
                return "Please select language";
            }
            else if(!name1 && !language ){
                return "Please enter name and select language";
            }
        }
        
        function addUserName(name1){
            var name = name1.charAt(0).toUpperCase() + 
            name1.slice(1).toLowerCase();
            if(name){
                if(namesGreeted[name] === undefined){
                    namesGreeted[name] = 1
                } 
                else{
                    namesGreeted[name]++
                }
            }
          
        }
        
        function greetingcounter(){
            return Object.keys(namesGreeted).length
        }
         function getNames(){
             return namesGreeted
         }
         function remove(){
            localStorage.clear();
         }
         function timeOut (){
             return ""
         }
         function getMassage(){
             return  massage
         }
        
    
    
      
    
       
      
        return {
            greetName,
            greetingcounter,
            greetErrors,
            getNames,
            remove,
            timeOut,
            addUserName,
            getMassage
           
            
    
            
        }
    }