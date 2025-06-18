import React, { useRef, useEffect } from 'react';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { Animated, StyleSheet, View, Text } from 'react-native';

const EditForm = ({ visible, selectedDog, onChange, onSave, onCancel, onDelete}) => {
    if(!visible || !selectedDog) return null;

    const slideAnim = useRef(new Animated.Value(1000)).current;

    useEffect(() => {
    Animated.timing(slideAnim, {
        toValue: visible ? 0 : 1000,
        duration: 300,
        useNativeDriver: true,
    }).start();
    }, [visible]);

    return(
        <Animated.View style={[styles.formContainer, { transform: [{ translateX: slideAnim }] }]}>
            <View style={styles.formHeader}>
                <Text style={{ color: 'white', fontSize: 20, paddingLeft: 10, paddingTop: 20 }}>
                    Редактировать запись
                </Text>
            </View>
            <View style={{ padding: 20}}>
                <TextInput
                    label = "Имя собаки"
                    value = {selectedDog.name}
                    onChangeText = {(text) => onChange({...selectedDog, name: text})}
                    mode = 'outlined'
                    style = {styles.input}
                />
                <Checkbox.Item
                    label = 'Собака агрессивна'
                    status= {selectedDog.isAggressive ? 'checked' : 'unchecked'}
                    onPress={() => onChange({...selectedDog, isAggressive: !selectedDog.isAggressive})}
                />
                <TextInput
                    label = "Описание"
                    value = {selectedDog.description}
                    onChangeText = {(text) => onChange({...selectedDog, description: text})}
                    mode = 'outlined'
                    style = {styles.input}
                />
                <TextInput
                    label = "Радиус обитания (м)"
                    value = {selectedDog.radius.toString()}
                    onChangeText = {(text) => onChange({...selectedDog, radius: parseFloat(text) || 0})}
                    keyboardType = "numeric"
                    mode = 'outlined'
                    style = {styles.input}
                />

                <Button mode='contained' onPress={onSave} style={styles.button}>
                    Сохранить
                </Button>
                <Button mode='contained' onPress={onDelete} style={styles.button}>
                    Удалить
                </Button>
                <Button mode='outlined' onPress={onCancel} style={styles.button}>
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
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
    },
});

export default EditForm;