import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <div>
                <ul>
                    {/* Render all the components links */}
                    <li className='components'>
                        <Link to='/'>Home</Link>
                    </li>
              
                  
                    <li className='components'>
                        <Link to='/profile'>User  Profile</Link> 
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
