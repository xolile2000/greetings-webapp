
module.exports = function routes(greetings) {

  async function home(req, res) {

    res.render("index", {
      // greetMe: greetings.getMassage(),
      counter: await greetings.greetingcounter(),

    });
  };
  async function greet(req, res) {

    var name1 = req.body.enterName;
    var lang = req.body.language;
    if (await greetings.duplicate(name1) === 1) {
      await greetings.addNames(name1)
      req.flash('error1', "you have already selected this name")
    }
    else if (name1 && lang) {
      await greetings.addNames(name1)
      await greetings.greetName(name1, lang);
      var greetMe = greetings.getMassage()
    } else {
      if (!name1 || name1 === undefined) {
        req.flash('error1', "please enter name")

      } else if (!lang && name1) {
        req.flash('error1', "please select language")
      }
    }
    res.render("index", {
      greetMe,
      counter: await greetings.greetingcounter(),
    })
  };


  async function listName(req, res) {
    const names = await greetings.list();


    res.render('greeted', {
      nameList: names

    });
  };
  async function counter(req, res) {
    let greetedNames = req.params.enterName
    let counters = await greetings.displayCount(greetedNames)

    res.render("counters", {
      enterName: greetedNames,
      counter: counters

    });
  }
  async function reset(req, res) {
    await greetings.remove();
    req.flash('success', "names cleared successfuly");
    res.redirect("/")
  }
  return {
    home,
    greet,
    listName,
    counter,
    reset
  }

};