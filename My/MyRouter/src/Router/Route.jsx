import { useLocation } from "./hooks";

export const Route = ({ path, children }) => {
  const {pathname} = useLocation()
  const matched = path === pathname
  if (matched) {
    return children
  }
  return null
}