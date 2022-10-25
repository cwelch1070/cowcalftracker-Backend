/*
    ISSUES: 
        When a herd is removed the cattle associated with that herd also need to be removed.
        Currently, they are not.
*/

//Saves the array to localstorage
const saveCattle = (cattle) =>{
    localStorage.setItem('cattle', JSON.stringify(cattle))
}

//Gets the array from localstorage and checks if it is empty and parses it
const getCattle = () => {
    const cattleJSON = localStorage.getItem('cattle')

    if(cattleJSON !== null) {
         return JSON.parse(cattleJSON)
     } else {
         return []
     }
}

/*
    The cattle array and the herdId's are passed to the function.
    From there the filter method is called and finds all the cattle that are associated 
    to a herdId and stores them in a new array that is then used to 
    display the number of cattle in each herd on the Available herds page(index.html).

    If result is printed to the console you can see that three new arrays are created
    each containing the herdId, cowId, and the cows name and tag number.

    How it works: 
        The call to herdCount is in a loop and as that loop progresses over the objects in the herds array
        it sends the id of that herd to the herdCount function. The herdCount function then checks if there 
        are any cattle associated with that herdId in the cattle array. If there is it returns the length of
        the new array created from the filter method and displays that as the number of cattle in the herd.
*/
const herdCount = (cattle, herdId) => {
    
    const result = cattle.filter(cattle => cattle.herdId === herdId)
    console.log(result)

    return result.length
} 

//Removes a cow from the array, saves the new array, and reloads the page when the btn is clicked
const removeCowBtn = (id) => {
    const cattleIndex = cattle.findIndex((cow) => cow.cowId === id)

    if(cattleIndex > -1) {
        cattle.splice(cattleIndex, 1)
    }

    saveCattle(cattle)
    location.reload()
}

//Displays the cattle ONLY to the DOM
const displayCattle = (foundCattle) => {

    const herdId = location.hash.substring(1)

    const headers = ['Tag #', 'Cow Name']

    const displayCows = document.querySelector('#display-cattle')

    let table = document.querySelector('#table1')
    let tbody = document.createElement('tbody')
    let headerRow = document.createElement('tr')

    headers.forEach((headerText2) => {
        let header = document.createElement('th')
        let text = document.createTextNode(headerText2)

        header.appendChild(text)
        headerRow.appendChild(header)
    })
    
    table.appendChild(headerRow)
    
    foundCattle.forEach((cow) => {

        const row = document.createElement('tr')
        const cell = document.createElement('td')
        const cell2 = document.createElement('td')
        const cell3 = document.createElement('td')

        const removeBtn = document.createElement('button')
        removeBtn.textContent = 'Remove'
        removeBtn.className = 'btn btn-danger'

        removeBtn.addEventListener('click', function() {
            removeCowBtn(cow.cowId)
        })
        
        let textNode1
        let textNode2

        if(cow.herdId === herdId) {
            textNode1 = document.createTextNode(cow.cow)
            textNode2 = document.createTextNode(cow.tag) 

            cell.appendChild(textNode1)
            cell2.appendChild(textNode2)
            cell3.appendChild(removeBtn)

            row.appendChild(cell2)
            row.appendChild(cell)
            row.appendChild(cell3)
        } 

        tbody.appendChild(row)
        table.appendChild(tbody)
    })

    displayCows.appendChild(table)
}