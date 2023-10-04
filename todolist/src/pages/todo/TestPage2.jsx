import { useContext } from 'react';

export const TestPage2 = () => {
  const { isDark } = useContext(ThemeContext);

  const value = useMemo(() => {
    return calculate();
  }, [item]);

  return <div></div>;
};
