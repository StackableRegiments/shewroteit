var express = require('express');
var _ = require('lodash');
var router = express.Router();

var stories = [
    {
        id:0,
        pages:[
            {id:0,label:"The Web",comments:[
                [
                    "R: So it's doing all this while we read it?",
                    "P: Yes.  We're reading a comic about the website that we're on, which explains how to make this website and how to make other ones."
                ]
            ]},
            {id:1,label:"Web servers"},
            {id:2,label:"Evaluation"}
        ]
    },
    {
        id:1,
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
    }
];
router.get('/page/:story/:page', function(req, res) {
    var storyId = parseInt(req.params.story);
    var pageId = parseInt(req.params.page);
    var story = _.find(stories, function(s){
        return s.id == storyId;
    });
    var page = _.find(story.pages, function(p){
        return p.id == pageId;
    });
    console.log(storyId,pageId,story,page);
    res.render('page', {
        stories:stories,
        page:page,
        story:story
    });
});

module.exports = router;
