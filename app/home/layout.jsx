"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";



export default function HomeLayout({ children }) {

  const [isSuccess, setIsSuccess] = useState(false);
  const { push } = useRouter();
  async function getUser() {
    try {
      const { data } = await axios.get("/api/auth/me");
  
      return {
        user: data,
        error: null,
      };
    } catch (e) {
      const error = e;
  
      return {
        user: null,
        error,
      };
    }
  }

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      if (error) {
        push("/");
        return;
      }

      // if the error did not happen, 
      setIsSuccess(true);
    })();
  }, [push]);

  if (!isSuccess) {
    return <p>Loading...</p>;
  }

  return <main>{children}</main>;
}


