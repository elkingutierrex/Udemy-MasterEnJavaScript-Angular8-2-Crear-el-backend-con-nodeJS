'use strict'

var Project = require('../models/project')

var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        })

    },
    test: function (req, res) {
        return res.status(200).send({
            message: "Soy el método o acción test del controlador de project"
        })

    },
    saveProject: function (req, res) {
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.image = null;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({
                message: 'Eroor al guardar el documento'
            });

            if (!projectStored) return res.status(404).send({
                message: "No se ha podido guardar el documento"
            });

            return res.status(200).send({
                project: projectStored
            })

        })
    },
    getProject: function (req, res) {
        var projectId = req.params.id;

        if (!projectId) return res.status(404).send({
            message: 'el Proyecto no existe'
        });

        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({
                mensaje: 'Error al devolver datos.'
            });

            if (!project) return res.status(404).send({
                message: 'el Proyecto no existe'
            });

            return res.status(200).send({
                project
            });
        })
    },
    getProjects: function (req, res) {
        Project.find({}).sort('-year').exec((err, projects) => { // -year: para ordenar de mayor a menor (-)
            if (err) return res.status(500).send({
                message: "Error al devolver los datos"
            });

            if (!projects) return res.status(404).send({
                message: "No hay proyectos para mostrar"
            });

            return res.status(200).send({
                projects
            })
        })
    },
    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {
            new: true
        }, (err, projectUpdate) => {
            if (err) return res.status(500).send({
                message: "Error al actualizar"
            });

            if (!projectUpdate) return res.status(404).send({
                message: "No existe el proyecto"
            });

            return res.status(200).send({
                project: projectUpdate
            })

        })
    },
    deleteProject: function (req, res) {
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
            if (err) return res.status(500).send({
                message: "No se ha podido borrar el proyecto"
            });

            if (!projectRemoved) return res.status(404).send({
                message: "No se puede eliminar ese proyecto"
            });

            return res.status(200).send({
                project: projectRemoved
            })
        })
    },
    uploadImage: function (req, res) {
        var projectId = req.params.id;
        var fileName = "Imagen No subida..."

        if (req.files) {
            
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];

            Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdate) => {
                if (err) return res.status(500).send({message: "El archivo no se ha subido"});

                if (!projectUpdate) return res.status(404).send({message: "El proyecto no existe y no se ha asignado la imagen"});

                return res.status(200).send({
                    files: projectUpdate
                })
            })

        } else {
            return res.status(200).send({
                message: fileName
            })
        }
    }



}
module.exports = controller;