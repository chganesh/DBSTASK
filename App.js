import React,{useReducer} from 'react'
import {
  FlatList,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image, TextInput, Text,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Button

} from 'react-native'
import filter from 'lodash.filter';
import PostsComponent from './PostsComponent';
import postsData from './PostsContext';
import postReducer from './postReducer';
import {
  FILTER_POSTS,
  CLEAR_FILTER,
} from './types';
const { width, height } = Dimensions.get("window");

class SearchComponent extends React.Component {
  state = {
    loading: false,
    data: [],
    error: null,
    query: '',
    fullData: [],
    isRendar:false
  }

   initialState = {
    blogs: this.state.data,
    filtered: null,
  };
// Filter Blogs
 filterBlogs = (text) => {
  this.props.dispatch({ type: FILTER_POSTS, payload: text });
};

// Clear filter
 clearFilter = () => {
  this.props.dispatch({ type: CLEAR_FILTER });
};
  componentDidMount() {
    this.makeRemoteRequest()
  }
  makeRepeated = (arr, repeats) =>
    [].concat(...Array.from({ length: repeats }, () => arr));
  makeRemoteRequest = () => {
    
    const url = `https://jsonplaceholder.typicode.com/posts`
    this.setState({ loading: true })

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: this.makeRepeated(res,30),
          error: res.error || null,
          loading: false,
          fullData: res
        })
      })
      .catch(error => {
        this.setState({ error, loading: false })
      })
  }

  contains = (item, query) => {

    if (
      item.body.includes(query)
    ) {
      return true
    }
    return false
  }
  handleClick = () => {
    this.setState({
      isRendar:false
    })
  };
  handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const data = filter(this.state.fullData, user => {
      return this.contains(user, formattedQuery)
    })
    this.setState({ data, query: text })
  }

  renderHeader = () => (
    <View style={{ width: '100%', alignContent: 'center', justifyContent: 'center', marginTop: 10 }}>
      <TextInput
        style={{
          height: 40,
          borderWidth: 1,
          //paddingLeft: 20,
          margin: 5,
          paddingLeft: 10,
          borderRadius: 10,
          borderColor: 'lightgrey',
          backgroundColor: '#FFFFFF'
        }}
        onChangeText={(text) => this.handleSearch(text)}
        underlineColorAndroid="transparent"
        placeholder="Search Here"
      />
      <View style={{width:'40%',justifyContent:'center',alignItems:'center'}}>
      <Button title='Re Render' onPress={this.handleClick} ></Button>
      </View>
    </View>
  )

  renderListData = () => {
    return (
      <ScrollView showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false} >
          {this.state.data.length > 0 && this.state.data.map((item) => (
            this.renderItem(item)
          ))}

        </ScrollView>
    )
  }

  renderFooter = () => {
    if (!this.state.loading) return null
    return (
      <View
        style={{
          paddingVertical: 5,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}>
        <ActivityIndicator animating size='large' />
      </View>
    )
  }
  
  render() {
    return (
      <SafeAreaView style={{ flex: 1, }}>
        <Image
          source={require("./assets/images/doggo_walk.gif")}
          style={{
            height: height * 0.2,
            width: '100%'
          }}
        />

        {this.renderHeader()}
        <postsData.Provider value={this.state.data}>
        <PostsComponent />
        </postsData.Provider>
      </SafeAreaView>
    )
  }
}

const App = () => (

  <SearchComponent />

)

export default App