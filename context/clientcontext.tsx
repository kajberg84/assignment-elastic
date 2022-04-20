//@ts-nocheck

import { createContext, ReactNode, useContext, useState } from "react"

type authContextType = {
  user: boolean
  login: () => void
  logout: (someParameter: any) => void
}

type Props = {
  children: ReactNode
}

const authContextDefaultValues: authContextType = {
  user: false,
  login: () => {},
  logout: () => {},
}

const AuthContext = createContext<authContextType>(authContextDefaultValues)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<boolean>(null)

  const login = () => {
    setUser(true)
  }

  const logout = (someParameter: any) => {
    console.log(someParameter)
    setUser(false)
  }

  const value = {
    user,
    login,
    logout,
  }
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}
