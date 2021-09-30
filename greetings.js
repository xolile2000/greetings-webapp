module.exports = function greetings(pool) {
    // var namesGreeted = {};
    var massage = ""

    function greetName(name, language) {
        let firstName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        if (language === "IsiZulu" && firstName!== "") {
            massage = "Sawubona " + firstName
        }

        else if (language === "English" && firstName!== "") {
            massage = "Hello " + firstName
        }
        else if (language === "Italian" && firstName!== "") {
            massage = "ciao " + firstName
        }

    }
    function greetErrors(language, name1) {
        if (name1 === undefined) {
            return "Please enter name";
        }
        else if (language === null) {
            return "Please select language";
        }
        else if (!name1 && !language) {
            return "Please enter name and select language";
        }
    }

    async function greetingcounter() {
           let counter = await pool.query('select counter from users');
           return counter.rowCount
        // return Object.keys(namesGreeted).length
    }

    async function addNames(name) {
        let firstName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        let userCheck = await pool.query(`select name from users where name = $1`, [firstName]);
        if (userCheck.rows.length === 0) {
            await pool.query(`insert into users (name,counter) values ($1,$2)`, [firstName, 1]);
        }else{
            await pool.query(`update users set counter = counter + 1 where name = $1`, [firstName]);
        }
       

    }
    async function list(){
        var namelist = await pool.query(`select * from users`);
        return namelist.rows
    }

    async function remove() {
        let remove = await pool.query(`delete  from users`);
        return remove.rows
    }

    function timeOut() {
        return ""
    }
    function getMassage() {
        return massage
    }
    async function displayCount(names){
        let countName = await pool.query(`select name,counter from users where name = $1`,[names]);
        let rowCount = countName.rows
        return rowCount[0].counter
    }







    return {
        greetName,
        greetingcounter,
        greetErrors,
        addNames,
        remove,
        timeOut,
        getMassage,
        list,
        displayCount




    };
};
