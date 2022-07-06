import { AuthContext } from '../Context/authContext';
import { useContext } from 'react';

function HomePage() {

    const { user, logout } = useContext(AuthContext);

    return (
        <>
            <h1>This is the homepage</h1>
            {
                user ?
                    <>
                        <h2>{user.email} is logged in</h2>
                    </>
                    :
                    <>
                        <p>There is no user data</p>
                    </>
            }
        </>
    )
}

export default HomePage;