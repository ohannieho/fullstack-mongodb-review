const Todo = require('../database/index.js');

const controller = {
  get: (req, res) => {
    Todo.find()
      .sort({ priority: -1 })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => res.status(404).send(err));
  },
  post: (req, res) => {
    Todo.create(req.body)
      .then(() => {
        res.status(201).send('POSTED');
      })
      .catch(err => res.status(404).send(err));
  },
  delete: (req, res) => {
    let { _id } = req.params;
    Todo.deleteOne({ _id })
      .then(() => {
        res.status(204).send('DELETED');
      })
      .catch(err => res.status(404).send(err));
  },
  put: (req, res) => {
    let { _id } = req.params;
    Todo.findByIdAndUpdate(_id, req.body)
      .then(() => {
        res.status(203).send('UPDATE');
      })
      .catch(err => res.status(404).send(err));
  }
};

module.exports = controller;
