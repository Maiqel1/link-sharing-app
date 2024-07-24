import { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { useAuth } from "./context/AuthContext";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuth = (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/");
      }
    }, [user, router]);

    if (!user) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
};

export default withAuth;
