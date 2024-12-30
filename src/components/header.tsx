import { Link } from 'react-router';
import { useTheme } from '../context/theme-provider';
import { ThemeToggle } from './theme-toggle';

const Header = () => {
    const { theme } = useTheme();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
            <div className="container flex items-center justify-between h-16 px-4 mx-auto">
                <Link to={'/'}>
                    <img src={theme === 'dark' ? '/logo.png' : '/logo2.png'} alt="logo" className="h-14" />
                </Link>

                <div>
                    {/* Search */}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;
