const express = require("express");

const router = express.Router();

function sortColour(myFaveColour) {
  switch (myFaveColour) {
    case "red":
      colourCode = "#B9121B";
      break;
    case "blue":
      colourCode = "#225378";
      break;
    case "green":
      colourCode = "#BEEB9F";
      break;
    case "orange":
      colourCode = "#EB7F00";
      break;
  }
  return colourCode;
}

module.exports = () => {
  router.get("/example", (req, res) => {
    //Sets name = express
    res.cookie("name", "express");
    return res.render("example", {
      title: "My EJS Example",
      firstname: "Hello EJS Template",
      surname: "My Heading Two"
    });
  });
  router.get("/favecolour", (req, res) => {
    let myFaveColour = "red";
    if (req.cookies.myFaveColour) {
      myFaveColour = req.cookies.myFaveColour;
    }
    // count example
    let visitCount = 1;
    if (req.cookies.visitCount) {
      visitCount = parseInt(req.cookies.visitCount) + 1;
    }
    // set value in milliseconds
    res.cookie("visitCount", visitCount, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true
    });
    let colourCode = sortColour(myFaveColour);
    return res.render("favecolour", {
      title: "My Favourite Colour",
      faveColour: myFaveColour,
      colourCode: colourCode,
      visitCount: visitCount
    });
  });

  router.post("/favecolour", (req, res) => {
    // console.dir(req.body);
    let myFaveColour = req.body.faveColour;
    let colourCode = sortColour(myFaveColour);
    res.cookie("faveColour", myFaveColour);
    // count example
    let visitCount = req.cookies.visitCount;
    return res.render("favecolour", {
      title: "My Favourite Colour",
      faveColour: req.body.faveColour,
      colourCode: colourCode,
      visitCount: visitCount
    });
  });

  router.get("/reset", (req, res) => {
    res.clearCookie("faveColour");
    res.clearCookie("visitCount");
    res.redirect("/faveColour");
  });

  return router;
};
