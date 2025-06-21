import React, { useRef, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { Animated, StyleSheet, View, Text } from 'react-native';

const InfoForm = ({ visible, dog, onClose, onEdit }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(300); // сброс перед анимацией
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!dog) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: slideAnim }], display: visible ? 'flex' : 'none' },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{dog.name || 'Без имени'}</Text>
        <Text>Описание: {dog.description || 'Нет данных'}</Text>
        <Text>Радиус: {dog.radius} м</Text>
        <Text>Агрессивна: {dog.isAggressive ? 'Да' : 'Нет'}</Text>

        <View style={styles.buttons}>
          <Button mode="contained" onPress={onEdit} style={styles.button}>
            Редактировать
          </Button>
          <Button mode="outlined" onPress={onClose} style={styles.button}>
            Закрыть
          </Button>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 8,
    zIndex: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default InfoForm;
