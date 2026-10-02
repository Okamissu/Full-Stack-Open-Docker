import React, { useState } from 'react';

const TodoForm = ({ createTodo }) => {
  const [text, setText] = useState('');

  const onChange = ({ target }) => {
    setText(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo({ text });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '70%',
        margin: '1em auto',
        border: '1px solid black',
        borderRadius: '0.75em',
        padding: '0 0.5em',
      }}
    >
      <input
        type="text"
        name="text"
        value={text}
        onChange={onChange}
        style={{
          flexGrow: 1,
        }}
      />
      <button type="submit"> Submit </button>
    </form>
  );
};

export default TodoForm;
