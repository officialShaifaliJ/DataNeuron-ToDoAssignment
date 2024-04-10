const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());

const {connection, TodoModel} = require('./db')
app.use(express.json());

app.get("/todo",async(req,res) => {
  try{
  const todo = await TodoModel.find();
  console.log(todo)
  res.status(200).send(todo);
  }
  catch(e){
    res.status(400).send({"Message from get request":e});
  }
});




// Route for creating a new todo
app.post('/createtodo', async (req, res) => {
    try {
      const todo = new TodoModel(req.body);
      await todo.save();
      res.status(201).send(todo);
    } catch (error) {
      res.status(400).send({"message from post request":error});
    }
  });



  //Route for updating a todo
app.patch('/updatetodo/:todoid', async (req, res) => {
    const {todoid} = req.params;
    const payload = req.body;
console.log(req.body,'REQUEST<*******************************************>BODY')
    try {
      const todo = await TodoModel.findByIdAndUpdate({_id:todoid},payload,{ new: true });
      res.status(200).send({"message":`The todo has been updated succesfully${todo}`})
    } catch (error) {
      res.status(400).send({"message from patch request":error});
    }
  });


   //Route for deleting a todo
app.delete('/deletetodo/:todoid', async (req, res) => {
    const {todoid} = req.params;

    try {
      await TodoModel.findByIdAndDelete({_id:todoid},{ new: true })
      res.status(200).send({"message":"The todo has been deleted succesfully"})
    } catch (error) {
      res.status(400).send({"message from delete request":error});
    }
  });


const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    // await mongoose.connect("mongodb://127.0.0.1:27017/");
    await connection;
    console.log("connected to mongo <================================================");
  } catch (err) {
    console.log(err);
    console.log("Not able to connect port");
  }
});
