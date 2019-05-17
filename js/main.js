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
    priority: true,
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

const orderList = (array, key, status) => {
  return array.sort((a, b) => {
    if (key == 'creationDate' || key == 'dueDate') {
      return status == 1
        ? new Date(b[key]) - new Date(a[key])
        : new Date(a[key]) - new Date(b[key]);
    } else {
      return (a[key] < b[key] ? -1 : 1) * status;
    }
  });
};

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

document.getElementById('formToDo').addEventListener('submit', saveTodo);
showHtml(todoList);

const sort = {
  filter: '',
  status: 1
};

document.querySelectorAll('.sorting').forEach((item) => {
  item.addEventListener('click', (e) => {
    console.log(e.target.dataset.sort);
    if (sort.filter == e.target.dataset.sort) sort.status = sort.status * -1;
    sort.filter = e.target.dataset.sort;
    const list = orderList(todoList, sort.filter, sort.status);
    showHtml(list);
  });
});
