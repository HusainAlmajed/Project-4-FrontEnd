import {Link} from "react-router"

const CustomerAgreement = (props) => {

    if (!props.agreements) {
         return <p>Loading agreements...</p> 
        }

    const customerAgreements = props.agreements.filter( 
        (agreement) => props.user?.role === "customer" &&
         String(agreement.customer?._id) === String(props.user._id) )
    

    return (
        <div>
            <h1>My Agreements</h1>
            
                {customerAgreements.length === 0 ? (
                    <p>No agreements found.</p>
                ) : (
                    <ul>
                {customerAgreements.map((agreement) => (
                    <li key={agreement._id}>
                        <Link to={`/agreements/${agreement._id}`}>
                            {agreement.type} - {agreement.description}
                        </Link>
                    </li>
                ))}
            </ul> 
            )}
        </div>
            
    )
}

export default CustomerAgreement