//1 changing the name of the board should be in LocalStorage
//add 3 participants 
//store scores and names in Local Storage
const boardName = document.getElementById("leaderboard_title")
const changeName = document.getElementById("change_board_name")
const okChangeBtn = document.getElementById("ok_change_btn")
const inputChangeName = document.getElementById("leaderboard_title_change")

boardName.addEventListener('click', function(){
    boardName.style.display = 'none'
    changeName.style.display = 'inline'
    inputChangeName.focus()
})

okChangeBtn.addEventListener('click', function(){
    boardName.textContent = inputChangeName.value
    changeName.style.display = 'none'
    boardName.style.display = 'inline'
    localStorage.setItem("name", inputChangeName.value) 
})

//local storage stil doesn't work yet! fix