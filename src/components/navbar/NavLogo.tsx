
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 mr-6">
      <img 
        src="/placeholder.svg" 
        alt="PCCC Logo" 
        className="h-8 w-8" 
      />
      <span className="font-bold hidden sm:inline-block">PCCC40</span>
    </Link>
  );
};

export default NavLogo;
