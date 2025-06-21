import React, { useRef, useEffect } from 'react';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { Animated, StyleSheet, View, Text } from 'react-native';

const EditForm = ({ visible, selectedDog, onChange, onSave, onCancel, onDelete }) => {
  const slideAnim = useRef(new Animated.Value(1000)).current;

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(1000); // сброс позиции
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!selectedDog) return null;

  return (
    <Animated.View
      style={[
        styles.formContainer,
        {
          transform: [{ translateX: slideAnim }],
          display: visible ? 'flex' : 'none',
        },
      ]}
    >
      <View style={styles.formHeader}>
        <Text style={styles.headerText}>Редактировать запись</Text>
      </View>
      <View style={{ padding: 20 }}>
        <TextInput
          label="Имя собаки"
          value={selectedDog.name || ''}
          onChangeText={(text) => onChange({ ...selectedDog, name: text })}
          mode="outlined"
          style={styles.input}
        />

        <Checkbox.Item
          label="Собака агрессивна"
          status={selectedDog.isAggressive ? 'checked' : 'unchecked'}
          onPress={() => onChange({ ...selectedDog, isAggressive: !selectedDog.isAggressive })}
        />

        <TextInput
          label="Описание"
          value={selectedDog.description || ''}
          onChangeText={(text) => onChange({ ...selectedDog, description: text })}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Радиус обитания (м)"
          value={selectedDog.radius?.toString() || '0'}
          onChangeText={(text) =>
            onChange({ ...selectedDog, radius: parseFloat(text) || 0 })
          }
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />

        <Button mode="contained" onPress={onSave} style={styles.button}>
          Сохранить
        </Button>
        <Button mode="contained" onPress={onDelete} style={[styles.button, { backgroundColor: 'red' }]}>
          Удалить
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
    backgroundColor: '#32a860',
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default EditForm;
