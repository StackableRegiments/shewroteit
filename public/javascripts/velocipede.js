$(function(){
    var parent = $("#parent");
    var scale = 1.0;
    var f = function(n){
        return n * scale;
    };
    var g = function(n){
        return n / scale;
    }
    var w = parent.width();
    var h = parent.height();
    var scene = $("#scene")
            .attr("width",w)
            .attr("height",h)[0].getContext('2d');
    var rider = {
        width:f(50),
        height:f(80),
        speed:f(5),
        image:new Image()
    };
    var groundLevel = (h - rider.height);
    rider.left = (w - rider.width) / 2;
    rider.right = rider.left + rider.width;
    rider.y = groundLevel - rider.height;
    rider.image.onload = function(){
        rider.loaded = true;
    };
    rider.image.src = "/images/demos/1/0.png";
    var graph = {
        bumps:[]
    };
    var defer = 0;
    var tick = function(){
        if(--defer <= 0 &&_.random(100) < 2){
            var b = {
                height:_.random(10,50),
                width:_.random(200,500),
                left:w,
                active:true
            };
	    b.right = b.left + b.width;
            defer = b.width;
            graph.bumps.push(b);
        }
        rider.y = groundLevel - rider.height;
	rider.gradient = 0;
        _.forEach(graph.bumps,function(b){
            b.left -= rider.speed;
            b.right -= rider.speed;
            if(b.right < 0){
                b.active = false;
            }
            if(rider.right > b.left && rider.left - rider.width < b.right){
                var gradient = Math.atan2(b.height,b.width);
                var distance = rider.left - b.left;
                rider.y -= Math.sin(gradient) * distance;
                rider.gradient = gradient;
            }
        });
        graph.bumps = _.filter(graph.bumps,"active");
    };
    var draw = function(){
        tick();
        scene.clearRect(0,0,w,h);
        scene.strokeStyle = "black";
        scene.beginPath();
        scene.moveTo(0,groundLevel);
        _.forEach(graph.bumps,function(b){
            scene.lineTo(b.left,groundLevel);
            scene.lineTo(b.right, groundLevel - b.height);
            scene.lineTo(b.right, groundLevel);
        });
        scene.lineTo(w,groundLevel);
        scene.stroke();
        if(rider.loaded){
            scene.save();
            scene.translate(rider.left,rider.y + rider.height);
            scene.rotate(-rider.gradient);
            scene.drawImage(
                rider.image,
                rider.width / -2,-rider.height,
                rider.width,rider.height
            );
	    scene.restore();
        }
        requestAnimationFrame(draw);
    };
    draw();
});
