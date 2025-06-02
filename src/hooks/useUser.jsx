import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUser = () => {
  const { user } = useAuth();
  console.log(user?.email);
  const axiosSecure = useAxiosSecure();
  const { data: dUser, refetch } = useQuery({
    queryKey: [user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return { dUser, refetch };
};

export default useUser;
