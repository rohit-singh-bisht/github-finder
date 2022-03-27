import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({children}) => {

    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    //GET SEARCH RESULTS
    const searchUsers = async (text) => {

        //Define URL PARAMS
        const params = new URLSearchParams({
            q: text
        })
        //And Use As 
        // ${params}

        setLoading()
        const response = await fetch(`https://api.github.com/search/users?${params}`)
        const {items} = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }

    //GET Single User
    const getSingleUser = async (login) => {

        setLoading()
        const response = await fetch(`https://api.github.com/users/${login}`)

        if(response.status === 404){
            window.location = '/notfound'
        }else{
            const data = await response.json()

            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }
        
    }

    //GET User repos
    const getUserRepos = async (login) => {

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })

        setLoading()
        const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`)

        const data = await response.json()

        dispatch({
            type: 'GET_REPOS',
            payload: data
        })
        
    }

    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    })

    const removeSearchResults = () => {
        dispatch({
            type: 'REMOVE_SEARCH_RESULTS'
        })
    }

    return (
        <GithubContext.Provider value={{users: state.users, loading: state.loading, user: state.user, repos: state.repos, searchUsers, removeSearchResults, getSingleUser, getUserRepos}}>
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext;