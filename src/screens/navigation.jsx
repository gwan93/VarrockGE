import {Link} from 'react-router-dom'

export default function Navigation() {
  return (
  <nav>
  <Link to="/">Home </Link>
  <Link to="/admin">Admin </Link>
  <Link to="/login">Login </Link>
  <Link to="/widgets">Widgets </Link>
  <Link to="/logout">Logout </Link>
</nav>
  )
}