const  { registerDefinition } = require('swaggiffy');
module.exports = app =>{
    const tutorials = require("../controllers/tuto.controller");
    var router = require("express").Router();
    
    router.post("/", tutorials.create);
    router.get("/",tutorials.findAll);
    router.get("/published",tutorials.findAllPublished);
    router.get("/:id",tutorials.findOne);
    router.put("/:id",tutorials.update);
    router.delete("/:id",tutorials.deleteOne);
    router.delete("/",tutorials.deleteAll);
    app.use('/api/tutorials',router);

    registerDefinition(router,{tags:'Tutorials',mappedSchema:'Tutorial',basePath:'/tutorials'});

}
