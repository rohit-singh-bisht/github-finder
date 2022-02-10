import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({children}) => {

    const initialState = {
        users: [],
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

    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    })

    const removeSearchResults = () => {
        dispatch({
            type: 'REMOVE_SEARCH_RESULTS'
        })
    }

    return (
        <GithubContext.Provider value={{users: state.users, loading: state.loading, searchUsers, removeSearchResults}}>
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext;