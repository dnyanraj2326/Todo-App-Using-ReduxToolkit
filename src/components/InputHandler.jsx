import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {addTodo} from '../feature/TodoSlice';
import {useDispatch} from 'react-redux';

const InputHandler = () => {
  const [input, setInput] = useState('');
  let {width} = Dimensions.get('window');
  let dispatch = useDispatch();
  const handleAddTodo = () => {
    if (input == '') return;
    dispatch(addTodo(input));
    setInput('');
    Keyboard.dismiss();
  };
  return (
    <View
      style={[
        styles.container,
        {width: width},
        Platform.OS == 'ios' ? {marginBottom: 10} : {},
      ]}>
      <View style={styles.inputWithButtonSection}>
        <View style={styles.inputSection}>
          <Image
            source={require('../assets/icons/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Enter a todo"
            style={styles.input}
            value={input}
            onChangeText={text => setInput(text)}
          />
        </View>
        <TouchableOpacity style={styles.btnSection} onPress={handleAddTodo}>
          <Image
            source={require('../assets/icons/plus.png')}
            style={styles.plusIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputHandler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWithButtonSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    flex: 1,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateVerticalScale(5),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 13,
    },
    shadowOpacity: 0.24,
    shadowRadius: 14.86,
    elevation: 18,
  },
  searchIcon: {
    width: moderateScale(22),
    height: moderateVerticalScale(22),
    marginRight: moderateScale(5),
  },
  plusIcon: {
    width: moderateScale(45),
    height: moderateVerticalScale(45),
  },
  btnSection: {
    marginLeft: moderateScale(10),
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  input: {
    flex: 1,
    fontSize: scale(14),
    fontFamily: 'LexendDeca-Regular',
    paddingVertical: moderateVerticalScale(10),
  },
});
