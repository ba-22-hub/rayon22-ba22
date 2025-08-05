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

    const [hasRights, setHasRights] = useState(null)
    const [isAdmin, setIsAdmin] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // check if a session is already open
    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession();
            const currentUser = data.session?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
                await Promise.all([
                    checkAdmin(currentUser.id),
                    checkRights(currentUser.id)
                ]);
            }

            setLoading(false);
        };

        fetchSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    // Fonctions
    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setIsAdmin(null);
        setHasRights(null);
    };


    async function checkRights(uid) {
        try {
            const { data, error } = await supabase
                .from('User')
                .select('has_right')
                .eq('id', uid)
                .single(); // retourne un seul objet au lieu d'un tableau

            if (error) {
                console.error("Erreur lors de la récupération du droit utilisateur :", error.message);
            }
            setHasRights(data?.has_right)
        } catch (err) {
            console.error("Erreur inattendue :", err.message);
        }
    }

    async function checkAdmin(uid) {
        try {
            const { data, error } = await supabase
                .from('Admins')
                .select('id')
                .eq('id', uid)
                .single(); // retourne un seul objet au lieu d'un tableau

            if (error) {
                console.error("Erreur lors de la récupération du droit utilisateur :", error.message);
            }

            setIsAdmin(data ? true : false) // true / false (default : false)
        } catch (err) {
            console.error("Erreur inattendue :", err.message);
        }
    }



    return (
        <AuthorContext.Provider value={{ user, setUser, logout, loading, hasRights, isAdmin }}>
            {children}
        </AuthorContext.Provider>
    );

}


const useAuthor = () => useContext(AuthorContext)

export { AuthorProvider, useAuthor }