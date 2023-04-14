import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {useAuth} from "@clerk/nextjs";
import { fetchTask , setTaskCompletion, updateTaskDescription} from "@/modules/helpers";

export default function Task(){
    const [taskData, setTaskData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);
    const [description, setDescrription] = useState(null);
    
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const router = useRouter();
    const {id} = router.query;
    
    useEffect(()=>{
        async function fetchData(){
            if(router.isReady && userId){
                const token = await getToken({Template: "codehooks"});
                const taskObject = await fetchTask(token, id, userId);
                await setTaskData(taskObject[0]);
    
                setIsCompleted(taskObject[0]["done"]);
                setDescrription(taskObject[0]["description"]);
                setIsLoading(false);
            }
        }
        fetchData();
    }, [router, isLoaded])
    
    
    const toggleCompletion = async () => {
        let newCompletionStatus = !isCompleted; 
        setIsCompleted(newCompletionStatus);
        const token = await getToken({Template: "codehooks"});

        const response = setTaskCompletion(token, id, newCompletionStatus);

        if(response.ok){
            setTaskData((await response).json());
        }

    }

    const updateDescription = async () =>{
        const token = await getToken({Template: "codehooks"});
        const response = updateTaskDescription(token, id, description);

        if(response.ok){
            setTaskData((await response).json());
        }

    }


    if(isLoading){
        return <>
        <div> Loading... </div>
        </>
    }else{
        return(
            <div className="column">
                <div className="card">
                    <header className="card-header">
                        <input type="checkbox" checked={isCompleted} onChange={toggleCompletion}></input>
                        <input type="text" className="card-header-title" name="newDesc" value={description} onChange={e => setDescrription(e.target.value)}></input>
                        <button className="card-header-icon" onClick={updateDescription}>Change Description</button>
                    </header>
                </div>
                
            </div>
        )
    }
    
}