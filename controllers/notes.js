const Note = require('../models/Note')
const errorHandler = require('../utils/errorHandler')

// (get) localhost:5000/api/notes?offset=2&limit=5
module.exports.showNotesList = async function(req,res){ //byUserId
    const query = { //для сортировки по дате
        user: req.user.id
    }
    //дата старта
    if(req.query.start){
        query.date ={
            //больше или равно
            $gte: req.query.start
        }
    }
    //дата конца
    if(req.query.end){
        if(!query.date){
            query.date = {}
        }
        //меньше или равно
        query.date[$lte] = req.query.end
        
    }
    //не уверена или нужно это - номер заметки???
    if(req.query.noteId){
        query.noteId = +req.query.noteId
    }

    try{
        const notes = await Note
        .find(query)
        .sort({date: -1})
        .skip(+req.query.offset)
        .limit(+req.query.limit)

        res.status(200).json(notes)
    } catch(e){
        errorHandler(res, e)
    }
}

module.exports.addNewNote = async function(req, res){
    const note = new Note({
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        imageSrc: req.file ? req.file.path : '',
        user: req.user.id
    })

    try{ 
        await note.save()
        res.status(201).json({note})
    } catch(e){
       errorHandler(res, e)
    }
 }

module.exports.getNoteById = async function(req, res){
    try{
        const note = await Note.findById(req.params.id)
        res.status(200).json(note)
    } catch(e){
        errorHandler(res, e)
    }
}

module.exports.editNote = async function(req, res){
    const updeted = {
        name: req.body.name,
    }

    if(req.file){
        updeted.imageSrc = req.file.path
    }

    try{
        const note = await Note.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updeted},
            {new: true}
        )
        res.status(200).json(note)
    } catch(e){
        errorHandler(res, e)
    }
}

module.exports.deleteNote = async function(req,res){
   try{
        await Note.remove({_id: req.params.id})
        res.status(200).json({
            message: "Note has been deleted."
        })
    } catch(e){
        errorHandler(res, e)
    }
}
