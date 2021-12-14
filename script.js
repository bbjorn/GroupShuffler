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

const shuffle = (listOfStudents, groupSize = 4) => {
    console.log(`Every day I'm shufflin'
    Shufflin', shufflin'`)
    const shuffledStudents = shuffleArray(listOfStudents)
    
    let shuffledList = document.getElementById("shuffledlist")
    let groupNbr = 0
  
    shuffledList.innerHTML = shuffledStudents.map((student, i) => {
        if (i%groupSize === 0) {
            groupNbr++
            return `<dt>Group ${groupNbr}:</dt><dd>${student}</dd>`
        }
        return `<dd>${student}</dd>`
    }).join('')
    
}



const shuffleButton = document.getElementById("shuffleButton")
const studentsTextarea = document.getElementById("listOfStudents")
const groupSizeInput = document.getElementById("groupSize")

shuffleButton.onclick = () => {
    const listOfStudents = studentsTextarea.value.trim().split("\n")
    const groupSize = parseInt(groupSizeInput.value)
    console.log(listOfStudents);
    shuffle(listOfStudents, groupSize)
}
