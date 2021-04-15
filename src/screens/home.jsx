import React, { useEffect }from "react";

export default function Home({setNavbar}) {
  //hides nav bar
  useEffect(() => {
    setNavbar(true);
  });
  return <h3>Home</h3>;
}
