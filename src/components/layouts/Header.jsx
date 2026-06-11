import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import { PanelLeft, Bell, LogOut } from "lucide-react";

import { useDispatch, useSelector }
  from "react-redux";

import { clearUser }
  from "../../redux/reducers/authSlice";


import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, pageTitle = "Dashboard", pageSubtitle = "Overview of construction operations" }) => {

  const dispatch =
    useDispatch();

  const navigate = useNavigate();

  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  const [showNotificationMenu, setShowNotificationMenu] =
    useState(false);

  const notificationRef = useRef(null);


  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const profileRef =
    useRef(null);


  useEffect(() => {
    function handleClickOutside(event) {

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotificationMenu(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);



  function handleLogout() {
    dispatch(
      clearUser()
    );

    setShowProfileMenu(
      false
    );
  }

  return (
    <header
      className="
        flex items-center w-full h-16
        px-3 gap-3
        bg-[#F8FAFCCC] backdrop-blur-xs
        border-b border-[#E3E8EC]
      "
    >
      {/* ── LEFT: toggle + page info ── */}
      <div className="flex items-center gap-3 min-w-0">

        {/* Sidebar toggle */}
        <button
          onClick={toggleSidebar}
          className="
            flex items-center justify-center
            w-7 h-7 rounded-xl shrink-0
            hover:bg-black/5 transition-colors duration-150
          "
          aria-label="Toggle sidebar"
        >
          <PanelLeft size={16} strokeWidth={1.5} color="#626975" />
        </button>

        {/* Title + subtitle */}
        <div className="flex flex-col justify-center min-w-0">
          <p
            className="
              font-['Inter'] font-bold text-[16px] leading-5
              text-[#0C121A] m-0 truncate
            "
          >
            {pageTitle}
          </p>
          <p
            className="
              font-['Inter'] font-normal text-[12px] leading-4
              text-[#626975] m-0 truncate
              hidden sm:block
            "
          >
            {pageSubtitle}
          </p>
        </div>
      </div>

      {/* ── RIGHT: bell + profile ── */}
      <div className="flex items-center gap-3 ml-auto shrink-0">

        {/* Notification bell */}
        {/* <button
          className="
            relative flex items-center justify-center
            w-9 h-9 shrink-0
            bg-white border border-[#E3E8EC] rounded-[14px]
            hover:bg-gray-50 transition-colors duration-150
          "
          aria-label="Notifications"
        >
          <Bell size={16} strokeWidth={1.5} color="#626975" />
          <span
            className="
              absolute top-[7px] right-[7px]
              w-2 h-2 rounded-full
              bg-[#FA7E29]
              ring-2 ring-[#F8FAFC]
            "
          />
        </button> */}


        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            onClick={() =>
              setShowNotificationMenu(
                !showNotificationMenu
              )
            }
            className="
      relative flex items-center justify-center
      w-9 h-9 shrink-0
      bg-white border border-[#E3E8EC] cursor-pointer
      rounded-[14px]
      hover:bg-gray-50
      transition-colors duration-150
    "
          >
            <Bell
              size={16}
              strokeWidth={1.5}
              color="#626975"
            />

            {notifications.length > 0 && (
              <span
                className="
          absolute -top-1 -right-1
          min-w-5 h-5 px-1
          rounded-full
          bg-[#FA7C14]
          text-white
          text-[10px]
          font-semibold
          flex items-center justify-center
        "
              >
                {notifications.length}
              </span>
            )}
          </button>

          {showNotificationMenu && (
            <div
              className="
        absolute
        right-0
        top-[calc(100%+10px)]
        w-[350px]
        bg-white
        border
        border-[#E3E8EC]
        rounded-2xl
        shadow-lg
        overflow-hidden
        z-50
      "
            >
              <div className="p-4 border-b border-[#E3E8EC]">
                <h3 className="font-semibold text-[#0C121A]">
                  Notifications
                </h3>
              </div>

              <div
                className="
          max-h-[350px]
          overflow-y-auto
        "
              >
                {notifications.length > 0 ? (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        navigate(item.route);
                        setShowNotificationMenu(false);
                      }}
                      className="
                p-4
                border-b
                border-[#E3E8EC]
                cursor-pointer
                hover:bg-gray-50
                transition
              "
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm text-[#0C121A]">
                          {item.title}
                        </h4>

                        <span
                          className="
                    bg-[#FA7C14]
                    text-white
                    text-xs
                    px-2
                    py-1
                    rounded-full
                  "
                        >
                          {item.count}
                        </span>
                      </div>

                      <p className="text-xs text-[#626975] mt-1">
                        {item.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500 text-sm">
                    No Notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>



        {/* Profile pill */}
        <div
          ref={profileRef}
          className="relative"
        >
          <div
            onClick={() =>
              setShowProfileMenu(
                !showProfileMenu
              )
            }
            className="
      flex
      items-center
      gap-2.5
      pl-1
      pr-3
      py-1
      bg-white
      border
      border-[#E3E8EC]
      rounded-[14px]
      cursor-pointer
      hover:bg-gray-50
      transition-all
      duration-150
    "
          >
            {/* Avatar circle */}
            <div
              className="
        flex
        items-center
        justify-center
        w-7
        h-7
        rounded-full
        shrink-0
        bg-[rgba(250,126,41,0.15)]
      "
            >
              <span
                className="
          font-['Inter']
          font-bold
          text-[12px]
          leading-4
          text-[#FA7E29]
        "
              >
                AD
              </span>
            </div>

            {/* Name + role */}
            <div
              className="
        hidden
        sm:flex
        flex-col
        items-start
        gap-0
      "
            >
              <span
                className="
          font-['Inter']
          text-[12px]
          text-[#0C121A]
          whitespace-nowrap
        "
              >
                Admin
              </span>

              <span
                className="
          font-['Inter']
          text-[10px]
          text-[#626975]
          whitespace-nowrap
        "
              >
                Administrator
              </span>
            </div>
          </div>

          {/* Dropdown */}
          {showProfileMenu && (
            <div
              className="
        absolute
        right-0
        top-[calc(100%+10px)]
        w-[180px]
        bg-white
        border
        border-[#E3E8EC]
        rounded-2xl
        shadow-lg
        overflow-hidden
        z-50
      "
            >
              <button
                onClick={handleLogout}
                className="
          w-full
          flex
          items-center
          px-4
          py-3
          text-sm
          text-[#BA1A1A]
          hover:bg-red-50
          transition-colors
          duration-150 cursor-pointer
        "
              >
                <LogOut size={16} strokeWidth={1.5} color="#BA1A1A" />
                <span className="ml-2">Logout</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;