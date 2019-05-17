const todoList = [
  {
    id: 1,
    description: 'Sleep early',
    creationDate: '2019-05-12',
    dueDate: '2019-05-10',
    priority: true,
    complete: true
  },
  {
    id: 2,
    description: 'Go to bootcamp',
    creationDate: '2019-05-13',
    dueDate: '2019-05-17',
    priority: false,
    complete: false
  },
  {
    id: 3,
    description: 'Study ReactJS',
    creationDate: '2019-05-15',
    dueDate: '2019-05-19',
    priority: true,
    complete: false
  }
];

// filter => propiedad del objeto ToDo para ordenar
// status => 1 ordena de manera ascendente y -1 ordena de forma descendente
const sort = {
  filter: '',
  status: 1
};

function orderList(array, key, status) {
  return array.sort((a, b) => {
    if (key == 'creationDate' || key == 'dueDate') {
      return status == 1
        ? new Date(b[key]) - new Date(a[key])
        : new Date(a[key]) - new Date(b[key]);
    } else {
      return (a[key] < b[key] ? -1 : 1) * status;
    }
  });
}

function saveTodo(event) {
  event.preventDefault();

  const todo = {
    id: todoList.length + 1,
    description: event.target.elements.description.value,
    dueDate: event.target.elements.dueDate.value,
    creationDate: dateNow(),
    priority: event.target.elements.priority.checked,
    complete: false
  };

  todoList.push(todo);

  document.getElementById('formToDo').reset();
  showHtml(todoList);
}

function dateNow() {
  const now = new Date();
  return (
    now.getFullYear() +
    '-' +
    ('0' + (now.getMonth() + 1)).slice(-2) +
    '-' +
    now.getDate()
  );
}
/*
function showHtml(arr) {
  let html = '';
  arr.forEach((task) => {
    html += `
      <tr>
        <td>${task.id}</td>
        <td>${task.description}</td>
        <td>${task.dueDate}</td>
        <td>${task.creationDate}</td>
        <td>${task.priority}</td>
        <td>${task.complete}</td>
      </tr>
    `;
  });
  document.getElementById('todoHtml').innerHTML = html;
}
*/
// new function, add content in ul#todoList
function showHtml(arr) {
  let html = `<li>
  <span>Complete</span>
  <span>Description</span>
  <span>Due Date</span>
  <span>Priority</span>
  <span>Tools</span>
</li>`;
  arr.forEach(task => {
    html += `
    <li>
      <span class="taskComplete">${
        task.complete == 1
          ? '<input type="checkbox" class="taskComplete" checked>'
          : '<input type="checkbox" class="taskComplete">'
      }</span>
      <span class="taskDescription">${task.description}</span>
      <span class="dueDate">${task.dueDate}</span>
      <span class="priority">${
        task.priority == 1
          ? '<input type="checkbox" class="taskPriority" checked>'
          : '<input type="checkbox" class="taskPriority">'
      }</span>
      <span class="taskTools"><a href="#" onclick="taskDelete(${
        task.id
      })">&#128465;</a></span>
    </li>
    `;
  });
  document.getElementById('todoList').innerHTML = html;
}

function searchById(id) {
  // return element position on Array
  let obj = todoList.find(o => o.id === parseInt(id));
  if (obj >= 0) {
    return todoList.indexOf(obj)
  }
  return { message: 'Element not in Array.'};
}

function taskEdit(id) {
  // requires to change submit button behavior from save new input to delete
  // better avoid delete
}

function taskDelete(id) {
  // look for required element in array
  // delete required element after getting its index
  todoList.splice(searchById(obj), 1);
  showHtml(todoList);
}

document.getElementById('formToDo').addEventListener('submit', saveTodo);

document.querySelectorAll('.sorting').forEach(item => {
  item.addEventListener('click', e => {
    console.log(e.target.dataset.sort);
    if (sort.filter == e.target.dataset.sort) sort.status = sort.status * -1;
    sort.filter = e.target.dataset.sort;
    const list = orderList(todoList, sort.filter, sort.status);
    showHtml(list);
  });
});

// show list ToDo in html
showHtml(todoList);
