import { useCallback, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "@reach/router";

export const mapSearchParamsToObject = (
  urlParams,
  previousState = {},
  defaultState = {}
) =>
  Object.keys(previousState).reduce((memo, key) => {
    if (!urlParams.has(key)) return { ...memo, [key]: defaultState[key] };

    if (Array.isArray(previousState[key]))
      return { ...memo, [key]: urlParams.getAll(key) };

    return { ...memo, [key]: urlParams.get(key) };
  }, previousState);

export const createSearchParams = (init = "") => {
  if (
    typeof init === "string" ||
    Array.isArray(init) ||
    typeof init === URLSearchParams
  )
    return new URLSearchParams(init);

  const params = Object.keys(init).reduce((memo, key) => {
    const value = init[key];
    if (value.length === 0) return memo;

    return memo.concat(
      Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
    );
  }, []);

  return new URLSearchParams(params);
};

export const getSearchParamsForLocation = (
  locationSearch,
  defaultSearchParams = null
) => {
  const searchParams = createSearchParams(locationSearch);

  if (defaultSearchParams) {
    // eslint-disable-next-line no-unused-vars
    for (let key of defaultSearchParams.keys()) {
      if (!searchParams.has(key)) {
        defaultSearchParams.getAll(key).forEach((value) => {
          searchParams.append(key, value);
        });
      }
    }
  }

  return searchParams;
};

/**
 *
 * @param object defaultInit - literal object with the initial params
 * @returns the searchParams object and its setter (use it to alter the url)
 */
export const useSearchParams = (defaultInit = {}) => {
  const defaultSearchParamsRef = useRef(createSearchParams(defaultInit));
  const hasSetSearchParamsRef = useRef(false);

  const location = useLocation();
  let searchParams = useMemo(
    () =>
      // Only merge in the defaults if we haven't yet called setSearchParams.
      // Once called we want them to take precedence, otherwise you can't
      // remove a param with setSearchParams({}) if it has an initial value
      getSearchParamsForLocation(
        location.search,
        hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current
      ),
    [location.search]
  );

  const navigate = useNavigate();
  const setSearchParams = useCallback(
    (nextInit, { clearHash, navigateOptions } = {}) => {
      const newSearchParams = createSearchParams(
        typeof nextInit === "function" ? nextInit(searchParams) : nextInit
      );

      hasSetSearchParamsRef.current = true;
      const hash = clearHash === true ? "" : location.hash;

      navigate("?" + newSearchParams + hash, navigateOptions);
    },
    [navigate, searchParams, location.hash]
  );

  return [searchParams, setSearchParams];
};
