import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image } from 'react-native';
import { useSelector } from "react-redux";

const Dashboard = () => {
  const accountID = useSelector((state) => state.counter.value);
  const [watchlistMovies, setWatchlistMovies] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(watchlistMovies);

  console.log("herehere");

//   const navigate = useNavigate();

  const viewDetail = (item) => {
    console.log(item);
    navigate('/movieDetails',  { state: { param: item } });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredResults = watchlistMovies.filter((item) =>
      item.title.toLowerCase().includes(query)
    );

    setFilteredData(filteredResults);
  };

  const ListRecommendedListItem = ({ item }) => {
    return (
      <View style={{ display: "flex" }}>
        <Image
          className="img"
          src={`https://media.themoviedb.org/t/p/w440_and_h660_face${item.poster_path}`}
          alt="Logo"
        />
        <Text style={{ justifyContent: "center", marginLeft: "100px" }}>{item.title}</Text>
        <Text style={{ justifyContent: "center", marginLeft: "100px" }}>{item.overview}</Text>
      </View>
    );
  };

  const ListRecommendedComponent = ({ data }) => {
    console.log("line 47", data);
    return (
      <View>
        {data?.map((item) => (
          <View className="card" onClick={() => viewDetail(item)}>
            <ListRecommendedListItem key={item.id} item={item} />
          </View>
        ))}
      </View>
    );
  };

  const rateMoviesList = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDJhZWE2OTU3NjFhYjVkZjU1MDNhMjVlNDA3YzVlZSIsInN1YiI6IjY1YTA5YzM0MmNlZmMyMDEzMTM3NDZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qHbjeaQ9_qLHw36tXTj6aQGs-MWspj2v8ZW3XlM0SKI",
      },
    };

    fetch(
      `https://api.themoviedb.org/4/account/${accountID}/movie/recommendations?page=1&language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("line 75", response?.results);
        setWatchlistMovies(response?.results);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log("line 82")
    rateMoviesList();
    // eslint-disable-next-line
  }, []);

  return (
    <View>
      <Text className="headerText">Dashboard</Text>
      <View>
        <Text className="headerText">List of Recommended Movies</Text>
          <View className="searchColumn">
              <TextInput
                placeholder="Search"
                type="search"
                value={searchQuery}
                onChange={handleSearch}
                style={{width:"400px"}}
              />
          </View>
          <ListRecommendedComponent
            data={searchQuery ? filteredData : watchlistMovies}
          />
      </View>
    </View>
  );
};

  export default Dashboard;