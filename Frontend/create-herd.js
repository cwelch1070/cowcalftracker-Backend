//Basically creates a new array and reads herd data into the new array
const herds = getHerds()

//Gets the hash of the location and trims off the first position in which contains a #
const herdId = location.hash.substring(1)
//Checks if the herd.id in memory matches the hash
let herd = herds.find(function(herd) {
    return herd.id === herdId
})

//Defines event handlers
const nameHerd = document.querySelector('#herd-name')
const herdCount = document.querySelector('#herd-count')
const addHerdBtn = document.querySelector('#add-herd')

//Captures text from name input
nameHerd.addEventListener('input', function(e) {
    herd.herdName = e.target.value
    saveHerds(herds)
})

/* //Captures number from input
herdCount.addEventListener('input', function(e) {
    herd.count = e.target.value
    saveHerds(herds)
})   */

//Simple button linking back to index page
addHerdBtn.addEventListener('click', function(e) {
    location.assign('./index.html')
})