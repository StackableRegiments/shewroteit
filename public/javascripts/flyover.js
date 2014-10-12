$(function(){
    var scale = 0.8;
    var tickRate = 30;
    var scene = $("#scene")
    var parent = $("#parent");
    var w = parent.width();
    var h = parent.height();
    console.log(w,h);
    var f = function(n){
        return n * scale;
    }
    scene.attr("height",h)
        .attr("width",w);
    var context = scene[0].getContext("2d");
    var collection = $("#collection");
    var defineShip = function(src,width,height){
        var sprite = {
            image:new Image(),
            maxRotation:Math.PI / 20,
            targetVector:0,
            vector:0,
            speed:f(10),
            width:f(width),
            height:f(height),
            firing:true,
            tech:[],
            drawable:false
        };
        sprite.image.onload = function(){
            sprite.drawable = true;
        };
        sprite.image.src = src;
        sprite.x = (w - sprite.width) / 2;
        sprite.y = (h - sprite.height) / 2;
        sprite.targetX = sprite.x;
        sprite.targetY = sprite.y;
        return sprite;
    }
    var mouse = defineShip("/images/mouse.png", f(50), f(50));
    var assets = {}
    var words = [];
    var letters = [];
    var addTech = function(name,parts,img,
                           width,height,
                           tick,activate){
        tick = tick || function(){};
        activate = activate || function(){};
        var t = {
            name:name,
            parts:{},
            img:new Image(),
            tick:tick,
            activate:activate,
            width:width,
            height:height
        };
        t.img.src = img;
        _.each(parts,function(p){
            t.parts[p] = 0;
        });
        return t;
    }

    var postDraw = [];
    var techTree = [
        (function(){
            var drone = defineShip("/images/mouse.png", f(25), f(25));
            drone.speed = f(30);
            drone.installed = false;
            return addTech("Fighter jet",["Wings","Jets"],"/images/fighterJet.png",
                           mouse.width,
                           mouse.height,
                           (function(){
                               return function(){
                                   drone.x += _.random(drone.speed / -2, drone.speed / 2);
                                   drone.y += _.random(drone.speed / -2, drone.speed / 2);
                                   drone.x = Math.max(drone.x,0);
                                   drone.y = Math.max(drone.y,0);
                                   drone.x = Math.min(drone.x,w);
                                   drone.y = Math.min(drone.y,h);
                                   return !drone.installed;
                               }
                           })(),
                           function(){
                               postDraw.push(function(){
                                   if(drone.drawable){
                                       context.drawImage(drone.image,
                                                         drone.x,drone.y,
                                                         drone.width,drone.height);
                                   }
                               });
                               drone.installed = true;
                           })
        })(),
        //addTech("Space gun",["Space","Gun"]),
        //addTech("Mining laser",["Energy source","Crystal"]),
        addTech("Black hole generator",["Time"],"/images/blackHole.png",
                mouse.width * 2,
                mouse.height * 2,
                (function(g){
                    var itick = 0;
                    return function(){
                        return (++itick % 300) == 0;
                    }
                })(),
                function(mount){
                    var br = f(1);
                    var mx = mount.x;
                    var my = mount.y;
                    var ticks = 1;
                    var genB = function(){
                        var b = {
                            x:mx,
                            y:my,
                            radius:br,
                            width:br,
                            height:br,
                            color:"white",
                            active:true,
                            speed:0,
                            tick:function(){
                                if(ticks-- == 0){
                                    b.active = false;
                                    br += 1;
                                    if(br > 200){
                                        br = 0;
                                        mx = mount.x;
                                        my = mount.y;
                                    }
                                    else{
                                        bullets.push(genB());
                                    }
                                    ticks = 1;
                                }
                            }
                        }
                        return b;
                    };
                    var b = genB();
                    bullets.push(b);
                    return b;
                }),
        addTech("Monkey bot",["Boxing gloves","Propellor cap","Monkey head"],"/images/monkeyBot.png",
                mouse.width,
                mouse.height * 2,
                (function(g){
                    var itick = 0;
                    return function(){
                        return (++itick % 50) == 0;
                    }
                })(),
                function(mount){
                    var br = bullet.radius * 40;
                    var ticks = 10;
                    var b = {
                        x:mount.x + mount.width / 2,
                        y:mount.y,
                        radius:br,
                        width:br,
                        height:br,
                        color:"red",
                        active:true,
                        speed:0,
                        tick:function(){
                            if(ticks-- == 0){
                                b.active = false;
                            }
                        }
                    };
                    b.fast = b.speed;
                    b.slow = b.speed;
                    bullets.push(b);
                }),
        addTech("Gun",["Gunpowder","Bullets","Parts that are in a gun"],"/images/bubblePipe.png",
                mouse.width * 2,
                mouse.height,
                (function(g){
                    var itick = 0;
                    return function(){
                        return (++itick % 100) == 0;
                    };
                })(), function(mount){
                    var br = bullet.radius * 5;
                    var b = {
                        x:mount.x + f(80),
                        y:mount.y + f(20),
                        radius:br,
                        width:br,
                        height:br,
                        color:"blue",
                        active:true,
                        speed:3,
                        tick:function(){
                            b.y -= b.speed;
                            b.x += Math.random() * b.speed - b.speed /2;
                        }
                    };
                    b.fast = b.speed;
                    b.slow = b.fast / slowdown;
                    bullets.push(b);
                })
    ];
    var bullets = [];
    var robots = [];
    var word = {
        speed:f(0.5)
    };
    var letter = {
        speed:f(10)
    };
    var bullet = {
        speed:f(20),
        fast:f(20),
        slow:f(5),
        radius:f(2),
        color:"red"
    };
    var slowdown = 20;
    bullet.slow = bullet.fast / slowdown;
    var robot = {
        width:f(50),
        height:f(50),
        image:new Image(),
        loaded:false,
        speed:f(10),
        bullets:[],
        fast:f(12)
    };
    robot.slow = robot.fast / slowdown;
    context.lineWidth = f(1)
    context.font = Math.round(f(24))+"px Arial";
    var twoPi = 2 * Math.PI;
    var drawBullet = function(b){
        context.save();
        context.translate(b.x,b.y);
        context.rotate(b.vector);
        context.strokeStyle = b.color || bullet.color;
        context.beginPath();
        context.arc(0,0,b.radius,twoPi, false);
        context.stroke();
        context.restore();
    }
    var drawRobot = function(b){
        if(robot.loaded){
            context.drawImage(robot.image,
                              b.x,b.y,
                              robot.width,robot.height);
            _.each(b.bullets, drawBullet);
        }
    };
    var drawWord = function(w){
        context.fillText(w.text,w.x,w.y);
    };
    var drawLetter = function(l){
        context.fillText(l.text,l.x,l.y);
    };
    var draw = function(){
        tick();
        context.fillStyle = "black";
        context.fillRect(0,0,w,h);
        context.fillStyle = "white";
        if(mouse.drawable){
            var x = mouse.x;
            var y = mouse.y;
            var ox = -mouse.width / 2;
            var oy = -mouse.height / 2;
            context.save();
            context.translate(x,y);
            context.rotate(mouse.vector);
            _.each(mouse.tech, function(t){
                context.drawImage(t.img,
                                  ox,oy,
                                  t.width,t.height);
            });
            context.drawImage(mouse.image,
                              ox,oy,
                              mouse.width,mouse.height
                             );
            context.restore();
        }
        _.each(bullets, drawBullet);
        _.each(robots,drawRobot);
        _.each(words, drawWord);
        _.each(letters,drawLetter);
        _.each(postDraw,function(d){
            d();
        });
        requestAnimationFrame(draw);
    };
    var ticks = 0;
    var intersects = function(rect1,rect2){
        return (rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y);
    };
    var tickPlayerBullet = function(b){
        b.tick();
        if(b.y < 0){
            b.active = false;
        }
        _.each(robots,function(r){
            if(r.active && intersects(r,b)){
                r.active = false;
                words.push(
                    {
                        text:r.part,
                        originalText:r.part,
                        x:r.x,
                        y:r.y,
                        active:true,
                        tech:r.tech
                    }
                );
            }
        });
    };
    var tickLetter = function(l){
        l.y -= letter.speed;
        if(l.y < 0){
            l.active = false;
        }
    };
    var tickWord = function(aWord){
        aWord.x += word.speed;
        if(aWord.x > w){
            aWord.active = false;
        }
    };
    var tickRobot = function(r){
        r.y += robot.speed;
        if(r.y > h){
            r.active = false;
        }
        _.each(r.bullets,function(b){
            if(intersects(mouse,b)){
                console.log("Ow");
                //Yeah, we should probably do something about the player losing or something
            }
        });
    }
    var active = function(x){
        return x.active;
    }
    var fireRobot = function(r){
        if(r.lifespan++ % r.fireInterval == 0){
            r.bullets.push(
                {
                    x:r.x + f(20),
                    y:r.y + f(20),
                    radius:bullet.radius,
                    width:bullet.radius,
                    height:bullet.radius,
                    color:"red",
                    active:true
                }
            );
        }
        _.each(r.bullets,function(b){
            b.y += bullet.speed;
        });
    };
    var addRobot = function(){
        var tech = techTree[_.random(0,techTree.length - 1)];
        var pkeys = _.keys(tech.parts);
        var part = pkeys[_.random(0,pkeys.length - 1)];
        robots.push({
            x:Math.floor(Math.random() * w),
            y:0,
            width:robot.width,
            height:robot.height,
            active:true,
            lifespan:0,
            bullets:[],
            fireInterval:tickRate,
            tech:tech,
            part:part
        });
    }
    var turnShip = function(){
        var delta = Math.min(mouse.maxRotation, Math.abs(mouse.targetVector - mouse.vector));
        if(mouse.targetVector < mouse.vector){
            mouse.vector -= delta;
        }
        else {
            mouse.vector += delta;
        }
    }
    var advanceShip = function(){
        if(Math.abs(mouse.targetVector - mouse.vector) < Math.PI / 8){
            var threshold = mouse.width;
            var dy = mouse.targetY - mouse.y;
            var dx = mouse.targetX - mouse.x;
            if(Math.abs(dy) < threshold && Math.abs(dx) < threshold){
                mouse.x = mouse.targetX;
                mouse.y = mouse.targetY;
                mouse.targetVector = 0;
            }
            else{
                var g = Math.atan2(dy,dx);
                mouse.x += Math.cos(g) * mouse.speed;
                mouse.y += Math.sin(g) * mouse.speed;
            }
        }
    }
    var tick = function(){
        turnShip();
        advanceShip();
        _.each(bullets,tickPlayerBullet);
        _.each(letters,tickLetter);
        _.each(words,tickWord);
        _.each(robots,tickRobot);
        if(mouse.firing){
            var wing = mouse.width / 4;
            var ox = mouse.width / 2;
            var oy = mouse.height / 2;
            var b1 = {
                x:mouse.x + wing - ox,
                y:mouse.y - oy,
                radius:bullet.radius,
                width:bullet.radius,
                vector:mouse.vector - Math.PI / 2,
                height:bullet.radius,
                active:true,
                speed:bullet.speed,
                tick:function(){
                    b1.x += Math.cos(b1.vector) * b1.speed;
                    b1.y += Math.sin(b1.vector) * b1.speed;
                }
            };
            b1.fast = b1.speed;
            b1.slow = b1.fast / slowdown;
            bullets.push(b1);
            var b2 = {
                x:mouse.x + ox - wing,
                y:mouse.y - oy,
                radius:bullet.radius,
                width:bullet.radius,
                vector:mouse.vector - Math.PI / 2,
                height:bullet.radius,
                active:true,
                speed:bullet.speed,
                tick:function(){
                    b2.x += Math.cos(b2.vector) * b2.speed;
                    b2.y += Math.sin(b2.vector) * b2.speed;

                }
            };
            b2.fast = b2.speed;
            b2.slow = b2.fast / slowdown;
            bullets.push(b2);
        }
        _.each(mouse.tech,function(g){
            if(g.tick()){
                g.activate(mouse);
            }
        });
        bullets = _.filter(bullets,active);
        robots = _.filter(robots,active);
        words = _.filter(words,active);
        letters = _.filter(letters,active);
        _.each(robots,fireRobot);
        if(ticks++ % tickRate == 0){
            addRobot();
            ticks = 1;
        }
    };
    var drawAsset = function(tech){
        var t = $("<table />").appendTo(collection);
        $("<tr />")
            .appendTo(t)
            .append($("<th />",{
                text:tech.name
            }));
        _.each(tech.parts,function(k,v){
            $("<tr />")
                .appendTo(t)
                .append($("<th />",{
                    text:k
                }))
                .append($("<td />",{
                    text:v
                }));
        });
    };
    var install = function(tech){
        mouse.tech.push(tech);
        console.log("Installing",tech);
        delete assets[tech.name];
        drawAssets();
    }
    var drawAssets = function(){
        collection.empty();
        _.each(assets,drawAsset);
    };
    scene.on("click",function(e){
        var tx = e.offsetX;
        var ty = e.offsetY;
        var dx = tx - mouse.x;
        var dy = ty - mouse.y;
        mouse.targetVector = Math.atan2(dy,dx) + Math.PI / 2;
        console.log(mouse.targetVector);
        mouse.targetX = tx;
        mouse.targetY = ty;
    });
    $("#keyboard").on("keyup",function(e){
        var k = e.which;
        var s = String.fromCharCode(k).toLowerCase()[0];
        _.each(words,function(aWord){
            if(aWord.active){
                if(aWord.text[0].toLowerCase() == s){
                    letters.push({
                        text:aWord.text[0],
                        x:aWord.x,
                        y:aWord.y,
                        active:true
                    });
                    aWord.text = aWord.text.substring(1);
                }
                if(aWord.text.length == 0){
                    var tech = aWord.tech.name;
                    var part = aWord.originalText;
                    if(!(tech in assets)){
                        assets[tech] = _.clone(aWord.tech);
                    }
                    assets[tech].parts[part]++;
                    if(_.all(_.values(assets[tech].parts), function(v){
                        return v > 0;
                    })){
                        install(aWord.tech);
                    }
                    drawAssets();
                    aWord.active = false;
                }
            }
        });
    });
    robot.image.onload = function(){
        robot.loaded = true;
    };
    robot.image.src = "/images/robot.png";
    draw();
});
