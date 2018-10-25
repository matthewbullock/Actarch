var commentModel = require('../../models')
var Comment = commentModel.Comment


module.exports = function(app) {

  app.get('/api/comments/:id', function(req, res) {
      //get ALL data from mongodb and pass it to view
      let requestId = req.params.id
      Comment.find({category_id: requestId}, function(err, docs) {
          if (!err){
              res.send(docs)
          } else {throw err;}
      });

  });

  app.post('/api/comments/:id', function(req, res) {
    //get data from view and add it to mongodb
    var newComment = Comment(req.body).save((err, data) => {
        if(err) throw err;
        res.json(data)
    })
  });

  // require('./nested')(app);
  // this is for things like http://example.com/blog/nested
  // you would follow the same logic as in 'routes/index.js' at a nested level
}
