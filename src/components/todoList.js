import { useState } from "react";
import { useAuth} from "@clerk/nextjs";
import { setTaskCompletion } from "@/modules/helpers";
import TaskLink from "next/link";


export function TaskList(props){
    if(props.todoItems){
    return(
        <ul className="column">
            {props.todoItems.map((task, index)=>{
                return (
                    <li key={index}><TaskCard
                            id = {task["_id"]}
                            done = {task["done"]}
                            description = {task["description"]}
                    /></li>

                )

            })}
        </ul>

    )
        }
        

}


export function TaskCard(props) {
  const [taskCompleted, setCompleted] = useState(props.completed);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const toggleCompletion = async () => {
    const newCompletionStatus = !taskCompleted;
    setCompleted(newCompletionStatus);
    const token = await getToken({ Template: "codehooks" });

    const response = setTaskCompletion(token, props.id, newCompletionStatus);

    if (response.ok) {
      setData((await response).json());
    }
  };

  return (
    <div className="card">
      <header className="card-header">
        <input
          type="checkbox"
          checked={taskCompleted}
          onChange={toggleCompletion}
        ></input>
        <TaskLink
          className="card-header-title"
          href={"/tasks/" + props.id}
        >
          {props.description}
        </TaskLink>
      </header>
    </div>
  );
}
