//Saves the array to localstorage
const saveHerds = function(herds) {
    localStorage.setItem('herds', JSON.stringify(herds))
}

//Gets the array from localstorage and checks if it is empty and parses it
const getHerds = function() {
    const herdsJSON = localStorage.getItem('herds')

    if(herdsJSON !== null) {
         return JSON.parse(herdsJSON)
     } else {
         return []
     }
}

//Creates a button to fire the script to clear local storage and reload the page
const clearAllHerds = function() {
    const removeButton = document.createElement('button')
    removeButton.textContent = 'Clear All'
    document.querySelector('body').appendChild(removeButton)
    removeButton.className = 'btn btn-danger'

    removeButton.addEventListener('click', function(e) {
        localStorage.clear()
        location.reload()
    })

}

//Funtion to add functionality to remove individual herd button
const removeHerdBtn = function(id) {
    
    /* 
        //This script will delete all herds which is not the desired output 
        const herdIndex = herds.id
        herds.splice(herdIndex)
        //bellow script must be used
    */

    const herdIndex = herds.findIndex(function(herd) {
        return herd.id === id
    })

    if(herdIndex > -1) {
        herds.splice(herdIndex, 1)
    }

    saveHerds(herds)
    location.reload()
}

/*
    Get date to time stamp when herd is created
*/
const getCurrentDate = function() {
    const date = new Date();
	const current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();

    return current_date
}

/*
    This function:
        - Creates an html p tag
        - checks if herdName has a length greater than 0
            - If it does it sets the p tags value to herd.herdName and herd.count
            - If not it sets the p tags value to unnamed herd
        - Then it returns textEl which contains the value of the p tag that was created
*/
const generateDOM = function(herd) {
    //Array to hold names of headers
    const headers = ['Herd Name', 'Number of Cattle', 'Last Edited']

    //Defines where the herd information will be displayed
    const displayHerds = document.querySelector('#table')

    //Creates the table layout
    let table = document.createElement('table')
    //Creates the row to display the header names
    let headerRow = document.createElement('tr')

    //Loops once for every header name each time adding the header names to the row
    headers.forEach(function(headerText) {
        //Creates table header element
        let header = document.createElement('th')
        //Creates text node to display header names
        let textNode = document.createTextNode(headerText)

        //Appends Header name from array to th HTML element
        header.appendChild(textNode)
        //Appends the th element to the row
        headerRow.appendChild(header)
    })

    //Appens the final result from above loop to the entire table
    table.appendChild(headerRow)

    //Loops through the herds array objects
    herd.forEach(function(herds) {
        //Creates HTML table row and table data elements to display herds data
        const row = document.createElement('tr')
        const cell = document.createElement('td')
        const cell2 = document.createElement('td')
        const cell3 = document.createElement('td')
        const cell4 = document.createElement('td')

        //Define variables to be hold herds data
        let textNode1 
        let textNode2
        let textNode3
        
        //Remove button to remove individual elements
        const removeBtn = document.createElement('button')
        removeBtn.textContent = 'Remove'
        removeBtn.addEventListener('click', function() {
            removeHerdBtn(herds.id)
        })

        //Edit herd name and count
        const editButton = document.createElement('button')
        editButton.textContent = 'Edit Herd'
        editButton.addEventListener('click', function() {
            location.assign(`./createHerd.html#${herds.id}`)
        })

        //Link to add cattle page
        const addCattle = document.createElement('button')
        addCattle.textContent = 'Add Cattle'
        addCattle.addEventListener('click', function() {
            location.assign(`./addCattle.html#${herds.id}`)
        })

        //Checks if herd is named and if not defines what values to store as default
        if(herds.herdName.length > 0) {
            //Creates textNode to display indvidual data if condition is met
            textNode1 = document.createTextNode(herds.herdName)
            textNode2 = document.createTextNode(herdCount(cattle, herds.id))
            textNode3 = document.createTextNode(herds.date)    
        } else {
            textNode1 = document.createTextNode('Unnamed')
            textNode2 = document.createTextNode(herdCount(cattle, herds.id))
            textNode3 = document.createTextNode(herds.date)
        }

        //Appends each element to a data cell in the row
        cell.appendChild(textNode1)
        cell2.appendChild(textNode2)
        cell3.appendChild(textNode3)
        cell4.appendChild(addCattle)
        cell4.appendChild(editButton)
        cell4.appendChild(removeBtn)
        
        //Appends the cells to the row
        row.appendChild(cell)
        row.appendChild(cell2)
        row.appendChild(cell3)
        row.appendChild(cell4)

        //css and bootstrap styling
        removeBtn.className = 'btn btn-danger btn-sm'

        editButton.className = 'btn btn-warning btn-sm'
        editButton.style.marginRight = '5px'

        addCattle.className = 'btn btn-success btn-sm'
        addCattle.style.marginRight = '5px'

        cell.style.width = '300px'
        cell2.style.width = '300px'
        cell3.style.width = '100px'

        cell4.style.textAlign = 'right'
        cell4.style.width = '260px'

        //Appends entire row to the table
        table.appendChild(row)
    })

    //Renders the table to be displayed
    displayHerds.appendChild(table)
}
