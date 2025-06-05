import React, { useState } from 'react';
import { View, Text, Pressable, Modal, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import axios from 'axios';

const SelectBottomSheet = ({selected, setSelected}) => {
  const [visible, setVisible] = useState(false);
  const selectedCategory = selected;
  console.log(selected)

  const options = ['now_playing', 'popular', 'top_rated', 'upcoming'];

  const handleSelect = (value) => {
    setSelected(value);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.selector} onPress={() => setVisible(true)}>
        <Text style={styles.selectedText}>{selectedCategory}</Text>
        <MaterialIcons name="arrow-drop-down" size={24} />
      </Pressable>

      <Modal visible={visible} transparent animationType="slide">
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
          <View style={styles.sheet}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelect(item)}
                  style={styles.optionRow}
                >
                  <Text style={styles.optionText}>{item}</Text>
                  {item === selected && (
                    <MaterialIcons name="check" size={20} color="white" />
                  )}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default SelectBottomSheet;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginHorizontal: 80,
    height: 40
    },
  selectedText: {
    fontSize: 16,
    color: 'black'
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  optionRow: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#008080',
    marginBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});
