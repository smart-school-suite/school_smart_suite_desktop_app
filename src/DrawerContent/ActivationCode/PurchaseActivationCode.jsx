import { useState, useMemo, Fragment } from "react";
import { Minus, Plus, KeyRound } from "lucide-react";
import { useGetActivationCodeTypes } from "../../hooks/activationCode/useGetActivationCodeType";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { formatNumber } from "../../utils/functions";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { setPurchaseCodeContext } from "../../Slices/activationCode/activationCodeSlice";
import { useDispatch } from "react-redux";

function PurchaseActivationCode({
  handleClose,
  nextStep,
  fullStep,
  currentStep,
}) {
  const dispatch = useDispatch();
  const {
    data: activationCodeTypes,
    isLoading,
    error,
  } = useGetActivationCodeTypes();

  const codeList = useMemo(() => activationCodeTypes?.data || [], [activationCodeTypes]);

  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, value) => {
    const safeValue = Math.max(0, parseInt(value, 10) || 0);
    setQuantities((prev) => ({
      ...prev,
      [id]: safeValue,
    }));
  };

  const { itemsBreakdown, grandTotal, totalCodes, currencySymbol } = useMemo(() => {
    let total = 0;
    let codeCount = 0;

    const breakdown = codeList.map((item) => {
      const qty = quantities[item?.id] || 0;
      const unitPrice = parseFloat(item?.price) || 0;
      const subtotal = qty * unitPrice;

      total += subtotal;
      codeCount += qty;

      return {
        ...item,
        qty,
        unitPrice,
        subtotal,
      };
    });

    const currency = codeList[0]?.country?.currency || "";

    return {
      itemsBreakdown: breakdown,
      grandTotal: total,
      totalCodes: codeCount,
      currencySymbol: currency,
    };
  }, [codeList, quantities]);

  const handleNext = () => {
    const selectedItems = itemsBreakdown.filter((item) => item.qty > 0);

    dispatch(
      setPurchaseCodeContext({
        context: {
          quantities,
          items: selectedItems.map((item) => ({
            id: item?.id,
            name: item?.name,
            type: item?.type,
            unitPrice: item?.unitPrice,
            qty: item?.qty,
            subtotal: item?.subtotal,
          })),
          summary: {
            totalCodes,
            grandTotal,
            currencySymbol,
          },
          country: codeList[0]?.country || {},
        },
      })
    );

    if (nextStep) {
      nextStep();
    }
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-between align-items-center font-size-sm p-2">
        <div className="d-flex flex-column">
          <span>Activation Codes</span>
          <span className="fw-light text-iron-400">
            Select how many codes you need for each user type.
          </span>
        </div>
        <div className="d-flex flex-row align-items-center gap-1 fw-medium text-capitalize">
          <span>step</span>
          <span>{currentStep ?? 1}</span>
          <span>of</span>
          <span>{fullStep ?? 1}</span>
          <span>Completed</span>
        </div>
      </div>

      <div className="drawer-content bg-iron-100 font-size-sm pt-2 ps-2">
        <div className="d-flex flex-column gap-2">
          {isLoading ? (
            [...Array(2)].map((_, index) => (
                <Fragment key={index}>
                  <RectangleSkeleton height="20dvh" width="100%" />
                </Fragment>
            ))
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title || "Error Loading Data"}
              description={
                error?.response?.data?.errors?.description ||
                "Failed to fetch activation code types."
              }
            />
          ) : (
            codeList.map((c) => {
              const currentQty = quantities[c?.id] || 0;
              const unitPrice = parseFloat(c?.price) || 0;
              const itemTotal = currentQty * unitPrice;

              return (
                <Fragment key={c?.id}>
                  <div
                    className="card d-flex flex-column gap-3 border-none border p-2"
                    style={{ borderRadius: "0.75rem" }}
                  >
                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <div className="d-flex flex-row gap-2">
                        <div
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            display: "grid",
                            placeItems: "center",
                          }}
                          className="border-none border rounded-3 bg-iron-100 text-iron-600"
                        >
                          <KeyRound size={16} />
                        </div>
                        <div className="d-flex flex-column">
                          <span className="fw-light">{c?.name || "Code Type"}</span>
                          <span className="fw-light text-iron-400 text-capitalize">
                            Activation codes for {c?.type || "user"} accounts
                          </span>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-baseline gap-1">
                        <div className="d-flex flex-row align-items-baseline gap-2">
                          <span className="font-size-md fw-medium">
                            {formatNumber(unitPrice)}
                          </span>
                          <span>{c?.country?.currency || ""}</span>
                        </div>
                        <span>/</span>
                        <span className="text-iron-400 font-size-sm">Code</span>
                      </div>
                    </div>

                    <div className="d-flex flex-column gap-2">
                      <span className="fw-light">How Many Do You Need?</span>
                      <div className="d-flex flex-row gap-2">
                        <button
                          type="button"
                          className="border-none border bg-none rounded-3"
                          style={{ height: 44, width: 44 }}
                          onClick={() =>
                            handleQuantityChange(c?.id, Math.max(0, currentQty - 1))
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={currentQty === 0 ? "" : currentQty}
                          onChange={(e) => handleQuantityChange(c?.id, e.target.value)}
                          className="form-control font-size-lg text-center border fw-semibold"
                          style={{ flex: 1 }}
                        />
                        <button
                          type="button"
                          className="border-none border bg-none rounded-3"
                          style={{ height: 44, width: 44 }}
                          onClick={() => handleQuantityChange(c?.id, currentQty + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="d-flex flex-row align-items-center gap-2">
                        {[10, 20, 50, 100].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            className="border-none border rounded-pill px-3 bg-none fw-light"
                            style={{ height: 28 }}
                            onClick={() => handleQuantityChange(c?.id, preset)}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <span className="fw-medium">
                        {currentQty} {currentQty === 1 ? "Code" : "Codes"}
                      </span>
                      <div className="d-flex flex-row align-items-baseline gap-2">
                        <span className="fw-medium font-size-md">
                          {formatNumber(itemTotal)}
                        </span>
                        <span className="text-iron-400">
                          {c?.country?.currency || ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            })
          )}
        </div>
      </div>

      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <div className="d-flex flex-column px-2 gap-3 py-2">
            <span className="fw-medium">Purchase Summary</span>
            <div className="d-flex flex-column gap-3">
              {itemsBreakdown.map((item) => (
                <div
                  key={item?.id}
                  className="d-flex flex-row align-items-center justify-content-between"
                >
                  <span className="fw-light text-capitalize">
                    {item?.name || `${item?.type || ""} codes`}
                  </span>
                  <div className="d-flex flex-row align-items-center gap-2">
                    <span className="fw-semibold">{item?.qty}</span>
                    <span>X</span>
                    <div className="d-flex flex-row align-items-baseline gap-1">
                      <span className="fw-semibold">
                        {formatNumber(item?.unitPrice)}
                      </span>
                      <span className="text-iron-400">{currencySymbol}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />

            <div className="d-flex flex-row align-items-center justify-content-between">
              <span className="fw-light">Total ({totalCodes} Codes)</span>
              <div className="d-flex flex-row align-items-baseline gap-2">
                <span className="fw-medium font-size-md">
                  {formatNumber(grandTotal)}
                </span>
                <span className="text-iron-400">{currencySymbol}</span>
              </div>
            </div>
          </div>

          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />

          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              type="button"
              className="border-none bg-none"
              onClick={() => handleClose && handleClose()}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={totalCodes === 0}
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
              style={{
                opacity: totalCodes === 0 ? 0.6 : 1,
                cursor: totalCodes === 0 ? "not-allowed" : "pointer",
              }}
              onClick={() => handleNext()}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PurchaseActivationCode;