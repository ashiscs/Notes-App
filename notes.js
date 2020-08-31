const fs = require('fs')
const chalk = require('chalk')

const readNote = (title) => {
    const notes = loadNotes()
    const isExist = notes.find((note) => note.title === title)
    if(isExist){
        console.log(chalk.green.italic(isExist.title));
        console.log(chalk.green.italic(isExist.body));
    } else {
        console.log(chalk.red('No note found!'))
    }
}

const listNote = () => {
    const notes = loadNotes()
    console.log(chalk.inverse.blue('List of notes are'))
    notes.forEach(note => {
        console.log(chalk.yellow.inverse(note.title));
    });
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title )
    if(notesToKeep.length < notes.length){
    console.log(chalk.green.inverse('Note removed!'));  
    saveNotes(notesToKeep)
    }
    else {
        console.log(chalk.red.inverse('No note found !'));
    }
}

const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if(!duplicateNote){
    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('new note added!'))
}
else {
    console.log(chalk.red.inverse('Note title taken!'))
}
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
    }
    catch(e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}