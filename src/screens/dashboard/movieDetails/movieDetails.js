import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const MovieDetails = ({route}) => {
  const {item} = route?.params || {};
  const {original_title, poster_path, overview} = item || {};

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={{ alignSelf: 'center', fontSize: 20 }}>{original_title}</Text>
        <View style={{ flexDirection: 'row', margin: 10 }}>
            <Image
              style={styles.img}
              source={{
                uri: `https://media.themoviedb.org/t/p/w440_and_h660_face${poster_path}`,
              }}
            />
            <View style={{display: 'flex', flexDirection: 'column', flexShrink: 1, margin: 10}}>
              <Text style={{ fontSize: 16 }}>Overview</Text>
              <Text>{overview}</Text>
            </View>
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

export default MovieDetails;
