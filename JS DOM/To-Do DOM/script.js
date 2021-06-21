const inputField = document.querySelector('input');
const addBtn = document.querySelector('button');
const itemsUl = document.querySelector('ul');

inputField.focus();

addBtn.onclick = ()=> {
    let task = inputField.value;
    if (task.length!=0) {
        let li = document.createElement('li');
        li.textContent = task;
        // Defining remove functionality on each 'li'
        li.addEventListener('dblclick', ()=> {
            li.remove();
        })
        itemsUl.append(li);
    }
}