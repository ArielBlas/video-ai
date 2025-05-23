"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";
import { AuthContext } from "./_context/AuthContext";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);

  const CreateUser = useMutation(api.users.CreateNewUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const result = await CreateUser({
          email: user?.email,
          name: user?.displayName,
          pictureURL: user?.photoURL,
        });
        setUser(result);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{ user }}>
        <PayPalScriptProvider
          options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
        >
          <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </NextThemesProvider>
        </PayPalScriptProvider>
      </AuthContext.Provider>
    </div>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  return context;
};

export default Provider;
