import {Link} from 'react-router'

const Nav = () => {

    return (
        <nav>
            <Link to="/">Home</Link> { '| ' }
            <Link to="/dashboard">Dashboard</Link>{ '| ' }
            <Link to="/sign-up/customer">Customer Sgin Up</Link>{ '| ' }
            <Link to="/sign-up/owner">Owner Sgin Up</Link>
            <Link to="/agreements">Add Agreement</Link>
            <Link to="/agreements-list">Agreement List</Link>
        </nav>
    )

}

export default Nav