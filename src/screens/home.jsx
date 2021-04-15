import React, { useEffect }from "react";

export default function Home({setNavbar}) {
  
  useEffect(() => {
    setNavbar(true);
  });
  return <h3>Home</h3>;
}
