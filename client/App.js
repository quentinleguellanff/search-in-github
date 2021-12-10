import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View, SafeAreaView, TextInput, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default function App() {
  
  const [isLoading, setLoading] = useState(true);
  const [username, setUsername] = useState('quentinleguellanff')
  const [data, setData] = useState([]);
  
  const fetchUSer = async (username) => {
    try {
      /*const { NGROK_URL } = process.env;
      const response = await fetch(`${NGROK_URL}/api/users/${username}`);*/
      const response = await fetch(`http://4da5-2a01-e0a-2c-3330-79dc-606-673c-bad8.ngrok.io/api/users/${username}`);
      const json = await response.json();
      if(json.user) {
        setData(json.user);
      }
      else{
        setData(json)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function search() {
    try {
      const response = await fetchUSer(username)
      const user = await response.json();
      setUser(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchUSer('quentinleguellanff');
  },[]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
          <View style={styles.textAndButton}>
            <TextInput
              style={styles.input}
              placeholder="enter a Github username"
              onChangeText={setUsername}
              returnKeyType="search"
              onSubmitEditing={search}
            />
            <Button 
            title="Search"
            onPress={search}
            />
          </View>
          {data.message ? <View style={styles.userContainer}><Text style={{fontSize:16}}>{data.message}</Text></View> : (
            <View style={styles.userContainer}>
              {isLoading ? <ActivityIndicator/> : (
                <View>
                  <View style={styles.userHeader}>
                      <Image
                        style={styles.avatar}
                        source={{uri : data.avatar_url}}
                      />
                    <View>
                      <Text style={ styles.title }>{data.name}</Text>
                      <Text style={ styles.login }>{data.username}</Text>
                    </View>
                  </View>
                    <Text> {data.bio} </Text>
                    <Text style={styles.text}> {data.email} </Text>
                    <Text style={styles.text}><Icon name="people-outline" size={20} /> {data.followers} followers - {data.following} following</Text>
                    <Text style={ styles.repos }> Repositories <Text style={{backgroundColor: "lightgrey"}}> {data.public_repos} </Text>
                    </Text>
                </View>
                )}
            </View> 
          )}
        <StatusBar style="auto" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textAndButton: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  input: {
    fontSize: 18
  },
  userContainer: {
    flex: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  avatar: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 40,
    overflow: "hidden",
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'flex-start'
  },
  repos: {
    flex: 1,
    textAlign: 'center',
    padding: 10,
    fontSize: 22
  },
  text: {
    fontSize: 16,
    padding: 5
  },
});
