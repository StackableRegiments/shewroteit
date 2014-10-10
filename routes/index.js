var express = require('express');
var _ = require('lodash');
var router = express.Router();

var stories = (function(){
    var author = function(a){
        return function(s){
            return {author:a, content:s};
        };
    };
    var p = author("paper");
    var gp = author("girlPurple");
    var l = author("leer");
    var chapters = [
        {
            id:0,
            ch:1,
            label:"The Web",
            pages:[
                {id:0,label:"The Web",comments:[
                    [
                        gp("So it's doing all this while we read it?"),
                        p("Yes.  We're reading a comic about the website that we're on, which explains how to make this website and how to make other ones.")
                    ]
                ]},
                {id:1,label:"The Web server",comments:[
                    [
                        gp("Is it files?"),
                        p("Yes.  It's pretty much any file.  Anything you can save on your computer you can send down to someone else as a web response.")
                    ]
                ]},
                {id:2,label:"Writing the response"}
            ]
        },
        {
            id:1,
            ch:2,
            label:"Code",
            pages:[
                {id:0,label:"Code",comments:[
                    [
                        gp("It looks a bit like 'in' for someone who's trying to do cursive."),
                        p("Yes.  But it isn't a word like 'in'.  It's more like the letter 'a' or the digit 9.  It's a single character, it's just made of two pieces - a backslash and the n.  When you put them together they have a special meaning, which is 'newline'.  Or 'start writing at the next line'."),
                        gp("Dad?  Maybe instead of just looking at the programming we could put on the games we made.  So you could play them and then see how they were made."),
                        p("Yes.  I want to.  Also our Batman comics."),
                        gp("Yeah.")
                    ]
                ]},
                {id:1,label:"More code",comments:[
                    [
                        gp("Lambda?"),
                        p("Yes.  What about it?"),
                        gp("What is it?"),
                        p("Lambda is a letter in the Greek alphabet.  What it means in programming is a function that you can pass around.  Do you remember what a function is?"),
                        gp("Yes.  It's when one thing goes in and comes out another thing."),
                        p("Or the same thing.  It's a machine where something goes in and something comes out.  Can you think of any functions?"),
                        gp("A?  Isn't A a function?"),
                        p("Not in any of the languages I know.  It could be the NAME of a function, but it isn't itself a function.  It sounds more like a symbol.  Addition is a function.  It takes some numbers and gives back a number which is all of them added together.")
                    ]
                ]},
                {id:2,label:"More code",comments:[
                    [
                        p("Biff!  Bam!  Zowie!  Pow!  Tank!"),
                        gp("Dad.")
                    ]
                ]}
            ]
        },
        {
            id:3,
            ch:3,
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
        },
        {
            id:5,
            ch:4,
            label:"Prog Lang",
            pages:[
                {id:0,label:"Overview",comments:[]},
                {id:1,label:"Javascript",comments:[
                    [
                        gp("Why is Javascript Spiderman?  Oh..."),
                        p("Tee hee!"),
                        gp("The web.  It's because the web."),
                        gp("Oh, Dad.")
                    ]
                ]},
                {id:2,label:"Functions",comments:[
                    [
                        gp("Like, the squiggly things?"),
                        p("Yes.  These: { }.  They indicate a scope.  That is, a place where names make sense."),
                        gp("What do you mean?"),
                        p("Like, you know how there's a Victoria in Australia and there's a Victoria in Africa?"),
                        gp("And the Queen?"),
                        p("Yes.  And the Queen.  So each time someone says Victoria, you need to know where they want you to be thinking of.  Whether it's Africa, or Canada..."),
                        gp("Or Queens."),
                        p("Yes.  Or Queens.")
                    ]
                ]},
                {id:3,label:"Web functions",comments:[]},
                {id:4,label:"Multiplication",comments:[
                    [
                        gp("What language is that other one?"),
                        p("I'd say it's Erlang, except I'm not sure about variable arity on a function."),
                        gp("..."),
                        p("Uh...  About Chapter 8?  I think?")
                    ]
                ]}
            ]
        },
        {
            id:2,
            ch:5,
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
            id:4,
            ch:6,
            label:"Batgirl comes back",
            pages:[
                {id:0,label:"Batgirl comes back",comments:[]}
            ]
        },
        {
            id:6,
            ch:37,
            label:"Monads",
            pages:[
                {id:0,label:"1"},
                {id:1,label:"2"},
                {id:2,label:"3"},
                {id:3,label:"4"},
                {id:4,label:"5"},
                {id:5,label:"6"}
            ]
        }
    ];
    _.forEach(chapters,function(c){
        c.chapter = "Chapter "+(c.ch);
    })
    return _.sortBy(chapters,"ch");
})();
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
