import { useDebugValue, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemUpdated } from "./redux/reducer";

function Modal({ id }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data[id]);
  const priority = useSelector((state) => state.priority);
  const [priorityValue, setPriorityValue] = useState(priority);

  const priorityOption = [];

  priority.forEach((item, index) => {
    priorityOption.push(
      <option key={index} value={item}>
        {item}
      </option>
    );
  });
  function handlePriority(event) {
    dispatch(itemUpdated({id: id, data: {priority: event.target.value}}))
    setPriorityValue(event.target.value);
  }

  const [date, setDate] = useState(data.date);
  function handleDate(event) {
    console.log(event.target.value);
    dispatch(itemUpdated({ id: id, data: { date: event.target.value } }));
    setDate(event.target.value);
  }

  const team = useSelector((state) => state.team);
  const teamOption = [];
  team.forEach((item, index) => {
    teamOption.push(
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  const [assignee, setAssignee] = useState(data.assignee);
  function handleAssignee(event) {
    dispatch(itemUpdated({ id: id, data: { assignee: event.target.value } }));
    setAssignee(event.target.value);
  }

  const [reporter, setReporter] = useState(data.reporter);
  function handleReporter(event) {
    dispatch(itemUpdated({ id: id, data: { reporter: event.target.value } }));
    setReporter(event.target.value);
  }

  const statusOption = [];
  const status = useSelector((state) => state.status);
  status.forEach((item, index) => {
    statusOption.push(
      <option key={index} value={item}>
        {item}
      </option>
    );
  });
  const [statusVal, setStatusVal] = useState(data.status);
  function handleStatus(event) {
    dispatch(itemUpdated({id: id, data: {status: event.target.value}}));
    setStatusVal(event.target.value);
  }


  const [descript, setDescription] = useState(data.description);
  const [editDescript, setEditDescript] = useState(true);
  function handleDescription(event) {
    setDescription(event.target.value);
  }
  function handleBlur(event) {
    dispatch(
      itemUpdated({ id: id, data: { description: event.target.value } })
    );
    setEditDescript(true);
  }

  function handleAttachment(event) {}
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [editDescript]);
  // console.log(data.date);
  return (
    <div className="modal" onClick={(event) => event.stopPropagation()}>
      <div className="modal__title">
        <h2>{data.task}</h2>
      </div>
      <div className="modal__priority">
        <span>Priority: </span>
        <select
          defaultValue={data.priority}
          onChange={(event) => handlePriority(event)}
        >
          {priorityOption}
        </select>
      </div>

      <div className="modal__last-date">
        <span>Planned Date: </span>
        <input
          type="date"
          defaultValue={date}
          onChange={(event) => handleDate(event)}
        ></input>
      </div>

      <div className="modal__assignee">
        <span>Assignee: </span>
        <select
          defaultValue={assignee}
          onChange={(event) => handleAssignee(event)}
        >
          {teamOption}
        </select>
      </div>

      <div className="modal__reporter">
        <span>Reporter: </span>
        <select
          defaultValue={reporter}
          onChange={(event) => handleReporter(event)}
        >
          {teamOption}
        </select>
      </div>

      <div className="modal__status">
        <span>Status: </span>
        <select defaultValue={statusVal} onChange={event=>handleStatus(event)}>
          {statusOption}
        </select>
      </div>

      <div
        className="modal__description"
        onClick={() => setEditDescript(false)}
      >
        <span>Description: </span>
        {editDescript ? (
          <p>{descript}</p>
        ) : (
          <input
            onBlur={(event) => handleBlur(event)}
            type="text"
            value={descript}
            onChange={(event) => handleDescription(event)}
            ref={ref}
          ></input>
        )}
      </div>
      <div className="modal__attachment">
        <span>Attachment: </span>
        <button>attach</button>
      </div>
    </div>
  );
}

export default Modal;
