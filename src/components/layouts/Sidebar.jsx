import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  LayoutGrid,
  Database,
  ClipboardList,
  Truck,
  Users,
  BarChart3,
  UserCircle2,
  ChevronDown,
  PanelTopDashed,
} from "lucide-react";

import { admin_logo } from "../../assets/assets";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const menuSections = [
    {
      title: "OVERVIEW",
      items: [
        {
          label: "Dashboard",
          icon: LayoutGrid,
          path: "/home",
          end: true,
        },
      ],
    },
    {
      title: "OPERATIONS",
      items: [
        {
          label: "Master Data",
          icon: Database,
          submenu: [
            { label: "Categories", path: "/categories" },
            { label: "Skills", path: "/skills" },
            { label: "Brands", path: "/brands" },
          ],
        },
        {
          label: "Project Management",
          icon: PanelTopDashed,
          submenu: [
            { label: "All Projects", path: "/projects" },
          ],
        },
        {
          label: "Demand Management",
          icon: ClipboardList,
          submenu: [
            { label: "Material Requirements", path: "/material-requirements" },
            { label: "Labour Requirements", path: "/labour-requirements" },
          ],
        },
        {
          label: "Supply Management",
          icon: Truck,
          submenu: [
            { label: "Material Quotations", path: "/material-quotations" },
            { label: "Labour Supply", path: "/labour-supply" },
          ],
        },
      ],
    },
    {
      title: "ADMINISTRATION",
      items: [
        {
          label: "User Management",
          icon: Users,
          submenu: [
            { label: "Contractor/Builder", path: "/contractor-management" },
            { label: "Material Supplier", path: "/seller-management" },
            { label: "Labour", path: "/labour-management" },
          ],
        },
        {
          label: "Reports",
          icon: BarChart3,
          submenu: [
            { label: "Daily Reports", path: "/daily-reports" },
            { label: "Monthly Reports", path: "/monthly-reports" },
          ],
        },
        {
          label: "Profile Management",
          icon: UserCircle2,
          path: "/profile-management",
        },
      ],
    },
  ];

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="h-full flex flex-col overflow-y-auto bg-[#1A2029]">

      {/* ── LOGO ── */}
      <div className="px-3 pt-4 pb-0 shrink-0">
        <div className="bg-white rounded-lg px-2.5 py-2 flex items-center justify-center">
          <img
            src={admin_logo}
            alt="BWDP Admin"
            className="w-full h-auto max-h-16 object-contain block"
          />
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="flex-1 overflow-y-auto pb-6">
        {menuSections.map((section) => (
          <div key={section.title} className="p-2">

            {/* SECTION LABEL */}
            <div className="px-3 py-2">
              <span className="text-[11px] font-bold tracking-[0.55px] uppercase text-white">
                {section.title}
              </span>
            </div>

            {/* ITEMS */}
            <ul className="flex flex-col gap-1 p-0 m-0 list-none">
              {section.items.map((item) => {
                const Icon = item.icon;

                /* ── SIMPLE LINK ── */
                if (!item.submenu) {
                  return (
                    <li key={item.label}>
                      <NavLink
                        to={item.path}
                        end={!!item.end}
                        onClick={() => setOpenMenu(null)}
                        className="no-underline"
                      >
                        {({ isActive }) => (
                          <div
                            className={`
                              relative flex items-center gap-3
                              px-3 py-2 rounded-xl
                              transition-colors duration-150 cursor-pointer
                              ${isActive
                                ? "bg-[rgba(250,126,41,0.3)]"
                                : "hover:bg-white/5"
                              }
                            `}
                          >
                            {/* Orange left bar */}
                            {isActive && (
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#FA7E29] rounded-r-full" />
                            )}
                            <Icon
                              size={16}
                              className="shrink-0"
                              color={isActive ? "#FA7E29" : "rgba(202,206,212,0.8)"}
                            />
                            <span
                              className="text-[14px] font-bold leading-5"
                              style={{ color: isActive ? "#FFFFFF" : "rgba(202,206,212,0.8)" }}
                            >
                              {item.label}
                            </span>
                          </div>
                        )}
                      </NavLink>
                    </li>
                  );
                }

                /* ── SUBMENU PARENT ── */
                const isOpen = openMenu === item.label;
                const hasActiveChild = item.submenu.some(
                  (sub) => location.pathname === sub.path
                );

                return (
                  <li key={item.label}>
                    {/* TOGGLE BUTTON */}
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className={`
                        w-full relative flex items-center justify-between gap-3
                        px-3 py-2 rounded-xl border-none
                        transition-colors duration-150 cursor-pointer
                        ${hasActiveChild
                          ? "bg-[rgba(250,126,41,0.3)]"
                          : isOpen
                            ? "bg-white/5"
                            : "hover:bg-white/5 bg-transparent"
                        }
                      `}
                    >
                      {/* Orange left bar when child active */}
                      {hasActiveChild && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#FA7E29] rounded-r-full" />
                      )}

                      <div className="flex items-center gap-3">
                        <Icon
                          size={16}
                          className="shrink-0"
                          color={hasActiveChild ? "#FA7E29" : "rgba(202,206,212,0.8)"}
                        />
                        <span
                          className="text-[14px] font-bold leading-5 text-left"
                          style={{ color: hasActiveChild ? "#FFFFFF" : "rgba(202,206,212,0.8)" }}
                        >
                          {item.label}
                        </span>
                      </div>

                      {/* Chevron: -90deg closed, 0deg open */}
                      <ChevronDown
                        size={18}
                        color="#FFFFFF"
                        className="shrink-0 transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
                      />
                    </button>

                    {/* SUBMENU ITEMS */}
                    {isOpen && (
                      <ul className="list-none m-0 pl-10 flex flex-col">
                        {item.submenu.map((sub) => (
                          <li key={sub.label}>
                            <NavLink to={sub.path} className="no-underline">
                              {({ isActive }) => (
                                <div
                                  className="py-2.5 text-[14px] font-normal leading-5 cursor-pointer transition-colors duration-150"
                                  style={{ color: isActive ? "#FA7E29" : "rgba(202,206,212,0.8)" }}
                                  onMouseEnter={e => {
                                    if (!isActive) e.currentTarget.style.color = "#FFFFFF";
                                  }}
                                  onMouseLeave={e => {
                                    if (!isActive) e.currentTarget.style.color = "rgba(202,206,212,0.8)";
                                  }}
                                >
                                  {sub.label}
                                </div>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;


















// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

// import {
//   LayoutGrid,
//   Database,
//   ClipboardList,
//   Truck,
//   Users,
//   BarChart3,
//   UserCircle2,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";

// import { admin_logo } from "../../assets/assets";

// const Sidebar = () => {
//   const [openMenu, setOpenMenu] = useState("Master Data");

//   const menuSections = [
//     {
//       title: "OVERVIEW",
//       items: [
//         {
//           label: "Dashboard",
//           icon: LayoutGrid,
//           path: "/dashboard",
//         },
//       ],
//     },

//     {
//       title: "OPERATIONS",
//       items: [
//         {
//           label: "Master Data",
//           icon: Database,
//           submenu: [
//             {
//               label: "Categories",
//               path: "/categories",
//             },
//             {
//               label: "Skills",
//               path: "/skills",
//             },
//             {
//               label: "Others",
//               path: "/others",
//             },
//           ],
//         },

//         {
//           label: "Demand Management",
//           icon: ClipboardList,
//           submenu: [
//             {
//               label: "Projects",
//               path: "/projects",
//             },
//             {
//               label: "Material Requirements",
//               path: "/material-requirements",
//             },
//             {
//               label: "Labour Requirements",
//               path: "/labour-requirements",
//             },
//           ],
//         },

//         {
//           label: "Supply Management",
//           icon: Truck,
//           submenu: [
//             {
//               label: "Material Quotations",
//               path: "/material-quotations",
//             },
//             {
//               label: "Labour Supply",
//               path: "/labour-supply",
//             },
//           ],
//         },
//       ],
//     },

//     {
//       title: "ADMINISTRATION",
//       items: [
//         {
//           label: "User Management",
//           icon: Users,
//           submenu: [
//             {
//               label: "Contractor/Builder",
//               path: "/contractor-builder",
//             },
//             {
//               label: "Material Supplier",
//               path: "/material-supplier",
//             },
//             {
//               label: "Labour",
//               path: "/labour",
//             },
//           ],
//         },

//         {
//           label: "Reports",
//           icon: BarChart3,
//           submenu: [
//             {
//               label: "Daily Reports",
//               path: "/daily-reports",
//             },
//             {
//               label: "Monthly Reports",
//               path: "/monthly-reports",
//             },
//           ],
//         },

//         {
//           label: "Profile Management",
//           icon: UserCircle2,
//           path: "/profile-management",
//         },
//       ],
//     },
//   ];

//   const toggleMenu = (menu) => {
//     setOpenMenu(openMenu === menu ? null : menu);
//   };

//   return (
//     <aside className="h-full bg-[#111827] text-white overflow-y-auto">
//       {/* admin_logo */}
//       <div className="p-3">
//         <div className="bg-white rounded-xl px-3 py-3 flex items-center gap-3">
//           <img
//             src={admin_logo}
//             alt="admin_logo"
//             className="w-full h-full object-contain"
//           />
//         </div>
//       </div>

//       {/* MENU */}
//       <div className="px-4 pb-10">
//         {menuSections.map((section) => (
//           <div key={section.title} className="mt-8">
//             {/* SECTION TITLE */}
//             <h2 className="text-[13px] font-bold tracking-wide text-white/90 mb-4">
//               {section.title}
//             </h2>

//             {/* ITEMS */}
//             <div className="space-y-2">
//               {section.items.map((item) => {
//                 const Icon = item.icon;

//                 // SIMPLE LINK
//                 if (!item.submenu) {
//                   return (
//                     <NavLink key={item.label} to={item.path}>
//                       {({ isActive }) => (
//                         <div
//                           className={`
//                             flex items-center gap-3
//                             px-3 py-3 rounded-2xl
//                             transition-all duration-200

//                             ${
//                               isActive
//                                 ? "bg-[#6B3F24] text-white"
//                                 : "text-gray-300 hover:bg-white/5"
//                             }
//                           `}
//                         >
//                           <Icon
//                             size={18}
//                             className={
//                               isActive
//                                 ? "text-[#FB923C]"
//                                 : "text-gray-400"
//                             }
//                           />

//                           <span className="font-semibold text-[15px]">
//                             {item.label}
//                           </span>
//                         </div>
//                       )}
//                     </NavLink>
//                   );
//                 }

//                 // SUBMENU
//                 const isOpen = openMenu === item.label;

//                 return (
//                   <div key={item.label}>
//                     {/* MENU BUTTON */}
//                     <button
//                       onClick={() => toggleMenu(item.label)}
//                       className={`
//                         w-full flex items-center justify-between
//                         px-3 py-3 rounded-2xl
//                         transition-all duration-200

//                         ${
//                           isOpen
//                             ? "bg-[#6B3F24] text-white"
//                             : "text-gray-300 hover:bg-white/5"
//                         }
//                       `}
//                     >
//                       <div className="flex items-center gap-3">
//                         <Icon
//                           size={18}
//                           className={
//                             isOpen
//                               ? "text-[#FB923C]"
//                               : "text-gray-400"
//                           }
//                         />

//                         <span className="font-semibold text-[15px]">
//                           {item.label}
//                         </span>
//                       </div>

//                       {isOpen ? (
//                         <ChevronUp size={16} />
//                       ) : (
//                         <ChevronDown size={16} />
//                       )}
//                     </button>

//                     {/* SUBMENU ITEMS */}
//                     {isOpen && (
//                       <div className="ml-12 mt-2 space-y-3">
//                         {item.submenu.map((sub) => (
//                           <NavLink key={sub.label} to={sub.path}>
//                             {({ isActive }) => (
//                               <div
//                                 className={`
//                                   text-[15px]
//                                   transition-all duration-200

//                                   ${
//                                     isActive
//                                       ? "text-[#FB923C]"
//                                       : "text-gray-400 hover:text-white"
//                                   }
//                                 `}
//                               >
//                                 {sub.label}
//                               </div>
//                             )}
//                           </NavLink>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;