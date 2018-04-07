'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController'),
  verifyToken = require('../../middleware/verifyToken');

  // todoList Routes
  app.route('/tasks')
    .get(verifyToken, todoList.list_all_tasks)
    .post(verifyToken, todoList.create_a_task);


  app.route('/tasks/:taskId')
    .get(verifyToken, todoList.read_a_task)
    .put(verifyToken, todoList.update_a_task)
    .delete(verifyToken, todoList.delete_a_task);
};