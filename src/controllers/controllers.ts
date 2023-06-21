import { Request, Response } from "express";

const sortColour = (myFaveColour: string): string => {
    let colourCode = "";
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
};

const faveColourController = (req: Request, res: Response): void => {
    let myFaveColour = "red";
    if (req.cookies.cookieFaveColour) {
        myFaveColour = req.cookies.cookieFaveColour;
    }
    let visitCount = 1;
    if (req.cookies.visitCount) {
        visitCount = parseInt(req.cookies.visitCount) + 1;
    }
    res.cookie("visitCount", visitCount.toString(), {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
    });
    let colourCode = sortColour(myFaveColour);
    res.render("favecolour", {
        title: "My Favourite Colour",
        faveColour: myFaveColour,
        colourCode: colourCode,
        visitCount: visitCount,
    });
};

const faveColourPostController = (req: Request, res: Response): void => {
    let myFaveColour = req.body.faveColour;
    let colourCode = sortColour(myFaveColour);
    res.cookie("cookieFaveColour", myFaveColour);
    let visitCount = req.cookies.visitCount;
    res.render("favecolour", {
        title: "My Favourite Colour",
        faveColour: req.body.faveColour,
        colourCode: colourCode,
        visitCount: visitCount,
    });
};

const resetController = (req: Request, res: Response): void => {
    res.clearCookie("cookieFaveColour");
    res.clearCookie("visitCount");
    res.redirect("/");
};

export {
    faveColourController,
    faveColourPostController,
    resetController,
};
