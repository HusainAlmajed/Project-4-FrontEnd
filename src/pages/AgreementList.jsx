import {Link} from "react-router"

const AgreementList = (props) => {
    

    return (
        <div>
            <h1>Agreements</h1>
            <ul>
                {props.agreements.map((agreement) => (
                    <li key={agreement._id}>
                        <Link to={`/agreements/${agreement._id}`}>
                            {agreement.type} - {agreement.description}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
            
    )
}

export default AgreementList