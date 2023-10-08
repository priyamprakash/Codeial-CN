const Post = require('../models/post')

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    // use then() to handle the resolved promise
    .then(function(post){
        // if no error, return the response
        return res.redirect('back');
    })
    // use catch() to handle the rejected promise
    .catch(function(err){
        // if there is an error, handle it
        console.log('error in creating a post');
        return res.status(500).send({message: 'Something went wrong'});
    });
}
