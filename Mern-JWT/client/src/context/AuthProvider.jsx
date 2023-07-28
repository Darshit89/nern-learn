import { createContext, useCallback, useMemo, useState } from "react";


export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [auth, setAuth] = useState({})


    const handleAuth = useCallback(
        (value) => {
            setAuth(value)
        },
        [],
    )

    const authContextValue = useMemo(() => ({ auth, handleAuth }), [auth, handleAuth])

    return (
        <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider