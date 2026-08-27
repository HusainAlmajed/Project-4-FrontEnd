import {Link} from 'react-router'

const Nav = () => {

    return (
        <nav>
            <Link to="/">Home</Link> { '| ' }
            <Link to="/dashboard">Dashboard</Link>
        </nav>
    )

}

export default Nav