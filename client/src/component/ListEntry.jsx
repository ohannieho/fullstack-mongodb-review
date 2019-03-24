import React from 'react';

const ListEntry = props => {
  let { name, priority, _id } = props.todo;
  return (
    <li>
      {name}
      {priority}
      <button
        onClick={e => {
          props.handleDelete(e, _id);
        }}
      >
        delete
      </button>
      <button
        id="udate"
        onClick={e => {
          props.handleUpdate(e, priority + 1, _id);
        }}
      >
        +
      </button>
      <button
        id="update"
        onClick={e => {
          props.handleUpdate(e, priority - 1, _id);
        }}
      >
        -
      </button>
    </li>
  );
};

export default ListEntry;
