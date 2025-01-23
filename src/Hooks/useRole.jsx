import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    // If user is loading or not available, skip the query.
    const { data: role, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/role/${user?.email}`);
            return data.role;
        },
        enabled: !authLoading && !!user?.email, // Only run the query if user is loaded and has an email
    });

    return [role, isLoading || authLoading];
};

export default useRole;
