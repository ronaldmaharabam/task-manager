import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { curIdUpdated, overlayUpdated } from "./redux/reducer";


function Overlay() {
  const overlay = useSelector(state=>state.overlay);
  const curId = useSelector(state=>state.curId);
  const dispatch = useDispatch();
  function handleOverlay(event) {
    dispatch(overlayUpdated(false));
  }
  if (overlay) {
    return (
      <div className="overlay" onClick={(event)=>handleOverlay(event)}>
        <Modal id={curId}/>
      </div>
    );
  }
  return (
    <>
    </>
  );
}

export default Overlay;