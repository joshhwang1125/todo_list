var React = require('react');
var TodoStore = require('../stores/todo_store.js');

var TodoForm = React.createClass({
  getInitialState: function(){
    return {
      title: "",
      body: ""
    };
  },

  updateTitle: function(e) {
    this.setState({ title: e.target.value });
  },

  updateBody: function(e) {
    this.setState({ body: e.target.value });
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var newTodo = {
      title: this.state.title,
      body: this.state.body
    };

    TodoStore.create({todo: newTodo});

    this.setState({
      title: "",
      body: ""
    });
  },

  render: function(){
    return(
      <div>
        <h2>New Todo!</h2>
        <form onSubmit={this.handleSubmit}>

          Title: <input type="text"
                       onChange={this.updateTitle}
                       value={this.state.title}/>
          <br/>

          Body: <input type="text"
                          onChange={this.updateBody}
                          value={this.state.body}/>
          <br/>

          <input type="submit" value="New Todo"/>
        </form>
      </div>
    );
  }
});

module.exports = TodoForm;
