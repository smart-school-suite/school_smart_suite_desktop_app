// Some endpoints answer 404 when a list is simply empty (e.g. "No Categories
// Found"), so that status is an empty state, not a failure.
export const isEmptyListError = (error) => error?.response?.status === 404;

// Retry real failures once, but never retry an empty (404) list.
export const retryUnlessEmpty = (failureCount, error) =>
  !isEmptyListError(error) && failureCount < 1;
