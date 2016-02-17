var React = require('react');
var TodoStore = require('../stores/todo_store.js');

var TodoListItem = require('./todo_list_item.jsx'),
    TodoForm = require('./todo_form.jsx');

var TodoList = React.createClass({
  getInitialState: function(){
    return {
      todos: TodoStore.all()
    };
  },

  componentDidMount: function(){
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function() {
    TodoStore.removeChangedHandler(this.todosChanged);
  },

  todosChanged: function() {
    this.setState({todos: TodoStore.all()});
  },

  render: function(){
    var listItem = this.state.todos.map(function(todo, idx) {
      return( <TodoListItem key={idx} title={todo.title}
        body={todo.body} id={todo.id} done={todo.done}/> );
    }, this);
    return(
      <div>
        {listItem}
        <TodoForm/>
      </div>
    );
  }
});

module.exports = TodoList;
