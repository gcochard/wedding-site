/*jslint node:true*/
var config = require('../modules/config')
  , app = config.app
  , mongoose = config.mongoose
  , models = require('../models')
  , Registry = models.Registry
  , path = require('path')
  , fs = require('fs');

app.get('/manager',function(req,res){
    if(req.query.create){
        var newReg = new Registry();
        newReg.name = 'test';
        newReg.desc = 'test desc';
        newReg.img = {src: '',title: 'test title!'};
        newReg.price = 100;
        newReg.save(function(err,saved){
            res.json({err:err,saved:saved});
        });
    }
    else{
        Registry.find(function(err,registryEntries){
            res.render('manager',{
                name:'stephanieandgreg.us - Manager',
                items: registryEntries,
                error: err,
                errordiv: err?'':'hidden',
                thanksdiv: 'hidden'
            });
        });
    }
});

app.post('/manager',function(req,res){
    var newReg = new Registry();
    newReg.name = 'test';
    newReg.desc = 'test desc';
    newReg.img = {src: '',title: 'test title!'};
    newReg.price = 100;
    newReg.save(function(err,saved){
        res.json({err:err,saved:saved});
    });
});

app.post('/manager/upload',function(req,res){
    console.log(req.files);
    console.log(req.query);
    console.log(req.body);
    var img = req.body.fileUpload
      , files = req.files
      , serverPath = config.UPLOAD_DIR + files.fileUpload.name
      , publicPath = config.PUBLIC_UPLOAD_DIR + files.fileUpload.name
      , docId = req.body.id;
    if(docId){
        Registry.findOne({_id:docId},function(err,regEntry){
            console.log(regEntry);
            if(err){ return res.json({err:err,message:"couldn't find document!"}); }
            fs.rename(files.fileUpload.path, serverPath, function(err){
                if(err){
                    return res.json({err:err,message:"couldn't rename file!"});
                }
                regEntry.img.src = publicPath;
                regEntry.img.location = serverPath;
                regEntry.save(function(err,saved){
                    console.log(saved);
                    if(err){
                        fs.unlink(serverPath,function(err){
                            if(err){
                                res.json({err:err,message:"couldn't save doc OR delete uploaded img"});
                            }
                            res.json({err:err,message:"couldn't save document!"});
                        });
                        return;
                    }
                    res.json({imgPath:publicPath,registry:saved});
                });
            });
        });
    }else{
		fs.rename(files.fileUpload.path, serverPath, function(err){
            if(err){
                return res.json({err:err,message:"couldn't rename file!"});
            }
			var media = new Media();
			media.src = publicPath;
			media.location = serverPath;
			media.save(function(err,saved){
				if(err){
					fs.unlink(serverPath,function(err){
						if(err){
                   			res.json({err:err,message:"couldn't save doc OR delete uploaded img"});
                			}
                			res.json({err:err,message:"couldn't save document!"});
						return;
					});
				}
				res.json({imgPath:publicPath});
            });
		});
	}
});

app.put('/manager/:id',function(req,res){
    var id = req.params.id
      , newdata = req.body.newdata;
    res.json({query:req.query,body:req.body,params:req.params});
});

app.put('/manager/:id/:member/:memberdata',function(req,res){
    var id = req.params.id
      , member = req.params.member
      , memberdata = req.params.memberdata;
    if(member){
        Registry.find({_id:id},function(err,reg){
            if(!err){
                reg[member] = memberdata;
                reg.save(function(err,saved){
                    res.json({err:err,saved:saved});
                });
            }else{
                res.json({err:err});
            }
        });
    }else{
        Registry.find({_id:id},function(err,reg){
            if(!err){
                _.each(memberdata,function(val,key,arr){
                    reg[key] = val;
                });
                reg.save(function(err,saved){
                    res.json({err:err,saved:saved});
                });
            }else{
                res.json({err:err});
            }
        });
    }
});

app.delete('/manager',function(req,res){
    if(req.body._id){
        Registry.findOne({_id:req.body._id},function(err,regEntry){
            var id = regEntry._id;
            if(err){
                return res.json({err:err});
            }
            if(!req.body.member && regEntry.img.location){
                fs.unlink(regEntry.img.location,function(err){
                    Registry.remove({_id:id},function(err2,count){
                        var message = err?'file delete failed, please check server for '+regEntry.location:'file delete successful!';
                        res.json({err:err,count:count,message:message});
                    });
                });
            }else if(!req.body.member){
                Registry.remove({_id:id},function(err,count){
                    var message = err?'delete failed, please check server for '+id:'delete successful!';
                    res.json({err:err,count:count,message:message});
                });
            }else if(req.body.member==='img'){
                fs.unlink(regEntry.img.location,function(err){
                    if(err){ return res.json({err:err,message:'file delete failed, please check server for '+regEntry.location}); }
                    regEntry.img.src = '';
                    regEntry.img.location = '';
                    regEntry.img.title = '';
                    regEntry.save(function(err2){
                        if(err2){ return res.json({err:err2}); }
                        var message = err2?'file delete succeeded, but could not remove registry entry image member':'image remove successful!';
                        res.json({err:err2,message:message,count:1});                    
                    });

                });
            }
        });
    }else{
        res.json({err:'no ID provided',body:req.body,query:req.query});
    }
});
