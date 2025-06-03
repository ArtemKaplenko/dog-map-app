import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Modal } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { TextInput, Button, Provider as PaperProvider } from 'react-native-paper';
import dogIcon from './assets/dog-icon.png';
import customStyleMap from './assets/style-map';

export default function App() {
  const [dogs, setDogs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newDogLocation, setNewDogLocation] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [radius, setRadius] = useState('100');

  const handleMapPress = (event) => {
    setNewDogLocation(event.nativeEvent.coordinate);
    setModalVisible(true);
  };

  const handleAddDog = () => {
    const newDog = {
      id: Date.now(),
      name: name || 'Без имени',
      description: description || 'Без описания',
      location: newDogLocation,
      radius: parseFloat(radius) || 100,
    };
    setDogs([...dogs, newDog]);
    // Сброс формы
    setName('');
    setDescription('');
    setRadius('100');
    setModalVisible(false);
  };

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
              <Button mode="contained" onPress={handleAddDog}>
                Добавить
              </Button>
            </View>
          </View>
        </Modal>
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
});
