var React = require('react');
var TodoStore = require('../stores/todo_store.js');

var DoneButton = React.createClass({

  handleDone: function(e) {
    e.preventDefault();
    TodoStore.toggleDone(this.props.id);
  },

  render: function(){
    return(
      <div>
        <button onClick={this.handleDone}>
          {this.props.done ? "Undo" : "Done" }
        </button>
      </div>
    );
  }
});

module.exports = DoneButton;
