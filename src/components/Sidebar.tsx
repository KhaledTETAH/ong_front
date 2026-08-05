import ProfileCard from './ProfileCard';
import SidebarNav from './SidebarNav';

export default function Sidebar() {
  return (
    <aside className="d-flex flex-column gap-3">
      <ProfileCard />
      <div className="bg-white rounded-3 border overflow-hidden">
      </div>
    </aside>
  );
}