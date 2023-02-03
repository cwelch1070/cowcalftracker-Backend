//Contains the input and button needed to name a new herd
const nameHerd = () => {

    const herdData = {
        name: ''
    }

    //Defines event handlers
    const nameHerd = document.querySelector('#herd-name')
    const saveButton = document.querySelector('#save-herd')
   
    //Captures input from user and stores it in name
    nameHerd.addEventListener('input', (e) => {
        herdData.name = e.target.value
    })
    
    
    saveButton.addEventListener('click', async (e) => {
        const response = await fetch('http://localhost:3001/herd', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                name: herdData.name
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken()
            }
        })
        const data = await response.json()
        console.log(data)

        location.reload()
    })
}

const getHerdData = async () => {
    const response = await fetch('http://localhost:3001/herd', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json'  
        }
    })

    const data = await response.json()

    return data
}

const generateDOM = async () => {
    //Selects the main HTML div and creates a div for row
    const mainDiv = document.querySelector('#main')
    const confirmDeleteBtn = document.querySelector('#confirm-delete')
    const closeViewCattleModal = document.querySelector('#close-view-cattle')

    const row = document.createElement('div')

    //Store the return of getHerdData in herData
    const herdData = await getHerdData()
    
    //This loops once for every item returned by getHerdData()
    //and displays each herd in the DB as well as generating 
    //all the needed html elements
    herdData.forEach((herd) => {
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
        addCattlebtn.addEventListener('click', (e) => {

        })

        const toggleButton = document.createElement('button')
        toggleButton.textContent = 'View Cattle'
        toggleButton.addEventListener('click', (e) => {
            
        })

        closeViewCattleModal.addEventListener('click', (e) => {
            location.reload()
        })
       
        const deleteHerd = document.createElement('button')
        deleteHerd.textContent = 'Delete'
        deleteHerd.addEventListener('click', (e) => {
            
            confirmDeleteBtn.addEventListener('click', (e) => {
                
            })
        })
        
        //Define textNodes to hold herd data
        let textNode1
        let textNode2
        let textNode3

        //Pass herd info to textNode
        textNode1 = document.createTextNode(herd.name)
        textNode2 = document.createTextNode(herd.numOfCattle)
        textNode3 = document.createTextNode('Time Stamp')
        
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
