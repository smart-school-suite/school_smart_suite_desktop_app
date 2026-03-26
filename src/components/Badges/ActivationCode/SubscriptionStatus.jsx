import { userSubscriptionStatus } from "../../../ComponentConfig/BadgeConfig";
import { Icon } from "@iconify/react";
const SubscriptionStatus = (props) => {
  const stateConfig = userSubscriptionStatus.find(
    (item) => item.state == props.value
  );
  if (!stateConfig) return <span>{props.value}</span>;
  return (
    <span className={`${stateConfig.className}`}>
      <Icon icon={stateConfig.icon}  className="pill-icon"  />
      <span>{stateConfig.state}</span>
    </span>
  );
};
export default SubscriptionStatus;