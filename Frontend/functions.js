//Saves the array to localstorage
const saveHerds = (herds) => {
    localStorage.setItem('herds', JSON.stringify(herds))
}

//Gets the array from localstorage and checks if it is empty and parses it
const getHerds = () => {
    const herdsJSON = localStorage.getItem('herds')

    //This is a tenary conditional statement. For simple conditional statments like
    //This they work great however more complex conditionals require traditional if statements
    //With truthy and falsy this can be even further simplified by removeing === null
    //If herdsJSON contains a value it is already true and not null
    return herdsJSON ? JSON.parse(herdsJSON) : []
}

/* 
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
*/

//Funtion to add functionality to remove individual herd button
const removeHerdBtn = (id) => {
    
    /* 
        //This script will delete all herds which is not the desired output 
        const herdIndex = herds.id
        herds.splice(herdIndex)
        //bellow script must be used
    */

    const herdIndex = herds.findIndex((herd) => herd.id === id)

    herdIndex > -1 ? herds.splice(herdIndex, 1) : console.log('Failed to remove herd')

    saveHerds(herds)
    location.reload()
}

/*
    Get date to time stamp when herd is created
*/
const getCurrentDate = () => {
    const date = new Date();
	const current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();

    return current_date
}

//Contains the input and button needed to name a new herd
const nameHerd = (herd) => {
    //Holds user input for herd name
    let name

    //Defines event handlers
    const nameHerd = document.querySelector('#herd-name')
    const saveButton = document.querySelector('#save-herd')
   
    //Captures input from user and stores it in name
    nameHerd.addEventListener('input', (e) => {
        name = e.target.value
    })
    
    //When the button is clicked a new object is created and the id, herd name and date
    //is added and saved
    saveButton.addEventListener('click', (e) => {
        const id = uuidv4()
        herds.push({
            id: id,
            herdName: name,
            date: getCurrentDate()
        })

        saveHerds(herds)
        location.reload()
    })
}

/*
    This function:
        - Creates an html p tag
        - checks if herdName has a length greater than 0
            - If it does it sets the p tags value to herd.herdName and herd.count
            - If not it sets the p tags value to unnamed herd
        - Then it returns textEl which contains the value of the p tag that was created
*/
const generateDOM = (herd) => {
    //Selects the main HTML div and creates a div for row
    const mainDiv = document.querySelector('#main')
    const confirmDeleteBtn = document.querySelector('#confirm-delete')
    const closeViewCattleModal = document.querySelector('#close-view-cattle')

    const row = document.createElement('div')
    
    herd.forEach((herds) => {
        //HTML elements 
        const col = document.createElement('div')
        const card = document.createElement('div')
        const cardBody = document.createElement('div')
        const btnGroup = document.createElement('div')
        const heading = document.createElement('h5')
        const p1 = document.createElement('p')
        const p2 = document.createElement('p')

        const addCattlebtn = document.createElement('button')
        addCattlebtn.textContent = 'Add Cattle'
        //click was not spelled correctly retry earlier test may work with click set correctly.
        addCattlebtn.addEventListener('click', (e) => {
            addCattle(herds.id)
        })


        const toggleButton = document.createElement('button')
        toggleButton.textContent = 'View Cattle'
        toggleButton.addEventListener('click', (e) => {
            let findCow = cattle.find(e => e.herdId === herds.id)
            if(herds.id === findCow.herdId) {
                displayCattle(cattle, herds.id)
            }  
        })

        closeViewCattleModal.addEventListener('click', (e) => {
            location.reload()
        })
       
        const deleteHerd = document.createElement('button')
        deleteHerd.textContent = 'Delete'
        deleteHerd.addEventListener('click', (e) => {
            let id = herds.id
            confirmDeleteBtn.addEventListener('click', (e) => {
                removeHerdBtn(id)
            })
        })
        
        

        //Define textNodes to hold herd data
        let textNode1
        let textNode2
        let textNode3

        //If herd is named do nothing. If its not assign name as 'unnamed'.
        if(herds.herdName.length > 0) {
            //Pass herd info to textNode
            textNode1 = document.createTextNode(herds.herdName)
            textNode2 = document.createTextNode(`Cattle: ${cattleCount(cattle, herds.id)}`)
            textNode3 = document.createTextNode(`Date Created: ${herds.date}`)
        } else {
            textNode1 = document.createTextNode('Unnamed')
            textNode2 = document.createTextNode(herdCount(cattle, herds.id))
            textNode3 = document.createTextNode(herds.date)
        }
        

        //Appends each element to the other
        heading.appendChild(textNode1)
        p1.appendChild(textNode2)
        p2.appendChild(textNode3)

        cardBody.appendChild(heading)
        cardBody.appendChild(p1)
        cardBody.appendChild(p2)
        cardBody.appendChild(btnGroup)
        btnGroup.appendChild(addCattlebtn)
        btnGroup.appendChild(toggleButton)
        btnGroup.appendChild(deleteHerd)

        card.appendChild(cardBody)

        col.appendChild(card)

        row.appendChild(col)

        //Adds needed bootstrap to each element
        row.className = 'row'
        col.className = 'col-sm-6'
        card.className = 'card border-success mt-1'
        cardBody.className = 'card-body'

        //Button group bootstrap
        btnGroup.className = 'btn-group'

        //Bootstrap needed to generate modal when button is clicked
        addCattlebtn.className = 'btn btn-success'
        addCattlebtn.type = 'button'
        addCattlebtn.dataset.bsToggle = 'modal'
        addCattlebtn.dataset.bsTarget = '#staticBackdrop2' 

        toggleButton.className = 'btn btn-primary'
        toggleButton.type = 'button'
        toggleButton.dataset.bsToggle = 'modal'
        toggleButton.dataset.bsTarget = '#staticBackdrop3'

        deleteHerd.className = 'btn btn-danger'
        deleteHerd.type = 'button'
        deleteHerd.dataset.bsToggle = 'modal'
        deleteHerd.dataset.bsTarget = '#staticBackdrop4'

        heading.className = 'card-title '
        p1.className = 'card-text'
        p2.className = 'card-text'

    })
    
    mainDiv.appendChild(row)
}
