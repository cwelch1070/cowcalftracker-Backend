import react, { useState} from 'react'
import axios from 'axios'

const Login = () => {

    /*
        This creates a variable email and password and uses the state component
        in react to keep track of changes in the variables state.
        setEmail and setPasssword are used to "update" the variable. 
        This is the equivalent to creating an object in vanilla js
        and storing the user input in the key value pair defined in that object
        
        Example:
            const userData {
                    email: '',
                    password: ''
                }

            userData.email
            userData.password
    */
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    /*
        This function handles the user login request to the server.
        It uses axios to send a post request to the server containing the email and password
        defined above.
    */
    const sendUserLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:3000/user', { email, password }, { withCredentials: true })
            const data = res.json()

            console.log(data, data.token)

            if(res.status === 200) {
                sessionStorage.setItem('token', data.token)
            }
        } catch (error) {
            console.log(`An error occured communicating with the server: ${error}`)
        }
        
    }

    /*
        This is what is returned from the Login function and contains all the needed
        html to render the login page. Each input sets the email and password variable to 
        what the user inputed and is then sent off to the server when the login button is clicked. 
    */
    return (
        <div className='container'>
            <form className='position-absolute top-50 start-50 translate-middle' onSubmit={sendUserLogin}>
                <div className='mb-3'>
                    <input className='form-control' type="email" placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className='mb-3'>
                    <input className='form-control' type="password" placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                </div>
                <button className='btn btn-success' type='submit'>Login</button>
            </form>
        </div>
    )
}
export default Login

// Create layout for page(Done)

// Add styling(Done)

// Create HTTP request to make POST request to login user(Needs testing)

// Store JWT token

// Send user to dashboard (Look into react router)