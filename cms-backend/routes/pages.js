const express = require("express");
const pageRouter = express.Router();

//Page Model
const Page = require("../models/page");

//GET all pages
pageRouter.route("/").get(function (req, res) {
    Page.find({}, function (err, pages) {
        if (err) {
            console.log(err);
        } else {
            res.json(pages);
        }
    })
});

//GET one page
pageRouter.route("/:slug").get(function (req, res) {
    const slug = req.params.slug;
    Page.findOne({
        slug: slug
    }, function (err, page) {
        if (err) {
            console.log(err);
        } else {
            res.json(page);
        }
    })
});

//POST add page
pageRouter.post("/add-page", function (req, res) {
    let title = req.body.title;
    let slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
    let content = req.body.content;
    // const hasSidebar = req.body.hasSidebar;
    // const sidebar = (hasSidebar) ? "yes" : "no";

    Page.findOne({
        slug: slug
    }, function (err, page) {
        if (err) console.log(err);

        if (page) {
            res.json("pageExists");
        } else {
            let page = new Page({
                title: title,
                slug: slug,
                content: content,
                sidebar: "no"
            });

            page.save(function (err) {
                if (err) console.log(err);
                res.json("ok");
            });
        }
    });
});

//GET edit page
pageRouter.get("/edit-page/:id", function (req, res) {
    let id = req.params.id;
    Page.findById(id, function (err, page) {
        if (err) console.log(err);
        res.json(page);
    });
});

//POST edit page
pageRouter.post("/edit-page/:id", function (req, res) {

    let id = req.params.id;

    let title = req.body.title;
    let slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
    let content = req.body.content;
    // lethasSidebar = req.body.hasSidebar;
    // letsidebar = (hasSidebar) ? "yes" : "no";

    
    Page.findOne({
        slug: slug,
        _id: {
            '$ne': id
        }
    }, function (e, p) {
        if (e) console.log(e);
        if (p) {
            res.json("pageExists");
        } else {
            Page.findById(id, function (err, page) {
                if (err) console.log(err);

                page.title = title;
                page.slug = slug;
                page.content = content;
                // page.sidebar = sidebar;

                page.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.json("problem");
                    } else {
                        res.json("ok");
                    }
                });
            });
        }
    });
});

//GET delete page
pageRouter.get("/delete-page/:id", function (req, res) {
    let id = req.params.id;
    Page.findByIdAndRemove(id, function (err) {
        if (err) {
            console.log(err);
            res.json("error");
        } else {
            res.json("ok");
        }
    });
});

//Exports
module.exports = pageRouter;