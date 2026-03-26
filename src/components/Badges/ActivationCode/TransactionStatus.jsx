import { activationCodeTransactionStates } from "../../../ComponentConfig/BadgeConfig";
import { Icon } from "@iconify/react";
const TransactionStatus = (props) => {
  const stateConfig = activationCodeTransactionStates.find(
    (item) => item.state == props.value
  );
  if (!stateConfig) return <span>{props.value}</span>;
  return (
    <div className={`pill-container ${stateConfig.className}`}>
      <Icon icon={stateConfig.icon}  className="pill-icon"  />
      <span>{stateConfig.state}</span>
    </div>
  );
};
export default TransactionStatus;