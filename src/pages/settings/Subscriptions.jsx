import { Icon } from "@iconify/react";
import { Fragment } from "react";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { useSelector } from "react-redux";
import NumberFlow from "@number-flow/react";
function Subscriptions() {
  return (
    <>
      <div className="d-flex flex-column gap-4 setting-container px-2">
        <div className="d-flex flex-column">
          <span className="fw-semibold">Subscription & Billing</span>
          <span className="font-size-sm">
            Manage your current plan, billing history, and subscription changes.
          </span>
        </div>
        <div className="d-flex flex-column gap-2">
          <div>
            <span className="fw-semibold">Current Plan</span>
          </div>
          <div className="card p-3 rounded-4 d-flex flex-column gap-3 border-none shadow-sm">
            <div className="d-flex flex-row align-items-center w-100 justify-content-start">
              <div
                style={{ background: "#e4f5e3", color: "#9ed89d", width: "5%" }}
                className="d-flex flex-row rounded-3 align-items-center justify-content-center"
              >
                <span className="font-size-sm">active</span>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-between w-100">
              <div className="d-flex flex-row w-100 justify-content-between">
                <div className="d-flex flex-row align-items-center w-50 justify-content-between">
                  <div className="d-flex flex-row align-items-center gap-1">
                    <span className="font-size- fw-medium">Ultimate Plan</span>
                  </div>
                </div>
              </div>
              <div>
                <span>
                  <Icon icon="lsicon:setting-outline" width="24" height="24" />
                </span>
              </div>
            </div>
            <div>
              <span style={{ fontSize: "1rem" }}>
                100,000 XAF /<span style={{ fontSize: "0.75rem" }}>Year</span>
              </span>
            </div>
            <div className="d-flex flex-column gap-1">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <span className="font-size-sm">Plan Usage</span>
                <span className="font-size-sm">65%</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "0.5rem",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "1rem",
                }}
              >
                <div
                  style={{
                    width: "35%",
                    height: "100%",
                    backgroundColor: "#9ed89d",
                    borderRadius: "1rem",
                  }}
                ></div>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-between w-100">
              <button className="border-none p-2 rounded-3 primary-background text-white font-size-sm">
                Upgrade Plan
              </button>
              <div className="d-flex flex-row align-items-center gap-3">
                <div className="d-flex flex-row gap-1 align-items-center">
                  <span className="font-size-sm">
                    <Icon
                      icon="fluent:calendar-cancel-20-regular"
                      width="24"
                      height="24"
                    />
                  </span>
                <div className="d-flex flex-row align-items-center gap-2">
                  <span className="font-size-sm">Jan 10, 2025,</span>
                  <span className="font-size-sm">30 Days Left</span>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-between w-100">
          <div style={{ width: "33.3%", borderBottom: "3px solid #0EA7E9" }}>
            <button
              style={{ width: "100%" }}
              className="border-none bg-transparent py-2"
            >
              <div>
                <span className="font-size-sm color-primary">
                  Plans & Renewal
                </span>
              </div>
            </button>
          </div>
          <div style={{ width: "33.3%", borderBottom: "3px solid #eee" }}>
            <button
              style={{ width: "100%" }}
              className="border-none bg-transparent py-2"
            >
              <div>
                <span className="font-size-sm">Usage & Limits</span>
              </div>
            </button>
          </div>
          <div style={{ width: "33.3%", borderBottom: "3px solid #eee" }}>
            <button
              style={{ width: "100%" }}
              className="border-none bg-transparent py-2"
            >
              <div>
                <span className="font-size-sm">Transactions</span>
              </div>
            </button>
          </div>
        </div>
        <PlanRenewal />
      </div>
    </>
  );
}
export default Subscriptions;

