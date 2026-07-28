import Sidebar from "./SideBar";
import Header from "./Header";
import MainContent from "./MainContent";

const Layout = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[260px_1fr]">
      {/* Left Side */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex flex-col">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};

export default Layout;
