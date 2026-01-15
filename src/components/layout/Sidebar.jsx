import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  TrendingUp, 
  Users, 
  History, 
  Library, 
  Settings,
  PlaySquare
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Home', path: '/', auth: false },
  { icon: TrendingUp, label: 'Trending', path: '/trending', auth: false },
  { icon: Users, label: 'Subscriptions', path: '/subscriptions', auth: true },
];

const libraryItems = [
  { icon: History, label: 'History', path: '/history', auth: true },
  { icon: Library, label: 'Your Videos', path: '/library', auth: true },
  { icon: PlaySquare, label: 'Liked Videos', path: '/liked', auth: true },
];

const settingsItems = [
  { icon: Settings, label: 'Settings', path: '/settings', auth: true },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ icon: Icon, label, path, auth }) => {
    if (auth && !isAuthenticated) return null;

    return (
      <Link
        to={path}
        onClick={onClose}
        className={cn(
          'flex items-center gap-4 px-4 py-3 rounded-lg transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          isActive(path) && 'bg-accent text-accent-foreground font-medium'
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-[57px] left-0 z-40 h-[calc(100vh-57px)] w-64 bg-card border-r border-border transition-transform duration-200 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <ScrollArea className="h-full py-4">
          <nav className="flex flex-col gap-1 px-2">
            {/* Main Menu */}
            <div className="space-y-1">
              {menuItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </div>

            <Separator className="my-4" />

            {/* Library */}
            {isAuthenticated && (
              <>
                <div className="px-4 py-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Library
                  </h3>
                </div>
                <div className="space-y-1">
                  {libraryItems.map((item) => (
                    <NavItem key={item.path} {...item} />
                  ))}
                </div>

                <Separator className="my-4" />
              </>
            )}

            {/* Settings */}
            {isAuthenticated && (
              <div className="space-y-1">
                {settingsItems.map((item) => (
                  <NavItem key={item.path} {...item} />
                ))}
              </div>
            )}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}