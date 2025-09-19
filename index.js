//1 changing the name of the board should be in LocalStorage
//add 3 participants 
//store scores and names in Local Storage
const boardName = document.getElementById("leaderboard_title")
const changeName = document.getElementById("change_board_name")
const okChangeBtn = document.getElementById("ok_change_btn")
const inputChangeName = document.getElementById("leaderboard_title_change")
const error = document.getElementById("error")
const addPeopleBtn = document.getElementById("add_people_btn")
const contestantEmptyState = document.getElementById("contestant_empty_state")


boardName.addEventListener('click', function(){
    boardName.style.display = 'none'
    changeName.style.display = 'inline'
    inputChangeName.focus()
})

function errorMessage(){
    error.style.display = 'inline'
    error.style.color = 'red'
}
okChangeBtn.addEventListener('click', function(){
    if (inputChangeName.value) {
        error.style.display = 'none'
        boardName.textContent = inputChangeName.value
        changeName.style.display = 'none'
        boardName.style.display = 'inline'
        localStorage.setItem("name", inputChangeName.value) 
    } else {
        errorMessage()
    }
})

addPeopleBtn.addEventListener('click', function() {
    contestantEmptyState.style.display = 'none'
})


//local storage stil doesn't work yet! fix
//make an option ok only works if you entered something.