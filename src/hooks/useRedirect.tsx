import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const allowedRoutes = ["/login"];

export const useRedirect = () => {
  const router = useRouter();
  const query = useSearchParams();
  const pathname = usePathname();
  const { data: session } = useSession();

  //use effect if there is true passed to useMechanics

  /**
   * @description - useEffect hook to check if the user is logged in and redirect to login page if not or to the home page if logged in
   */
  useEffect(() => {
    if (
      session !== null &&
      session !== undefined &&
      pathname.startsWith("/login")
    ) {
      router.push(`/admin`);
    }
    if (session === null && !allowedRoutes.includes(`${pathname}`)) {
      router.push(`/login`);
    }
  }, [session, pathname, router]);

  return { session, query, pathname, router };
};
