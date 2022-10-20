import React,{useContext} from 'react';
import {Text,TouchableOpacity,View,ScrollView,SafeAreaView} from 'react-native';
import postsData from './PostsContext';
const PostsComponent = () => {
  const data = useContext(postsData);
  console.log("dataaa",data.length);
 const renderItem = (item) => {
    return (
      <TouchableOpacity onPress={() => alert('Item pressed!')}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center'
          }}>

          <Text
            category='s1'
            style={{
              color: '#000'
            }}>{`${item.id} : ${item.body}`}</Text>

        </View>
        <Text
          category='s1'
          style={{
            color: '#000',
            fontWeight: 'bold',
            paddingStart: 10,
          }}>{Math.floor(100000000 + Math.random() * 900000000)}</Text>
      </TouchableOpacity>
    );
  };
    return (
      <SafeAreaView style={{flex:1}}>
      <ScrollView showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false} >
          {data.length > 0 && data.map((item) => (
            renderItem(item)
          ))}

        </ScrollView>
        </SafeAreaView>
    )
  }

export default PostsComponent;