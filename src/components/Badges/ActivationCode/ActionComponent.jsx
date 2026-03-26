import { Icon } from "@iconify/react";
import { toast } from "react-hot-toast";
import ToastSuccess from "../../Toast/ToastSuccess";
import ToastWarning from "../../Toast/ToastWarning";
function ActionComponent(props) {
  const handleCopy = async () => {
    const codeToCopy = props.data?.code;

    if (codeToCopy) {
      try {
        await navigator.clipboard.writeText(codeToCopy);
        toast.custom(
          <ToastSuccess
            title="Code Copied"
            description={`Activation code ${codeToCopy} is now on your clipboard.`}
          />
        );
      } catch (err) {
        toast.custom(
          <ToastWarning
            title="Copy Failed"
            description="We couldn't access your clipboard. Please try again or copy the code manually."
          />
        );
      }
    }
  };

  return (
    <div className="d-flex flex-row gap-2 align-items-center justify-content-center h-100">
      <span
        style={{ lineHeight: 0, cursor: "pointer" }}
        onClick={handleCopy}
        title="Copy to clipboard"
      >
        <Icon icon="solar:copy-linear" width="20" height="20" />
      </span>
    </div>
  );
}

export default ActionComponent;
