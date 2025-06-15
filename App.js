import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Modal } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { TextInput, Button, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dogIcon from './assets/dog-icon.png';
import customStyleMap from './assets/style-map';
import AddForm from './src/components/AddForm';
import EditForm from './src/components/EditForm';


const DOGS_STORAGE_KEY = 'DOGS_STORAGE'; // Ключ для хранения данных о собаках в AsyncStorage

// Загрузка данных о собаках в AsyncStorage
const saveDogs = async (dogs) => {
  try {
    const jsonValue = JSON.stringify(dogs);
    await AsyncStorage.setItem(DOGS_STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Ошибка при сохранении собак:', e);
  }
};

// Функция для загрузки данных о собаках из AsyncStorage
const loadDogs = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(DOGS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Ошибка при загрузке собак:', e);
    return [];
  }
};


export default function App() {
  const [dogs, setDogs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newDogLocation, setNewDogLocation] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [radius, setRadius] = useState('100');
<<<<<<< HEAD
  const [selectedDog, setSelectedDog] = useState(null); // Для хранения выбранной собаки
  const [editVisible, setEditVisible] = useState(false); // Для управления видимостью формы редактирования
  const [countPress, setCountPress] = useState(0); // Счетчик нажатий на метку
=======
  const [lastPressedId, setLastPressedId] = useState(null);
  const [lastPressTime, setLastPressTime] = useState(0);
>>>>>>> 8f7bfb5 (adding and editing forms are moved to separate components)
  
  const handleMapPress = (event) => {
    setNewDogLocation(event.nativeEvent.coordinate);
    setModalVisible(true);
  };
    
  // Загрузка данных о собаках при первом запуске приложения
  useEffect(() => {
    (async () => {
      const loadedDogs = await loadDogs();
      setDogs(loadedDogs);
    })();
  }, []);

  const handleMarkerPress = (dog) => {
    const now = Date.now();
    if (lastPressedId === dog.id && now - lastPressTime < 1000) {
      setEditModalVisible(true);
      setSelectedDog(dog);
    } else {
      setLastPressedId(dog.id);
      setLastPressTime(now);
      setSelectedDog(dog);
    }
  };

  const handleAddDog = async () => {
    const newDog = {
      id: Date.now(),
      name: name || 'Без имени',
      description: description || 'Без описания',
      location: newDogLocation,
      radius: parseFloat(radius) || 100,
    };
    const updatedDogs = [...dogs, newDog];
    setDogs(updatedDogs);
    await saveDogs(updatedDogs); // Сохраняем

    // Сброс формы
    setName('');
    setDescription('');
    setRadius('100');
    setModalVisible(false);
  };

  const handleEditDog = async () => {
      const newDog = { ...selectedDog };
      const updatedDogs = dogs.map((dog) => {
        if (dog.id === newDog.id) {
          return newDog;
        }
        return dog;
      });
      setDogs(updatedDogs);
      await saveDogs(updatedDogs); // Сохраняем изменения
       
      setName('');
      setDescription('');
      setRadius('100');
      setEditModalVisible(false);
  };

  const handleDeleteDog = async () => {
    const updatedDogs = dogs.filter((dog) => dog.id !== selectedDog.id);
    setDogs(updatedDogs);
    await saveDogs(updatedDogs); // Сохраняем изменения

    setName('');
    setDescription('');
    setRadius('100');
    setEditModalVisible(false);
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 47.7822,
            longitude: 35.2186,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          customMapStyle={customStyleMap}
          onPress={handleMapPress}
        >
          {dogs.map((dog) => (
            <React.Fragment key={dog.id}>
              <Marker
                coordinate={dog.location}
                title={dog.name}
                description={dog.description}
                image={dogIcon}
<<<<<<< HEAD
                onPress={() => {
                  setCountPress(countPress + 1);
                  if(countPress >= 2 && selectedDog && selectedDog.id === dog.id) {
                    setCountPress(0);
                    setEditVisible(true);
                  }
                  setSelectedDog(dog);
                  }}
=======
                anchor={{ x: 0.5, y: 0.5 }}
                onPress={() => {handleMarkerPress(dog)}}
>>>>>>> 8f7bfb5 (adding and editing forms are moved to separate components)
              />
              <Circle
                center={dog.location}
                radius={dog.radius}
                strokeColor="rgba(0,0,255,0.5)"
                fillColor="rgba(0,0,255,0.2)"
              />
            </React.Fragment>
          ))}
        </MapView>
<<<<<<< HEAD
          
          {/* Кнопка для добавления новой собаки */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.form}>
              <TextInput
                label="Имя собаки"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
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

              <Button mode="contained" onPress={handleAddDog} style={styles.button}>
                Добавить
              </Button>
              <Button mode="outlined" onPress={() => setModalVisible(false)} style={styles.button}>
                Отмена
              </Button>
            </View>
          </View>
        </Modal>

          {/* Модальное окно для редактирования собаки */}
        <Modal visible={editVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.form}>
              <TextInput
                label="Имя собаки"
                value={selectedDog ? selectedDog.name : ''}
                onChangeText={(text) => setSelectedDog({ ...selectedDog, name: text })}
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Описание"
                value={selectedDog ? selectedDog.description : ''}
                onChangeText={(text) => setSelectedDog({ ...selectedDog, description: text })}
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Радиус обитания (м)"
                value={selectedDog ? String(selectedDog.radius) : ''}
                onChangeText={(text) => setSelectedDog({ ...selectedDog, radius: parseFloat(text) })}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
              />

              <Button mode="contained" onPress={() => {
                  const updatedDogs = dogs.map(dog => dog.id === selectedDog.id ? selectedDog : dog);
                  setDogs(updatedDogs);
                  saveDogs(updatedDogs);
                  setEditVisible(false);
                  setSelectedDog(null);
                }} style={styles.button}>
                Сохранить
              </Button>
              <Button mode="contained" onPress={() => {
                setDogs(dogs.filter(dog => dog.id !== selectedDog.id));
                setEditVisible(false);
                setSelectedDog(null);
              }} style={styles.button} color="red">
                Удалить
              </Button>
              <Button mode="outlined" onPress={() => {
                  setEditVisible(false);
                  setSelectedDog(null);
                }} style={styles.button}>
                Отмена
              </Button>
            </View>
          </View>
        </Modal>
=======
        
        <AddForm
          visible={modalVisible}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          radius={radius}
          setRadius={setRadius}
          onAdd={handleAddDog}
          onCancel={() => setModalVisible(false)}
        />

        <EditForm
          visible={editModalVisible}
          selectedDog={selectedDog}
          onChange={setSelectedDog}
          onSave={handleEditDog}
          onDelete={handleDeleteDog}
          onCancel={() => setEditModalVisible(false)}
          />
>>>>>>> 8f7bfb5 (adding and editing forms are moved to separate components)
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
  marginTop: 10,
  },
});
