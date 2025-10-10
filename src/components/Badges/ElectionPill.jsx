import { Icon } from "@iconify/react";

const ELECTION_STATUS_MAP = {
  ongoing: {
    className: "pill-success",
    icon: "fluent:live-20-regular",
    text: "Ongoing",
  },
  upcoming: {
    className: "pill-warning",
    icon: "material-symbols-light:upcoming-outline",
    text: "Upcoming",
  },
  pending: {
    className: "pill-pending",
    icon: "material-symbols:pending-outline",
    text: "Pending",
  },
  finished:{
    className:"pill-success",
    icon:"icon-park-solid:check-one",
    text:"Finished"
  },
  ended:{
    className:"pill-success",
    icon:"icon-park-solid:check-one",
    text:"Finished"
  },
  approved:{
    className:"pill-success",
    icon:"icon-park-solid:check-one",
    text:"Approved"
  },
  rejected:{
     className:"pill-warning",
     icon:"fluent:warning-32-regular",
     text:"Rejected"
  },
  active:{
    className:"pill-success",
    icon:"icon-park-solid:check-one",
    text:"Qualified"
  },
  inactive:{
     className:"pill-warning",
     icon:"fluent:warning-32-regular",
     text:"Disqualified"
  }
};
function ElectionPill({ value }) {
  const statusKey = value && ELECTION_STATUS_MAP.hasOwnProperty(value)
    ? value
    : 'pending';

  const { className, icon, text } = ELECTION_STATUS_MAP[statusKey];

  return (
    <span className={`${className}`}>
      <Icon icon={icon} className="pill-icon" />
      <span>{text}</span>
    </span>
  );
}

ElectionPill.defaultProps = {
  value: 'pending', 
};

export default ElectionPill;