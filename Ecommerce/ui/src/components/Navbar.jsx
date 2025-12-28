const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center fixed top-0 left-0 z-50">
      <div className="font-bold text-gray-700 text-lg">
        My Dashboard
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">{user.name}</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
