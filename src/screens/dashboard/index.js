import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';

const Dashboard = ({navigation}) => {
  const accountID = useSelector(state => state.counter.value);
  const [watchlistMovies, setWatchlistMovies] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(watchlistMovies);

  const viewDetail = item => {
    navigation.navigate('MovieDetails', {item});
  };

  const handleSearch = input => {
    const query = input.toLowerCase();
    setSearchQuery(query);

    const filteredResults = watchlistMovies.filter(item =>
      item.title.toLowerCase().includes(query),
    );

    setFilteredData(filteredResults);
  };

  const ListRecommendedListItem = ({item}) => {
    return (
      <View style={{display: 'flex', flexDirection: 'row', margin: 10}}>
        <Image
          style={styles.img}
          source={{
            uri: `https://media.themoviedb.org/t/p/w440_and_h660_face${item.poster_path}`,
          }}
        />
        <View style={{flexDirection: 'column', flexShrink: 1, margin: 10}}>
          <Text>{item.title}</Text>
          <Text>{item.overview}</Text>
        </View>
      </View>
    );
  };

  const ListRecommendedComponent = ({data}) => {
    return (
      <View>
        {data?.map(item => (
          <TouchableOpacity onPress={() => viewDetail(item)}>
            <ListRecommendedListItem key={item.id} item={item} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const rateMoviesList = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDJhZWE2OTU3NjFhYjVkZjU1MDNhMjVlNDA3YzVlZSIsInN1YiI6IjY1YTA5YzM0MmNlZmMyMDEzMTM3NDZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qHbjeaQ9_qLHw36tXTj6aQGs-MWspj2v8ZW3XlM0SKI',
      },
    };

    fetch(
      `https://api.themoviedb.org/4/account/${accountID}/movie/recommendations?page=1&language=en-US`,
      options,
    )
      .then(response => response.json())
      .then(response => {
        setWatchlistMovies(response?.results);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    rateMoviesList();
    // eslint-disable-next-line
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={{alignSelf: 'center', fontSize: 20}}>
            List of Recommended Movies
          </Text>
          <View>
            <TextInput
              placeholder="Search"
              type="search"
              value={searchQuery}
              onChangeText={input => handleSearch(input)}
              style={{
                borderWidth: 1,
                height: 40,
                marginHorizontal: 10,
                borderRadius: 8,
              }}
            />
          </View>
          <ListRecommendedComponent
            data={searchQuery ? filteredData : watchlistMovies}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img: {
    borderRadius: 8,
    width: 133.33,
    height: 200,
  },
});

export default Dashboard;
