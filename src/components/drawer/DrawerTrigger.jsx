import { useState } from "react";
import { Drawer } from "./Drawer";

export default function DrawerTrigger({
  children,
  className,
  style,
  placement = "right",
  title,
  drawerData,
  drawerChildren
}) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  const handleShow = (Component) => {
    setDrawerContent(
      <Component
        handleClose={handleClose}
        drawerData={drawerData}
      />,
    );
    setShowDrawer(true);
  };

  const handleClose = () => {
    setShowDrawer(false);
    setDrawerContent(null);
  };

  return (
    <>
      <div>
        <div
          className={`${className} pointer-cursor`}
          style={style}
          onClick={(e) => {
            e.stopPropagation();
            handleShow(drawerChildren);
          }}
        >
          {children}
        </div>
      </div>
      <Drawer
        isOpen={showDrawer}
        onClose={handleClose}
        placement={placement}
        title={title ?? action.title}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}