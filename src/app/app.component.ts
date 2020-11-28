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
  public todos: Array<TodoType> = todos;

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
}

interface TodoType {
  id: number;
  title: string;
  done: boolean
}
