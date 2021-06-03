import React, { Component } from 'react';
import {View,Text, KeyboardAvoidingView,TextInput,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import MyHeader from '../components/MyHeader'
import db from '../config'
import firebase from 'firebase'

export default class SettingScreen extends Component{
  constructor(){
    super();
    this.state={
      emailId:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      docId:''
    }
  }

 getData(){
  var user = firebase.auth().currentUser;
  var email= user.email

 db.collection('users').where('username','==',email).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
       var data = doc.data()
       this.setState({
         emailId: data.username,
         firstName:data.first_name,
         lastName:data.last_name,
         address:data.address,
         contact:data.mobile_number,
         docId:doc.id
       })
    });
  })

}

 updateData(){

  db.collection('users').doc(this.state.docId)
    .update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      address:this.state.address,
      contact:this.state.contact,
    })
}

componentDidMount(){
  this.getData()
}

    render(){
        return(

              <View style={{flex:1}} >
                <MyHeader title="Settings" navigation ={this.props.navigation}/>
                <View style={{flex:1,width:'100%',alignItems: 'center', backgroundColor: "#ff80d5"}}>
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"First Name"}
                  maxLength ={10}
                  onChangeText={(text)=>{
                    this.setState({
                      firstName: text
                    })
                  }}
                  value ={this.state.firstName}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Last Name"}
                  maxLength ={10}
                  onChangeText={(text)=>{
                    this.setState({
                      lastName: text
                    })
                  }}
                    value ={this.state.lastName}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Email"}
                  keyboardType ={'email-address'}
                  onChangeText={(text)=>{
                    this.setState({
                      emailId: text
                    })
                  }}
                    value ={this.state.emailId}
                />
                <TouchableOpacity style={styles.button}
                  onPress={()=>{this.updateData()}}>
                  <Text style={{fontFamily: 'ShareTechMono-Regular', fontSize:15 ,color: "#ff80d5"}}> Save </Text>
                </TouchableOpacity>
                </View>

              </View>
        )
    }
}

const styles = StyleSheet.create({
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'back',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
      fontFamily: 'ShareTechMono-Regular'
    },
    button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        // alignSelf: 'center',
        borderRadius:10,
        backgroundColor:"#00ffc7",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
      },
}
)