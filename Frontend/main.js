const herds = getHerds()
const cattle = getCattle()

const newHerd = document.querySelector('#create-herd')

generateDOM(herds)

newHerd.addEventListener('click', function(e) {
    const id = uuidv4()
    herds.push({
        id: id,
        herdName: '',
        date: getCurrentDate()
    })
  
    saveHerds(herds)
    location.assign(`./createHerd.html#${id}`)
})
