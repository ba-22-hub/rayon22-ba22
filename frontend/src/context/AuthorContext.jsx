import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from "@lib/supabaseClient.js"

/*
HOW TO USE THE CONTEXT ?? 
1. import : import { useAuthor } from '../context/AuthorContext.jsx';
2. declare what you need at the begining of the component
    => const {user, setUser, logout } = useAuthor()

user : current session,
    /=> user.id is needed to interact with the db 
setUser : to change the session
logout : to end the session
*/ 



const AuthorContext = createContext()

function AuthorProvider({ children }) {

    const [user, setUser] = useState(null)

    // check if a session is already open
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setUser(data.session?.user ?? null) // if exists return data.sessions.user, else user = null
        })


        // listen author changes 
        const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null)
        })

        // when the user close the app 
        return () => {
            listener.subscription.unsubscribe()
        }
        
    }, [])

    // logout function 
    const logout = async () => {
        // closing supabase session
        await supabase.auth.signOut()
        setUser(null)
    }



    return (
        <AuthorContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthorContext.Provider>
    );

}

const useAuthor = () => useContext(AuthorContext)

export { AuthorProvider, useAuthor }