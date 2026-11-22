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
import { isRouteActive, sideBarData } from "./sidebarNav";
export { sideBarData } from "./sidebarNav";
const SIDEBAR_TONE = {
  light: {
    surface: "white-bg",
    idle: "text-iron-600 hover-bg-iron-100 hover-text-iron-900",
    open: "text-iron-900 fw-medium",
    selected: "bg-primary-50 text-primary-600 fw-medium",
    danger: "text-iron-600 hover-bg-red-50 hover-text-red-700",
    railIdle: "text-iron-400 hover-bg-iron-100 hover-text-iron-900",
    railDanger: "text-iron-400 hover-bg-red-50 hover-text-red-700",
    icon: "text-iron-400",
    iconActive: "text-primary-500",
    muted: "text-iron-400",
    toggle: "white-bg text-iron-400 hover-text-primary-600 hover-border-primary-500",
  },
  dark: {
    surface: "dark-bg",
    idle: "text-iron-300 hover-bg-iron-900 hover-text-iron-100",
    open: "text-iron-100 fw-medium",
    selected: "bg-primary-950 text-primary-400 fw-medium",
    danger: "text-iron-300 hover-bg-iron-900 hover-text-red-400",
    railIdle: "text-iron-500 hover-bg-iron-900 hover-text-iron-100",
    railDanger: "text-iron-500 hover-bg-iron-900 hover-text-red-400",
    icon: "text-iron-500",
    iconActive: "text-primary-400",
    muted: "text-iron-500",
    toggle: "dark-bg text-iron-500 hover-text-primary-400 hover-border-primary-500",
  },
};

const sidebarTone = (darkMode) => SIDEBAR_TONE[darkMode ? "dark" : "light"];

const ROW_CLASS =
  "app-sidebar__row d-flex align-items-center gap-2-5 w-100 px-2 border-0 rounded-2 text-start cursor-pointer font-size-sm lh-none";
const RAIL_ITEM_CLASS =
  "app-sidebar__rail-item d-grid place-items-center p-0 border-0 rounded-3 cursor-pointer";
const ICON_PROPS = { size: 16, strokeWidth: 1.6 };

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

function SidebarEdgeToggle({ collapsed, onToggle, darkMode }) {
  const label = collapsed ? "Expand sidebar" : "Collapse sidebar";
  const Icon = collapsed ? ChevronRight : ChevronLeft;
  return (
    <button
      type="button"
      className={`app-sidebar__toggle d-grid place-items-center p-0 rounded-circle cursor-pointer ${sidebarTone(darkMode).toggle}`}
      onClick={onToggle}
      aria-label={label}
      aria-expanded={!collapsed}
      title={label}
    >
      <Icon size={14} strokeWidth={2} />
    </button>
  );
}

function SidebarShell({ darkMode, rail, children }) {
  return (
    <aside
      className={`app-sidebar d-flex flex-column font-size-sm ${sidebarTone(darkMode).surface} ${
        darkMode ? "app-sidebar--dark" : ""
      } ${rail ? "app-sidebar--rail align-items-center" : ""}`}
    >
      {children}
    </aside>
  );
}

function SidebarHead({ rail }) {
  return (
    <div
      className={`app-sidebar__head d-flex align-items-center flex-shrink-0 w-100 ${
        rail ? "justify-content-center" : "ps-3"
      }`}
    >
      <img src="/logo/logo-transparent.png" alt="" className="app-sidebar__logo rounded-1" />
    </div>
  );
}

