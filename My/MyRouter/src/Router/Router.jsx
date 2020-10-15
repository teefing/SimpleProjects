import React, { useState, useEffect } from 'react'
import { history } from "./history";


export const RouterContext = React.createContext(null)

export const Router = ({ children }) => {
  const [location, setLocation] = useState(history.location)

  useEffect(() => {
    const unlisten = history.listen(location => {
      setLocation(location)
    })
    return unlisten
  }, [])

  return <RouterContext.Provider value={{history, location}}>
    {children}
  </RouterContext.Provider>
}


