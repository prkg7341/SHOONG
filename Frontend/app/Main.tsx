import Root from '@navigations/Root';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@theme/Theme2/styled-components';
import { DarkTheme, LightTheme } from '@theme/Theme2/Theme';

// (https://moviendo.me/building-a-solana-wallet-cross-platform-app-with-expo-web3-and-react-native.html)
import 'react-native-url-polyfill/auto';

import { Alert, Linking, useColorScheme } from 'react-native';
import { getAppThemeSettings } from '@utils/asyncStorage';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { changeAppTheme } from '@atoms/atoms';

export default function Main() {
  const isSystemDark = useColorScheme() === 'dark';
  const [isDark, setIsDark] = useState<boolean>(true);
  const changeTheme = useRecoilValue(changeAppTheme);

  const queryClient = new QueryClient();

  const getThemeSettings = async () => {
    const appSetting = await getAppThemeSettings();
    setIsDark(appSetting === 'system' ? isSystemDark : appSetting === 'dark');
  };

  useEffect(() => {
    getThemeSettings();
  }, [isSystemDark, changeTheme]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
          {/* <NavigationContainer theme={isDark ? Theme.dark.navigation : Theme.light.navigation}> */}
          <NavigationContainer theme={isDark ? DarkTheme.navigation : LightTheme.navigation}>
            <Root />
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
