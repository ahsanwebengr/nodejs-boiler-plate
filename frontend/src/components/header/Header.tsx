import { useState } from "react";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleLogOut = () => {
        setIsOpen(false);
    };
    const user = {
        _id: '12',
        role: 'admin',
    };
    return (
        <nav className="header">
            <Link onClick={() => setIsOpen(false)} to={'/'} >Home</Link>
            <Link onClick={() => setIsOpen(false)} to={'/search'} > <FaSearch /> </Link>
            <Link onClick={() => setIsOpen(false)} to={'/cart'} > <FaShoppingBag /> </Link>
            {user?._id ?
                <>
                    <button onClick={() => setIsOpen((prev) => !prev)}> <FaUser /> </button>
                    <dialog open={isOpen}>
                        <div>
                            {user.role === 'admin' && (<Link to={'/admin/dashboard'}>Admin</Link>)}
                            <Link onClick={() => setIsOpen(false)} to={'/orders'} >Orders</Link>
                            <button onClick={handleLogOut}> <FaSignOutAlt /></button>
                        </div>
                    </dialog>
                </>
                : <Link onClick={() => setIsOpen(false)} to={'/login'} > <FaSignInAlt /></Link>}
        </nav>
    );
};

export default Header;