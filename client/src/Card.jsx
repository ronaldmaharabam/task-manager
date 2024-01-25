import { useDrop } from "react-dnd";
import AddCard from "./AddCard";
import CardItem from "./CardItem";
import { useDispatch, useSelector } from "react-redux";
import { statusUpdated } from "./redux/reducer";

function Card({title, data}) {

  const listItem = [];
  const dispatch = useDispatch();
  // console.log(data);
  const filter = useSelector(state=>state.filter);
  // const priorityFiltered = data.filter((item)=>(filter.priority == "" || item.priority == filter.priority))
  // const dateFiltered = priorityFiltered.filter((item)=>{
  //   return filter.date == "" || (item.date != null && Date(item.date) <= Date(filter.date))}
  // );
  // const assigneeFiltered = dateFiltered.filter((item)=>{
  //   return filter.assignee == "" || (filter.assignee == item.assignee);
  // });

  // const reporterFiltered = assigneeFiltered.filter((item)=>{
  //   return filter.reporter == "" || (filter.reporter == item.reporter);
  // });
  // const filteredData = assigneeFiltered;
  const filteredData = data.filter((item)=>{
    let flag = true;
    Object.keys(filter).forEach(key=> {
      if (filter[key] != "") {
        if (key == "date") {
          if (item[key] == "" || Date(filter[key]) < Date(item[key])) {
            flag = false;
          }
        } else {
          if (filter[key] != item[key]) {
            flag = false;
          }
        }
      }
    })
    return flag;
  });
  const sortby = useSelector(state=>state.sortby);
  const priority = useSelector(state=>state.priority);
  if (sortby == "priority") {
    filteredData.sort((a, b)=>{
      const priorityIndexA = priority.indexOf(a.priority);
        const priorityIndexB = priority.indexOf(b.priority);

        if (priorityIndexA < priorityIndexB) {
            return -1;
        } else if (priorityIndexA > priorityIndexB) {
            return 1; 
        } else {
            return 0; 
        }
    })
    console.log(filteredData); 
  } else if (sortby == "date") {
    filteredData.sort((a, b)=>{
      if (a.date == "") {
        return 1; 
      } else if (b.date == "") {
        return -1; 
      } else {
        return Date(a.date) - Date(b.date); 
      }

    })
  }
  function handleDrop(item) {
    console.log("dropped", item);
    dispatch(statusUpdated({id: item.id, status: title}));
  }

  filteredData.forEach((item, index)=>{
    listItem.push(
      <CardItem id={item.id} task={item.task} key={index}/>
    );
  });

  const [, drop] = useDrop(()=>{
    return {
      accept: "ITEM",
      drop: (item)=>handleDrop(item),
    };
  })
  return (
    <div className="card" ref={drop}>
      <h2>{title}</h2>
      <div className="list-item">
        {listItem}
      </div>
      <AddCard title={title}/>
    </div>
  );
}

export default Card;