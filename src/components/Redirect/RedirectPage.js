import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";

import { getAuthParamValues } from "../../utils/functions";

const Redirect = () => {
  const navigate = useNavigate();
  // Gives the part of the URL after '#'
  const { hash } = useLocation();

  useEffect(() => {
    if (!_.isEmpty(hash)) {
      const authParams = getAuthParamValues(hash);
      localStorage.setItem("authParams", JSON.stringify(authParams));
      const expiryTime = new Date().getTime() + authParams.expires_in * 1000;
      localStorage.setItem("expiry_time", expiryTime);
    }
    navigate("/");
  }, [hash, navigate]);

  return null;
};

export default Redirect;
