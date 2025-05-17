
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuToggleProps {
  onToggle: () => void;
}

const MobileMenuToggle = ({ onToggle }: MobileMenuToggleProps) => {
  return (
    <div className="flex lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Open menu</span>
      </Button>
    </div>
  );
};

export default MobileMenuToggle;
