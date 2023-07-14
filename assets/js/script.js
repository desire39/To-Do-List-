// Task statuses
const TASK_STATUS = {
    ACTIVE: 'active',
    COMPLETED: 'completed'
  };
  
  // Get elements
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const filterBtns = document.querySelectorAll('.filterBtn');
  
  // Array to store tasks
  let tasks = [];
  
  // Add event listeners
  addTaskBtn.addEventListener('click', addTask);
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', applyFilter);
  });
  
  // Function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
      showError('Please enter a task!');
      return;
    }
  
    const existingTask = tasks.find((task) => task.text.toLowerCase() === taskText.toLowerCase());
    if (existingTask) {
      showError('Task already exists!');
      return;
    }
  
    const task = {
      id: Date.now().toString(),
      text: taskText,
      status: TASK_STATUS.ACTIVE
    };
  
    tasks.push(task);
    renderTasks();
    taskInput.value = '';
  }
  
  // Function to render tasks
  function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = '';
  
    filteredTasks.forEach((task) => {
      const listItem = createTaskListItem(task);
      taskList.appendChild(listItem);
    });
  }
  
  // Function to create a task list item
  function createTaskListItem(task) {
    const listItem = document.createElement('li');
    listItem.dataset.id = task.id;
    listItem.classList.add('task');
  
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.status === TASK_STATUS.COMPLETED;
    checkbox.addEventListener('change', toggleTaskStatus);
    listItem.appendChild(checkbox);
  
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    listItem.appendChild(taskText);
  
    const editIcon = createIcon('fas fa-pencil-alt editIcon', editTask);
    listItem.appendChild(editIcon);
  
    const deleteIcon = createIcon('fas fa-trash-alt deleteIcon', deleteTask);
    listItem.appendChild(deleteIcon);
  
    return listItem;
  }
  
  // Function to create an icon
  function createIcon(className, clickHandler) {
    const icon = document.createElement('i');
    icon.className = className;
    icon.addEventListener('click', clickHandler);
    return icon;
  }
  
  // Function to toggle task status
  function toggleTaskStatus() {
    const taskId = this.parentNode.dataset.id;
    const task = tasks.find((task) => task.id === taskId);
  
    task.status = this.checked ? TASK_STATUS.COMPLETED : TASK_STATUS.ACTIVE;
    renderTasks();
  }
  
  // Function to edit a task
  function editTask() {
    const taskId = this.parentNode.dataset.id;
    const task = tasks.find((task) => task.id === taskId);
  
    const updatedText = prompt('Enter updated task:', task.text);
    if (updatedText !== null && updatedText.trim() !== '') {
      task.text = updatedText.trim();
      renderTasks();
    }
  }
  
  // Function to delete a task
  function deleteTask() {
    const taskId = this.parentNode.dataset.id;
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks();
  }
  
  // Function to apply filter
  function applyFilter() {
    const filter = this.dataset.filter;
    let filteredTasks = [];
  
    if (filter === 'completed') {
      filteredTasks = tasks.filter((task) => task.status === TASK_STATUS.COMPLETED);
    } else if (filter === 'active') {
      filteredTasks = tasks.filter((task) => task.status === TASK_STATUS.ACTIVE);
    } else {
      filteredTasks = tasks;
    }
  
    renderTasks(filteredTasks);
  }
  
  // Show error message
  function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = message;
    errorDiv.classList.add('error');
    document.body.appendChild(errorDiv);
    setTimeout(() => {
      errorDiv.remove();
    }, 3000);
  }
  