import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";

const Layout = () => {
  // ye state track karti hai ki mobile drawer khula hai ya band
  const [isOpen, setIsOpen] = useState(false);

  return (
    // min-w-[320px] — 320px se chota screen ho toh bhi layout toot nahi
    <div className="flex min-h-screen min-w-[320px]">

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* right wala section — header aur main content dono yahan hain */}
      {/* min-w-0 isliye lagaya kyunki flex child kabhi kabhi overflow kar deta hai */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header onMenuClick={() => setIsOpen(true)} />
        <MainContent />
      </div>

    </div>
  );
};

export default Layout;
