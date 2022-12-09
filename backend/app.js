const express = require("express")

const path = require('path');

// const nocache = require("nocache");

const mongoose = require("mongoose")
mongoose.set('strictQuery', true);

const logger = require("morgan")

const cors = require("cors")

// app.get('/products/:id', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })

// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })


// const fileUpload = require('express-fileupload')

//env
require('dotenv').config()

//express app
const app = express();

app.use(cors())

//moment js app
// const moment = require('moment'); // require
// moment().format(); 

mongoose.connect(process.env.dbURI)
  .then(() => {
    //listening for requests
    app.listen(3000);
    console.log('connected to db')
  })
  .catch((err) => console.log(err))

//fileupload
// app.use(fileUpload());


// app.use(nocache());

// middleware & static files
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const Schema = mongoose.Schema;
const taskSchema = new Schema({
  id: { type: Number },
  text: { type: String },
  day: { type: String },
  reminder: { type: Boolean }
}, { timestamps: true })

const Task = mongoose.model('Task', taskSchema)

app.get('/tasks', async function (req, res) {
  try {
    const tasks = await Task.find({})
    res.json(tasks)
  } catch (err) {
    console.log(err)
  }
})

app.put('/tasks/:id/:reminder', async function (req, res) {
  try {
    const tasks = await Task.updateOne({ "_id": req.params.id }, { $set: { reminder: req.body.reminder } })
    res.json(tasks)
  } catch (err) {
    console.log(err)
  }
})

app.post('/tasks', async function (req, res) {
  try {
    console.log(req.body)
    console.log(req.params)
    const tasks = new Task({
      text: req.body.text,
      day: req.body.day,
      reminder: req.body.reminder
    })
    tasks.save()
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
    res.json(tasks)
  } catch (err) {
    console.log(err)
  }
})

app.delete('/tasks/:id', async function (req, res) {
  try {
    const tasks = await Task.deleteOne({_id:req.params.id})
    res.json(tasks)
  } catch (err) {
    console.log(err)
  }
})


//404 page
app.use((req, res) => {
  if (session.userId) {
    res.status(404).render('error', { title: 'Shop.', loginName: session.userId })
  } else {
    res.status(404).render('error', { title: 'Shop.' })
  }
})