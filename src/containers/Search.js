import { View, Text, StyleSheet, Pressable, TextInput, Button, FlatList, Image } from 'react-native'
import { use, useState } from 'react'
import SelectDropdown from './SelectDropDown';
import { getSearch } from '../services/api';

const SearchResults = ({ setDetails }) => {
    const options = ['multi', 'movies', 'TV'];
    const [category, setCategory] = useState('multi');
    const [search, setSearch] = useState([]);
    const [searchText, setSearchText] = useState('');

    console.log(category)
    console.log(search);
    console.log(searchText)

    const handleSubmit = async () => {
        console.log('click');
        const data = await getSearch(category, searchText);
        setSearch(data);
    };

    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 40, gap: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textP}>Search Movie/Tv Show Name</Text>
                    <Text style={{ color: 'red', fontSize: 20 }} >*</Text>
                </View>
                <TextInput style={styles.input} placeholder='ie. James Bond, CSI' onChangeText={(text) => setSearchText(text)}>
                </TextInput>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textP}>Choose Search Type</Text>
                    <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
                </View>
                <View style={styles.dropDown}>
                    <View style={{ width: '60%' }}>
                        <SelectDropdown selected={category} options={options} setSelected={setCategory} />
                    </View>
                    <Pressable style={styles.cta} onPress={() => handleSubmit()}>
                        <Text style={{ color: 'white', fontSize: 18 }} >Search</Text>
                    </Pressable>
                </View>
                <Text style={styles.textP}>Please select a search type</Text>
            </View>
            {search && (<View>

                <FlatList
                    data={search}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 10 }}
                    renderItem={({ item }) => (
                        <View style={styles.containerList}>
                            <View>
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                                    style={{ width: 120, height: 130 }}
                                />
                            </View>
                            <View style={styles.auContainer}>
                                {item.title ? <Text style={styles.title}>{item.title}</Text> : <Text style={styles.title}>{item.name}</Text>}
                                <Text style={styles.textP}>Popularity: {item.popularity}</Text>
                                <Text style={styles.textP}>Release Date: {item.release_date}</Text>
                                <Pressable style={styles.button} onPress={() => setDetails(item)}>
                                    <Text style={styles.ctaText}>More details</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />

            </View>)}
        </View>
    )
}

export default SearchResults;

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingHorizontal: 10,
        gap: 10,
    },
    containerList: {
        flexDirection: 'row',
        gap: 15,
        paddingBottom: 10
    },
    input: {
        backgroundColor: "#c2c2c2aa",
        height: 40,
        borderRadius: 5,
        fontSize: 18,
        padding: 10
    },
    dropDown: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    cta: {
        width: 130,
        backgroundColor: '#01B7D3',
        padding: 10,
        borderRadius: 5,
    },
    textP: {
        fontSize: 18
    },
    auContainer: {
        width: 250,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#01B7D3',
        padding: 10,
        borderRadius: 5,
        width: '100%'
    },
    ctaText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    }
})