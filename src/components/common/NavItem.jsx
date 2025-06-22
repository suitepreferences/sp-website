function NavItem({ onClick, children, icon }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 font-medium transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 rounded-md p-2 text-gray-300 hover:text-indigo-400"
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

export default NavItem;
