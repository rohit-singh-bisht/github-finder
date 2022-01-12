import { useEffect, useContext } from "react"
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

function UserResults() {

    const {users, loading, fetchUsers} = useContext(GithubContext);

    useEffect(() => {
        fetchUsers();
    }, [])
    
    

    if(!loading){
        return (
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
                {users.map((user) => {
                    return (
                        <UserItem key={user.id} user={user}/>
                    )
                })}
            </div>
        )
    }else{
       return <h3>Loading. . .</h3>
    }

    
}

export default UserResults
