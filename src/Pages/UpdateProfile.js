import React,{Component} from 'react';
import {View,StyleSheet,Text,Image,TextInput,TouchableOpacity,ScrollView,KeyboardAvoidingView} from 'react-native';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import PageLayout from './Component/PageLayout';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import * as UserService from '../Service/UserService';
import firebase from 'firebase';
import firestore from '@firebase/firestore';
import fetch from 'cross-fetch';
class UpdateProfile extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            user:{},
            key:false,
            profileupdate:false
        }
    }

    getPermissionAsync = async() => {
        if(Constants.platform.ios)
        {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if(status == 'granted')
            {
                alert('Sorry, we need camera roll permission to make this work.');
                return false;
            }
        }

        return true;
    }

    componentDidMount()
    {
        let self = this;
        this.getuser().then(function(user){
            if(user)
            {
                self.setState({
                    user:user,
                    key:user.uid
                })
            }
            
        })
    }

    pickimage = async() => {
        let self = this;
        this.getPermissionAsync().then(async(enable)=>{
            if(enable)
            {   
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes:ImagePicker.MediaTypeOptions.All,
                    allowsEditing:true,
                    aspect:[4,3]
                });
        
                if(!result.cancelled)
                {
                    let user = this.state.user;
                    user.profileprofile = result.uri;
                    self.setState({
                        user:user,
                        profileupdate:true
                    })
                }
            }
        })  
    }

    getuser = async() => {
        let user = await UserService.getuser();
        return user;
    }

    handleChange = (param,text) => {
        let user = this.state.user;
        user[param] = text;
        this.setState({
            user:user
        })
    }

    signup = () => {
        let self = this;
        let user = this.state.user;
        let id = this.state.key;
        if(this.state.profileupdate && user.profileprofile)
        {
            this.uploadimage(user.profileprofile,function(data){
                user.profileprofile = data;
                UserService.updateuserprofile(user,function(data){
                    self.props.navigation.goBack();
                })
            })
        }
        else
        {
            UserService.updateuserprofile(user,function(data){
                self.props.navigation.goBack();
            })
        }
           
    }

    uploadimage = async(uri,callback) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var timestring = new Date().toLocaleString();
        var ref = firebase.storage().ref('/user').child(timestring);
        var uploadref = await ref.put(blob);
        blob.close();
        
        var downloadurl = await uploadref.ref.getDownloadURL();
        callback(downloadurl);
    }

    render()
    {
        return (
            <PageLayout {...this.props} activeprofile={true}>
                <KeyboardAvoidingView behavior="padding" style={{flex:1}} >
                    <ScrollView style={style.container}>
                        <Text style={style.title}>Alterar informações</Text>
                        <TouchableOpacity style={style.profile} onPress={this.pickimage}>
                        
                            <Image style={style.profileimage} source={this.state.user.profileprofile?{uri:this.state.user.profileprofile}:require('../../img/profile/profile.png')}></Image>
                                
                            <Text style={style.profiletext}>alterar foto</Text>
                        </TouchableOpacity>
                        <View style={style.form}>
                            <View style={style.row}>
                                <Text style={style.title}>Nome</Text>
                                <TextInput style={style.nametext} defaultValue={this.state.user.name} onChangeText={(text)=>this.handleChange("name",text)}></TextInput>
                            </View>
                            <View style={style.row}>
                                <Text style={style.title}>CPF</Text>
                                <TextInput style={style.cpftext} defaultValue={this.state.user.socialid} onChangeText={(text)=>this.handleChange("socialid",text)}></TextInput>
                            </View>
                        </View>
                        <View style={{flex:1,marginTop:hp('8%'),justifyContent:'center',flexDirection:'row'}}>
                            <TouchableOpacity style={style.btn} onPress={this.signup}>
                                <Text style={style.btntext}>SALVAR</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </PageLayout>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        paddingLeft:wp('4.1%'),
        paddingTop:hp('6%'),
        paddingRight:wp('4.1%'),
        paddingBottom:hp('6%')
    },
    title:{
        fontSize:hp('2.17%'),
        color:'#939393',
        marginLeft:wp('4.1%')
    },
    profile:{
        flexDirection:'row',
        marginTop:hp('6.11%'),
        marginLeft:wp('4.11%'),
        alignItems:'center'
    },
    profileimage:{
        width:hp('6.11%'),
        height:hp('6.11%'),
        borderRadius:hp('3.05%')
    },
    profiletext:{
        marginLeft:wp('3.14%'),
        fontSize:hp('2.174%'),
        fontWeight:'300',
        color:'#5666F9'
    },
    form:{
        marginTop:hp('4.62%')
    },
    row:{
        marginTop:hp('4.076%')
    },
    nametext:{
        borderBottomColor:'#5666F9',
        paddingTop:hp('1.358%'),
        paddingBottom:hp('1.358%'),
        paddingLeft:wp('4.106%'),
        borderBottomWidth:1,
        color:'#5666F9',
        fontSize:hp('1.9%'),
        backgroundColor:'#FFF',
        marginTop:hp('2.174%')
    },
    cpftext:{
        borderBottomColor:'#8B8B8B',
        paddingTop:hp('1.358%'),
        paddingBottom:hp('1.358%'),
        paddingLeft:wp('4.106%'),
        borderBottomWidth:1,
        color:'#939393',
        fontSize:hp('1.9%'),
        backgroundColor:'#FFF',
        marginTop:hp('2.174%')
    },
    btn:{
        width:wp('76.33%'),
        paddingTop:hp('2.31%'),
        paddingBottom:hp('2.31%'),
        borderColor:'#5666F9',
        borderWidth:1,
        borderRadius:4
    },
    btntext:{
        color:'#5666F9',
        fontSize:hp('1.9%'),
        textAlign:'center',
        fontWeight:'bold'
    }
})
export default UpdateProfile;