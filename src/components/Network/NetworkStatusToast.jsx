// components/Network/NetworkStatusToast.jsx
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import useNetworkStatus from "../../hooks/network/useNetworkStatus";
import ToastDanger from "../Toast/ToastDanger";
import ToastSuccess from "../Toast/ToastSuccess";

function NetworkStatusToast() {
  const isOnline = useNetworkStatus();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isOnline) {
      toast.custom(
        (t) => (
          <ToastSuccess
            title="Back online"
            description="Your internet connection has been restored."
            closeToast={() => toast.dismiss(t.id)}
          />
        ),
        { id: "network-status", duration: 3000 }
      );
    } else {
      toast.custom(
        (t) => (
          <ToastDanger
            title="No internet connection"
            description="You are currently offline. Some features may not work."
            closeToast={() => toast.dismiss(t.id)}
          />
        ),
        { id: "network-status", duration: Infinity }
      );
    }
  }, [isOnline]);

  return null; 
}

export default NetworkStatusToast;