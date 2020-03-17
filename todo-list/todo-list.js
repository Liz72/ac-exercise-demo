// init

// take whole parts of the todo list as a template
// function displayDoneItem() {
//   let htmlContent = `
//     <header class="mb-3">
//       <h4>My Todo</h4>
//       <div class="form-inline">
//         <input type="text" placeholder="add item" id="newTodo" class="form-control mr-2" onfocus="this.value = ''">
//         <button id="addBtn" class="btn btn-info">Add</button>
//       </div>
//     </header>
//     <ul id="my-todo" class="list-unstyled">
//     </ul>
//     <h4>Done</h4> 
//     <ul id="done-todo" class="list-unstyled"> 
//     </ul> 
//   `
//   document.querySelector('#container').innerHTML = htmlContent
// }
// displayDoneItem()

let list = document.querySelector('#my-todo')

const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
for (let todo of todos) {
  addItem(todo)
}

// add new list with label and icon
function addItem (text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  list.appendChild(newItem)
}

//check if input value is empty
function inputItem() {
  const inputValue = document.querySelector('#newTodo').value;
  if (inputValue === '') {
    // window.alert('The item has to be filled!');
    // document.querySelector('#newTodo').placeholder = 'The item has to be filled!'
    // inputValue = 'The item has to be filled!'
    document.querySelector('#newTodo').value = 'The item has to be filled!'
  }
  else {
    addItem(inputValue);
    document.querySelector('#newTodo').value = ''
  }
}

// create done list and append it to class container
function addDoneList() {
  let div = document.createElement('div')
    // let htmlContent = `
    //   <h4>Done</h4>
    //   <ul id="done-todo" class="list-unstyled">
    //   </ul>
    //   `
    // div.innerHTML = htmlContent
    div.innerHTML = `
    <h4>Done</h4>
    <ul id="done-todo" class="list-unstyled">
    </ul>
    `
  document.querySelector('#container').appendChild(div)
}
addDoneList()

const doneList = document.querySelector('#done-todo')

// add new todo
const addBtn = document.querySelector('#addBtn')
addBtn.addEventListener('click', function(event) {
  // console.log(this)
  console.log(event.target)
  return inputItem()
})

// accept mouse click and enter keycode
document.querySelector('#newTodo').addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    return inputItem()
  } 
})

//checked and delete todo
list.addEventListener('click', function(event) {
  // console.log(this)
  // console.log(event.target)
    // or 用CSS選擇器來篩選event.target
    // if (event.target.matches('.delete'))
  if (event.target.tagName === 'LABEL') {
    event.target.classList.toggle('checked')
    let moveToDoneList = event.target.parentElement
    doneList.append(moveToDoneList) 
  } else if (event.target.classList.contains('delete')) {
    event.target.parentElement.remove() 
  }
}) 

doneList.addEventListener('click', function(event) {
  // console.log(this)
  // console.log(event.target)
  if (event.target.classList.contains('delete')) {
    event.target.parentElement.remove()
  } if (event.target.classList.contains('checked')) {
    event.target.classList.toggle('checked')
    let moveToList = event.target.parentElement
    list.append(moveToList)
  } 
})


