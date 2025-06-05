import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image, StyleSheet, Button, Pressable } from "react-native";
import { getTvShows } from "../services/api.js";
import  SelectDropdown from "./SelectDropDown.js";

const TvList = ({setDetails}) => {
    const [category, setCategory] = useState('popular');
    const [shows, setShows] = useState([]);
    const options = ['airing_today', 'on_the_air', 'popular'];

    useEffect(() => {
        const fetchshows = async () => {
            const data = await getTvShows(category);
            setShows(data);
        };
        fetchshows();
    }, [category]);


    return (
        <View>
            {category && (
                <View style={styles.dropDown}> 
                    <SelectDropdown selected={category} setSelected={setCategory} options={options} />
                </View>

            )}
            <FlatList
                data={shows}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 10 }}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <View>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                                style={{ width: 120, height: 130 }}
                            />
                        </View>
                        <View style={styles.auContainer}>
                            {item.title ? <Text style={styles.title}>{item.title}</Text> :     <Text style={styles.title}>{item.name}</Text> }
                            <Text style={styles.textP}>Popularity: {item.popularity}</Text>
                            <Text style={styles.textP}>Release Date: {item.release_date}</Text>
                            <Pressable style={styles.button} onPress={() => setDetails(item)}>
                                <Text style={styles.ctaText}>More details</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            />
        </View>

    )
}

export default TvList;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },

    auContainer:{
        width: 250,
    }, 

    title: {
        fontWeight: 'bold',
        fontSize:20,
    },

    button: {
        backgroundColor: '#01B7D3',
        padding: 10,
        borderRadius: 5,
        width: '100%'
    },
    ctaText:{
        color: 'white',
        textAlign: 'center',
        fontSize:18
    },
    textP:{
        fontSize:18,
    },

    dropDown:{
        marginHorizontal:80,
        padding:20
    }
})