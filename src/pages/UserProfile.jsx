const UserProfile = (props) => {

    return(
        <div>
            <h1>{props.user.username} Profile</h1>
            <img src={props.user.profileImage} alt="Profile" />

            <p>Username: {props.user.username}</p>
            <p>Email: {props.user.email}</p>
            <p>Phone: {props.user.phone}</p>
            {props.user.role === "owner" && (
                <>
                <p>Buisness Information</p>
                </>
            )}
        </div>
    )
}

export default UserProfile