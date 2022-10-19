//This file has to do with creation only and the id that is assigned is bound to the herdID
//therefore the if statement is not needed. What is displayed needs to be filtered so cattle 
//created with another herd is not displayed throughout  
const cattle = getCattle()
const herds = getHerds()

//Gets the hash of the location and trims off the first position in which contains a #
const herdId = location.hash.substring(1)
//Checks if the herd.id in memory matches the hash
let herd = herds.find(function(herd) {
    return herd.id === herdId
}) 

//Defines variables and where they are targeted
const nameCow = document.querySelector('#cow-name')
const tagNum = document.querySelector('#tag-num')
const newCow = document.querySelector('#add-cow')
const back = document.querySelector('#back')
const cattleChecker = document.querySelector('#cattle-checker')

//Default values
let nameOfCow = 'Cow'
let numOfTag = 0

//Renders the UI
displayCattle(cattle)

//Captures the users input for the cows name
nameCow.addEventListener('input', function(e) {
    nameOfCow = e.target.value
})

//Captures the users input for the cows tag number
tagNum.addEventListener('input', function(e) {
    numOfTag = e.target.value
})

//Creates an object for the herd when the add cow button is clicked
newCow.addEventListener('click', function(e) {
    e.preventDefault()
    const id = uuidv4()
    cattle.push({
        herdId: herd.id,
        cowId: id,
        cow: nameOfCow,
        tag: numOfTag
    })

    //displayCattle(cattle)
    saveCattle(cattle)
    location.reload()
})  

//Return user to herds page
back.addEventListener('click', function(e) {
    location.assign('./index.html')
})

//Goes to cattle checker page and includes herdId in url
cattleChecker.addEventListener('click', function(e) {
    location.assign(`./check-cattle.html#${herdId}`)
})