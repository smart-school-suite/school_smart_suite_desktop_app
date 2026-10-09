import { Icon } from "@iconify/react";
import { Fragment, useRef } from "react";
import { useSelector } from "react-redux";
import NumberFlow from "@number-flow/react";
import { useGetSubscriptionPlans } from "../../hooks/subscription/useGetSubscriptionPlans";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SubscriptionCheckOutWizzard from "../../DrawerContent/Subscription/SubscriptionCheckout/SubscriptionCheckoutWizzard";
function SubcriptionPlan() {
  const navigate = useNavigate();
  const schoolCredentials = useSelector((state) => state.auth.schoolAuthData);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const {
    data: data,
    isLoading,
    error,
  } = useGetSubscriptionPlans(schoolCredentials.country_id.id);
  return (
    <>
      <div
        className={`${
          darkMode ? "dark-bg dark-mode-text" : "white-bg"
        } w-100 height-100 pt-3 d-flex flex-column pb-5`}
        style={{ color:"#333"}}
      >
        <div className="container" style={{ maxWidth: "1500px" }}>
          <div className="d-flex flex-column gap-5">
            <div className="d-flex flex-row align-items-center justify-content-between font-size-sm">
              <div className="app-logo">
                <img
                  src="/logo/logo-transparent.png"
                  alt="Logo"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    objectFit: "contain",
                    borderRadius: "0.4rem",
                  }}
                />
              </div>
              <span style={{ cursor: "pointer" }}>Need help ?</span>
            </div>
            <h4 className="text-center my-2" >
              Choose The Best Plan For Your School
            </h4>
            {isLoading ? (
              <div className="d-flex flex-row align-items-center gap-3">
                {[...Array(4)].map((_items, index) => (
                  <RectangleSkeleton
                    key={index}
                    height="60dvh"
                    width="25%"
                    speed={1}
                  />
                ))}
              </div>
            ) : error ? (
              <NotFoundError
                title={error?.response?.data?.errors?.title}
                description={error?.response?.data?.errors?.description}
              ></NotFoundError>
            ) : (
              <div className="d-flex gap-4  flex-row justify-content-center">
                {data.data.map((items) => (
                  <Fragment key={items.id}>
                    <div
                      className={`${
                        darkMode
                          ? "card  rounded-4 d-flex flex-column p-2 dark-bg dark-mode-text dark-mode-border"
                          : "card rounded-4 d-flex flex-column p-2 border-none border"
                      } shadow-sm`}
                      style={{ width: "25%", height: "auto" }}
                    >
                      <div className="d-flex flex-row justify-content-between align-items-center mt-2">
                        <span className="fw-semibold fs-lg">{items.name}</span>
                        {items.key == "professional.plan" && (
                          <button
                            className={`${
                              darkMode ? "dark-bg-light" : null
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
                      <p className="font-size-sm text-iron-400 fw-light mt-3">
                          {items.description}
                        </p>
                      </div>
                      <div>
                        <h1
                          className="mt-2 fw-bold"
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
                                <Icon
                                  icon="jam:check"
                                  className="green-color"
                                />
                              </span>
                              <span className="text-iron-500">
                                {items?.feature?.name}
                              </span>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                      <div className="w-100 mt-auto">
                        <DrawerTrigger
                          title="Complete Your School Subscription"
                          placement="right"
                          drawerChildren={SubscriptionCheckOutWizzard}
                          showHeader={true}
                          closeOnOutsideClick={false}
                          drawerData={{
                            plan_id: items?.id,
                            plan: items,
                            country_id: schoolCredentials?.country_id?.id,
                            currency: items?.country?.currency,
                            price: items?.price,
                          }}
                          size={"xl"}
                        >
                          <button
                            className={`p-2 font-size-sm bg-none rounded-pill border-none border w-100
                        ${
                          items.key == "professional.plan"
                            ? "primary-background"
                            : null
                        }
                        `}
                          >
                            Pick Plan
                          </button>
                        </DrawerTrigger>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
        
        )}
          </div>
        
        </div>
        <div className="mt-auto px-3">
          <button 
           className="border-none bg-none border-bottom font-size-sm d-flex flex-row align-items-center gap-1"
           onClick={() => navigate("/create-schoolbranch")}
           >
            <ArrowLeft size={16}/>
            <span>Back to Create Branch</span>
          </button>
        </div>
      </div>
    </>
  );
}
export default SubcriptionPlan;
