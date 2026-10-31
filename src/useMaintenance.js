import { useEffect, useState } from "react";
import axios from "axios";
import getEnvironment from "./getenvironment";

// What to do when the maintenance endpoint can't be reached or returns an
// error: true keeps the site in maintenance, false shows the normal site.
const FALLBACK_ENABLED = true;

// Fetches maintenance status for a conference from the backend:
//   GET {apiUrl}/conferencemodule/maintenance/public/{confid}
// Expected response:
//   { enabled, name, subtitle, badge, title, highlight, message }
export default function useMaintenance(confid) {
  const [state, setState] = useState({ loading: true, enabled: false, content: {} });

  useEffect(() => {
    let cancelled = false;

    getEnvironment()
      .then((apiUrl) =>
        axios.get(`${apiUrl}/conferencemodule/maintenance/public/${confid}`, {
          withCredentials: true,
        })
      )
      .then((res) => {
        if (cancelled) return;
        const data = res.data?.data ?? res.data ?? {};
        setState({ loading: false, enabled: data.enabled === true, content: data });
      })
      .catch(() => {
        if (cancelled) return;
        setState({ loading: false, enabled: FALLBACK_ENABLED, content: {} });
      });

    return () => {
      cancelled = true;
    };
  }, [confid]);

  return state;
}
