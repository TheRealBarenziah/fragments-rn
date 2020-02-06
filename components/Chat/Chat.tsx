import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { StyleSheet, View } from 'react-native';
import Axios from "axios";
import { BACKEND_ENDPOINT, JWT } from 'react-native-dotenv';

interface MyProps {}
interface MyState {
  messages: Array<object>,
  fetchedMessages: Array<object>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
})

export default class Chat extends React.Component<MyProps, MyState> {
  state = {
    messages: [],
    fetchedMessages: []
  }

  fetchMessages(){
    Axios.get(`${BACKEND_ENDPOINT}/fragments`, { 'headers': { 'Authorization': `Bearer ${JWT}` } })
    .then(res => {
      console.log("res = ", res)
      this.setState({fetchedMessages: res.data})
    })
    .catch(e => console.log(e))
  }

  componentDidMount() {
    this.fetchMessages();
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello there',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    console.log(this.state.fetchedMessages)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  onKenobi(messages = []){
    this.setState(previousState => ({
      messages: GiftedChat.append([{
        _id: 3,
        text: 'Hello there',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      }], messages),
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
          name: 'You',
          avatar: 'https://i.ibb.co/f25KDC7/250.jpg',
        }}
      />
      </View>
    )
  }
}