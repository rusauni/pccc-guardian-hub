
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 mr-6 hover:opacity-80 transition-opacity">
      <img 
        src="/favicon-32x32.png" 
        alt="PCCC40 Logo" 
        className="h-8 w-8 object-contain bg-transparent" 
        width={32}
        height={32}
      />
      <span className="font-bold hidden sm:inline-block text-lg">PCCC40</span>
    </Link>
  );
};

export default NavLogo;
