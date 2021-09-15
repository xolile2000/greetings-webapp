module.exports = function greetings(pool) {
    var namesGreeted = {};
    var massage = ""


    async function greetName(str) {
        try {
            var language = str.language;
            var name = str.name;

            addUserName(name)
            // var name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            var userCheck = await pool.query(`select name from users where name = $1`, [name]);
            if (userCheck.rowCounter === 0) {
                await pool.query(`insert into users (name,counter) values ($1,$2)`, [name, 1]);
            }
            if (language === "IsiZulu") {
                massage = "Sawubona " + name
            }

            else if (language === "English") {
                massage = "Hello " + name
            }
            else if (language === "Italian") {
                massage = "ciao " + name
            }
        } catch (err) {
            throw err
        }
    };











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

    function addUserName(name) {
        // var name = name1.charAt(0).toUpperCase() +
        //     name1.slice(1).toLowerCase();
        if (name) {
            if (namesGreeted[name] === undefined) {
                namesGreeted[name] = 1
            }
            else {
                namesGreeted[name]++
            }
        }

    }

    async function greetingcounter() {
        //    const counter = await pool.query('select counter(*) from users');
        return Object.keys(namesGreeted).length
    }

    async function getNames() {
        const greetedNames = await pool.query(`select name from users `);
        return greetedNames.rows;

    }

    function remove() {
        localStorage.clear();
    }
    function timeOut() {
        return ""
    }
    function getMassage() {
        return massage
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




    };
};
