import React from "react";

/**
 * Listen to changes on the browser's url.
 * Use:
 *  const currentRoute = useRoute();
 *
 * React will re-render your component everytime currentRoute changes like when an user
 * clicks on links
 *
 * @returns a state bind initialized with the current browser location.
 */
function useRoute() {
  const [currentRoute, setCurrentRoute] = React.useState(window.location.hash);
  // Refresh the state
  const onRouteChange = React.useCallback(() => {
    setCurrentRoute(window.location.hash);
  }, []);

  React.useEffect(() => {
    window.addEventListener("hashchange", onRouteChange);
    window.addEventListener("load", onRouteChange);

    // Reset the hooks
    return () => {
      window.removeEventListener("hashchange", onRouteChange);
      window.removeEventListener("load", onRouteChange);
    };
  }, [onRouteChange]);

  return currentRoute;
}

export default useRoute;
