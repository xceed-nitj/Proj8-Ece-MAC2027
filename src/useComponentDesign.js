import { useEffect, useState } from "react";
import axios from "axios";
import getEnvironment from "./getenvironment";

// Reads the admin-panel design number for a home component from
// GET {apiUrl}/conferencemodule/homecustomisation/public/:confId
// → { confId, components: [{ key, label, design, designCount }, ...] }
//
// `override` (a design prop passed explicitly, e.g. by the /datedesigns
// preview page) skips the fetch entirely. Any fetch failure or missing
// entry falls back to design 1.
export default function useComponentDesign(confid, componentKey, override) {
  const [design, setDesign] = useState(1);

  useEffect(() => {
    if (override || !confid) return;
    let cancelled = false;
    getEnvironment()
      .then((apiUrl) =>
        axios.get(`${apiUrl}/conferencemodule/homecustomisation/public/${confid}`, {
          withCredentials: true,
        })
      )
      .then((res) => {
        if (cancelled) return;
        const comp = res.data?.components?.find((c) => c.key === componentKey);
        if (comp?.design) setDesign(Number(comp.design));
      })
      .catch((err) => {
        console.error(`Design fetch failed for "${componentKey}", using design 1:`, err);
      });
    return () => {
      cancelled = true;
    };
  }, [confid, componentKey, override]);

  return Number(override) || design;
}
