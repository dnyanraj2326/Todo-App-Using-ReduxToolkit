import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Pressable
} from 'react-native';
import React, {useState} from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {complet, removeTodo, editTodo} from '../feature/TodoSlice';

const Todos = ({todo,isLastTodoCard}) => {
  const [editInput, setEditInput] = useState(todo.text);
  const [isEditabble, setIsEditabble] = useState(false);
  let dispatch = useDispatch();
  const handleCommpletTodo = () => { 
    if(isEditabble) return;
    dispatch(complet(todo.id));
  };
  let handleEditTodo = () => {
    dispatch(editTodo({id:todo.id, text: editInput}));
    setIsEditabble(false);
  };
  return (
    <View style={[styles.todoContainer,isLastTodoCard ? {marginBottom:moderateVerticalScale(100)} : {}]}>
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.checkBtn} onPress={handleCommpletTodo}>
          <Image
            source={require('../assets/icons/check.png')}
            style={[
              styles.checkIcon,
              todo?.isComplet ? {tintColor: 'green'} : {},
            ]}
          />
        </TouchableOpacity>
        {isEditabble ? (
          <TextInput
            style={styles.editInputStyle}
            value={editInput}
            onChangeText={text => setEditInput(text)}
          />
        ) : (
          <Text style={[styles.todo,todo.isComplet ? {textDecorationLine:'line-through',color:"gray"}:{}]}>{todo?.text}</Text>
        )}
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => {
            if (todo.isComplet) return;
            if (isEditabble) {
              handleEditTodo();
            } else {
              setIsEditabble(true);
            }
          }}>
          <Image
            source={isEditabble ? require( '../assets/icons/editing.png'): require('../assets/icons/edit.png')}
            style={styles.editIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.delBtn}
          onPress={() => dispatch(removeTodo(todo.id))}>
          <Image
            source={require('../assets/icons/delete.png')}
            style={styles.delIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: moderateScale(20),
    backgroundColor: '#fff',
    paddingVertical: moderateVerticalScale(12),
    paddingHorizontal: moderateScale(10),
    borderRadius: 14,
    flex:1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
  },
  rightSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkIcon: {
    width: moderateScale(28),
    height: moderateVerticalScale(28),
    marginRight: moderateScale(5),
    tintColor: 'gray',
  },
  editIcon: {
    width: moderateScale(24),
    height: moderateVerticalScale(24),
    marginRight: moderateScale(5),
    tintColor: '#000',
  },
  delIcon: {
    width: moderateScale(22),
    height: moderateVerticalScale(22),
    tintColor: 'red',
  },
  todo: {
    fontSize: scale(16),
    fontFamily: 'LexendDeca-SemiBold',
    color: '#000',
    marginTop: moderateVerticalScale(-3),
  },
  editInputStyle: {
    fontSize: scale(14),
    fontFamily: 'LexendDeca-SemiBold',
    color: '#0F1035',
    flex:1
  },
});
