# useDebounce hook

## Use case

Wait for a delay before updating a state. It is useful, for instance, if the user is typing and you want to wait until she finishes before hitting the server.

```javascript
import React from 'react';
import useDebounce from '../useDebounce';
import useFilterCollection from '../useFilterCollection';

const SearchForm = () => {
  const [filterText, setFilterText] = useState('');
  // Wait 500 millsecs, then set searchTerm
  const searchTerm = useDebounce(filterText, 500);

  // Check the doc of this hook
  const filteredJobs = useFilterCollection(
    jobs, // the collection
    searchTerm, // filter term (ext)
    job => `${job.title} ${job.countries}` // predicate
  );

  ...

  return (
    <Form>
      ...
      <input
        value={filterText}
        onChange={({ target: { value } }) => setFilterText(value)}
      />
    </Form>
  );
};
```
