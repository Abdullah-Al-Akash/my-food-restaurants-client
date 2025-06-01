import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = (email) => {
  const{loading} = useAuth();
  console.log(email);
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [email, "isAdmin"],
    enabled: !loading && !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin/${email}`);
      console.log(res.data);
      return res.data?.isAdmin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