function MaxPlan() {
  return (
    <>
      <div
        className="card p-3 rounded-4 position-relative overflow-hidden shadow-sm border-none"
        style={{ minHeight: "320px" }}
      >
        <img
          src="/images/con-img.svg"
          alt=""
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
          style={{ zIndex: 1 }}
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            zIndex: 2,
          }}
        />
        <div
          className="position-relative d-flex flex-column align-items-center justify-content-center text-center gap-3 h-100"
          style={{ zIndex: 3 }}
        >
          <div className="mb-2">
            <Icon
              icon="material-symbols:crown"
              width="60"
              height="60"
              color="#ffd700"
            />
          </div>

          <h6
            className="mb-1 fw-bold"
            style={{ fontSize: "1.4rem", color: "#224524" }}
          >
            Complete access confirmed
          </h6>

          <div
            className="d-flex flex-column gap-2 align-items-center"
            style={{ color: "#275428" }}
          >
            <span className="fw-semibold" style={{ fontSize: "1.1rem" }}>
              Full Enterprise Access Enabled
            </span>

            <p className="mb-0 font-size-sm tracking-wide">
              Your organization is subscribed to our highest service tier,
              <br />
              providing unrestricted access to all platform capabilities,
              <br />
              advanced controls, and maximum service limits.
            </p>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column gap-3 card border-none rounded-4 p-3">
        <span>Plan Features</span>
        <div className="d-flex flex-column gap-2">
            <div className="font-size-sm d-flex flex-row gap-2">
          <span className="green-color">
            <Icon icon="icon-park-solid:check-one" width="16" height="16" />
          </span>
          <span>Feature 1</span>
        </div>
        <div className="font-size-sm d-flex flex-row gap-2">
          <span className="green-color">
            <Icon icon="icon-park-solid:check-one" width="16" height="16" />
          </span>
          <span>Feature 1</span>
        </div>
        <div className="font-size-sm d-flex flex-row gap-2">
          <span className="green-color">
            <Icon icon="icon-park-solid:check-one" width="16" height="16" />
          </span>
          <span>Feature 1</span>
        </div>
        <div className="font-size-sm d-flex flex-row gap-2">
          <span className="green-color">
            <Icon icon="icon-park-solid:check-one" width="16" height="16" />
          </span>
          <span>Feature 1</span>
        </div>
        <div className="font-size-sm d-flex flex-row gap-2">
          <span className="green-color">
            <Icon icon="icon-park-solid:check-one" width="16" height="16" />
          </span>
          <span>Feature 1</span>
        </div>
        </div>
      </div>
      <div className="d-flex flex-column gap-3">
        <span>What Happens Next</span>
       <div className="d-flex flex-column gap-2">
         <div className="font-size-sm d-flex flex-row gap-2">
          <span>
            <Icon icon="icon-park-outline:dot" width="16" height="16" />
          </span>
          <span>Your access continues without interruption</span>
        </div>
        <div className="font-size-sm d-flex flex-row gap-2">
          <span>
            <Icon icon="icon-park-outline:dot" width="16" height="16" />
          </span>
          <span className="tracking-wide">All features and integrations remain enabled</span>
        </div>
        <div className="font-size-sm d-flex flex-row gap-2">
          <span>
            <Icon icon="icon-park-outline:dot" width="16" height="16" />
          </span>
          <span>No action is required unless you want to make changes.</span>
        </div>
       </div>
      </div>
      <div className="d-flex flex-column gap-3 card p-3 rounded-4 border-none shadow-sm">
        <div className="d-flex flex-column">
          <span className="fw-medium">Need More Than This Plan</span>
          <span className="font-size-sm">
            If your organization requires higher limits, custom features, or
            dedicated infrastructure, our team can help
          </span>
        </div>
        <button className="font-size-sm p-2 rounded-3 border-none text-white w-25 primary-background">
          Contact Sales
        </button>
      </div>
    </>
  );
}

