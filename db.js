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
var ci = function(id){
    var a = i(id);
    a.class = "comic";
    return a;
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
            ch:4,
            label:"Code",
            pages:[
                {id:0,label:"Code",
                 content:[
                     [
                         t("[\\n] is a code."),
                         t("A code has a special meaning.  You might have a code with your friend where you say 'book' instead of 'horse' because it's funny to say you went riding on a book."),                        t("But you both know what you really mean.  When you say [\\n] to a computer, it means 'pick up your pen and move down to the next line.  Then start writing again'."),
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
                 comments:[
                     [
                         gp("Lambda?"),
                         p("Did I say lambda?"),
                         gp("You're always saying lambda.  It was weird when you didn't say it."),
                         p("Lambda is a letter in the Greek alphabet.  What it means in programming is a function that you can pass around.  Do you remember what a function is?"),
                         gp("Yes.  It's when one thing goes in and comes out another thing."),
                         p("Or the same thing.  It's a machine where something goes in and something comes out.  Can you think of any functions?"),
                         gp("A?  Isn't A a function?"),
                         p("Not in any of the languages I know.  It could be the NAME of a function, but it isn't itself a function.  It sounds more like a symbol.  Addition is a function.  It takes some numbers and gives back a number which is all of them added together.  We're going to talk about how to build some functions in Chapter 4."),
                         gp("So we're going to build lambdas?"),
                         p("We are."),
                         gp("Why is it named after a letter in the thingummy alphabet?"),
                         p("I think it might be a bit of a tribute to some early thinking that was done by the Greeks.  In fact, it might even be a leftover from then.  But I think it was invented by Alonzo Church and I don't think he was Greek.  Maybe it's because things that need names in maths tend to pick up on Greek symbols because so many of the others are."),
                         gp("What others?"),
                         p("Pi, for instance."),
                         gp("That's the number that goes on forever?"),
                         p("Possibly.  It would be hard to prove that.  It's a number that we haven't so far found to repeat.")
                     ]
                 ]
                },
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
            ch:2,
            label:"Prog Lang",
            pages:[
                {id:0,label:"Overview",
                 content:[
                     [
                         t("There are hundreds of programming languages."),
                         i(0),
                         t("Some of them come from different planets."),
                         t("Some of them live in the same place as each other."),
                         i(8),
                         t("You could describe a bookshelf as a picture, or by pointing at a bookshelf, or by saying 'it is a vertical series of horizontal shelves', or as '4 * pine shelf, 2 * wall board, 1 * back board'."),
                         t("You could use any of those descriptions and always be talking about the same bookshelf.  Programming languages are a bit like that."),
                         t("They are different ways of talking."),
                         t("They are different ways of thinking."),
                         t("We will start by choosing just one.")
                     ]
                 ],
                 comments:[
                     [
                         gp("You said there were hundreds."),
                         p("I've been pretty restrained about listing them and drawing them.  There are hundreds that I haven't even ever programmed in, actually.  And probably hundreds that I've never seen or heard of."),
                         gp("So there are hundreds."),
                         p("There are hundreds.")
                     ]
                 ]},
                {id:1,label:"Javascript",
                 content:[
                     [
                         t("JavaScript"),
                         i(9),
                         t("It's everywhere.  It ships with the JVM.  It's native to .Net.  It's in every web browser.  It's simple.  It's fast.  You can write a web server in it."),
                         t("Usually when a language is called 'script' it means you can just hand it straight to a machine to use.  You don't need to do any preparation on it first.  Like an icecream you can just unwrap and eat, instead of fish fingers which you need to cook first."),
                         t("In Javascript you make lots of little machines that each do something.  They might listen for you to press a key.  They might do maths for you.  They might make another machine."),
                         t("The machines are called functions.  Function is a word that means 'to do something', or 'what I do'."),
                         t("A function is a machine that has a hole in one side that you put something into.  Then something comes out of the hole on the other side."),
                         t("Here's one:  One side takes a number.  What comes out the other side will be a number twice as big."),
                         i(10),
                         t("Let's call this 'Double'"),
                         t("Now that we've given it a name we can use it.  I put in 3.  I got 6 back out.  Then I put in 9 to see what would happen.")
                     ],
                     [
                         t("Machines can make other machines.  A more technical way to say this is to say 'functions can return functions'."),
                         t("Here's one.  It's going to make machines to multiply numbers."),
                         ci(11),
                         t("var doubler = multiplier(2);"),
                         t("var tripler = multiplier(3);"),
                         t("doubler(4) = 8"),
                         t("tripler(4) = 12")
                     ]
                 ],
                 comments:[
                     [
			 gp("Tell them what the JVM is."),
			 p("You tell them what the JVM is."),
			 gp("It's the platform that Java runs on?"),
			 p("Yep.  And .Net has a platform that C# and VB.Net and F# run on."),
			 gp("It can do three languages?"),
			 p("It can do hundreds of languages."),
			 gp("Hundreds?"),
			 p("Hundreds.  So can Java."),
                         gp("Why is Javascript Spiderman?  Oh..."),
                         p("Tee hee!"),
                         gp("The web.  It's because the web."),
                         gp("Oh, Dad.")
                     ]
                 ]},
                {id:2,label:"Functions",
                 content:[
                     [
                         t("'var' is a word that attaches meaning to a name.  So 'doubler' now means something.  It means the function we made with multipler(2).  The function that the multiplier machine gives you when you put '2' into the side."),
                         t("But won't we run out of names?"),
                         t("Names only mean something in a particular space. So when you're in your house, 'the TV' means one thing.  But when someone in a movie says 'turn off the TV', they're talking about something else.  It's a different one."),
                         t("That's what these mean: {...}")
                     ]
                 ],
                 comments:[
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
                {id:3,label:"Web functions",content:[
                    [
                        t("Can we do anything but double numbers?"),
                        t("Try this one:"),
                        ci(12),
                        t("That's right, it's the web server from Chapter 1."),
                        t("We can use functions to turn easy things into hard things.  We do this by building little pieces up into bigger pieces, and then using the bigger pieces to solve problems."),
                        t("If you ever had to build an axe, and you were on a desert island, you would start by building a fire.  Then you would use the fire to build the tools to build a forge.  Then you would use the forge to build the tools to build the axe.  Then you would build the axe."),
                        t("But it's very difficult to go from coconuts to axes in one step."),
                        t("Let's try building some maths.  Maths is a very good example because all the hard bits are made of easy bits stacked together."),
                        t("We will need some little building blocks:"),
                        ci(13),
                        t("2 + 2 = 4"),
                        t("2 - 1 = 1"),
                        t("0 = 0"),
                        t("We can use these to build multiplication, also called 'times'.  Multiplication is spelt 'X', or '*' on a computer.  It means 'groups of'.  Three multiplied by four is like three groups of four.  Or two times five is how many fingers you probably have, counting thumbs."),
                        t("Even though your computer already knows how to do multiplication, we can build multiplication out of pieces that don't.  That's how they built it into your computer in the first place.")
                    ]
                ],comments:[]},
                {id:4,label:"Multiplication",
                 content:[
                     [
                         ci(14),
                         t("Or in another, more sophisticated, language:"),
                         ci(15),
                         t("They're quite diffferent ways of thinking."),
                         t("But only the top one is JavaScript.  The bottom one is better at talking about numbers, but we don't only want to talk about numbers.")
                     ]
                 ],
                 comments:[
                     [
                         gp("What language is that other one?"),
                         p("I'd say it's Erlang, except I'm not sure about variable arity on a function."),
                         gp("..."),
                         p("Uh...  About Chapter 8?  I think?")
                     ]
                 ]},
                {id:5,label:"More functions",content:[
                    [
                        t("Another, very important thing about JavaScript functions is that they are closures."),
                        t("To explain what that means, let's revisit scope.  Did you ever address a letter like this?"),
                        ci(16),
                        t("All those lines under 'my dad' are scopes.  Without them, it could mean any of the billions of people on Earth who answer to 'dad'.  (Especially those who aren't too picky about capitalisation"),
                        t("Let's see what this means to a function:"),
                        ci(17),
                        t("When the person you call 'dad' gets your letter, they will be able to see all the things in 'Victoria', and all the things in 'Australia'.  They will call Australian Rules Football 'football', and will call 'football' soccer.  They will sit in the front seat of a taxi, and will tell you that only trucks have cabs.  These are all the meanings that these words have in Australia.  They will, with a high degree of probability, know the difference between a knife and a spoon.  At the very least they will be able to pretend long enough for a game of 'knifey-spooney'."),
                        t("When the function you call 'doubler' gets your letter, it will be able to see all the things around it, in the same way.  All the meanings that are special to that part of your program will be the meanings that it uses.")
                    ]
                ],comments:[
                    [
                        gp("Why are they called 'closures'?"),
                        p("Because they 'close over' scope."),
                        gp("What does that mean?"),
                        p("It means that when they're made, they take a picture of what's around them.  They take a picture of the scope."),
                        gp("They should be called 'cameras'."),
                        p("You know?  They sort of should.  Want to call them cameras?"),
                        l("It's like a code!"),
                        p("Exactly.")
                    ]
                ]},
                {id:6,label:"Scope",content:[
                    [
                        t("Let's look at another way to do doubling, remembering that the machine will be able to see all the things around it."),
                        ci(18),
                        t("See the var 'multiplier'?  It has a value of 2.  That means that any time anyone looks at it, they'll see 2.  This is important to our new way of doing doubling, which wants to give back a function which looks at the multiplier var."),
                        t("This gives us an enormous range of powers, just from these three simple things:"),
                        t("1: Functions take things and give things back."),
                        t("2: Functions can take or give back other functions."),
                        t("3: Functions can see what's around them.")
                    ]
                ],comments:[
                    [
                        gp("What sort of powers?"),
                        p("Well, it lets us do a lot without saying anything.  Like, if I said 'go buy your mum that perfume she likes', you'd know what it was without me telling you, right?"),
                        gp("Yes, because she's my mum.  She doesn't like perfume."),
                        p("Uh...  Right.  Alright, so something she likes."),
                        gp("Okay.  So you tell me to go buy a book she'll like?"),
                        p("Sure.  That will work.  So imagine I make a card which says 'Go buy your mum a book she likes.  What are you going to buy?"),
                        gp("Ice cream."),
                        p("Imagine you HAVE to do what's written on the card."),
                        gp("Can I have a pen?"),
                        p("You can't have a pen and write 'buy ice cream' on the card."),
                        gp("You sure have a lot of rules for someone who won't even buy their own wife a birthday present."),
                        p("Do you want some icecream?"),
                        gp("Later.  Okay, so I'm buying a book."),
                        p("Because the card told you to."),
                        gp("Because the card told me to.  Now what?"),
                        p("Now you give the card to someone else."),
                        gp("Right.  And they buy their mum a book."),
                        p("Yes.  So why do they buy THEIR mum and not YOUR mum a book?"),
                        gp("Because the card said 'buy your mum a book' and my mum isn't their mum."),
                        p("So the function had a different impact because it was in a different context, and the word 'mum' had a different value to them."),
                        gp("What if they had two mums?"),
                        p("Then they might find the card too vague to follow because it didn't say which mum.  That's why programming is so hard.  Because there are so many different ways to interpret meanings.")
                    ]
                ]},
                {
                    id:7,label:"Anatomy of a function",content:[
			[
			    t("That went past awfully quickly, didn't it?  Let's go through it again a bit more slowly."),
			    t("You know how there's a skeleton inside a person?  And you can label all the pieces?  We can use this to help us understand how people are put together.  A doctor has thousands more names for the very little pieces of detail, but these are the pieces we need so our drawings don't look too silly."),
			    ci(19),
			    t("Let's look at the same pieces of a function.  We've talked about how things go in and come out, now let's look at the words that we use to build that."),
			    ci(20),
			    t("(1) the word 'function' tells us that we're about to describe a machine."),
			    t("(2) the ( and ) are the hole that you put things into.  You give them a name.  So here, I've called them 'things coming in'."),
			    t("(3) the { starts a scope.  So I'm describing a place where names are going to make sense.  It's like if I said 'I'm talking about my family now', you would know that if I said 'Dad' I was talking about someone who I called Dad inside my family."),
			    t("(4) these things are inside the scope.  You can see some actions, which are able to use the things that were put into the function, and the things that are around the function."),
			    t("(5) the word 'return' means this is the hole that things come out of.  So the thing that comes after 'return' is being pushed out of the hole.  Here, I've pushed out the thing called 'things going out'."),
			    t("6) the } ends the scope.  So it's like saying 'I'm not talking about my family anymore'.  Now if you hear me say 'Dad', you have to ask me, 'Whose Dad?'")
			]
                    ]
                }
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
        /*
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
         */
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

var faq = [
    {
        q:"Who is this for?",
        a:"Parents who would like to find out about programming with their children."
    },
    {
        q:"Why did you stop writing everything by hand?",
        a:"We were having a lot of trouble editing it, and when people said they couldn't understand something we wanted to be able to try to explain it again.  Also, people told us it was hard to read on a phone"
    },
    {
        q:"Is Girl Purple a real person?  Is she as smart as she sounds?",
        a:"Yes and yes.  They're all real people.  But because it's the internet we didn't think it was a great idea to use their real names.  But they really do ask these questions."
    },
    {
        q:"What is this built in?",
        a:"Node.js, running on an Amazon stack.  It's a very simple setup with a flat file database.  It didn't need anything more complex than that.  Oh, also a brown pen."
    },
    {
        q:"Where did the other chapters go?",
        a:"They were just there as an early preview.  Once we got the first round of feedback we took them down so we could concentrate on the first few chapters."
    },
    {
        q:"My link to the Monads chapter doesn't work any more!",
        a:"Sorry, Alan."
    }
];
exports.faq = faq;
exports.demos = demos;
exports.stories = stories;
