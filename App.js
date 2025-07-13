import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { Provider as PaperProvider, Snackbar, Portal } from 'react-native-paper';
// мои импорты
import dogImgMarker from './assets/dog-marker.png';
import dogImgAggressiveMarker from './assets/dog-aggressive-marker.png';
import customStyleMap from './assets/style-map';
import AddForm from './src/components/AddForm';
import EditForm from './src/components/EditForm';
import InfoForm from './src/components/InfoForm';
import validationStation from './src/ValidationStation';


const BASE_URL = 'http://192.168.0.104:3000'; // Базовый URL для API


export default function App() {
  const [dogs, setDogs] = useState([]);     // Состояние для хранения списка собак
  const [modalVisible, setModalVisible] = useState(false);        // Видимость модального окна для добавления собаки
  const [editModalVisible, setEditModalVisible] = useState(false);  // Видимость модального окна для редактирования собаки
  const [newDogLocation, setNewDogLocation] = useState(null);  // Координаты новой собаки, которую добавляем на карту
  const [selectedDog, setSelectedDog] = useState(null);    // Выбранная собака для редактирования или просмотра информации
  const [name, setName] = useState('');   // Имя собаки, которое вводит пользователь
  const [description, setDescription] = useState('');   // Описание собаки, которое вводит пользователь
  const [radius, setRadius] = useState('100');         // Радиус обитания собаки, который вводит пользователь
  const [isAggressive, setIsAggressive] = useState(false);  // Флаг, указывающий, агрессивна ли собака
  const [hasLabel, setHasLabel] = useState(false); // Бирка у собаки
  const [infoVisible, setInfoVisible] = useState(false); // Видимость модального окна с информацией о собаке  
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  
  // Функция для обработки нажатия на карту
  // При нажатии на карту устанавливаем координаты новой собаки и открываем модальное окно
  const handleMapPress = (event) => {
    setNewDogLocation(event.nativeEvent.coordinate);
    setModalVisible(true);
  };
    
  // Загрузка данных о собаках при первом запуске приложения
  useEffect(() => {
    fetch(`${BASE_URL}/dogs`)
      .then(response => response.json())
      .then(data => setDogs(data))
      .catch(error => console.error('Ошибка при загрузке собак:', error));
  }, [])

  // Функция для обработки нажатия на маркер собаки
  // При нажатии на маркер показываем панель с информацией о собаке
  const handleMarkerPress = (dog) => {
    setInfoVisible(true);
    setSelectedDog(dog);
  };

  // Функция для добавления новой собаки
  const handleAddDog = async () => {
    if (!validationStation({ name, description, radius })) {
      setSnackBarMessage('Введенные данные не корректны!');
      setSnackBarVisible(true);
      return null;
    }

    const newDog = {
      id: Date.now(),
      name: name || 'Без имени',
      description: description || 'Без описания',
      location: newDogLocation,
      radius: parseFloat(radius) || 100,
      isAggressive: isAggressive || false,
      hasLabel: hasLabel || false,
    };
    try {
      const response = await fetch(`${BASE_URL}/dogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDog),
      });
      const savedDog = await response.json();
      setDogs(prev => [...prev, savedDog]);

      // Сброс формы
      setName('');
      setDescription('');
      setRadius('100');
      setIsAggressive(false);
      setHasLabel(false);
      setModalVisible(false);
    } catch(error) {
      console.error('Ошибка при добавлении собаки:', error);
    }
  };
  
  // Функция для обработки редактирования собаки
  const handleEditDog = async () => {
    try {
      const response = await fetch(`${BASE_URL}/dogs/${selectedDog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedDog),
      });

      const updatedDog = await response.json();
      setDogs(prev => prev.map(dog => dog.id === selectedDog.id ? updatedDog : dog));
      setEditModalVisible(false);
    } catch (error) {
      console.error('Ошибка при редактировании собаки:', error);
    }
  }

  // функция для удаления собаки
  const handleDeleteDog = async () => {
    try {
      await fetch(`${BASE_URL}/dogs/${selectedDog.id}`, {
        method: 'DELETE',
      });

      setDogs(prev => prev.filter(dog => dog.id !== selectedDog.id));
      setEditModalVisible(false);
      setSelectedDog(null);
    } catch (error) {
      console.error('Ошибка при удалении собаки: ', error);
    }
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>DogLocator</Text>
        </View>
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
                image={dog.isAggressive ? dogImgAggressiveMarker : dogImgMarker}
                anchor={{ x: 0.5, y: 0.5 }}
                onPress={() => handleMarkerPress(dog)}
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
        
        <AddForm
          visible={modalVisible}
          dogs={dogs}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          radius={radius}
          setRadius={setRadius}
          isAggressive={isAggressive}
          setIsAggressive={setIsAggressive}
          hasLabel={hasLabel}
          setHasLabel={setHasLabel}
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

          <InfoForm
            visible={infoVisible}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            dog={selectedDog}
            onClose={() => setInfoVisible(false)}
            onEdit={() => {
              setEditModalVisible(true);
              setInfoVisible(false);
            }}
          />
          
          <Portal>
            <Snackbar
              wrapperStyle={{
                position: 'absolute',
                top: 50, 
                left: 0,
                right: 0,
              }}
              visible={snackBarVisible}
              onDismiss={() => setSnackBarVisible(false)}
              duration={3000}
              action={{
                label: 'OK',
                onPress: () => {
                  setSnackBarVisible(false);
                },
              }}
            >
              {snackBarMessage}
            </Snackbar>
          </Portal>

          </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: '#32a860',
    color: '#ffffff',
    fontSize: 20,
    padding: 20,
  },
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