function PlanRenewal() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <div className="d-flex flex-row justify-content-between gap-4 w-100">
        <div className="d-flex flex-column justify-content-center align-items-center w-50 gap-2">
          <span className="font-size-sm">Current Plan</span>
          <div
            className={`${
              darkMode ? "dark-bg dark-mode-text dark-mode-border" : "border"
            }  card rounded-4 d-flex flex-column gap-3 p-3`}
            style={{ width: "75%" }}
          >
            <div className="d-flex flex-row justify-content-between align-items-center">
              <span className="fw-semibold fs-lg">Ultimate Plan</span>
              <button
                className={`${
                  darkMode ? "dark-bg-light text-white" : null
                } border-none rounded-pill font-size-xs py-1 px-2 d-flex gap-2`}
              >
                <span>
                  <Icon icon="streamline-plump:trending-content-solid" />
                </span>
                <span>Recommended</span>
              </button>
            </div>
            <div>
              <p
                className="font-size-xs gainsboro-color p-0"
                style={{ fontSize: "0.7rem" }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                assumenda, debitis libero ab esse ipsum dolore
              </p>
            </div>
            <div>
              <h1
                className="fw-medium"
                style={{ fontSize: "1.5rem", lineHeight: 1 }}
              >
                XAF <NumberFlow value={10000} />
                <span className="font-size-sm gainsboro-color fw-medium ms-1">
                  /Year
                </span>
              </h1>
            </div>
            <hr />
            <div className="d-flex flex-column gap-3">
              {[...Array(7)].map((_, index) => (
                <Fragment key={index}>
                  <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2">
                    <span>
                      <Icon icon="jam:check" className="green-color" />
                    </span>
                    <span>Feature {index + 1}</span>
                  </div>
                </Fragment>
              ))}
            </div>
            <div className="w-100">
              <ModalButton
                //action={{ modalContent: SubscriptionPayment }}
                //   rowData={{
                //     plan_id: items.id,
                //     country_id: schoolCredentials.country_id.id,
                //     currency: items.country.currency,
                //     price: items.price,
                //   }}
                size={"xl"}
              >
                <button
                  className={`border-none p-2 w-100 rounded-3 text-dark  font-size-sm`}
                >
                  Renew Plan
                </button>
              </ModalButton>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center w-50 gap-2">
          <span className="font-size-sm">Recommended Plan</span>
          <div
            className={`${
              darkMode ? "dark-bg dark-mode-text dark-mode-border" : "border"
            }  card rounded-4 d-flex flex-column gap-3 p-3`}
            style={{ width: "75%" }}
          >
            <div className="d-flex flex-row justify-content-between align-items-center">
              <span className="fw-semibold fs-lg">Ultimate Plan</span>
              <button
                className={`${
                  darkMode ? "dark-bg-light text-white" : null
                } border-none rounded-pill font-size-xs py-1 px-2 d-flex gap-2`}
              >
                <span>
                  <Icon icon="streamline-plump:trending-content-solid" />
                </span>
                <span>Recommended</span>
              </button>
            </div>
            <div>
              <p
                className="font-size-xs gainsboro-color p-0 "
                style={{ fontSize: "0.7rem" }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                assumenda, debitis libero ab esse ipsum dolore
              </p>
            </div>
            <div>
              <h1
                className="fw-medium"
                style={{ fontSize: "1.5rem", lineHeight: 1 }}
              >
                XAF <NumberFlow value={10000} />
                <span className="font-size-sm gainsboro-color fw-medium ms-1">
                  /Year
                </span>
              </h1>
            </div>
            <hr />
            <div className="d-flex flex-column gap-3">
              {[...Array(7)].map((_, index) => (
                <Fragment key={index}>
                  <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2">
                    <span>
                      <Icon icon="jam:check" className="green-color" />
                    </span>
                    <span>Feature {index + 1}</span>
                  </div>
                </Fragment>
              ))}
            </div>
            <div className="w-100">
              <ModalButton
                //action={{ modalContent: SubscriptionPayment }}
                //   rowData={{
                //     plan_id: items.id,
                //     country_id: schoolCredentials.country_id.id,
                //     currency: items.country.currency,
                //     price: items.price,
                //   }}
                size={"xl"}
              >
                <button
                  className={`border-none p-2 w-100 rounded-3 primary-background text-white  font-size-sm`}
                >
                  Renew Plan
                </button>
              </ModalButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
