import { useEffect, useState, useRef } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import { Keyboard } from 'react-native';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const flatListRef = useRef(null);


  const textInputRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);

      if (inputValue == '') {
        return;
      }

      fetch(`http://192.168.1.101:3000/text?data=${encodeURIComponent(inputValue)}`)
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
            setMessageHistory((prevHistory) => [...prevHistory, inputValue]);
            setInputValue('');
          }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  useEffect(() => {
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messageHistory]);

  const handleIncrease = () => {
    console.log('increase');
  };

  const handleDecrease = () => {
    console.log('decrease');
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
    setTimeout(() => {
      
    }, 100);

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notebook}>
        <FlatList
          ref={flatListRef}
          data={messageHistory}
          renderItem={({ item }) => <Text style={styles.message}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={<Text style={styles.header}>Message History:</Text>}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    marginTop: 10,
    marginBottom: 10,
    minHeight: 100,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 5,
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
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ccc',
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