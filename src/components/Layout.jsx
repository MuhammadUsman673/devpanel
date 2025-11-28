// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main Content - Responsive margins */}
      <div className="flex flex-col min-h-screen w-full lg:ml-[220px] lg:w-[calc(100%-220px)]">
        {/* Topbar on top */}
        <Topbar />

        {/* Page Content - Responsive padding */}
        <div className="p-4 lg:p-5 flex-1 mt-16 lg:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;