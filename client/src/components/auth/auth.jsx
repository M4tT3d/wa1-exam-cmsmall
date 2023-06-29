import { createContext, useContext, useEffect, useState } from "react"
import { getGlobal, getSession, login, logout, updateGlobal } from "../../api/api"

const AuthContext = createContext({
  user: null,
  settings: { title: "CMSmall" },
  setGlobals: () => new Promise(() => null),
  logout: () => new Promise(() => null),
  login: () => new Promise(() => null),
})

export function AuthProvider({ ...props }) {
  const [user, setUser] = useState(null)
  const [settings, setSettings] = useState({})
  const authLogin = async (userData) => {
    const data = await login(userData)
    if (data.error) return data
    setUser(data)
    return data
  }
  const saveGlobals = async (key, newSettings) => {
    const data = await updateGlobal(key, newSettings)
    if (data.error) return data
    setSettings({ title: newSettings })
    return data
  }

  useEffect(() => {
    Promise.all([getSession(), getGlobal("title")]).then((data) => {
      if (data[0]?.error) setUser(null)
      else setUser(data[0])
      setSettings({ title: data[1]?.value })
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        settings,
        logout: () => logout().then(() => setUser(null)),
        login: (userData) => authLogin(userData),
        setGlobals: (key, newSettings) => saveGlobals(key, newSettings),
      }}
      {...props}
    />
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
