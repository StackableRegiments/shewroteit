var express = require('express');
var _ = require('lodash');
var router = express.Router();

var stories = [
    {
        id:0,
        label:"The Web",
        pages:[
            {id:0,label:"The Web",comments:[
                [
                    "R: So it's doing all this while we read it?",
                    "P: Yes.  We're reading a comic about the website that we're on, which explains how to make this website and how to make other ones."
                ]
            ]},
            {id:1,label:"The Web server"},
            {id:2,label:"Writing the response"}
        ]
    },
    {
        id:1,
        label:"Code",
        pages:[
            {id:0,label:"Code",comments:[
                [
                    "R: It looks a bit like 'in' for someone who's trying to do cursive.",
                    "P: Yes.  But it isn't a word like 'in'.  It's more like the letter 'a' or the digit 9.  It's a single character, it's just made of two pieces - a backslash and the n.  When you put them together they have a special meaning, which is 'newline'.  Or 'start writing at the next line'.",
                    "R: Dad?  Maybe instead of just looking at the programming we could put on the games we made.  So you could play them and then see how they were made.",
                    "P: Yes.  I want to.  Also our Batman comics.",
                    "R: Yeah."
                ]
            ]}
        ]
    },
    {
        id:2,
        label:"Crazy Frog",
        pages:[
            {id:0,label:"Crazy Frog 1",comments:[]},
            {id:1,label:"Crazy Frog 2",comments:[]},
            {id:2,label:"Crazy Frog 3",comments:[]},
            {id:3,label:"Crazy Frog 4",comments:[]},
            {id:4,label:"Crazy Frog 5",comments:[]}
        ]
    },
    {
        id:3,
        label:"Batman was Sad",
        pages:[
            {id:0,label:"Batman was sad.",comments:[]},
            {id:1,label:"Robin tried to help.",comments:[]},
            {id:2,label:"Batman wasn't sure.",comments:[]},
            {id:3,label:"The Cave.",comments:[]},
            {id:4,label:"A new tack.",comments:[]},
            {id:5,label:"Concern.",comments:[]},
            {id:6,label:"An old friend.",comments:[]},
            {id:7,label:"Ennui.",comments:[]}
        ]
    }
];
router.get('/', function(req,res) {
    res.redirect('/page/0/0');
});
router.get('/about', function(req,res) {
    res.render('about',{
	about:true
    });
});
router.get('/page/:story/:page', function(req, res) {
    var storyId = parseInt(req.params.story);
    var pageId = parseInt(req.params.page);
    var viewStories = _.cloneDeep(stories);
    var story = _.find(viewStories, function(s){
        return s.id == storyId;
    });
    story.active = true;
    var page = _.find(story.pages, function(p){
        return p.id == pageId;
    });
    res.render('page', {
        stories:viewStories,
        page:page,
        story:story
    });
});

module.exports = router;
