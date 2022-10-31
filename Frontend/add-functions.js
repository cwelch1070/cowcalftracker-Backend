/*
    ISSUES: 
        When a herd is removed the cattle associated with that herd also need to be removed.
        Currently, they are not.
*/

//Saves the array to localstorage
const saveCattle = (cattle) => {
    localStorage.setItem('cattle', JSON.stringify(cattle))
}

//Gets the array from localstorage and checks if it is empty and parses it
const getCattle = () => {
    const cattleJSON = localStorage.getItem('cattle')

    try {
        return cattleJSON !== null ? JSON.parse(cattleJSON) : []
    } catch(e) {
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
        The call to cattleCount is in a loop and as that loop progresses over the objects in the herds array
        it sends the id of that herd to the cattleCount function. The cattleCount function then checks if there 
        are any cattle associated with that herdId in the cattle array. If there is it returns the length of
        the new array created from the filter method and displays that as the number of cattle in the herd.
*/
const cattleCount = (cattle, herdId) => {
    const result = cattle.filter(cattle => cattle.herdId === herdId)

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

const addCattle = (idHerd) => {
    //Defines variables and where they are targeted
    const nameCow = document.querySelector('#cow-name')
    const tagNum = document.querySelector('#tag-num')
    const newCow = document.querySelector('#add-cow')
    //const cattleChecker = document.querySelector('#cattle-checker')

    //Default values
    let nameOfCow = 'Cow'
    let numOfTag = 0

    //Renders the UI
    //displayCattle(cattle)

    //Captures the users input for the cows name
    nameCow.addEventListener('input', (e) =>{
        nameOfCow = e.target.value
    })

    //Captures the users input for the cows tag number
    tagNum.addEventListener('input', (e) =>{
        numOfTag = e.target.value
    })

    //Creates an object for the herd when the add cow button is clicked
    newCow.addEventListener('click', (e) =>{
        e.preventDefault()
        const id = uuidv4()
        cattle.push({
            herdId: idHerd,
            cowId: id,
            cow: nameOfCow,
            tag: numOfTag
        })

        //displayCattle(cattle)
        saveCattle(cattle)
        location.reload()
    })  
}

//Displays the cattle ONLY to the DOM
const displayCattle = (cows, herdsId) => {
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
    
    cows.forEach((cow) => {

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

        if(herdsId === cow.herdId) {
            textNode1 = document.createTextNode(cow.cow)
            textNode2 = document.createTextNode(cow.tag) 

            cell.appendChild(textNode1)
            cell2.appendChild(textNode2)
            cell3.appendChild(removeBtn)

            row.appendChild(cell2)
            row.appendChild(cell)
            row.appendChild(cell3)
        }

        /* if(num === 2) {
            cell.removeChild(textNode1)
            cell2.removeChild(textNode2)
            cell3.removeChild(removeBtn)

            row.removeChild(cell2)
            row.removeChild(cell)
            row.removeChild(cell3)
            console.log('Removed')
        } */

        tbody.appendChild(row)
        table.appendChild(tbody)
    })

    displayCows.appendChild(table)
}