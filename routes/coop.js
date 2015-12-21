/* GET coop listing. */
(function(){
    var express = require('express');
    var passport = require('passport');

    var FacebookStrategy = require('passport-facebook').Strategy;
    var router = express.Router();
    var db = require('dynamodb').ddb({
        accessKeyId: 'AKIAIGBRIAY67O5LWZOA',
        secretAccessKey: '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',
        endpoint:'dynamodb.ap-southeast-2.amazonaws.com'
    });
    passport.serializeUser(function(user,done){
        done(null,user);
    });
    passport.deserializeUser(function(obj,done){
        done(null,obj);
    });
    var APP_ID = '1424629411174412';
    var APP_SECRET = '915b8001e75ac04ecf44cec83319816b';
    passport.use(new FacebookStrategy(
        {
            clientID:APP_ID,
            clientSecret:APP_SECRET,
            callbackURL:"http://localhost:3000/coop/auth/facebook/callback"
        },
        function(accessToken,refreshToken,profile,done){
            process.nextTick(function(){
                return done(null,profile);
            });
        }));
    router.get('/auth/facebook',
               passport.authenticate('facebook'),
               function(req,res){});
    router.get('/auth/facebook/callback',
               passport.authenticate('facebook',{failureRedirect:'authenticationFailed'}),
               function(req,res){
                   console.log("Callback",req,res);
                   res.redirect('/');
               });
    var decorate = function(req,res,opts){
        opts = opts || {};
        opts.messages = req.flash('coop');
        opts.layout = 'coop';
        return opts;
    };
    router.get('/', function(req, res) {
        res.render('coop/rolesOverview',decorate(req,res));
    });
    router.get('/nomination/add',function(req,res){
        db.scan('references',{},function(err,scan){
            console.log(err,scan);
        });
        req.flash('coop',{content:'Added'});
        res.redirect('/coop');
    });
    router.get('/nomination/accept',function(req,res){
        req.flash('coop',{content:'Nomination accepted'});
        res.render('coop/rolesOverview',decorate(req,res));
    });
    router.get('/nomination/reject',function(req,res){
        req.flash('coop',{content:'Nomination accepted'});
        res.render('coop/rolesOverview',decorate(req,res));
    });
    router.get('/donor', function(req, res) {
        res.render('coop/donorHome',decorate(req,res));
    });
    router.get('/depot', function(req, res) {
        res.render('coop/depotHome',decorate(req,res));
    });
    router.get('/driver', function(req, res) {
        res.render('coop/driverHome',decorate(req,res));
    });
    router.get('/admin', function(req, res) {
        res.render('coop/adminHome',decorate(req,res));
    });
    module.exports = router;
})();
