const Post = require('../models/post')

module.exports.home = function(req, res){

    // Post.find({}).then((posts) => {
    //     return res.render('home', {
    //         title: "Codial | Home",
    //         posts: posts
    //     });
    // }).catch((err) => {
    //     console.error(err);
    //     // handle error here, for example render an error page
    // });

//Populate User
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    .exec().then((posts) => {
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    }).catch((err) => {
        console.error(err);
        // handle error here, for example render an error page
    });
    
    
   
}