function SideBarLg({ darkMode, onCollapse }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const tone = sidebarTone(darkMode);
  const activeKey =
    sideBarData.find((group) => isRouteActive(group, pathname))?.key ?? null;
  const [overrides, setOverrides] = useState({});
  useEffect(() => {
    setOverrides({});
  }, [activeKey]);
  const settingsActive = settingRoutes.includes(pathname);

  return (
    <SidebarShell darkMode={darkMode}>
      <SidebarHead />
      <SidebarEdgeToggle collapsed={false} onToggle={onCollapse} darkMode={darkMode} />

      <nav className="app-sidebar__body flex-grow-1 overflow-y-auto overflow-x-hidden p-2" aria-label="Main">
        <ul className="list-unstyled m-0 d-flex flex-column gap-px">
          {sideBarData.map((group) => {
            const isActive = group.key === activeKey;
            const hasMenu = Boolean(group.menuItems?.length);
            const isOpen = hasMenu && (overrides[group.key] ?? isActive);
            const GroupIcon = group.icon;
            const rowTone = isActive ? (hasMenu ? tone.open : tone.selected) : tone.idle;

            return (
              <li key={group.key}>
                <button
                  type="button"
                  className={`${ROW_CLASS} ${rowTone}`}
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
                    {...ICON_PROPS}
                    className={`app-sidebar__icon ${isActive ? tone.iconActive : tone.icon}`}
                  />
                  <span className="flex-grow-1 text-truncate">{group.title}</span>
                  {hasMenu && (
                    <ChevronDown
                      size={14}
                      strokeWidth={1.75}
                      className={`app-sidebar__chevron ${tone.muted} ${
                        isOpen ? "app-sidebar__chevron--open" : ""
                      }`}
                    />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul
                      className="app-sidebar__submenu list-unstyled"
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
                              `app-sidebar__subrow d-flex align-items-center px-2 rounded-2 text-truncate font-size-sm lh-none ${
                                isRouteActive(item, pathname) ? tone.selected : tone.idle
                              }`
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

      <div className="app-sidebar__foot d-flex flex-column gap-px flex-shrink-0 w-100 p-2">
        <button
          type="button"
          className={`${ROW_CLASS} ${settingsActive ? tone.selected : tone.idle}`}
          onClick={() => navigate("/settings/general-settings")}
        >
          <Settings
            {...ICON_PROPS}
            className={`app-sidebar__icon ${settingsActive ? tone.iconActive : tone.icon}`}
          />
          <span className="flex-grow-1 text-truncate">Settings</span>
        </button>
        <ModalButton
          action={{ modalContent: Logout }}
          classname={`${ROW_CLASS} ${tone.danger}`}
        >
          <LogOut {...ICON_PROPS} className={`app-sidebar__icon ${tone.icon}`} />
          <span className="flex-grow-1 text-truncate">Log out</span>
        </ModalButton>
      </div>
    </SidebarShell>
  );
}

function SideBarSm({ darkMode, onExpand }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tone = sidebarTone(darkMode);
  const settingsActive = settingRoutes.includes(pathname);

  return (
    <SidebarShell darkMode={darkMode} rail>
      <SidebarHead rail />
      {onExpand && <SidebarEdgeToggle collapsed onToggle={onExpand} darkMode={darkMode} />}

      <nav className="app-sidebar__body flex-grow-1 overflow-y-auto overflow-x-hidden w-100 py-2" aria-label="Main">
        <ul className="list-unstyled m-0 d-flex flex-column align-items-center gap-0-5">
          {sideBarData.map((group) => (
            <li key={group.key}>
              <SideBarSmTab items={group} darkMode={darkMode} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="app-sidebar__foot d-flex flex-column align-items-center gap-px flex-shrink-0 w-100 py-2">
        <button
          type="button"
          className={`${RAIL_ITEM_CLASS} ${settingsActive ? tone.selected : tone.railIdle}`}
          onClick={() => navigate("/settings/general-settings")}
          aria-label="Settings"
          title="Settings"
        >
          <Settings {...ICON_PROPS} />
        </button>
        <ModalButton
          action={{ modalContent: Logout }}
          classname={`${RAIL_ITEM_CLASS} ${tone.railDanger}`}
        >
          <LogOut {...ICON_PROPS} />
        </ModalButton>
      </div>
    </SidebarShell>
  );
}

function SideBarSmTab({ items, darkMode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const tone = sidebarTone(darkMode);
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
  const highlighted = isActive || isOpen;

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`${RAIL_ITEM_CLASS} ${highlighted ? tone.selected : tone.railIdle}`}
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
                className={`app-sidebar__popover d-flex flex-column p-1-5 rounded-3 font-size-sm ${tone.surface} ${
                  darkMode ? "app-sidebar__popover--dark" : ""
                }`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.14, ease: "easeOut" }}
              >
                <span
                  className={`d-block px-2 pt-1 pb-1-5 font-size-xs fw-semibold text-uppercase tracking-wider ${tone.muted}`}
                >
                  {items.title}
                </span>
                {items.menuItems.map((item) => {
                  const SubMenuIcon = item.icon;
                  const itemActive = isRouteActive(item, pathname);
                  return (
                    <button
                      type="button"
                      key={item.path}
                      className={`app-sidebar__popover-item d-flex align-items-center gap-2 w-100 px-2 border-0 rounded-2 text-start text-nowrap cursor-pointer lh-none ${
                        itemActive ? tone.selected : tone.idle
                      }`}
                      onClick={() => {
                        navigate(item.path);
                        setIsOpen(false);
                      }}
                    >
                      {SubMenuIcon && (
                        <SubMenuIcon
                          size={15}
                          strokeWidth={1.6}
                          className={`app-sidebar__icon ${itemActive ? "" : tone.icon}`}
                        />
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
