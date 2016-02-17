var React = require('react'),
    ReactDom = require('react-dom'),
    TodoList = require('./components/todo_list.jsx');

document.addEventListener("DOMContentLoaded", function () {
  ReactDom.render(
    <TodoList/>,
    document.getElementById('root')
  );
});
