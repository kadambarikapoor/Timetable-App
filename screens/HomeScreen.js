import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import MyHeader from '../components/MyHeader';
import firebase from 'firebase'

import db from '../config'

export default class HomeScreen extends Component{
  constructor(){
    super()
    this.state = {
      allRequests : []
    }
  this.requestRef= null
  }

deleteslots=()=>{
  var slotsdata= db.collection('slots').doc('autoID'); 
  var removeautoid = slotsdata.update({ autoID:firebase.firestore.FieldValue.delete() });    
}

  getAllRequests =()=>{
    this.requestRef = db.collection("slots")
    .onSnapshot((snapshot)=>{
      var allRequests = []
      snapshot.forEach((doc) => {
          allRequests.push(doc.data())
      })
      this.setState({allRequests:allRequests})
    })
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{

    return (
      <ListItem
        key={i}
        title={item.item_name}
        // subtitle={item.description}
        // description ={item.item_value}
        titleStyle={{ color: '#00ffc7', fontFamily: 'ShareTechMono-Regular' }}
        rightElement={
          // <View>
          <TouchableOpacity style={styles.button}
            onPress ={()=>{
               this.props.navigation.navigate("ReceiverDetails",{"details": item})
             }}>
              <Text style={{color:'#ff80d5', fontFamily:"ShareTechMono-Regular"}}>View</Text>
            </TouchableOpacity>
            
            // <TouchableOpacity style={styles.button}
            // onPress={()=>{this.deleteslots}}>
            //   <Text style={{color:'#ff80d5', fontFamily:"ShareTechMono-Regular"}}>Delete</Text>
            // </TouchableOpacity>
            // </View>
          }
        bottomDivider
      />
    )
  }

  componentDidMount(){
    this.getAllRequests()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  render(){
    return(
      <View style={styles.container}>
        <MyHeader title="Timetable App" navigation ={this.props.navigation}/>
        <View style={{backgroundColor:'ff80d5',flex:1}}>
          {
            this.state.allRequests.length === 0
            ?(
              <View style={{flex:1}}>
                <Text style={{ fontFamily:'ShareTechMono-Regular',color:'#00ffc7', fontSize: 20}}>Your timetable</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allRequests}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ff80d5'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#00ffc7",
  }
})
