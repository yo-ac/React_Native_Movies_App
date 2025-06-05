import { createTheme, ThemeProvider } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from './src/components/layout/Header';
import NavContainer from './src/containers/NavContainer';


const theme = createTheme({
  lightColors: {
    primary: 'blue'
  },
  darkColors:{
    primary: 'blue'
  },
  components:{
    Button:{
      raised: true
    }
  }
})

const App = () => {

  const [details, setDetails] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style="light"/>
        <Header/>
        <NavContainer details={details}/>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
