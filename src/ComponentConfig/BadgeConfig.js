import { COMPLETED, FAILED, PENDING, SUBSCRIBED, EXPIRED } from "../constants/tableState";

export const activationCodeTransactionStates = [
     {
        "state":COMPLETED,
        "className":"pill-success",
        "icon":"icon-park-solid:check-one"
     },
     {
        "state":FAILED,
        "className":"pill-danger",
        "icon":"icon-park-solid:caution"
     },
     {
        "state":PENDING,
        "className":"pill-warning",
        "icon":"carbon:pending"
     }
];


export const userSubscriptionStatus = [
   {
      "state":SUBSCRIBED,
      "className":"pill-success",
      "icon":"icon-park-solid:check-one"
   },
   {
      "state":EXPIRED,
      "className":"pill-warning",
      "icon":"icon-park-solid:caution"
   },
   {
      "state":PENDING,
      "className":"pill-warning",
      "icon":"carbon:pending"
   }
]