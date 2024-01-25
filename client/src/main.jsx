import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createServer } from "miragejs";


import App from "./App";

import "./index.css";
import store from "./redux/store";

// const server = createServer();


// const db = {
//   1: {
//     id: 1,
//     task: "run",
//     status: "completed",
//     assignee: "chris",
//     reporter: "andy",
//     priority: "high",
//     date: "2002-02-18",
//     description: "",
//     comment: [],
//   },
//   2: {
//     id: 2,
//     task: "newer",
//     status: "new",
//     reporter: "none",
//     assignee: "none",
//     data: "",
//     priority: "low",
//     description: "",
//     comment: [],
//   },
//   3: {
//     id: 3,
//     task: "testing",
//     status: "test",
//     assignee: "none",
//     reporter: "none",
//     date: "",
//     priority: "medium",
//     description: "",
//     comment: [],
//   },

// };
// const priority = {
//   priority: [
//   "high",
//   "medium",
//   "low",
// ]};
// const teamMates = {
//   team: [
//     "none",
//     "andy",
//     "chris",
//     "nick",
//     "rich",
//   ]
// };
// const status = {
//   status: [
//     "todo",
//     "onging",
//     "completed",
//     "backlog",
//   ]
// };
// server.get("/data", ()=>{
//   return db;
// });
// server.get("/priority", ()=>{
//   return priority;
// });
// server.get("/team", ()=>{
//   return teamMates;
// });
// server.get("/status", ()=>{
//   return status;
// });
// server.post("/add-item", (schema, res)=>{
//   // console.log(res);
//   Object.keys(res).forEach((key, index)=> {
//     db[key] = res[key];
//   });
//   // console.log(db);
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>
  </React.StrictMode>
);
