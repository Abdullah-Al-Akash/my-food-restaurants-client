import { useLocation, useNavigate } from "react-router-dom";

export const useRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  navigate(from, {replace: true});
};

