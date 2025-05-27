import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = (email) => {
  console.log(email);
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [email, "isAdmin"],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin/${email}`);
      console.log(res.data);
      return res.data?.isAdmin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
