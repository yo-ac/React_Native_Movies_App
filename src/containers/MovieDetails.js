import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MovieDetails = ({ movie }) => {
  if (!movie) return null;

  return (
    <View style={styles.container}>
      {movie.title ? <Text style={styles.title}>{movie.title}</Text> : <Text style={styles.title}>{movie.name}</Text>}
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.image}
      />
      <Text style={styles.textP}>{movie.overview}</Text>
      <View style={{flexDirection:'row', gap:0}}>
        <Text style={styles.textP}>Popularity: {movie.popularity} | </Text>
        <Text style={styles.textP}>Release Date: {movie.release_date}</Text>
      </View>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingTop:30,
    gap:10,
    textAlign:'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 15
  },
  textP: {
    fontSize: 16
  }
});
