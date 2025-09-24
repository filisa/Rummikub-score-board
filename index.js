//1 changing the name of the board should be in LocalStorage
//add 3 participants 
//store scores and names in Local Storage
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js"   
import { getDatabase, 
         ref,
         push } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js"   

const firebaseConfig = {
    databaseURL: "https://score-board-d772e-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDb = ref(database, "contestants")

const boardName = document.getElementById("leaderboard_title")
const changeName = document.getElementById("change_board_name")
const okChangeBtn = document.getElementById("ok_change_btn")
const inputChangeName = document.getElementById("leaderboard_title_change")
const error = document.getElementById("error")
const addPeopleBtn = document.getElementById("add_people_btn")
const contestantEmptyState = document.getElementById("contestant_empty_state")
const addContestantOverlayInputName = document.getElementById("add_contestant_overlay_input_name")
const addNewContestantOkBtn = document.getElementById("add_new_contestant_ok_btn")
const addContestantOverlay = document.getElementById("add_contestant_overlay")
const contestantList = document.getElementById("contestant_list")

let contestants = []

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
        console.log(localStorage.setItem("name", JSON.stringify(contestants)))
        console.log( localStorage.getItem("name") )
    } else {    
        errorMessage()
    }
})

addPeopleBtn.addEventListener('click', function() {
    contestantEmptyState.style.display = 'none'
    addContestantOverlay.style.display = 'inline'
})

addNewContestantOkBtn.addEventListener('click', function() {
    if (addContestantOverlayInputName.value) {
        addContestantOverlay.style.display = 'none';
        contestants.push(addContestantOverlayInputName.value)
        renderContestants()
        addContestantOverlayInputName.value = ""
    } else {console.log("There is an error adding a new contestant")}
})

function renderContestants() {
    let listContestants = ""
    for (let i = 0; i < contestants.length; i++) {
        listContestants += "<li>" + contestants[i] + "</li>" + "<button>" + "+1" + "</button>"
    }
    contestantList.innerHTML = listContestants
    push(referenceInDb, addContestantOverlayInputName.value)
}
addContestantOverlayInputName.value
//local storage stil doesn't work yet! fix
//make an option ok only works if you entered something.