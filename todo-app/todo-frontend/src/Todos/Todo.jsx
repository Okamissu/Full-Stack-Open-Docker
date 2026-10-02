const Todo = ({ todo, deleteTodo, completeTodo }) => {
  const doneInfo = (
    <>
      <span>This todo is done</span>
      <span>
        <button onClick={() => deleteTodo(todo)}> Delete </button>
      </span>
    </>
  );

  const notDoneInfo = (
    <>
      <span>This todo is not done</span>
      <span>
        <button onClick={() => deleteTodo(todo)}> Delete </button>
        <button onClick={() => completeTodo(todo)}> Set as done </button>
      </span>
    </>
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '70%',
        margin: '1em auto',
        border: '1px solid black',
        borderRadius: '0.75em',
        padding: '0.5em',
      }}
    >
      <span>{todo.text}</span>
      {todo.done ? doneInfo : notDoneInfo}
    </div>
  );
};

export default Todo;
