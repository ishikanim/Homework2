import { fetchAllInProgress, createTask} from "@/modules/helpers";
import {useEffect, useState } from "react";
import {useAuth} from "@clerk/nextjs";
import {SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import {TaskList} from "@/components/todoList"

export default function TodosPage() {
    const [todoItems, setTodoItems] = useState(null);
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [isLoading, setisLoading] = useState(true);
    const [hasChanged, setHasChanged] = useState(false);


    useEffect(() => {
        async function getTodos(){
            if(userId){
                const token = await getToken({Template: "codehooks"});
                const userTodos = await fetchAllInProgress(token, userId);

                setTodoItems(userTodos);
                setHasChanged(false);
                setisLoading(false);
            }else{
                setisLoading(false);
            }
        } 
        getTodos();
        
    },  [isLoaded, hasChanged])


    async function createTodoItem(description){
        const token = await getToken({Template: "codehooks"});
        const response = await createTask(token, userId, description);

        if(response.ok){
            const newTodo = response.json();

            let updatedTodoList = [...todoItems, newTodo];
            updatedTodoList.push(newTodo);
            setTodoItems(updatedTodoList);
            setHasChanged(true);
            setisLoading(true);
        }
    }


    

    if(isLoading){
        return <>
        <div> Loading.... </div>
        </>
    }else{
        return(
            <div>
                <SignedIn>
                    <TaskList todoItems = {todoItems}></TaskList>
                    <div className="column">
                        <AddTodo createTodoItem = {createTodoItem}/>
                    </div>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn redirectUrl="/todos/"></RedirectToSignIn>
                </SignedOut>
            </div>
        )
    }
}


function AddTodo(props){
    const [description, setDescription] = useState("Add Todo");
    
    return(
        <div className="card">
            <header className="card-header">
                <input className= "card-header-title" type="text" value={description} onChange={e => setDescription(e.target.value)}></input>
                <button className="card-header-icon" onClick={() => props.createTodoItem(description)}>Submit & Refresh Page</button>
            </header>
            
        </div>
    )
}