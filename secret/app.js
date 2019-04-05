//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Swal = require('sweetalert2')
//const encrypt = require("mongoose-encryption");
//const md5 = require("md5");
const app = express(); 
const bcrypt = require("bcrypt"); 
const saltRounds = 10;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate"); 

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true, 
}));
//setup session; initial configuration 
//We set up sessions 
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
}));
//we initialize passport
app.use(passport.initialize()); 
//we use passport to manage our session 
app.use( passport.session());

//using mongoose with connected local 27017 port.
//useNewUrlParser:true option should be donoted for prevend deprecated.. 
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

//build mongoose schema 
const userSchema = new mongoose.Schema({
    email: String,
    password: String, 
    googleId: String,
    secret: String, 
});


//이제 passport를 User모델에 사용할 수 있다. 
//we set up schema to use passportLocalMongoose as a plugin 
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


//little string 
//userSchema encrypted 
//userSchema.plugin(encrypt,{secret:process.env.SECRET, encryptedFields:["password",] });

//build collection name 'User' to use in userDB, 
const User = new mongoose.model("User",userSchema);

// finally we use passport localMongoose to use local login Strategy 
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

//we set up serializeUser and deserializeUser
//passport for session use 
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



/*
    Notice!
    we should set the session before use serialize session and deserialize sesson 
    Also, we have to initialize our passport before use strategies.
*/



//google Oauth 2.0 

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  },
  //google sends back accessToken allow us to use data related to user. 
  //allow us to use user's data longer period 
  //profile gets email, id etc. 
  function(accessToken, refreshToken, profile, cb) {
    console.log("show profile: ");
    console.log(profile);
    User.findOrCreate({ googleId:profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
//route for home page 
app.get("/", function(req,res){
    res.render("home");
});
app.get("/auth/google",
  passport.authenticate("google", { scope:["profile"] })
);
////route for google authentication register
////when accessed, redirect to "auth/google/secrets"
//app.get("/auth/google",
//    //bring up , pop up 
//    passport.authenticate("google", { scope: ["profile"] })
//);
//after click google authentication register. 
app.get("/auth/google/secrets", 
  //authenticate them locally
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    //once we authenticated, 
//    if(req.isAuthenticated()){
        res.redirect("/secrets");
//    } else {
//        res.redirect("/login");
//    }
//    // Successful authentication, redirect home.
//    res.redirect('/secrets');
  });

//route for login page  
app.get("/login", function(req,res){
   res.render("login"); 
});

//route for logout page 
app.get("/logout", function(req, res){
  console.log(req.user);
  req.logout();
  res.redirect("/");
});
   
//route for register page
app.get("/register", function(req,res){
   res.render("register"); 
});
//secret routes 
app.get("/secrets", function(req,res){
    //if user already logged in, we should send secrets page directly to user,
    //but if user not logged, in we should redirect to login page. 
    //    if(req.isAuthenticated()){
        User.find({"secret": {$ne: null}}, function(err,foundUsers){
            if(err){
                console.log(err);
            }else{
                if(foundUsers){
                    res.render("secrets", {usersWithSecrets: foundUsers});
                }
            }
        });
//    }else {
//        res.redirect("/login");
//    }
});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect('/');
});


app.get("/submit", function(req, res){
  if (req.isAuthenticated()){
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

// < ------ post section ------ > // 
// < ------ post section ------ > // 
// < ------ post section ------ > // 
// < ------ post section ------ > // 

//register using bcrypt
app.post("/register_using_bcrypt",function(req,res){
    
    //get the value from register.ejs' fields
    const username = req.body.username;
    const password = req.body.password;
    //check redundancy in database with user email.
    User.findOne({email:username},function(err,foundItem){
       if(!err){
           //if someone already registered one's email.
           if(foundItem){ 
                console.log("email can't be duplicated"); 
                Swal.fire('Oops...', 'User email duplicate! try other one!', 'error');
                res.redirect("/register");
           } else{
               //hash password 
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                //build new data in collection named 'Users'. 
                const newUser = new User({
                    email: req.body.username,
                    password: hash, 
                }); 

                // save data.
                newUser.save(function(err){
                    if(!err){
                        res.render("secrets");
                    }else{
                        console.log(err);
                    }
                }); 
            });                
        }
       } 
    });
});




//register using google authentication
app.post("/register", function(req,res){
   User.register({username: req.body.username}, req.body.password, function(err,user){
       if(err){
           console.log(err);
           res.redirect('/register');
       } else{
           passport.authenticate("local")(req,res,function(){
               /* 
                    (req,res,function) callback function called only
                    when authenticate well performed
               */
               res.redirect('/secrets');
           });
       }
   });
});
//login
app.post("/login", function(req,res){
    
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    //method comes from passport 
    req.login(user,function(err){
              if(err){
                console.log(err);
            }else{
                passport.authenticate("local")(req,res,function(){
                    res.redirect("/secrets");
                });
            }
    });
    /*
    const username = req.body.username;
    const password = req.body.password;
    
    User.findOne({email:username},function(err,foundUser){
        if(err){
            console.log(err);
        } else{
            //if user exists
            if(foundUser){
                //bcrypt key 
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if(result ===true){
                        res.render("secrets");
                    } else {
                    Swal.fire('Oops...', 'wrong password!', 'error')
                    res.redirect("/login");
                    }
                });
            }
        }
    }); */
});
//submit 
app.post("/submit",function(req,res){
   const sumittedSecret = req.body.secret; 
   //when user press submit, req sent and it contains info in req.user
   console.log(req.user.id);
   User.findById(req.user.id, function(err, foundUser){
      if(err){
          console.log(err);
      } else{
          if(foundUser){
              foundUser.secret=sumittedSecret;
              foundUser.save(function(){
                  res.redirect("/secrets");
              });
          }
      }
   });
});


//app.listen to  start server with specific port number - 3000.
app.listen(3000,function(){
    console.log("server is running on port 3000");
});