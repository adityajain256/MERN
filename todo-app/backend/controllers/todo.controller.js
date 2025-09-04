import Todo from "../modules/todo.module.js";

export async function handleGetTodos(req, res) {
    try {

        const todos = await Todo.find()

        res.status(201).json(todos)
        // res.send('hello from handget todos ')
        console.log('all the todos have passed')
    } catch (error) {
        console.log(`error in get todos ${error}`)
    }
}

export async function handleCompeletedTodos(req, res) {
    try {
        const{ id } = req.params;

        const todo = await Todo.findById(id);

        if(!id){ 
            return res.status(204).json({message: `there is no id`})
        }
        if(!todo){
            return res.status(404).json({message: `there is no todo with id ${id}`})
        }
        if(!todo.completed){
            await Todo.findByIdAndUpdate(id, {completed: true}, {new: true});
        }else{
            await Todo.findByIdAndUpdate(id, {completed: false}, {new: true});
        }

        res.status(200).json({message: `todo have been completed`});
    } catch (error) {
        res.status(500).json({message: `error in completed todos ${error}`});
        console.log(`error in completed todos ${error}`);
    }
}

// export async function handlePostTodos(req, res) {
//     try {
//         const body = req.body;

//     } catch (error) {
//         res.status(500).json({message: `error in completed todos ${error}`});
//         console.log(`error in completed todos ${error}`);
//     }
// }

export async function handlePostTodos(req, res) {
    try {
        const body = req.body;

        if(!body){
            res.status(205).json({message: `there is no body`});
        }else{

            await Todo.create(body);
            res.status(202).json({message: `${body}`});
    
            console.log(`todo have been created ${body}`);
        }
        
    } catch (error) {
        console.log(`error in post todos ${error}`)
    }
}

export async function handleDeleteTodos(req, res) {
    try {
        const { id } = req.params;

        if(!id){
            res.status(204).json({message: `there is no id`})

        }else{
            
            await Todo.findByIdAndDelete(id);

            res.status(203).json({message: `todo have been deleted`})
        }

    } catch (error) {
        console.log(`error in delete todos ${error}`)
    }
}

export async function handlePatchTodos(req, res) {
    try {
        const { id } = req.params;
        const body = req.body;

        await Todo.findByIdAndUpdate(id, body, {new: true});
        if(!id){
            res.status(204).json({message: `there is no id`})

        }else{
            if(!body){
                res.status(205).json({message: `there is no body`})
            }else{

                res.send('hello from handpatch todos ');
            }
        }
    } catch (error) {
        console.log(`error in patch todos ${error}`)    
    }
}
