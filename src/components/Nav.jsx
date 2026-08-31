import { Link, useNavigate } from 'react-router'


const Nav = (props) => {

    const navigate = useNavigate()

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
        navigate('/')
    }

    return (
        <nav>
            {props.user ? (
                <>
                    <Link to="/">Home</Link> {' | '}
                    <Link to="/dashboard">Dashboard</Link>{' | '}
                    <Link to="/agreements">Add Agreement</Link>{' | '}
<<<<<<< HEAD
                {props.user.role === "owner" ? (
                    <>
                    <Link to="/agreements-list">Agreement List</Link>
                    </>
                    
                ):(
                    <>
                    <Link to="/agreements-customer">Customer Agreement</Link>
                    </>
                )}
                <button className="nav-signout" onClick={handleSignOut}> Sign Out </button>
=======
                    <Link to="/agreements-list">Agreement List</Link> {' | '}
                    <Link to="/agreements-customer">Customer Agreement</Link> { ' | '}
                    <button className="nav-signout" onClick={handleSignOut}> Sign Out </button>
>>>>>>> zuhair-front
                </>

            ) : (
                <>
                    <Link to="/sign-up/customer">Customer Sgin Up</Link>{'| '}
                    <Link to="/sign-up/owner">Owner Sgin Up</Link>{'| '}
                    <Link to="/sign-in">Sgin in</Link>
                </>

            )}
        </nav>
    )

}

export default Nav