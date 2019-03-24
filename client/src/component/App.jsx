import React from 'react';
import axios from 'axios';
import ListEntry from './ListEntry.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      priority: 0,
      todos: [
        // { name: 'todos1', priority: 1 },
        // { name: 'todos2', priority: 2 },
        // { name: 'todos3', priority: 3 }
      ]
    };
    this.fetch = this.fetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.fetch();
  }
  fetch() {
    axios
      .get('/api')
      .then(response => {
        this.setState({
          todos: response.data
        });
      })
      .catch(err => console.error(err));
  }
  handlePost(e) {
    e.preventDefault();
    let { name, priority } = this.state;
    axios
      .post('/api', { name, priority })
      .then(this.fetch)
      .catch(err => console.error(err));
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleUpdate(e, newPriority, _id) {
    e.preventDefault();
    let { priority } = this.state;
    axios
      .put(`/api/${_id}`, { priority: newPriority })
      .then(this.fetch)
      .catch(err => console.error(err));
  }
  handleDelete(e, _id) {
    e.preventDefault();
    axios
      .delete(`/api/${_id}`)
      .then(this.fetch)
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h1>My Todos</h1>
        <form>
          <input name="name" type="text" onChange={this.handleChange} />
          <input name="priority" type="number" onChange={this.handleChange} />
          <button onClick={this.handlePost}>Add To List</button>
        </form>
        {this.state.todos.map((todo, i) => (
          <ListEntry
            todo={todo}
            index={i}
            handleUpdate={this.handleUpdate}
            handleDelete={this.handleDelete}
          />
        ))}
      </div>
    );
  }
}
