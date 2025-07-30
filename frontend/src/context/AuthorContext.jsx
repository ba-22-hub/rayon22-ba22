import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from "../../lib/supabaseClient.js"


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
    return (
        <AuthorContext.Provider value={{ user, setUser }}>
            {children}
        </AuthorContext.Provider>
    );

}

const useAuthor = () => useContext(AuthorContext)

export { AuthorProvider, useAuthor }