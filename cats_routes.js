var _ = require('lodash');
var Cat = require('./cat_model.js');

module.exports = function(app)
{
    _cats = [];

    /* Create */
    app.post('/cats', function(req, res){
        var newCat = new Cat(req.body);
        newCat.save(function(err){
            if(err){
                res.json({info:'error during cat create', error: err});
            }
        });
        res.json({info:'Cat created successfully'});
    });

    /* Read */
    app.get('/cats', function(req, res)
    {
        Cat.find(function(err, cats){
            if(err){
                res.json({info:'error during find cats',error, err});
            };
            res.json({info: 'cats found successfully',data: cats});
        });
    });

    app.get('/cats/:id', function(req, res)
    {
        Cat.findById(req.params.id, function(err, cat){
            if(err){
                res.json({info: 'error during find cat', error: err});
            };
            if(cat){
                res.json({info: 'cat found successfully',data: cat});    
            }else
            {
                res.json({info: 'cat not found'});    
            }
        });
    });

    /* Update */
    app.put('/cats/:id',function(req, res){
        Cat.findById(req.params.id, function(err, cat){
            if(err){
                res.json({info: 'error during find cat', error: err});
            };

            if(cat){
                _.merge(cat, req.body);
                cat.save(function(err){
                    if(err){
                        res.json({info: 'error during cat update', error: err});
                    };
                    res.json({info: 'cat updated successfully'});    
                });
            }else
            {
                res.json({info: 'cat not found'});
            }
        });
    });

    /* Delete */
    app.delete('/cats/:id',function(req, res){
        Cat.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.json({info: 'error during cat remove', error: err});
            };
            res.json({info:'Cat deleted successfully'});
        });        
    });

};