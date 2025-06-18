import React, { useRef, useEffect } from 'react';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { Animated, StyleSheet, View, Text } from 'react-native';

const AddForm = ({ visible, name, setName, description, setDescription, radius, setRadius, isAggressive, setIsAggressive, onAdd, onCancel }) => {
  const slideAnim = useRef(new Animated.Value(1000)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : 1000,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);
  
  return (
    <Animated.View style={[styles.formContainer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.formHeader}>
            <Text style={{ color: 'white', fontSize: 20, paddingLeft: 10, paddingTop: 20}}>
                Добавить собаку
            </Text>
        </View>
        <View style={{ padding: 20 }}>
            <TextInput
                label="Имя собаки"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
            />
            <Checkbox.Item
                label="Собака агресивна"
                status={isAggressive ? 'checked' : 'unchecked'}
                onPress={() => setIsAggressive(!isAggressive)}
            />
            <TextInput
                label="Описание"
                value={description}
                onChangeText={setDescription}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="Радиус обитания (м)"
                value={radius}
                onChangeText={setRadius}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
            />

            <Button mode="contained" onPress={onAdd} style={styles.button}>
                Добавить
            </Button>
            <Button mode="outlined" onPress={onCancel} style={styles.button}>
                Отмена
            </Button>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: 10,
    elevation: 4,
  },
  formHeader: {
    padding: 20,
    backgroundColor: '#32a860',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default AddForm;