import { Icon } from "@iconify/react";
function BreakPeriodCard({ slot }) {
  return (
    <>
      <div
        className="card font-size-sm p-2 d-flex flex-column gap-3 border-none shadow-sm"
        style={{
          width: "49%",
          borderRadius: "0.85rem",
        }}
      >
        <div className="d-flex flex-column gap-1">
          <div className="d-flex flex-row align-items-center gap-2">
            <Icon icon="ion:restaurant-outline" width="16" height="16" />
            <span className="fw-semibold">Break Period</span>
          </div>
          <div className="d-flex flex-row align-items-center gap-1 opacity-0">
            <div className="d-flex flex-row align-items-center gap-2">
              <span style={{ lineHeight: 0 }}>
                <Icon icon="streamline-flex:city-hall" width="16" height="16" />
              </span>
              <span className="fw-medium">{slot?.hall_name}</span>
            </div>
            <span style={{ lineHeight: 0 }}>
              <Icon icon="bi:dot" width="16" height="16" />
            </span>
            <div className="d-flex flex-row align-items-center gap-2">
              <span style={{ lineHeight: 0 }}>
                <Icon icon="iconamoon:location-light" width="16" height="16" />
              </span>
              <span className="fw-medium">{slot?.hall_location}</span>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center gap-1 opacity-0">
          <div>
            <img
              src="./images/user.png"
              alt="user-image"
              style={{
                width: "1.75rem",
                height: "1.75rem",
              }}
            />
          </div>
          <span>{slot?.teacher_name}</span>
        </div>
        <div className="d-flex flex-row align-items-center gap-1">
          <span style={{ lineHeight: 0 }}>
            <Icon icon="formkit:time" width="16" height="16" />
          </span>
          <div className="d-flex flex-row align-items-center fw-semibold">
            <span>{slot?.start_time}</span>
            <span>
              <Icon icon="radix-icons:dash" width="16" height="16" />
            </span>
            <span>{slot?.end_time}</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default BreakPeriodCard;
