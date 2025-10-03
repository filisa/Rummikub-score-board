//1 changing the name of the board should be in LocalStorage
//add 3 participants 
//store scores and names in Local Storage
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js"   
import { getDatabase, 
         ref,
         push,
         onValue } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js"   

const firebaseConfig = {
    databaseURL: "https://score-board-d772e-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const contestantsInDb = ref(database, "contestants")
const boardNameInDb = ref(database, "boardName")

const boardName = document.getElementById("leaderboard_title")
const changeName = document.getElementById("change_board_name")
const okChangeBtn = document.getElementById("ok_change_btn")
const inputChangeName = document.getElementById("leaderboard_title_change")
const addPeopleBtn = document.getElementById("add_people_btn")
const contestantEmptyState = document.getElementById("contestant_empty_state")
const addContestantOverlayInputName = document.getElementById("add_contestant_overlay_input_name")
const addNewContestantOkBtn = document.getElementById("add_new_contestant_ok_btn")
const addContestantOverlay = document.getElementById("add_contestant_overlay")
const contestantList = document.getElementById("contestant_list")
const customBoardName = JSON.parse( localStorage.getItem("newName") )
const contestantsFromLocalStorage = JSON.parse( localStorage.getItem("contestantsList") )
const name = document.getElementById("name_text")

let contestants = []

renderContestants()
if (customBoardName) {
    boardName.textContent = customBoardName
} else if (boardNameInDb) {
    boardName.textContent = boardNameInDb
} {
    boardName.textContent = "My leaderboard"
    }

if (contestantsFromLocalStorage) {
    contestantEmptyState.style.display = 'none'
    contestants = contestantsFromLocalStorage
    renderContestants()
}
name.textContent = "contestants"

boardName.addEventListener('click', function(){
    boardName.style.display = 'none'
    changeName.style.display = 'inline'
    inputChangeName.focus()
})

okChangeBtn.addEventListener('click', function(){
    if (inputChangeName.value) {
        boardName.textContent = inputChangeName.value
        changeName.style.display = 'none'
        boardName.style.display = 'inline'
        localStorage.setItem("newName", JSON.stringify(inputChangeName.value))
        push(boardNameInDb, inputChangeName.value)
    } else {
        changeName.style.display = 'none'
        boardName.style.display = 'inline'    
        boardName.textContent = "My leaderboard"
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
        localStorage.setItem("contestantsList", JSON.stringify(contestants) )
        push(contestantsInDb, addContestantOverlayInputName.value)
        renderContestants()
        addContestantOverlayInputName.value = ""
    } else {
        addContestantOverlay.style.display = 'none'
    }
})

function renderContestants() {
    let listContestants = ""
    for (let i = 0; i < contestants.length; i++) {
        listContestants += `
                            <li> 
                            ${contestants[i]} 
                            </li>
                            `
    }
    contestantList.innerHTML = listContestants
}
//addContestantOverlayInputName.value
//local storage stil doesn't work yet! fix
//make an option ok only works if you entered something.1


onValue(contestantsInDb, function(snapshot) {
    console.log(snapshot.val())
})

const contestant = {name: "", score: "0"}
contestant.name = addContestantOverlayInputName.value

function renderMyObject() {
    contestantList.innerHTML = contestant.name + " " + contestant.score
}
renderMyObject()
