import { useEffect, useState, useRef } from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { Keyboard } from 'react-native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import ScreenBrightness from 'react-native-screen-brightness';

function Section({ children, title }) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}
export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [debounceTime, setDebounceTime] = useState(1000);

  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const flatListRef = useRef(null);

  const textInputRef = useRef(null);

  // ScreenBrightness.setBrightness(0.5); // between 0 and 1

  // ScreenBrightness.getBrightness().then(brightness => {
  //   console.log('brightness', brightness);
  // });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);

      let toSend = `${inputValue.trim()}`;
      if (!['.', '?', '!'].includes(toSend[toSend.length - 1]) && toSend[toSend.length - 2] !== ' ') {
        toSend = `${toSend}. `;
      }


      if (inputValue == '') {
        return;
      }

      setInputValue('');
      fetch(
        `http://192.168.1.101:11143/text?data=${encodeURIComponent(toSend)}`,
      )
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);

          if (data.result === 'inputted') {
            console.log('inputted');
            setMessageHistory(prevHistory => [...prevHistory, toSend]);
          }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }, debounceTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  const handleInputChange = text => {
    setInputValue(text);
  };

  // useEffect(() => {
  //   flatListRef.current.scrollToEnd({ animated: true });
  // }, [messageHistory]);

  const handleIncrease = () => {
    console.log('increase');

    setDebounceTime(prevTime => prevTime + 500);
  };

  const handleDecrease = () => {
    console.log('decrease');

    setDebounceTime(prevTime => prevTime - 500);
  };

  const handleCancel = () => {
    console.log('cancel');
  };

  const handleStop = () => {
    console.log('stop');
  };

  const handleStart = () => {
    console.log('start');

    Keyboard.dismiss();
    // Keyboard.emit('keyboardDidHide');
    textInputRef.current.focus();

    // console.log('start');
    Keyboard.dismiss();
    textInputRef.current.focus();
    setTimeout(() => { }, 100);
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : `white`,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        {/* <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>

        </View> */}

        <View>
          <Text style={styles.header}>Messages</Text>
          <Text>Timeout: {debounceTime} </Text>
        </View>
        <FlatList
          style={styles.messageHistory}
          ref={flatListRef}
          data={messageHistory}
          renderItem={({ item }) => <Text style={styles.message}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text>--</Text>
          }
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
          onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
        />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            value={inputValue}
            placeholder="Write something here..."
            placeholderTextColor="#aaa"
            onChangeText={handleInputChange}
            ref={textInputRef}
          />
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            ...styles.buttonPanel,
          }}>
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleStop}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleIncrease}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDecrease}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    /**
      <SafeAreaView style={backgroundStyle}>
        <View style={styles.notebook}>
          <FlatList
            ref={flatListRef}
            data={messageHistory}
            renderItem={({item}) => <Text style={styles.message}>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
              <Text style={styles.header}>Message History:</Text>
            }
            onContentSizeChange={() =>
              flatListRef.current.scrollToEnd({animated: true})
            }
            onLayout={() => flatListRef.current.scrollToEnd({animated: true})}
          />
          <TextInput
            style={styles.textInput}
            multiline={true}
            value={inputValue}
            placeholder="Write something here..."
            placeholderTextColor="#aaa"
            onChangeText={handleInputChange}
            ref={textInputRef}
          />
          <View style={styles.buttonPanel}>
            <TouchableOpacity style={styles.button} onPress={handleStart}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleStop}>
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleIncrease}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDecrease}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
     */
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },


  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  messageHistory: {
    height: '50%',
  },
  notebook: {
    flex: 1,
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    minHeight: 100,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 24,
    color: '#333',
    marginTop: 20,
  },
  message: {
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 10,
    borderRadius: 5,
  },
  buttonPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  button: {
    backgroundColor: '#0066cc',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    marginRight: 5,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
