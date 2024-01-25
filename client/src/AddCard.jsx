import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataAdded } from "./redux/reducer";
import axios from "axios";
function AddCard({ title }) {
  const [newItem, setNewItem] = useState(false);
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch();

  const inpRef = useRef();

  useEffect(() => {
    if (inpRef.current) {
      inpRef.current.focus();
    }
  }, [newItem]);
  function handleInput(event) {
    setNewTask(event.target.value);
  }
  function handleBlur(event) {
    // console.log("bluring");

    if (newTask != "") {
      const id = Date.now();
      const newData = {
        [id]: {
          id: id,
          task: newTask,
          status: title,
          priority: "low",
          description: "",
          comment: [],
        }
      };
      // axios.post("/add-item", newData);
      dispatch(
        dataAdded(newData)
      );
    }
    setNewTask("");
    setNewItem(false);
  }
  // return (
  //   <div >
  //     {newItem ? (
  //       <input
  //         value={newTask}
  //         onChange={(event) => handleInput(event)}
  //         onBlur={(event) => handleBlur(event)}
  //         ref={inpRef}
  //       ></input>
  //     ) : (
  //       <button onClick={() => setNewItem(true)}>ADD</button>
  //     )}
  //   </div>
  // );
  return (
    <div className="add-card-container">
      {newItem ? (
        <input
          className="add-card-input"
          value={newTask}
          onChange={(event) => handleInput(event)}
          onBlur={(event) => handleBlur(event)}
          ref={inpRef}
        />
      ) : (
        <button className="add-card-button" onClick={() => setNewItem(true)}>
          ADD
        </button>
      )}
    </div>
  );
  
}

export default AddCard;
