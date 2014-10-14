var express = require('express');
var _ = require('lodash');
var db = require('../db');
var router = express.Router();

router.get('/', function(req,res) {
    res.redirect('/book');
});
router.get('/about', function(req,res) {
    res.render('about',{
        about:true
    });
});
router.get('/demos', function(req,res) {
    res.render('demos', {
        demos:db.demos
    });
});
router.get('/demo/:demo', function(req,res){
    var demoId = parseInt(req.params.demo);
    var demo = _.find(db.demos,function(d){
        return d.id == demoId;
    });
    switch(demoId){
    case 0: res.render('flyover',{
        comments:demo.comments
    }); break;
    }
});
router.get('/book', function(req,res) {
    res.render('book', {
        stories:db.stories
    })
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
    res.render('page', {
        page:page,
        story:story,
        prev:prev,
        next:next
    });
});

module.exports = router;
