import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useScreenSize from "../../hooks/ui/useScreenSize";
import Logout from "../../ModalContent/Auth/Logout";
import { settingRoutes } from "../../utils/paths";
import { ModalButton } from "../DataTableComponents/ActionComponent";
import "./sidebar.css";
import { isRouteActive, sideBarData } from "./sidebarNav";
export { sideBarData } from "./sidebarNav";
const COLLAPSE_KEY = "sss.sidebar.collapsed";
const readCollapsed = () => {
  try {
    return localStorage.getItem(COLLAPSE_KEY) === "1";
  } catch {
    return false;
  }
};
const writeCollapsed = (value) => {
  try {
    localStorage.setItem(COLLAPSE_KEY, value ? "1" : "0");
  } catch {
  }
};
function Sidebar() {
  const { is } = useScreenSize();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const forceRail = is.sm || is.md;

  const toggle = () =>
    setCollapsed((value) => {
      writeCollapsed(!value);
      return !value;
    });

  return forceRail || collapsed ? (
    <SideBarSm darkMode={darkMode} onExpand={forceRail ? undefined : toggle} />
  ) : (
    <SideBarLg darkMode={darkMode} onCollapse={toggle} />
  );
}
export default Sidebar;

// Round button sitting on the sidebar's right border, level with the logo
// row; it collapses the full sidebar to the icon rail and back.
function SidebarEdgeToggle({ collapsed, onToggle }) {
  const label = collapsed ? "Expand sidebar" : "Collapse sidebar";
  const Icon = collapsed ? ChevronRight : ChevronLeft;
  return (
    <button
      type="button"
      className="snav__edge-toggle"
      onClick={onToggle}
      aria-label={label}
      aria-expanded={!collapsed}
      title={label}
    >
      <Icon size={14} strokeWidth={2} />
    </button>
  );
}

function SideBarLg({ darkMode, onCollapse }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeKey =
    sideBarData.find((group) => isRouteActive(group, pathname))?.key ?? null;
  const [overrides, setOverrides] = useState({});
  useEffect(() => {
    setOverrides({});
  }, [activeKey]);

  return (
    <aside className={`snav ${darkMode ? "snav--dark" : ""}`}>
      <div className="snav__head">
        <img src="/logo/logo-transparent.png" alt="" className="snav__logo" />
      </div>
      <SidebarEdgeToggle collapsed={false} onToggle={onCollapse} />

      <nav className="snav__body" aria-label="Main">
        <ul className="snav__list">
          {sideBarData.map((group) => {
            const isActive = group.key === activeKey;
            const hasMenu = Boolean(group.menuItems?.length);
            const isOpen = hasMenu && (overrides[group.key] ?? isActive);
            const GroupIcon = group.icon;

            return (
              <li key={group.key}>
                <button
                  type="button"
                  className={`snav__row ${isActive ? "is-active" : ""}`}
                  aria-expanded={hasMenu ? isOpen : undefined}
                  onClick={() => {
                    if (!isActive) {
                      navigate(group.path);
                      return;
                    }
                    if (hasMenu) {
                      setOverrides((current) => ({
                        ...current,
                        [group.key]: !isOpen,
                      }));
                    }
                  }}
                  
                >
                  <GroupIcon
                    size={16}
                    strokeWidth={1.6}
                    className="snav__icon"
                  />
                  <span 
                  className="snav__label">{group.title}</span>
                  {hasMenu && (
                    <ChevronDown
                      size={14}
                      strokeWidth={1.75}
                      className={`snav__chev ${isOpen ? "is-open" : ""}`}
                    />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul
                      className="snav__sub"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                    >
                      {group.menuItems.map((item) => (
                        <li key={item.path}>
                          <NavLink
                            to={item.path}
                            className={() =>
                              `snav__subrow ${isRouteActive(item, pathname) ? "is-active" : ""}`
                            }
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="snav__foot">
        <button
          type="button"
          className={`snav__row ${settingRoutes.includes(pathname) ? "is-active" : ""}`}
          onClick={() => navigate("/settings/general-settings")}
        >
          <Settings size={16} strokeWidth={1.6} className="snav__icon" />
          <span className="snav__label">Settings</span>
        </button>
        <ModalButton
          action={{ modalContent: Logout }}
          classname="snav__row snav__row--danger"
        >
          <LogOut size={16} strokeWidth={1.6} className="snav__icon" />
          <span className="snav__label">Log out</span>
        </ModalButton>
      </div>
    </aside>
  );
}

function SideBarSm({ darkMode, onExpand }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <aside className={`snav snav--rail ${darkMode ? "snav--dark" : ""}`}>
      <div className="snav__head">
        <img src="/logo/logo-transparent.png" alt="" className="snav__logo" />
      </div>
      {/* small screens force the rail, so there is nothing to expand */}
      {onExpand && <SidebarEdgeToggle collapsed onToggle={onExpand} />}

      <nav className="snav__body" aria-label="Main">
        <ul className="snav__list">
          {sideBarData.map((group) => (
            <li key={group.key}>
              <SideBarSmTab items={group} darkMode={darkMode} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="snav__foot">
        <button
          type="button"
          className={`snav__rail-btn ${settingRoutes.includes(pathname) ? "is-active" : ""}`}
          onClick={() => navigate("/settings/general-settings")}
          aria-label="Settings"
          title="Settings"
        >
          <Settings size={16} strokeWidth={1.6} />
        </button>
        <ModalButton
          action={{ modalContent: Logout }}
          classname="snav__rail-btn snav__row--danger"
        >
          <LogOut size={16} strokeWidth={1.6} />
        </ModalButton>
      </div>
    </aside>
  );
}

function SideBarSmTab({ items, darkMode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = isRouteActive(items, pathname);
  const hasMenu = Boolean(items.menuItems?.length);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "right-start",
    transform: false,
    middleware: [offset(10), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { toggle: true, enabled: hasMenu });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleTriggerClick = useCallback(
    (event) => {
      getReferenceProps().onClick?.(event);
      if (!hasMenu && items.path) navigate(items.path);
    },
    [getReferenceProps, hasMenu, items.path, navigate],
  );

  const MainIcon = items.icon;

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`snav__rail-btn ${isActive ? "is-active" : ""}`}
        aria-label={items.title}
        title={items.title}
        onClick={handleTriggerClick}
      >
        <MainIcon size={16} strokeWidth={isActive ? 2 : 1.6} />
      </button>

      {hasMenu && (
        <FloatingPortal>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={refs.setFloating}
                style={{ ...floatingStyles, zIndex: 9999 }}
                {...getFloatingProps()}
                className={`snav-pop ${darkMode ? "snav-pop--dark" : ""}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.14, ease: "easeOut" }}
              >
                <span className="snav-pop__title">{items.title}</span>
                {items.menuItems.map((item) => {
                  const SubMenuIcon = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.path}
                      className={`snav-pop__item ${isRouteActive(item, pathname) ? "is-active" : ""}`}
                      onClick={() => {
                        navigate(item.path);
                        setIsOpen(false);
                      }}
                    >
                      {SubMenuIcon && (
                        <SubMenuIcon size={15} strokeWidth={1.6} />
                      )}
                      <span>{item.title}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      )}
    </>
  );
}
