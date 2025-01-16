// import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import OChemNavbar from "./nav/OChemNavbar";

export default function OChemRxn() {
  // const [buds, setBuds] = useState([]);

  // useEffect(() => {
  //     fetch('https://cs571api.cs.wisc.edu/rest/f24/hw5/buds', {
  //         headers: {
  //             "X-CS571-ID": CS571.getBadgerId()
  //         }
  //     })
  //         .then(res => res.json())
  //         .then(cats => {
  //             setBuds(cats)
  //         })
  // }, []);

  // console.log(buds)

  return (
    <div>
      <OChemNavbar />
      <div style={{ margin: "0.5rem" }}>
        <Outlet />
      </div>
    </div>
  );
}
