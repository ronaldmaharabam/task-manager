import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterUpdated, sortUpdated } from "./redux/reducer";


function NavBar() {
  const dispatch = useDispatch();

  const [assignee, setAssignee] = useState("");
  const [reporter, setReporter] = useState("");
  function handleFilter(event) {
    dispatch(filterUpdated({assignee: assignee, reporter: reporter}));
  }
  return (
    <div className="nav-bar">
      <span>Assignee: </span>
      <input type="text" value={assignee} onChange={(event)=>setAssignee(event.target.value)}></input>
      <span>Reporter: </span>
      <input type="text" value={reporter} onChange={(event)=>setReporter(event.target.value)}></input>
      <button onClick={(event)=>handleFilter(event)}>filter</button>  
      <button onClick={(event)=>dispatch(sortUpdated("date"))}>sortby Date</button>
      <button onClick={(event)=>dispatch(sortUpdated("priority"))}>sortby Priority</button>
    </div>
  );
}

export default NavBar;
