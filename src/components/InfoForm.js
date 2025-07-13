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
        <View>
          <Text style={styles.title}>{dog.name || 'Без имени'}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>Описание:</Text>
          <Text>{dog.description || 'Нет данных'}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>Радиус:</Text>
          <Text>{dog.radius} м</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>Агрессивна:</Text>
          <Text style={[
            styles.statusInfo,
            dog.isAggressive ? styles.statusAggresive : styles.statusFriendly
            ]}>{dog.isAggressive ? 'Да' : 'Нет'}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>Есть бирка:</Text>
          <Text>{dog.hasLabel ? 'Да' : 'Нет'}</Text>
        </View>

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
  infoItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    fontSize: 15,
    marginTop: 10,
    padding: 5,
  },
  statusInfo: {
    color: '#ffffff',
    borderRadius: 10,
    width: 40,
    textAlign: 'center'
  },
  statusAggresive: {
    backgroundColor: '#ee5a52',
  },
  statusFriendly: {
    backgroundColor: '#40c057',
  }
});

export default InfoForm;
