import { Outlet, Link } from 'react-router-dom'
import '../css/dashboard.css'

const Dashboard = () => {

    return (
        <div>
            <div className='nav-bar'>
                <div className='logo'>
                    CowCalfTracker
                </div>
                <div className='search-bar'>
                    <input type="text" placeholder='Search'/>
                    <button>Search</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

/* 
    TODO

    Design dashboard
        - Dashboard needs to have something on it. Possibly a nav bar of some sort with some default 
          information on it? 

          Design like a file system. Herds are folders and cattle are files. Cattle have contents 
          which the information such as name, tag, and notes.

    Cattle Pages
        - Can be loaded with child page from nav bar or button clicks. 
*/