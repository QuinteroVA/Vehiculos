import { View } from 'react-native';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <RegisterScreen/>
    </PaperProvider>
  );
}
