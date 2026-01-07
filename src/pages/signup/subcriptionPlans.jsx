import { Icon } from "@iconify/react";
import { Fragment, useRef } from "react";
import { useSelector } from "react-redux";
import NumberFlow from "@number-flow/react";
import { useGetSubscriptionPlans } from "../../hooks/subscription/useGetSubscriptionPlans";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import SubscriptionPayment from "../../ModalContent/SubscriptionPayment/SubscriptionPayment";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
function SubcriptionPlan() {
  const schoolCredentials = useSelector((state) => state.auth.schoolAuthData);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { data: data, isLoading, error } = useGetSubscriptionPlans(schoolCredentials.country_id.id);
  return (
    <>
      <div
        className={`${
          darkMode ? "dark-bg dark-mode-text" : "white-bg"
        } w-100 height-100 pt-3 d-flex flex-column pb-5`}
      >
        <div className="container">
          <div className="d-flex flex-row align-items-center w-100 justify-content-between px-3">
            <div className="signup-app-logo">
              <img
                src="/logo/blue_logo.png"
                alt=""
                className="signup-app-logo"
              />
            </div>
            <div className="d-flex flex-row gap-4">
              <button
                className={`${
                  darkMode
                    ? "dark-bg-light dark-mode-text border-none"
                    : "bg-white border"
                }  rounded-pill px-3 py-2  font-size-sm`}
              >
                Save And Exit
              </button>
              <button
                className={`${
                  darkMode
                    ? "dark-bg-light dark-mode-text border-none"
                    : "bg-white border"
                }  rounded-pill px-3 py-2  font-size-sm`}
              >
                Questions?
              </button>
            </div>
          </div>
          <h4 className="text-center my-4 text-white">
            Choose The Best Plan For Your School
          </h4>
          {isLoading ? (
            <div className="d-flex flex-row align-items-center gap-3">
              {[...Array(4)].map((_items, index) => (
                <RectangleSkeleton key={index} height="60dvh" width="25%" speed={1}/>
              ))}
            </div>
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : (
            <div className="d-flex gap-3  flex-row justify-content-center">
              {data.data.map((items) => (
                <Fragment key={items.id}>
                  <div
                    className={`${
                      darkMode
                        ? "card  rounded-4 d-flex flex-column p-2 dark-bg dark-mode-text dark-mode-border"
                        : "card rounded-4 d-flex flex-column p-2"
                    }`}
                    style={{ width: "25%", height: "auto" }}
                  >
                    <div className="d-flex flex-row justify-content-between align-items-center mt-2">
                      <span className="fw-semibold fs-lg text-white">
                        {items.name}
                      </span>
                      {items.key == "professional.plan" && (
                        <button
                          className={`${
                            darkMode ? "dark-bg-light text-white" : null
                          } border-none rounded-pill font-size-xs py-1 px-2 d-flex gap-2`}
                        >
                          <span>
                            <Icon icon="streamline-plump:trending-content-solid" />
                          </span>
                          <span>Most Popular</span>
                        </button>
                      )}
                    </div>
                    <div>
                      <p className="font-size-xs gainsboro-color mt-3">
                        {items.description}
                      </p>
                    </div>
                    <div>
                      <h1
                        className="mt-2 fw-bold text-white"
                        style={{ fontSize: "1.4rem" }}
                      >
                        {items.country.currency}{" "}
                        <NumberFlow value={items.price} />
                        <span className="font-size-sm gainsboro-color fw-medium ms-1 p-0">
                          /Year
                        </span>
                      </h1>
                    </div>
                    <span
                      className="font-size-sm my-2 pb-1"
                      style={{
                        borderBottom: `${
                          darkMode ? "1px solid #333" : "1px solid #f5f5f5"
                        }`,
                      }}
                    ></span>
                    <div className="d-flex flex-column gap-2 mb-2">
                      {items.plan_feature.map((items) => (
                        <Fragment key={items.id}>
                          <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2">
                            <span>
                              <Icon icon="jam:check" className="green-color" />
                            </span>
                            <span>{items?.feature?.name}</span>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                    <div className="w-100 mt-auto">
                      <ModalButton
                        action={{ modalContent: SubscriptionPayment }}
                        rowData={{
                          plan_id: items.id,
                          country_id: schoolCredentials.country_id.id,
                          currency: items.country.currency,
                          price: items.price,
                        }}
                        size={"xl"}
                      >
                        <button
                          className={`border-none p-2 w-100 rounded-3 dark-bg-light text-white  font-size-sm 
                        ${
                          items.key == "professional.plan"
                            ? "primary-background text-white"
                            : null
                        }
                        `}
                        >
                          Pick Plan
                        </button>
                      </ModalButton>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default SubcriptionPlan;
