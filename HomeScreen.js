import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FAQSection from './FAQSection';
import Trending from './Trending';
import TopPicks from './TopPicks'; // Import TopPicks component

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#000',
      },
      headerLeft: () => (
        <Text style={styles.headerTitle}>QuadB Tech</Text>
      ),
      headerTitle: '',
    });
  }, [navigation]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const renderMovie = ({ item }) => {
    const { show } = item;
    return (
      <TouchableOpacity
        style={styles.movieCard}
        onPress={() => navigation.navigate('DetailsScreen', { movie: show })}
      >
        <Image
          source={{ uri: show.image?.medium || 'https://via.placeholder.com/100x150' }}
          style={styles.thumbnail}
        />
        <View style={styles.movieInfo}>
          <Text style={styles.title}>{show.name}</Text>
          <Text style={styles.summary} numberOfLines={3}>
            {show.summary?.replace(/<\/?[^>]+(>|$)/g, '') || 'No summary available'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    if (item.type === 'movie') {
      return renderMovie({ item });
    } else if (item.type === 'faq') {
      return <FAQSection />;
    }
  };

  const data = [
    { type: 'trending' },
    { type: 'topPicks' },
    ...movies.map(movie => ({ type: 'movie', show: movie.show })),
    { type: 'faq' },
  ];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for movies..."
        onFocus={() => navigation.navigate('Search')}
      />
      {loading ? (
        <View style={styles.loader}>
          <Text style={styles.loaderText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            item.type === 'trending' ? (
              <Trending />
            ) : item.type === 'topPicks' ? (
              <>
                <TopPicks />
                <Text style={styles.popularText}>Popular on QuadB Tech</Text> {/* Added Popular Text */}
              </>
            ) : (
              renderItem({ item })
            )
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 10,
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10,
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E50914',
    marginLeft: 10,
  },
  popularText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default HomeScreen;
