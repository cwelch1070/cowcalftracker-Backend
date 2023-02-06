//Allows access to cattle and herds array objects
const cattle = getCattle()
const herds = getHerds()

//Gets the hash of the location and trims off the first position in which contains a #
const herdId = location.hash.substring(1)
//Checks if the herd.id in memory matches the hash
let herd = herds.find(function(herd) {
    return herd.id === herdId
}) 

//Displays the cattle ONLY to the DOM
const displayCheckCattle = (foundCattle) => {

    const herdId = location.hash.substring(1)

    const headers = ['Tag #', 'Cow Name']

    const displayCows = document.querySelector('#roll-call')

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

        const checkBox = document.createElement('input')
        checkBox.className = 'form-check-input mt-0'
        checkBox.type = 'checkbox'
        checkBox.style.width = '25px'
        checkBox.style.height = '25px'
        checkBox.style.marginRight = '10px'

        const removeBtn = document.createElement('button')
        removeBtn.textContent = 'Remove'
        removeBtn.className = 'btn btn-danger'

        removeBtn.addEventListener('click', () => {
            removeCowBtn(cow.cowId)
        })
        
        let textNode1
        let textNode2

        if(cow.herdId === herdId) {
            textNode1 = document.createTextNode(cow.cow)
            textNode2 = document.createTextNode(cow.tag) 

            cell.appendChild(textNode1)
            cell2.appendChild(checkBox)
            cell2.appendChild(textNode2)
            //cell3.appendChild(removeBtn)

            row.appendChild(cell2)
            row.appendChild(cell)
            row.appendChild(cell3)
        } 

        tbody.appendChild(row)
        table.appendChild(tbody)
    })

    displayCows.appendChild(table)
}

displayCheckCattle(cattle)