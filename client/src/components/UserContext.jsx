import {createContext} from 'react';
import {useState} from 'react';

export const UserContext = createContext({})

function UserContextProvider({children}){
    const [userInfo,setUserInfo]=useState({})
    const [appliedChanges,setAppliedChanges] = useState(false);
    const [loggedIn,setLoggedIn] = useState(false);
    const [deleted,setDeleted ] = useState(false)
    return (
        <UserContext.Provider value={{userInfo,setUserInfo,appliedChanges,setAppliedChanges,loggedIn,setLoggedIn,deleted,setDeleted}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider