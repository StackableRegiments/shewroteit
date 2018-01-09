var express = require('express');
var _ = require('lodash');
var db = require('../db');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var sharp = require('sharp');

function decorate(req,args,res){
    var technicalMode = req.cookies.technicalMode;
    switch(req.query.technicalMode){
    case "0": technicalMode = 0; break;
    case "1": technicalMode = 1; break;
    }
    res.cookie('technicalMode', technicalMode);
    args.technicalMode = technicalMode == 1;
    if(args.technicalMode){
        try{
            var story = req.params.story;
            var p = path.join(__dirname,"..","views","partials","technicalNotes",story,"technicalNotes.handlebars");
            args.technicalNotes = fs.readFileSync(p);
        }
        catch(err){}
    }
    return args;
}

router.get('/', function(req,res) {
    res.redirect('/book');
});
router.get('/about', function(req,res) {
    res.render('about',decorate(req,{
        about:true
    },res));
});
router.get('/faq', function(req,res) {
    res.render('faq',decorate(req,{
        faq:db.faq
    },res));
});
router.get('/demos', function(req,res) {
    res.render('demos', decorate(req,{
        demos:db.demos
    },res));
});
router.get('/textureCompatible/:page/:image',function(req,res){
    var page = req.params.page;
    var image = req.params.image;
    res.header("Access-Control-Allow-Origin", "*");
    sharp("public/images/pages/"+page+"/"+image+".png")
        .resize(256,256)
        .ignoreAspectRatio()
        .png()
        .pipe(res);
});
router.get('/demo/:demo', function(req,res){
    var demoId = parseInt(req.params.demo);
    var demo = _.find(db.demos,function(d){
        return d.id == demoId;
    });
    var page = 'flyover';
    if(demoId == 1) page = 'velocipede';
    res.render(page,decorate(req,{
        comments:demo.comments
    },res));
});
router.get('/book', function(req,res) {
    res.render('book', decorate(req,{
        stories:db.stories
    },res));
});
router.get('/page/:story/:page', function(req, res) {
    var storyId = parseInt(req.params.story);
    var pageId = parseInt(req.params.page);
    var story = _.find(db.stories, function(s){
        return s.id == storyId;
    });
    var storyIndex = _.indexOf(db.stories,story);
    var prev = {
        available:storyIndex > 0
    };
    if(prev.available){
        var prevStory = db.stories[storyIndex - 1];
        prev.link = "/page/"+prevStory.id+"/0"
        prev.label = prevStory.label;
    }
    var next = {
        available:storyIndex < db.stories.length - 1
    };
    if(next.available){
        var nextStory = db.stories[storyIndex + 1];
        next.link = "/page/"+nextStory.id+"/0"
        next.label = nextStory.label;
    }
    else{
        next.link = "/feedback";
        next.label = "Tell us what you think!";
    }
    var page = _.find(story.pages, function(p){
        return p.id == pageId;
    });
    res.render('page', decorate(req,{
        page:page,
        story:story,
        prev:prev,
        next:next
    },res));
});

module.exports = router;
