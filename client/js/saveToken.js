const setToken = (token) => {
    sessionStorage.setItem('token', token)
}

const getToken = () => {
    return sessionStorage.getItem('token')
}

const setHerdId = (id) => {
    sessionStorage.setItem('id', JSON.stringify(id))
}

const getHerdId = () => {
    const ids = sessionStorage.getItem('id')

    return ids ? JSON.parse(ids) : []
}