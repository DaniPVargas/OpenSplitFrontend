import React, { useEffect, useState } from "react";
import { Outlet, useMatches } from "react-router-dom";

import { Header } from "./Header";

export const Root = () => {
  const [showHeader, setShowHeader] = useState(true);
  let path = useMatches()[1].pathname;

  useEffect(() => {
    if (path === "/") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [path, showHeader]);

  return (
    <>
      {showHeader && (
        <Header className="sticky-top py-4" showTelegramButton={false} />
      )}
      <main>
        <Outlet />
      </main>
    </>
  );
};
