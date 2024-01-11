import {
  FlatList,
  Keyboard,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import InputHandler from './src/components/InputHandler';
import Todos from './src/components/Todos';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {Provider, useSelector} from 'react-redux';
import {store} from './src/app/store';

const App = () => {
  let todo = useSelector(state => state.todos);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#e0e0e0'} />
      <View style={{flex: 1}}>
        <Text style={styles.hed}>Todo App</Text>
        <FlatList
          data={todo}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardGap}
          renderItem={({item, index}) => (
            <Todos
              todo={item}
              isLastTodoCard={index == todo.length - 1 ? true : false}
            />
          )}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
        style={styles.inputSection}>
        <InputHandler />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#e0e0e0',
  },
  hed: {
    fontSize: scale(22),
    fontFamily: 'LexendDeca-Bold',
    color: '#000',
    textAlign: 'center',
    marginTop: moderateVerticalScale(10),
    marginBottom: moderateVerticalScale(20),
  },
  inputSection: {
    position: 'absolute',
    bottom: 20,
    paddingBottom: 50,
  },
  cardGap: {
    gap: 10,
  },
});
