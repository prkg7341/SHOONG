import Root from '@navigations/Root';
import { NavigationContainer } from '@react-navigation/native';
import Theme from '@theme/Theme';

import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';

export default function App() {
  const isDark = useColorScheme() === 'dark';
  return (
    <NavigationContainer theme={isDark ? Theme.dark.navigation : Theme.light.navigation}>
      <ThemeProvider theme={isDark ? Theme.dark : Theme.light}>
        {/* <Typography color="primary">Open up App.js to start working on your app!</Typography>
        <StatusBar style="auto" />
        <Test /> */}
        <Root />
      </ThemeProvider>
    </NavigationContainer>
  );
}
