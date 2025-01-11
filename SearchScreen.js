import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons } from 'react-native-vector-icons'; // Import Ionicons for the search icon

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  // Update the header style and title
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#000', // Set top bar background to black
        borderBottomWidth: 1, // Add border below the header
        borderBottomColor: '#555', // Grey border color
      },
      headerTintColor: '#E50914', // Set text color to red
      headerTitle: 'QuadB Tech', // Set the title
      headerTitleAlign: 'center', // Center the title
    });
  }, [navigation]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setErrorMessage(''); // Clear any previous error message
    try {
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
      if (response.data.length === 0) {
        setErrorMessage('No movies found.');
      }
      setResults(response.data);
    } catch (error) {
      console.error('Error searching for movies:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const renderMovie = ({ item }) => {
    const { show } = item;
    return (
      <TouchableOpacity
        style={styles.movieCard}
        onPress={() => navigation.navigate('DetailsScreen', { movie: show })}
      >
        <Image source={{ uri: show.image?.medium || '' }} style={styles.thumbnail} />
        <View style={styles.movieInfo}>
          <Text style={styles.title}>{show.name}</Text>
          <Text style={styles.summary} numberOfLines={3}>
            {show.summary?.replace(/<\/?[^>]+(>|$)/g, '') || 'No summary available'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Type to search movies..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          placeholderTextColor="#fff" // Placeholder color to white
        />
        <Ionicons 
          name="search" 
          size={20} 
          color="#fff" 
          style={styles.searchIcon} 
        />
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.show.id.toString()}
          renderItem={renderMovie}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Netflix-like black background
    paddingTop: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000', // Search bar background to black
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#555', // Subtle border color for the search box
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#000', // Search bar background to black
    color: '#fff', // Set text color to white
    padding: 10,
    borderRadius: 5,
    paddingRight: 35, // Make room for the icon on the right
    outlineWidth: 0, // Remove the default focus outline
  },
  searchIcon: {
    position: 'absolute',
    right: 15, // Position the icon to the right of the search bar
  },
  listContent: {
    paddingHorizontal: 10,
  },
  movieCard: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#1c1c1c',
    borderRadius: 5,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 100,
    height: 150,
  },
  movieInfo: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  summary: {
    fontSize: 14,
    color: '#bbb',
  },
  errorMessage: {
    color: '#ff0000',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;
