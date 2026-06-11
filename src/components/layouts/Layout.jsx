import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 840);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 840;

      setIsMobile(mobile);

      // Desktop → always open
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen">
      
      {/* MOBILE OVERLAY */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-screen
          transition-all duration-300

          ${
            isMobile
              ? sidebarOpen
                ? "translate-x-0 w-68"
                : "-translate-x-full w-68"
              : "translate-x-0 w-68"
          }
        `}
      >
        <Sidebar />
      </div>

      {/* RIGHT SIDE */}
      <div
        className={`
          min-h-screen transition-all duration-300
          ${!isMobile ? "ml-68" : ""}
        `}
      >
        {/* HEADER */}
        <div className="fixed top-0 right-0 left-0 min-[840px]:left-68 z-30">
          <Header toggleSidebar={toggleSidebar} />
        </div>

        {/* PAGE CONTENT */}
        <main className="bg-[#F8FAFCCC] pt-20 px-4 pb-8
          min-[840px]:pt-23 min-[840px]:px-8 min-[840px]:pb-10">
        {/* <main className="pt-16 py-4 min-[840px]:pt-20 min-[840px]:px-8"> */}
          <Outlet />
        </main>
      </div>

      {/* TOASTER */}
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
















// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import useStore from "../../store/useStore";

// const Layout = () => {
//   const { sidebarOpen, setSidebarOpen } = useStore();

//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   // Detect screen size
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 768;

//       setIsMobile(mobile);

//       // Desktop → always open
//       if (!mobile) {
//         setSidebarOpen(true);
//       } else {
//         setSidebarOpen(false);
//       }
//     };

//     handleResize();

//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* MOBILE OVERLAY */}
//       {isMobile && sidebarOpen && (
//         <div
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 bg-black/50 z-40"
//         />
//       )}

//       {/* SIDEBAR */}
//       <div
//         className={`
//           fixed top-0 left-0 z-50 h-screen
//           transition-all duration-300
          
//           ${
//             isMobile
//               ? sidebarOpen
//                 ? "translate-x-0 w-64"
//                 : "-translate-x-full w-64"
//               : "translate-x-0 w-64"
//           }
//         `}
//       >
//         <Sidebar />
//       </div>

//       {/* RIGHT SECTION */}
//       <div
//         className={`
//           min-h-screen transition-all duration-300
//           ${!isMobile ? "ml-64" : ""}
//         `}
//       >
//         {/* HEADER */}
//         <div className="fixed top-0 right-0 left-0 md:left-64 z-30">
//           <Header />
//         </div>

//         {/* PAGE CONTENT */}
//         <main className="pt-16 p-4 md:p-6">
//           <Outlet />
//         </main>
//       </div>

//       {/* TOASTER */}
//       <Toaster position="top-right" />
//     </div>
//   );
// };

// export default Layout;