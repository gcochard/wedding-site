/*jslint node:true*/
var config = require('../modules/config')
  , app = config.app
  , express = config.express
  , mongoose = config.mongoose
  , models = require('../models')
  , Registry = models.Registry
  , Photo = models.Photo
  , stripeTest = require('stripe')(process.env.STRIPE_TEST_SECRET)
  , stripeLive = require('stripe')(process.env.STRIPE_LIVE_SECRET)
  , Rsvp = models.Rsvp
  , _ = require('lodash')
  , path = require('path')
  , fs = require('fs')
  ;

var redir = function(req,res,next){
  'use strict';
  if(!req.secure && /manager/.test(req.path)){
    res.redirect('https://stephanieandgreg.us/manager');
  } else {
    next();
  }
};
var basicAuth = express.basicAuth(function(user,pass){
  'use strict';
  switch(user){
  case 'greg': return 'basic auth passwords should be long' === pass;
  case 'steph': return 's1tephie is your normal password' === pass;
  default: return false;
  }
});

app.get('/manager/pay',redir,basicAuth,function(req,res){
  'use strict';
  var chargeCb = function(err,charge){
    console.log(charge);
    if(err){
      return res.json({error:err});
    }
    res.json({success:charge.captured&&charge.paid,trnId:charge.id,charge:charge});
  };
  var params = {
    amount:req.query.amount,
    card:req.query.token,
    currency:'USD',
    capture:true
  };
  console.log('params: %s',req.params);
  if(req.query.test==='true'){
    console.log('paying via stripe in test mode!');
    stripeTest.charges.create(params,chargeCb);
  } else {
    console.log('paying via stripe in live mode!');
    stripeLive.charges.create(params,chargeCb);
  }
});

app.get('/manager/rsvps',redir,basicAuth,function(req,res){
  'use strict';
  Rsvp.find().lean().sort('timestamp').exec(function(err,rsvps){
    var i=0,ii=rsvps.length,str='',line='',index='';
    for(i=0;i<ii;i++){
      line = '';
      for(index in rsvps[i]){
        if(rsvps[i].hasOwnProperty(index)){
          if(index !== '__v' && index !== '_id'){
            if(line !== '') {line += ',';}
            if(i===0){
              if(str !== ''){ str+= ',';}
              str += index;
            }
            if(rsvps[i][index]){
              line += rsvps[i][index];
            } else {
              line += '""';
            }
          }
        }
      }
      if(i===0){
        str+='\r\n';
      }
      str+=line+'\r\n';
    }
    res.type('text/csv');
    res.send(str);
  });
});
app.get('/manager',redir,basicAuth,function(req,res){
  "use strict";
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
    Registry.find().lean().exec(function(err,registryEntries){
      Photo.find().lean().sort("order").exec(function(err2,photos){
        Rsvp.find().lean().sort('timestamp').exec(function(err3,rsvps){
          if(err || err2 || err3){
            err = {regErr:err,picErr:err2,rsvpErr:err3};
          }
          res.render('manager',{
            name:'stephanieandgreg.us - Manager',
            items: registryEntries,
            imgs: photos,
            rsvps: rsvps,
            error: err,
            errordiv: err?'':'hidden',
            thanksdiv: 'hidden'
          });
        });
      });
    });
  }
});

app.get('/manager/restart',redir,basicAuth,function(req,res){
  'use strict';
  res.end('<html><head><meta http-equiv="refresh" content="5; url=/manager"></head><body>restarted server...redirecting in 5 seconds</body></html>');
  setTimeout(process.exit,500);
});

app.post('/manager',redir,basicAuth,function(req,res){
    "use strict";
    var newReg = new Registry();
    newReg.name = 'test';
    newReg.desc = 'test desc';
    newReg.img = {src: '',title: 'test title!'};
    newReg.price = 100;
    newReg.save(function(err,saved){
        res.json({err:err,saved:saved});
    });
});

app.post('/manager/upload',redir,basicAuth,function(req,res){
    "use strict";
    console.log(req.files);
    console.log(req.query);
    console.log(req.body);
    //var img = req.body.fileUpload
    var files = req.files
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
      var media = new Photo();
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

app.put('/manager/:id',redir,basicAuth,function(req,res){
    "use strict";
    /*
    var id = req.params.id
      , newdata = req.body.newdata;
    */
    res.json({query:req.query,body:req.body,params:req.params});
});

app.put('/manager/photo/:id',redir,basicAuth,function(req,res){
    "use strict";
    console.log(req.body);
    var id = req.params.id
      , newdata = req.body.newdata;
    Photo.findByIdAndUpdate(id,newdata,function(err,photodoc){
      res.json({err:err,photo:photodoc});
    });
});

app.put('/manager/:id/:member/:memberdata',redir,basicAuth,function(req,res){
    "use strict";
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

app.delete('/manager',redir,basicAuth,function(req,res){
    "use strict";
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
