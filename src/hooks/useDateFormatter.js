import { useMemo } from 'react';

function useDateFormatter() {
  const formatDate = useMemo(() => (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }, []);

  return { formatDate };
}

export default useDateFormatter;
