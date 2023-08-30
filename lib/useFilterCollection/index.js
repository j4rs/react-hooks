import { useState, useEffect, useCallback } from "react";
import { filterCollection } from "../helpers";

/**
 * Reduce a list of object by looking for matches
 *
 * @param array collection - list of objects
 * @param string text
 * @param {*} preficateFn receives one object of the collection
 *                        and returns the string to use in the filter (check example below)
 * @returns
 */
const useFilterCollection = (collection, text, preficateFn) => {
  const [filteredCollection, setFilteredCollection] = useState(collection);
  // Memoize the predicate function to avoid changes on each element
  const memoizedPredicateFn = useCallback(preficateFn, []);

  // Do the filtering if any of these values change
  useEffect(() => {
    // Change to the new filtered collection
    setFilteredCollection(
      filterCollection(collection, text, memoizedPredicateFn)
    );
  }, [collection, text, memoizedPredicateFn]);
  return filteredCollection;
};

/**
 * Filters elements in a collection
 *
 * Use:
 * filterCollection(
 *   [{id: 1, name: "Android developer Chile"},
 *   {id: 2, name: "Full Stack developer Peru"},
 *   {id: 3, name: "Frontend developer Chile"}],
 *   "developer chile",
 *   (obj) => { return obj.name }
 * )
 *
 * return:
 * [{id: 1, name: "Android developer Chile"},
 * {id: 3, name: "Frontend developer Chile"}]
 *
 * @param array collection
 * @param string text used to filter (words are parsed)
 * @param function predicate - receives one object of the collection
 *                 and returns the string to use in the filter
 * @returns the filter collection
 */
export const filterCollection = (collection, text, predicate) => {
  if (isBlank(text)) return collection; // return the collection if text is empty
  const words = text.split(/\W+/);
  // Otherwise, filter the collection throught the use of a regular expression
  // that internally looks for matches that include all the words
  // detected in the param value
  const re =
    words.length === 1
      ? new RegExp(words[0], "ig")
      : new RegExp(
          ["^(?=.*?", text.split(/\W+/).join(")(?=.*?"), ")"].join(""),
          "ig"
        );

  return collection.filter((obj) => predicate(obj).search(re) !== -1);
};

export { useFilterCollection, filterCollection };
