"use client"
import { useEffect } from "react";
import MainLayout from "./main-layout";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   const checkAuth = () => {
  //     const logindata = sessionStorage.getItem('userData');
  //     if (!logindata) {
  //       router.push('/');
  //       return false;
  //     }
  //     const userData = JSON.parse(logindata);
  //     if (userData.roleid !== 5) {
  //       router.push('/');
  //       setTimeout(() => { toast("Not authorized") }, 10);
  //       return false;
  //     }
  //     return true;
  //   };

  //   if (!checkAuth()) {
  //     return; // Stop further execution if not authenticated
  //   }
  // }, [router, pathname]);

  return <MainLayout>{children}</MainLayout>;
};

export default Layout;