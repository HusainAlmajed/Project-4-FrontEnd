import {Link} from "react-router"

const AgreementList = (props) => {

    if (!props.agreements) {
         return <p>Loading agreements...</p> 
        }

    const ownerAgreements = props.agreements.filter( 
        (agreement) => props.user?.role === "owner" &&
         String(agreement.owner?._id) === String(props.user._id) )
    

    return (
        <div>
            <h1>Agreements</h1>
            
                {ownerAgreements.length === 0 ? (
                    <p>No agreements found.</p>
                ) : (
                    <ul>
                {ownerAgreements.map((agreement) => (
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

export default AgreementList