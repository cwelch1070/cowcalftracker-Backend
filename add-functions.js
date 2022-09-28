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

/* const herdCount = function(cattle) {
    const herdId = location.hash.substring(1)

    const result = cattle.filter(cattle => cattle.herdId === herdId)

    if(herds.herdId === herdId) {
        herds.push({})
    }

    return result.length
} */

const removeCowBtn = function(id) {
    const cattleIndex = cattle.findIndex(function(cow) {
        return cow.cowId === id
    })

    if(cattleIndex > -1) {
        cattle.splice(cattleIndex, 1)
    }

    saveCattle(cattle)
    location.reload()
}

//Displays the cattle ONLY 
const displayCattle = function(foundCattle) {

    const herdId = location.hash.substring(1)

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
    
    foundCattle.forEach(function(cow) {

        const row = document.createElement('tr')
        const cell = document.createElement('td')
        const cell2 = document.createElement('td')

        const removeBtn = document.createElement('button')
        removeBtn.textContent = 'Remove'
        removeBtn.className = 'btn btn-danger'
        removeBtn.style.marginLeft = '10px'

        removeBtn.addEventListener('click', function() {
            removeCowBtn(cow.cowId)
        })
        
        let textNode1
        let textNode2

        if(cow.herdId === herdId) {
            textNode1 = document.createTextNode(cow.cow)
            textNode2 = document.createTextNode(cow.tag) 

            cell.appendChild(textNode1)
            cell.appendChild(removeBtn)
            cell2.appendChild(textNode2)

            row.appendChild(cell2)
            row.appendChild(cell)
        } 
        
        

        tbody.appendChild(row)
        table.appendChild(tbody)
    })

    displayCows.appendChild(table)
}