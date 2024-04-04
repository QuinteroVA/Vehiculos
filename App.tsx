//import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
//import { StackNavigator } from './src/navigator/StackNavigator';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { LoginScreen } from './src/screens/LoginScreen';

export default function App() {
  return (
    <NavigationContainer>
    <PaperProvider>
      <LoginScreen/>
    </PaperProvider>
    </NavigationContainer>
  );
}