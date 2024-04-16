import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';

const carImages = {
  'camaro-preto': { uri: require('./assets/camaro-preto.jpg'), name: 'Camaro Preto' },
  'chevette-vermelho': { uri: require('./assets/chevette-vermelho.jpg'), name: 'Chevette Vermelho' },
  'golf-azul': { uri: require('./assets/golf-azul.jpg'), name: 'Golf Azul' },
  'mcqueen-vermelho': { uri: require('./assets/mcqueen-vermelho.jpg'), name: 'McQueen Vermelho' },
  'opala-preto': { uri: require('./assets/opala-preto.jpg'), name: 'Opala Preto' },
  'transformers-azul': { uri: require('./assets/transformers-azul.jpg'), name: 'Transformers Azul' },
  'gtr-vermelho': { uri: require('./assets/gtr-vermelho.jpg'), name: 'GTR Vermelho' },
  'civic-azul': { uri: require('./assets/civic-azul.webp'), name: 'Civic Azul' },
  'lambo-preto': { uri: require('./assets/lambo-preto.jpg'), name: 'Lambo Preto' },
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setSelectedCar(null); // Reset selected car when changing category
  };

  const handleCarPress = (carName) => {
    setSelectedCar(carName === selectedCar ? null : carName); // Toggle selected car
  };

  const handleSearch = (text) => {
    setSearchText(text.toLowerCase());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galeria Interativa</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite algo..."
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <View style={styles.labelsContainer}>
        <TouchableOpacity
          style={[styles.labelButton, selectedCategory === 'preto' && styles.selectedButton]}
          onPress={() => handleCategoryPress('preto')}
        >
          <Text style={styles.label}>Preto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.labelButton, selectedCategory === 'vermelho' && styles.selectedButton]}
          onPress={() => handleCategoryPress('vermelho')}
        >
          <Text style={styles.label}>Vermelho</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.labelButton, selectedCategory === 'azul' && styles.selectedButton]}
          onPress={() => handleCategoryPress('azul')}
        >
          <Text style={styles.label}>Azul</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.labelButton, selectedCategory === 'todos' && styles.selectedButton]}
          onPress={() => handleCategoryPress('todos')}
        >
          <Text style={styles.label}>Todos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imagesContainer}>
        {Object.keys(carImages)
          .filter((carName) => {
            if (!searchText) return true; // Show all if no search text
            return carImages[carName].name.toLowerCase().includes(searchText);
          })
          .filter((carName) => {
            if (selectedCategory === 'todos') return true; // Show all if category is 'todos'
            return carName.includes(selectedCategory);
          })
          .map((carName, index) => (
            <TouchableOpacity key={index} onPress={() => handleCarPress(carName)}>
              <Image
                source={carImages[carName].uri}
                style={[styles.image, selectedCar === carName && styles.selectedImage]}
              />
            </TouchableOpacity>
          ))}
      </View>
      {selectedCar && (
        <View style={styles.selectedCarContainer}>
          <Text>{carImages[selectedCar].name}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  labelButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedButton: {
    backgroundColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  selectedCarContainer: {
    marginTop: 20,
  },
});
