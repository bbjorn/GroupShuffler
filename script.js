console.clear()

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function shuffleArray(array){
    for (let i = array.length-1; i > 0; i--){
        //To make sure that 0 <= j <= i, we have to add +1 to the getRandomInt as it generate a random number so that  0 <= x < max
        const j = getRandomInt(i+1) 
        if (i!==j){
            const temp = array[j]
            array[j] = array[i]
            array[i] = temp
        }
    }
    return array
}

const orderBySize = (shuffledStudents, groupSize, shuffledList) => {
    let groupNbr = 0
    
    shuffledStudents.forEach((student, i) => {
        if (i%groupSize === 0) {
            groupNbr++
            const term = document.createElement("dt")
            term.innerText = `Group ${groupNbr}:`
            shuffledList.appendChild(term)
        }
        const details = document.createElement("dd")
        details.innerText = student
        shuffledList.appendChild(details)
    });
}

const orderByAmount = (shuffledStudents, groupSize, shuffledList) => {
    let emptySpotsInAllGroups = new Array(groupSize).fill(0)
    for(let i = 0; i<shuffledStudents.length; i++){
        emptySpotsInAllGroups[i%groupSize]++
    }
    
    let groupNbr = 0
    const initalTerm = document.createElement("dt")
    initalTerm.innerText = `Group ${groupNbr + 1}:`
    shuffledList.appendChild(initalTerm)

    shuffledStudents.forEach((student, i) => {
        if (emptySpotsInAllGroups[groupNbr] === 0) {
            groupNbr++
            const term = document.createElement("dt")
            term.innerText = `Group ${groupNbr + 1}:`
            shuffledList.appendChild(term)
        }
        const details = document.createElement("dd")
        details.innerText = student
        shuffledList.appendChild(details)
        emptySpotsInAllGroups[groupNbr]--
    });
}

const shuffle = (listOfStudents, groupSize = 4, typeOfGroup) => {
    console.log(`Every day I'm shufflin'
    Shufflin', shufflin'`)
    
    const shuffledStudents = shuffleArray(listOfStudents)
    
    let shuffledList = document.getElementById("shuffledlist")
    shuffledList.innerHTML = ''
    
    if (typeOfGroup === "numberOfMembers") orderBySize(shuffledStudents, groupSize, shuffledList)
    else orderByAmount(shuffledStudents, groupSize, shuffledList)
}

const typeOfGroup = document.getElementById("typeOfGroup")
const shuffleButton = document.getElementById("shuffleButton")
const studentsTextarea = document.getElementById("listOfStudents")
const groupSizeInput = document.getElementById("groupSize")
const groupSizeLabel = document.getElementById("groupSizeLabel");

let typeOfGroupValue = "numberOfMembers"

typeOfGroup.addEventListener('change', (event) => {
  const labelText= typeOfGroup.options[typeOfGroup.selectedIndex].text;
  typeOfGroupValue = event.target.value
  groupSizeLabel.innerText = `${labelText}:`;
});

shuffleButton.onclick = () => {
    const listOfStudents = studentsTextarea.value.trim().split(/[,\n\r]/)
    const groupSize = parseInt(groupSizeInput.value)
    shuffle(listOfStudents, groupSize, typeOfGroupValue)
}