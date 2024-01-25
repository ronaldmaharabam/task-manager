import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataAdded, dataUpdated, priorityLoaded, statusLoaded, teamLoaded } from "./redux/reducer";

import NavBar from "./NavBar";
import TaskView from "./TaskView";
import Overlay from "./Overlay";
import axios from "axios";


function App() {
  const cards = {
    
  }
  const dispatch = useDispatch();
  useEffect(()=> {
    // const fetchData = async()=>{
    //   axios.get("api/data").then((res)=>console.log("response", res)).catch(err=>console.log(err));
    //   // console.log("data", data);
    //   // const json = await data.json();
    //   // console.log(json);
    //   // dispatch(dataUpdated(json));
    // }
    // fetchData();
    axios.get("http://127.0.0.1:3000/api/data").then((res)=>{
      console.log(res);
      dispatch(dataUpdated(res.data));
    });
  }, []);
  useEffect(()=> {
    // const fetchData = async()=>{
    //   const data = await fetch("api/priority");
    //   console.log("data", data);
    //   const json = await data.json();
    //   dispatch(priorityLoaded(json));
    // }
    // fetchData();
    axios.get("http://127.0.0.1:3000/api/priority").then((res)=>{
      dispatch(priorityLoaded(res.data));
    })
  }, []);
  useEffect(()=> {
    // const fetchData = async()=>{
    //   const data = await fetch("api/team");
    //   console.log("data", data);
    //   const json = await data.json();
    //   dispatch(teamLoaded(json));
    // }
    // fetchData();
    axios.get("api/team").then((res)=>{
      dispatch(teamLoaded(res.data))
    })
  }, []);
  useEffect(()=> {
    // const fetchData = async()=>{
    //   const data = await fetch("api/status");
    //   console.log("data", data);
    //   const json = await data.json();
    //   dispatch(statusLoaded(json));
    // }
    // fetchData();
    axios.get("api/status").then((res)=>{
      dispatch(statusLoaded(res.data))
    })
  }, []);
  const status = useSelector(state=>state.status);
  status.forEach((item)=>{
    if (cards[item] == undefined) {
      cards[item] = [];
    }
  });
  const data = useSelector(state=>state.data);

  console.log(data);
  Object.keys(data).forEach(key=>{
    if (cards[data[key].status] == undefined) {
      cards[data[key].status] = [];
    }
    cards[data[key].status].push(data[key]);
  });
  return (
    <>
      <Overlay/>
      <NavBar/>
      <TaskView cards={cards}/>
    </>
  );
}

export default App;