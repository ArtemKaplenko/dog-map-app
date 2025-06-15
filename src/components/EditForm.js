import React, { useState, useEffect } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';

const EditForm = ({ visible, selectedDog, onChange, onSave, onCancel, onDelete}) => {
    if(!visible || !selectedDog) return null;

    return(
        <View style={styles.formContainer}>
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
                    onChangeText = {(text) => onChange({...selectedDog, redius: parseFloat(text) || 0})}
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
        </View>
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