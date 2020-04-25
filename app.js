//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Global variable for posts
let contentPosts = [];




//Run home.ejs
app.get('/', function (req, res) {
  res.render('home', {
    startingContent: homeStartingContent,
    posts: contentPosts
  })
  // console.log(posts)
});

//Run about.ejs
app.get('/about', function (req, res) {
  res.render('about', { aboutContent: aboutContent })
});

//Run contact.ejs
app.get('/contact', function (req, res) {
  res.render('contact', { contactContent: contactContent })
});

//Run compose.ejs
app.get('/compose', function (req, res) {
  res.render('compose')
});

/*
 1. const post has JSON with parsed title and content.
 2. this will be stored in the posts variable ( array )
 3. when posted, it will be pushed to posts array as JSON
 4. then it redirects to home.
 5. it will then render from res.render posts:contentPosts
 */
app.post('/compose', function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  contentPosts.push(post)
  res.redirect('/')
})

//Challenge 16 route parameter

/*
 1. /posts/:topic is topic will show the reqeusted parameter the user searched
 2. _.lowerCase is lodash functin which will convert hyphen to a space. This is userful
    for title with sopaces
 3. forEach loop will go through the store post arrays 
 4. const storedTitle will store the reiterated post title via for loop
 5. if statement will then check teh stored and requested title match
 6. If matched, it renders post.ejs with post.title and post.content that links to the ejs templates
 */

app.get('/posts/:topic', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.topic);

  contentPosts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render('post', {
        title: post.title,
        content: post.content

      })
      //   console.log("Match Found")
      // }else {
      //   console.log('Not a Match')
      // }
    }
    // console.log(req.params.topic)
  });
});









app.listen(3000, function () {
  console.log("Server started on port 3000");
});


// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, nesciunt ipsam ad illum a itaque natus et! Accusamus quas quaerat, quo vero laboriosam similique, obcaecati perferendis totam eveniet distinctio animi.