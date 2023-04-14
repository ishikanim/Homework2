
import { fetchAllCompleted} from "@/modules/helpers";
import { useEffect, useState } from "react";
import {useAuth} from "@clerk/nextjs";
import {SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import {TaskList} from "@/components/todoList"

export default function TasksPage() {
    const [taskItems, setTaskItems] = useState(null);
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        async function fetchTasks(){
            if(isLoaded && userId){
                const token = await getToken({Template: "codehooks"});

                const userTodos = await fetchAllCompleted(token, userId);

                setTaskItems(userTodos);
                setIsLoading(false);
            }else if (isLoaded){
                setIsLoading(false);
            }

            
        } 
        fetchTasks();
        
    },  [isLoaded])


    

    if(isLoading){
        return <>
        <div> Loading Please Wait... </div>
        </>
    }else{
        return(
            <div>
                <SignedIn>
                    <TaskList todoItems = {taskItems}></TaskList>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn redirectUrl="/todos/"></RedirectToSignIn>
                </SignedOut>
            </div>
        )
        
    }

    

}