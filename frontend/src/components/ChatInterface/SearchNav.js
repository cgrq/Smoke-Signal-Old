import ProfileButton from "../Navigation/ProfileButton";

function SearchNav({isLoaded, sessionUser}) {
    return (
        <div className="chat-interface-top-nav">
            <div>

            </div>
            <input />
            <div>
                {isLoaded && (
                    <ProfileButton user={sessionUser} />
                )}
            </div>
        </div>
    )
}
export default SearchNav
