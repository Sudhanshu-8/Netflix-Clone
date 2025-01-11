import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailsScreen = ({ route }) => {
  const { movie } = route.params;
  const navigation = useNavigation();

  // Update the header style for DetailsScreen
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#000', // Set top bar background to black
      },
      headerTintColor: '#fff', // Set text color to white for the header title and back icon
      headerTitle: movie.name, // Set the movie name as the title
    });
  }, [navigation, movie]);

  return (
    <ScrollView style={styles.container}>
      {movie.image ? (
        <Image source={{ uri: movie.image?.original }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>No Image Available</Text>
        </View>
      )}
      <Text style={styles.title}>{movie.name}</Text>

      {/* Display Movie Summary */}
      <Text style={styles.summary}>
        {movie.summary?.replace(/<\/?[^>]+(>|$)/g, '')}
      </Text>

      {/* Additional Movie Information */}
      {movie.genres && (
        <Text style={styles.info}>Genres: {movie.genres.join(', ')}</Text>
      )}
      {movie.rating && movie.rating.average && (
        <Text style={styles.info}>Rating: {movie.rating.average}</Text>
      )}
      {movie.language && (
        <Text style={styles.info}>Language: {movie.language}</Text>
      )}
      {movie.premiered && (
        <Text style={styles.info}>Premiered: {movie.premiered}</Text>
      )}
      {movie.runtime && (
        <Text style={styles.info}>Runtime: {movie.runtime} minutes</Text>
      )}
      {movie.network && movie.network.name && (
        <Text style={styles.info}>Network: {movie.network.name}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  imagePlaceholder: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    borderBottomWidth: 1, // Add a bottom border
    borderBottomColor: '#555', // Set the color of the border to grey
    paddingBottom: 10, // Add padding below the title to give space for the border
  },
  summary: {
    fontSize: 16,
    color: '#bbb',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
});

export default DetailsScreen;
