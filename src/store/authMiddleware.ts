import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { clearAuth } from "./authSlice";
/**
 * Middleware that logs API error responses
 */
export const apiErrorLogger: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    // RTK Query uses `isRejectedWithValue` to flag rejected responses
    if (isRejectedWithValue(action)) {
      console.error("API Error:", action.payload);

      // Log "ERROR" specifically for 401 unauthorized errors
      const payload = action.payload as any;
      if (payload?.status === 401) {
        console.error("ERROR: Unauthorized access, clearing auth state");

        // Clear authentication state
        dispatch(clearAuth());
      }
    }

    return next(action);
  };

export default apiErrorLogger;
