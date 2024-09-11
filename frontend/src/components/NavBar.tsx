import { motion } from "framer-motion"
import { Link } from "react-router-dom";


const NavBar = () => {
    type NavItem = {
        label: string;
        link: string;
      };
      
      const navItems: NavItem[] = [
        { label: 'Home', link: '/' },
        { label: 'About us', link: '/about' },
        { label: 'Contact', link: '/contact' },
      ];
    return (
        <div>
            <header className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <motion.h1 
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
             <Link to={"/"}> EchoPost</Link>
            </motion.h1>
            <motion.div 
              className="space-x-6"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
             {navItems.map((item) => (
                 <Link to={item.link}>{item.label}</Link>
                ))}
            </motion.div>
          </nav>
        </header>
        </div>
    )
 }
export default NavBar;