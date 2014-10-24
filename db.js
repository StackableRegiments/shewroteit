var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var author = function(a){
    return function(s){
        return {author:a, content:s};
    };
};
var p = author("paper");
var gp = author("girlPurple");
var l = author("leer");
var t = function(text){
    return {
        text:true,
        content:text
    }
};
var i = function(id){
    return {
        image:true,
        id:id
    };
}
var old = function(id){
    return [[{
        image:true,
        id:id,
	class:"comic"
    }]];
}

var demos = (function(){
    return [
        {
            chapter:1,
            label:"Spaceships in space",
            id:0,
            comments:[
                [
                    gp("Is this the one with steering around?"),
                    p("Yes.  But when I realised that everyone was reading on their phones, I did a bit of tweaking to make it work better there.  Now you just touch the screen to move the ship."),
                    gp("I like that better than having to press escape to start typing."),
                    p("I guess that makes you a Visual Studio user.")
                ]
            ]
        },
        {
            chapter:2,
            label:"Velocipede vigorously",
            id:1,
            comments:[
                [
                    gp("This is a pretty boring game."),
                    p("Yes.  What would make it better?"),
                    gp("Anything.")
                ]
            ]
        }
    ];
})();
var stories = (function(){
    var chapters = [
        {
            id:0,
            ch:1,
            label:"The Web",
            pages:[
                {id:0,label:"The Web",
                 content:[
                     [
                         t("This is a web site."),
                         i(0)
                     ],
                     [
                         t("A web site sends you letters.  But you have to ask for them."),
                         t("You go to the address of the web site and it sends you a letter."),
                         i(1)
                     ]
                 ],
                 comments:[
                     [
                         gp("So it's doing all this while we read it?"),
                         p("Yes.  We're reading a comic about the website that we're on, which explains how to make this website and how to make other ones.")
                     ]
                 ]},
                {id:1,label:"The Web server",
                 content:[
                     [
                         t("There are two things we went past very fast just then:"),
                         t("1: The web server writes the letter."),
                         t("2: Then your computer tells you what the letter says."),
                         t("Let's go back to 1."),
                         t("How does it write the letter?"),
                         i(2)
                     ],
                     [
                         t("Sometimes it just copies a letter it already has."),
                         i(3)
                     ],
                     [
                         t("Or it can copy anything else.  It could be a video.  Or a picture."),
                         i(4)
                     ]
                 ],
                 comments:[
                     [
                         gp("Is it files?"),
                         p("Yes.  It's pretty much any file.  Anything you can save on your computer you can send down to someone else as a web response.")
                     ]
                 ]},
                {id:2,label:"Writing the response",
                 content:[
                     [
                         t("Sometimes it fills in the blanks."),
                         t("This invoice needs a list of who bought what, so it can ask the right people for the right things."),
                         i(5)
                     ]
                 ],
                 comments:[
                     [
                         gp("How does it know where to get the list?"),
                         p("Ah, well.  That's a huge question.  It could get it from a database, for instance."),
                         gp("That's a file of data?"),
                         p("It could be.  But usually people mean another program, which is running on a computer and making sure that people stand in line properly to get the data."),
                         gp("What do you mean stand in line?"),
                         p("It means they have to wait for their turn.  And if they're putting things in and taking them out they have to make sure everybody gets to do their whole job, without someone coming in at once.  Imagine if you were halfway through paying for your potatoes, and just as you handed over your money someone grabbed the potatoes out of your basket and then the shop said 'Sorry, we've run out of potatoes'."),
                         p("A database stops people stealing your potatoes."),
                         gp("Right."),
                         p("They could also get it from a file, or from another person typing at the other end.  Or they could get it from calling up another program, or by making it up as they go along."),
                         gp("Computers can make things up?"),
                         p("They really can't.  But they can do a thing which looks a lot like they can.")
                     ]
                 ]}
            ]
        },
        {
            id:1,
            ch:2,
            label:"Code",
            pages:[
                {id:0,label:"Code",
                 content:[
                     [
                         t("[\\n] is a code."),
                         t("A code has a special meaning.  You might have a code with your friend where you say 'book' instead of 'horse' because it's funny to say you went riding on a book."),                        t("But you both know what you really mean.  When you say [\n] to a computer, it means 'pick up your pen and move down to the next line.  Then start writing again'."),
                         i(0),
                         t("Like[\\n]"),
                         t("this.[\\n]"),
                         t("[\\n]"),
                         t("[\\n]"),
                         t("See?[\\n]"),
                         t("[\\n]")
                     ]
                 ],
                 comments:[
                     [
                         gp("It looks a bit like 'in' for someone who's trying to do cursive."),
                         p("Yes.  But it isn't a word like 'in'.  It's more like the letter 'a' or the digit 9.  It's a single character, it's just made of two pieces - a backslash and the n.  When you put them together they have a special meaning, which is 'newline'.  Or 'start writing at the next line'."),
                         gp("Dad?  Maybe instead of just looking at the programming we could put on the games we made.  So you could play them and then see how they were made."),
                         p("Yes.  I want to.  Also our Batman comics."),
                         gp("Yeah.")
                     ]
                 ]},
                {id:1,label:"More code",
                 content:[
                     [
                         t("Computers talk in code all the time.  When the web server talks to the browser, it sends code to tell it how to show you what the server said."),
                         t("That means you don't see the code.  You see what the browser shows you."),
                         t("It's a bit like a script for a puppet show.  You're sitting in the audience, so you can't see what the players are doing behind the curtain.  You can only see the puppets."),
                         i(1)
                     ]
                 ],
                 /*
                  comments:[
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
                  ]*/},
                {id:2,label:"More code",
                 content:[
                     [
			 t("You can see the code of THIS page by right-clicking and choosing 'View source' or 'View page source' or something like that.  (It depends on which browser you're using)"),
			 t("It's a lot longer than it looks!"),
			 t("Don't worry, you don't have to write all that by hand.  You can ask the computer to do it.  You will use special codes to do it."),
			 t("Using codes to tell a computer what to do is programming."),
			 t("What you tell the computer to do is a program."),
			 t("The codes that use are a programming language."),
			 t("There weren't enough pictures on this page.  Let's have a Batman break!"),
			 i(2)
		     ]
                 ],
                 comments:[
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
                {id:7,label:"Ennui.",comments:[
                    [
                        gp("My Batman comic is better."),
                        p("Yes.  Yes, it is.  Your Batman comic is the best Batman comic ever.")
                    ]
                ]}
            ]
        },
        {
            id:5,
            ch:4,
            label:"Prog Lang",
            pages:[
                {id:0,label:"Overview",comments:[
                    [
                        gp("You said there were hundreds."),
                        p("I've been pretty restrained about listing them and drawing them.  There are hundreds that I haven't even ever programmed in, actually.  And probably hundreds that I've never seen or heard of."),
                        gp("So there are hundreds."),
                        p("There are hundreds.")
                    ]
                ]},
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
                ]},
                {id:5,label:"More functions"},
                {id:6,label:"Scope"},
                {id:7,label:"Function state"}
            ]
        },
        {
            id:2,
            ch:10,
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
            ch:9,
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
                {id:0,label:"1",comments:[
                    [
                        gp("What is this FOR?"),
                        p("It's for when you want the same line of code to do different things depending what's around it.  It sort of makes programming three dimensional."),
                        gp("Is programming two dimensional normally?"),
                        p("Well, it goes across as you write more words and it goes down as you write more lines."),
                        gp("Didn't you say that the newline thingy was just another character?  Isn't it all in one line?  Is that still two dimensional?"),
                        p("Uh...  Um.  You're right, actually.  Yes.  It's one dimensional normally.  So Monads are...  Um...  Two dimensional?"),
                        gp("Dad?  You can say three dimensional if you want to.  Don't be sad."),
                        p("Thanks, honey.")
                    ]
                ]},
                {id:1,label:"2",comments:[
                    [
                        gp("What does f(a) mean?"),
                        p("f is the name of a general function - so if you see something called 'f' somewhere, it usually means 'the function we're talking about'."),
                        gp("Sort of like 'it'?"),
                        p("A bit like that.  But it's more like 'A man walks into a bar'."),
                        gp("Which man?"),
                        p("Any man."),
                        gp("So it's any function?"),
                        p("It just sort of points at a function if there's one around - it's in an unspecified namespace."),
                        gp("So it's a symbol you're assuming would have a binding if we were really talking about code."),
                        p("Wow.  I should have just said that."),
                        gp("I don't know why you didn't just say that.")
                    ]
                ]},
                {id:2,label:"3",comments:[
                    [
                        gp("What's traversal?"),
                        p("It's when you go through something.  Like, if I took you on a tour of my house."),
                        gp("Yes?"),
                        p("I'd show you the bits I wanted you to see, right?"),
                        gp("Not your bedroom."),
                        p("Not my bedroom."),
                        gp("Because it's too messy."),
                        p("Because it's too...  Never mind why.")
                    ]
                ]},
                {id:3,label:"4",comments:[
                    [
                        gp("Why is throw not a value?"),
                        p("I'm actually not completely sure about that one.  I'm pretty sure I've seen people say that you can desugar exceptions to values.  They have to be passed through until a handler claims them, is all."),
                        gp("What's desugar?"),
                        p("It's when you peel off the special language so that you can just do the basic stuff that's going on."),
                        gp("Like when we wrote times with plus?"),
                        p("Yes.")
                    ]
                ]},
                {id:4,label:"5",comments:[
                    [
                        gp("What's all that stuff?"),
                        p("{{this}}?"),
                        gp("Yeah, {{that}}."),
                        p("It's a markup language called handlebars, which is an extension of a markup language called mustache."),
                        gp("It sort of looks like a mustache."),
                        p("I think that's why they called it that."),
                        gp("I know.  That's what I was saying."),
                        p("Sorry.")
                    ]
                ]},
                {id:5,label:"6",comments:[
                    [
                        gp("What's mockable?"),
                        p("It means I can make a fake one easily to put in my tests.")
                    ]
                ]
                }
            ]
        },
        {
            id:7,
            ch:6,
            label:"Collision Detection",
            pages:[
                {id:0},
                {id:1}
            ]
        },
        {
            id:8,
            ch:5,
            label:"How games work",
            pages:[
                {id:0,label:"Game 1"},
                {id:1,label:"Game 2"},
                {id:2,label:"Game 3"},
                {id:3,label:"Game 4"}
            ]
        }
    ];
    _.forEach(chapters,function(c){
        c.chapter = c.ch+".";
        c.pageCount = c.pages.length;
        c.discussionCount = _.flatten(_.pluck(c.pages,"comments")).length;
        var p = path.join(__dirname,"views","partials","technicalNotes",c.id.toString(),"technicalNotes.handlebars");
        c.noteCount = fs.existsSync(p) ? 1 : 0;
        _.forEach(c.pages, function(p){
            p.content = p.content || old(p.id);
        });
    });
    return _.sortBy(chapters,"ch");
})();

exports.demos = demos;
exports.stories = stories;
