import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { curIdUpdated, overlayUpdated } from "./redux/reducer";
import Modal from "./Modal";
import { useDrag } from "react-dnd";
import { useState } from "react";


function CardItem({id, task}) {
  // console.log(task);
  const myId = id;
  const [, drag] = useDrag(()=>{
    return {
      type: "ITEM",
      item: {id: myId, task},
    }
  })
  const dispatch = useDispatch();
  function handleClick(event) {
    console.log(myId);
    dispatch(curIdUpdated(myId));
    dispatch(overlayUpdated(true));
  }
  return (
    <div className="card__item" onClick={(event)=>handleClick(event)} ref={drag}>
      {task}
      
    </div>
  );
}

export default CardItem;