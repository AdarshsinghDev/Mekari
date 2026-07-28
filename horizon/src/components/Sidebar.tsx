import { useState } from "react";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

const navItem = ["Dashboard", "Projects", "Analytics", "Setting"];

const Sidebar = () => {

  const [active, setActive] = useState(navItem[0]);

  return (
    <aside>
      <Logo />

      <div className="p-4 space-y-2">
        {navItem.map((item) => (
          <SidebarItem
            key={item}
            title={item}
            active={active === item}
            onClick={() => setActive(item)}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
