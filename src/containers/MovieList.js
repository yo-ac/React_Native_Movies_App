import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image, StyleSheet, Button, Pressable } from "react-native";
import { getMoviesByCategory } from "../services/api.js";
import SelectBottomSheet from './SelectBottomSheet';

const MovieList = ({ setDetails }) => {
    const [category, setCategory] = useState('popular');
    const [movies, setMovies] = useState([]);
    
    console.log(movies);

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getMoviesByCategory(category);
            setMovies(data);
        };
        fetchMovies();
    }, [category]);

    return (
        <View>
            {category && (
                <SelectBottomSheet selected={category} setSelected={setCategory} />
            )}
            <FlatList
                data={movies}
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
                            <Text style={styles.title}>{item.title}</Text>
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
    );
};

export default MovieList;

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
        textAlign: 'center'
    },
    textP:{
        fontSize:18,
    }
})