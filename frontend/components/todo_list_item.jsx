var React = require('react');
var TodoStore = require('../stores/todo_store.js');
var DoneButton = require('./done_button.jsx');

var TodoListItem = React.createClass({

  handleDestroy: function(e) {
    e.preventDefault();
    TodoStore.destroy(this.props.id);
  },

  render: function(){
    return(
      <div>
        <div>
          {this.props.title}
        </div>

        <div>
          {this.props.body}
        </div>
        <DoneButton id={this.props.id} done={this.props.done}/>
        <button onClick={this.handleDestroy}>Delete</button>
        <hr/>
      </div>
    );
  }
});

module.exports = TodoListItem;
