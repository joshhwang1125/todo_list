var _todos = [],
    _callbacks = [];

var TodoStore = {
  changed: function () {
    _callbacks.forEach(function(cb) {
      cb();
    });
  },

  addChangedHandler: function (cb) {
    _callbacks.push(cb);
  },

  removeChangedHandler: function (cb) {
    var idx;

    for(var i = 0; i < _callbacks.length; i+=1){
      if(cb === _callbacks[i]){
        idx = i;
        break;
      }
    }

    if(!idx){ return; }

    _callbacks.splice(idx,1);
  },

  all: function () {
    return _todos.slice();
  },

  fetch: function () {
    $.get('api/todos', {}, function(todos){
      _todos = todos;
      TodoStore.changed();
    });
  },

  create: function (todo) {
    $.post('api/todos', todo, function(todo){
      _todos.push(todo);
      TodoStore.changed();
    });
  },

  destroy: function(id) {
    var todoArray = $.grep(_todos, function(e) {
      return e.id === id;
    });

    var todo = todoArray[0];

    function onSuccess (todo){
      var idx;
      for(var i = 0; i < _todos.length; i+=1){
        if(todo.id === _todos[i].id){
          idx = i;
          break;
        }
      }

      if(typeof idx === 'undefined'){ return; }

      _todos.splice(idx,1);
      TodoStore.changed();
    }

    if (_todos.indexOf(todo) !== -1) {
      $.ajax({
        url: 'api/todos/' + id,
        type: 'DELETE',
        success: onSuccess
      });
    }
  },

  toggleDone: function(id) {
    var todoArray = $.grep(_todos, function(e) {
      return e.id === id;
    });
    var todo = todoArray[0];

    if (_todos.indexOf(todo) !== -1) {
      $.ajax({
        url: 'api/todos/' + id,
        type: 'PATCH',
        data: JSON.stringify({done: !todo.done}),
        contentType: 'application/json',
        processData: false,
        dataType: 'json',
        success: function() {
          for(var i = 0; i < _todos.length; i+=1){
            if(todo.id === _todos[i].id){
              todo.done = !todo.done;
              break;
            }
          }
          TodoStore.changed();
        }
      });
    }
  }

};

module.exports = TodoStore;
