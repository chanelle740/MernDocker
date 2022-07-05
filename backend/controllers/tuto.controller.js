const db = require("../models");
const Tuto = db.tuto;

exports.create = (req,res) =>{
    if(!req.body.title){
        res.status(400).send({message:"Content cannot be empty"});
        return;
    }
    const tutorial = new Tuto({
        title:req.body.title,
        description:req.body.description,
        published:req.body.published ? req.body.published : false
    });

    tutorial
    .save(tutorial)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:
              err.message || "Can't create this tutorial"
        });
    });

};

exports.findAll = (req,res) =>{
    const title = req.query.title;
    var condition = title ? {title : {$regex: new RegExp(title), $options:"i"}} : {};
    Tuto.find(condition)
     .then(data=>{
        res.send(data);
     })
     .catch(err=>{
        res.status(500).send({
            message:
              err.message || "Can't retrieve this tutorial"
        });
     })

};

exports.findOne = (req,res) =>{
    const id = req.params.id;
    Tuto.findById(id)
    .then(data=>{
        if(!data)
          res.status(404).send({message:"Tutorial with id " +id + " is not found!"});
        else res.send(data);
    })
    .catch(err=>{
        res
          .status(500)
          .send({message : "Error retrieving tutorial"});
         
    })

};

exports.deleteAll = (req,res) =>{
    Tuto.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });

};

exports.deleteOne = (req,res) =>{

    const id = req.params.id;
    Tutorial.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });

};

exports.update = (req,res) =>{

    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }

      const id = req.params.id;
      Tuto.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
          } else res.send({ message: "Tutorial was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Tutorial with id=" + id
          });
        });

}

exports.findAllPublished = (req,res) =>{

    Tuto.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

}