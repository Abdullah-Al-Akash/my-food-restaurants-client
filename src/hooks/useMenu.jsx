import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
  const axiosPublic = useAxiosPublic()
  const { data: menu = [], isLoading: loader, refetch } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosPublic.get("/menu")
      return res.data;
    },
  });
  return [menu, loader, refetch]
};

export default useMenu;
