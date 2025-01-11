import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const { width: screenWidth } = Dimensions.get('window'); // Get the screen width

const TopPicks = () => {
  const [topPicksMovies, setTopPicksMovies] = useState([]);
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const fetchTopPicksMovies = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        const movies = response.data;
        
        // Filter out movies without images and select 5 random movies
        const filteredMovies = movies.filter(item => item.show.image); // Only select movies with images
        const shuffledMovies = filteredMovies.sort(() => 0.5 - Math.random()).slice(0, 5);
        setTopPicksMovies(shuffledMovies);
      } catch (error) {
        console.error('Error fetching top picks movies:', error);
      }
    };

    fetchTopPicksMovies();
  }, []);

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate('DetailsScreen', { movie: item.show })}
    >
      <Image
        source={{ uri: item.show.image?.medium || 'https://via.placeholder.com/100x150' }}
        style={[styles.movieThumbnail, { width: screenWidth * 0.25, height: screenWidth * 0.375 }]} // Dynamically set image size
      />
      <Text style={styles.movieTitle}>{item.show.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.topPicksText}>Top Picks for You</Text>
      <FlatList
        data={topPicksMovies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMovie}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  topPicksText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  movieCard: {
    marginRight: 10,
  },
  movieThumbnail: {
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  movieTitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default TopPicks;
