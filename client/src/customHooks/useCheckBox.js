import { useState } from 'react';

export default (checked) => {
  const [state, setState] = useState(checked);

  const handleChange = () => {
    setState(!state);
  };

  return [
    {
      checked: state,
      onChange: handleChange,
    },
    setState,
  ];
};
