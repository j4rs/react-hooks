# useRoute hook

## Use case

Your component reacts to changes on the route, like showing a Modal:

```javascript
import React from 'react';
import useRoute from '../useRoute';

const GlobalSettingsModal = ({ system }) => {
  const currentRoute = useRoute();

  ...

  return (
    <Modal show={currentRoute === '#settings'}>
      ...
    </Modal>
  )
}
```
