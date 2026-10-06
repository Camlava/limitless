import './UserMenu.css'

// Signed-in username and picture, top right of every page after login.
export default function UserMenu({ user }) {
  return (
    <div className="user-menu">
      <button type="button" className="user-menu__trigger" aria-haspopup="menu">
        <span className="user-menu__name">{user.username}</span>
        <span className="user-menu__caret" aria-hidden="true" />
      </button>
      {user.picture ? (
        <img className="user-menu__avatar" src={user.picture} alt="" />
      ) : (
        <span className="user-menu__avatar" aria-hidden="true" />
      )}
    </div>
  )
}
