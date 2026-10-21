import { differenceInSeconds, format, isAfter } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearOtpCooldown } from "../../Slices/Asynslices/AuthSlice";
export function useOtpTimer(moduleState) {
  const dispatch = useDispatch();
  const cooldownExpiresAt = moduleState?.cooldownExpiresAt;

  const getSecondsLeft = () => {
    if (!cooldownExpiresAt) return 0;

    const now = new Date();
    const expiry = new Date(cooldownExpiresAt);

    if (!isAfter(expiry, now)) return 0;

    return differenceInSeconds(expiry, now);
  };

  const [secondsLeft, setSecondsLeft] = useState(getSecondsLeft);

  useEffect(() => {
    const remaining = getSecondsLeft();
    setSecondsLeft(remaining);

    if (remaining <= 0) {
      if (cooldownExpiresAt)
        dispatch(
          clearOtpCooldown({
            context: "loginContext",
          }),
        );
      return;
    }

    const interval = setInterval(() => {
      const currentRemaining = getSecondsLeft();
      setSecondsLeft(currentRemaining);

      if (currentRemaining <= 0) {
        dispatch(clearOtpCooldown());
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownExpiresAt, dispatch]);

  const formattedTime = format(new Date(secondsLeft * 1000), "mm:ss");

  return {
    secondsLeft,
    formattedTime,
    isCoolingDown: secondsLeft > 0,
  };
}
