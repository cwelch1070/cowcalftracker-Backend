const addCattle = (herdId) => { 
    //Defines variables and where they are targeted
    const nameCow = document.querySelector('#cow-name')
    const tagNum = document.querySelector('#tag-num')
    const newCow = document.querySelector('#add-cow')
    //const cattleChecker = document.querySelector('#cattle-checker')

    const cattleData = {
        name: 'Cow',
        tag: 0
    }

    //Captures the users input for the cows name
    nameCow.addEventListener('input', (e) =>{
        cattleData.name = e.target.value
    }) 

    //Captures the users input for the cows tag number
    tagNum.addEventListener('input', (e) =>{
        cattleData.tag = e.target.value
    })

    //Creates an object for the herd when the add cow button is clicked
    newCow.addEventListener('click', async (e) =>{
        e.preventDefault()

        const response = await fetch('http://localhost:3001/cattle', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                name: cattleData.name,
                tag: cattleData.tag,
                herdId: herdId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log(data)
        
        location.reload()
    })  
}

const getCattle = async (herdId) => {
    const response = await fetch('http://localhost:3001/cattle/' + herdId, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()

    console.log(data)

    return data
}

//Displays the cattle ONLY to the DOM
const displayCattle = async (herdId) => {
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
    
    const cattleData = await getCattle(herdId)
    console.log(cattleData)

    cattleData.forEach((cattle) => {
        //document.querySelector('#display-cattle').innerHTML = ''
        const row = document.createElement('tr')
        const cell = document.createElement('td')
        const cell2 = document.createElement('td')
        const cell3 = document.createElement('td')

        const removeBtn = document.createElement('button')
        removeBtn.textContent = 'Remove'
        removeBtn.className = 'btn btn-danger'

        removeBtn.addEventListener('click', function() {
            
        })
        
        let textNode1
        let textNode2

        textNode1 = document.createTextNode(cattle.name)
        textNode2 = document.createTextNode(cattle.tag) 

        cell.appendChild(textNode1)
        cell2.appendChild(textNode2)
        cell3.appendChild(removeBtn)

        row.appendChild(cell2)
        row.appendChild(cell)
        row.appendChild(cell3)

        tbody.appendChild(row)
        table.appendChild(tbody)
    })

    displayCows.appendChild(table)
}