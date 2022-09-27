//Saves the array to localstorage
const saveCattle = function(cattle) {
    localStorage.setItem('cattle', JSON.stringify(cattle))
}

//Gets the array from localstorage and checks if it is empty and parses it
const getCattle = function() {
    const cattleJSON = localStorage.getItem('cattle')

    if(cattleJSON !== null) {
         return JSON.parse(cattleJSON)
     } else {
         return []
     }
}

//Displays the cattle ONLY most 
const displayCattle = function(cows) {
    //Store the cattle that match the current herds id
    let foundCattle = []

    //Gets the hash of the location and trims off the first position in which contains a #
    const herdId = location.hash.substring(1)

    /* 
        Finds the cattle that have a matching id with the herd they were created under
        The cows name and tag # are then pushed into the foundCattle object which is used to display 
        those specfic cattle under their specific heard 
    */
    let findCow = cattle.find(function(findCow) {
        if(findCow.herdId === herdId) {
            let found = findCow.cow
            let found2 = findCow.tag
            foundCattle.push({found, found2}) 
        }
    })
    console.log(foundCattle)
    const headers = ['Tag #', 'Cow Name']

    const displayCows = document.querySelector('#display-cattle')

    let table = document.querySelector('#table1')
    let tbody = document.createElement('tbody')
    let headerRow = document.createElement('tr')

    headers.forEach(function(headerText2) {
        let header = document.createElement('th')
        let text = document.createTextNode(headerText2)

        header.appendChild(text)
        headerRow.appendChild(header)
    })
    
    table.appendChild(headerRow)
    
    foundCattle.forEach(function(cattle) {

        const row = document.createElement('tr')
        const cell = document.createElement('td')
        const cell2 = document.createElement('td')
        
        let textNode1
        let textNode2

        textNode1 = document.createTextNode(cattle.found)
        textNode2 = document.createTextNode(cattle.found2)
        
        cell.appendChild(textNode1)
        cell2.appendChild(textNode2)
        
        row.appendChild(cell2)
        row.appendChild(cell)

        tbody.appendChild(row)
        table.appendChild(tbody)
    })

    displayCows.appendChild(table)
}