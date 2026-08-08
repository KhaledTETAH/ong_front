import { FileText, Search, FolderOpen, MessageCircle} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState ,useEffect} from 'react';

interface NavItem {
  icon: LucideIcon;
  label: string;
  active: boolean;
}

/* const navItems: NavItem[] = [
  { icon: FileText, label: 'Mes candidatures', active: false },
  { icon: FileText, label: 'Fiche « poste recherché »', active: false },
  { icon: Search, label: 'Offres correspondantes', active: false },
  { icon: FolderOpen, label: 'Portfolio d\'engagement', active: false },
  { icon: MessageCircle, label: 'Messagerie', active: true },
]; */

export default function SidebarNav({link}: { link: string }) {
  const [navItems,setNavItems] = useState([ 
  { icon: FileText, label: 'Mes candidatures', active: false,link: '/candidatures' },
  { icon: FileText, label: 'Fiche « poste recherché »', active: false,link: '/fich-post' },
  { icon: Search, label: 'Offres correspondantes', active: false ,link: '/offers'},
  { icon: FolderOpen, label: 'Portfolio d\'engagement', active: false,link:'/portfolio' },
  { icon: MessageCircle, label: 'Messagerie', active: true,link:'/messagerie' },])
  useEffect(()=>{
    setNavItems(prevItems => prevItems.map(navItem => ({
      ...navItem, active: navItem.link === link
    })));
  },[link])
  function handleClick(item: NavItem) {
    setNavItems(prevItems => prevItems.map(navItem => ({
      ...navItem, active: navItem.label === item.label
    })));
  }

  return (
    <div className="list-group">
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        
        return (
         <button
            key={idx}
            className={`list-group-item list-group-item-action d-flex align-items-center gap-2 border-0 py-3 px-4
              ${item.active ? 'text-white' : 'text-dark'}`}
          
            style={item.active ? { backgroundColor: '#0d5c5c' } : {}} 
            onClick={()=>handleClick(item)}
          ><Link to={item.link} className='text-decoration-none'> 
            <Icon size={18} />
          
              <span className="small fw-medium">{item.label}</span>
           
        </Link>   </button>
        );
      })}
    </div>
  );
}