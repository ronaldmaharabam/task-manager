import Card from "./Card";

function TaskView({cards}) {
  const taskCard = [];
  // console.log("cards", cards);
  Object.keys(cards).forEach((id, index)=>{

    taskCard.push(
      <Card title={id} data={cards[id]} key={index}/>
    );
  });
  return (
    <div className="task-view">
      {taskCard}
      <div className="add-card">
        <div className="funnel-icon">&#x25BC;</div>
      </div>
    </div>
  );
}

export default TaskView;