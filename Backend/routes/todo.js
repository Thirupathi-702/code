const express=require("express");
const {authenticateJwt,SECRET}=require("../middleware")
const {Todo}=require("../db")
const router=express.Router();

router.post('/todos',authenticateJwt,(req,res)=>{
    const {title,description}=req.body;
    const done=false;
    const userId=req.userId;
    const newTodo=new Todo({title,description,done,userId});

    newTodo.save()
    .then((savedTodo)=>{
        res.status(201).json(savedTodo)
    })
    .catch((err)=>{
        res.status(500).json({error:"faild to create a new todo"})
    })

});
router.get('/todos',authenticateJwt,(req,res)=>{
    const userId=req.userId;
    Todo.find({userId})
    .then((todos)=>{
        res.json(todos);
    })
    .catch((err)=>{
        res.status(500).json({error:"failed to fetch"})
    })
})
router.patch('/todos/:todoId/done',authenticateJwt,(req,res)=>{
    const {todoId}=req.params;
    userId=req.userId;
    Todo.findOneAndUpdate({_id:todoId,userId},{done:true},{new:true})
    .then((updateTodo)=>{
        if(!updateTodo){
            return res.status(404).json({error:'todo not found'})
        }
        res.json(updateTodo);
    })
    .catch((err)=>{
        res.status(500).json({error:"failed to update todo"})
    })
})
router.delete('/todos/:id', authenticateJwt, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully', deletedTodo });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error });
    }
});
module.exports=router