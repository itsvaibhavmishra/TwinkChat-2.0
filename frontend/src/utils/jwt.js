import { jwtDecode } from "jwt-decode";
import axios from "./axios";
import { LogoutUser } from "../redux/slices/actions/authActions";

let expiredTimer;
let isLogoutDispatched = false; // Flag to track whether LogoutUser has been dispatched

// clear session if token is expired
const clearSession = () => {
  delete axios.defaults.headers.common.Authorization;
};

const isValidToken = (accessToken, dispatch) => {
  if (!accessToken) {
    clearSession();
    return false;
  }

  try {
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if (!(decoded.exp > currentTime)) {
      clearSession();
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    clearSession();
    return false;
  }
};

const handleSessionExpiration = (exp, dispatch) => {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime; //- 86386000;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    clearSession();
    if (!isLogoutDispatched) {
      alert("Token expired, Logging you out...");
      dispatch(LogoutUser());
      isLogoutDispatched = true; // Set the flag to true after dispatching
    }
  }, timeLeft);
};

const setSession = (accessToken, dispatch) => {
  isLogoutDispatched = false;

  if (accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // Function for handling token expiry
    const { exp } = jwtDecode(accessToken);
    handleSessionExpiration(exp, dispatch);
  } else {
    clearSession();
    if (!isLogoutDispatched) {
      dispatch(LogoutUser());
      isLogoutDispatched = true; // Set the flag to true after dispatching
    }
  }
};

export { isValidToken, setSession };
