module.exports = function greetings(pool) {

    var massage = ""

    function greetName(name, language) {
        let firstName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        if (language === "IsiZulu" && firstName) {
            massage = "Sawubona " + firstName
        }

        else if (language === "English" && firstName) {
            massage = "Hello " + firstName
        }
        else if (language === "Italian" && firstName) {
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

    const greetingcounter =  async() => {
        let counter = await pool.query('select counter from users');
        return counter.rowCount

    }

    async function addNames(name) {
        let firstName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        let userCheck = await pool.query(`select name from users where name = $1`, [firstName]);
        if (userCheck.rows.length === 0) {
            await pool.query(`insert into users (name,counter) values ($1,$2)`, [firstName, 1]);
        } else {
            await pool.query(`update users set counter = counter + 1 where name = $1`, [firstName]);
        }
    }
   const list =  async () => {
        var namelist = await pool.query(`select * from users`);
        return namelist.rows
    }

     const remove = async () =>  {
        let remove = await pool.query(`delete  from users`);
        return remove.rows
    }

    const timeOut = () => {
        return ""
    }

    const getMassage = () => {return massage}
    
    async function displayCount(names) {
        let firstName = names.charAt(0).toUpperCase() + names.slice(1).toLowerCase();
        let countName = await pool.query(`select counter from users where name = $1`, [firstName]);
        let rowCount = countName.rows[0]
        if (rowCount && rowCount.counter) {
            return rowCount.counter
        } else {
            return countName.rowCount
        }
    }

    const duplicate = async name => {
        let firstName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        let userCheck = await pool.query(`select name from users where name = $1`, [firstName]);
        return userCheck.rowCount
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
        displayCount,
        duplicate
    };
};
