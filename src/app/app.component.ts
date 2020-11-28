import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

const todos = [
  {id: 1, title: '吃饭', done: false},
  {id: 2, title: '睡觉', done: false},
  {id: 3, title: '打豆豆', done: true}
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // todo列表
  public todos: Array<TodoType> = JSON.parse(window.localStorage.getItem('todos') || '[]');
  
  // 当前正在编辑的li
  public currentEditing: TodoType = null;

  public visibility: string = "completed";

  ngOnInit() {
    this.hashChangedHandler();
    window.onhashchange = this.hashChangedHandler.bind(this)
  }

  // 当angular 组件数据发生改变的时候
  ngDoCheck() {
    window.localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  hashChangedHandler() {
      const hash = window.location.hash.substr(1);
      switch (hash) {
        case '/':
          this.visibility = 'all';
          break;
        case '/active':
          this.visibility = 'active';
          break;
        case '/completed':
          this.visibility = 'completed';
          break;
      }
  }

  get filterTodos() {
    if (this.visibility === 'all') {
      return this.todos;
    } else if (this.visibility === 'active') {
      return this.todos.filter(t => !t.done);
    } else if (this.visibility === 'completed') {
      return this.todos.filter(t => t.done);
    }
  }

  addTodo = (e) :void => {
    if (!e.target.value.length) {
      return;
    }
    var last = this.todos[this.todos.length -1];
     this.todos.push({
       id: last? last.id + 1 : 1,
       title: e.target.value,
       done: false
     })
     e.target.value = '';
     console.log(this.todos)
  }

  // toggleAll属性的get方法
  get toggleAll () {
    return this.todos.every(t => t.done)
  }

  // toggleAll属性的set方法 在对toggleAll属性赋值的时候触发
  set toggleAll (val) {
    this.todos.forEach(t => t.done = val)
  }

  // 删除todo
  removeTodo(index: number) {
    this.todos.splice(index, 1);
  }

  saveEdit(todo: TodoType, e) {
    todo.title = e.target.value;
    this.currentEditing = null;
  }

  // 取消编辑
  handleEditKeyUp(e) {
    const {keyCode, target} = e
    if (keyCode === 27) {
      target.value = this.currentEditing.title;
      this.currentEditing = null;
    }
  }

  get remainingCount() {
    return this.todos.filter(t => !t.done).length
  }

  clearCompleted() {
    this.todos = this.todos.filter(t => !t.done)
  }
}

interface TodoType {
  id: number;
  title: string;
  done: boolean
}
