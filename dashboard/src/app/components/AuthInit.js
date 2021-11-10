import React, { useEffect, useState } from "react";
import { LayoutSplashScreen } from "app/components/layout/MetronicSplashScreen";

export function AuthInit(props) {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  
  useEffect(() => {
     setShowSplashScreen(false);
  }, []);
  
  
  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>;
};
