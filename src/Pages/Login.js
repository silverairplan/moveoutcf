import React,{Component} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {StyleSheet,View,Image,ScrollView,Text,TouchableOpacity,TextInput,KeyboardAvoidingView,AsyncStorage} from 'react-native';

import SvgUri from 'react-native-svg-uri';
import * as Facebook from 'expo-facebook';
import * as AppAuth from 'expo-app-auth';
import config from '../../config/google.json';
import * as UserService from '../Service/UserService';
import axios from 'axios';

class Login extends Component
{
    error = {};
    constructor(props)
    {
        super(props);
        this.state = {
            data:{
                email:'',
                password:''
            },
            error:false           
        }
    }

    checkemail = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!reg.test(email))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    login = async() => {
        let self = this;
        if(!this.state.data.email || !this.state.data.password || !this.checkemail(this.state.data.email))
        {
            alert('Please correct all field');
        }
        else
        {
            UserService.signinuser(this.state.data.email,this.state.data.password).then(result=>{
                if(result.success)
                {
                    self.saveuser(result.user);
                    self.props.navigation.navigate('moveout')
                }
                else
                {
                    alert('email or password is incorrect');
                }
            })
            .catch(err=>{
                alert(err);
            })
        }
    }

    loginwithFB = async() => {
        let self = this;

        const {type, token} = await Facebook.logInWithReadPermissionsAsync('729030900843428', {permissions: ['public_profile']})
        if (type == 'success') {
            axios.get('https://graph.facebook.com/me?access_token=' + token + '&fields=id,name,picture,email').then(res=>{
                UserService.getuserdatabaseid(res.data.id,(user)=>{
                    if(user && user != "")
                    {
                        self.saveuser(user);
                        self.props.navigation.navigate('moveout');
                    }
                    else
                    {
                        UserService.createusergoogle(res.data.name,res.data.picture,res.data.id,res.data.email,function(data){
                            UserService.getuserdatabaseid(res.data.id,(user)=>{
                                if(user.success)
                                {
                                    self.saveuser(user.user);
                                    self.props.navigation.navigatge('moveout');
                                }
                            })
                        })
                    }
                })
            }).catch(e=>alert(e))
        }
    }


    loginwithgoogle = async() => {
        const token = await AppAuth.authAsync(config);
        let self = this;
        if(token)
        {
            axios.get('https://www.googleapis.com/userinfo/v2/me', {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                }).then(res=>{
                    UserService.getuserdatabaseid(res.data.id,(user)=>{
                        if(user && user != "")
                        {
                            self.saveuser(user);
                            self.props.navigation.navigate('moveout');
                        }
                        else
                        {
                            UserService.createusergoogle(res.data.name,res.data.picture,res.data.id,res.data.email,function(data){
                                UserService.getuserdatabaseid(res.data.id,(user)=>{
                                    if(data.success)
                                    {
                                        self.saveuser(user);
                                        self.props.navigation.navigate('moveout');
                                    }
                                })
                                
                            });
                        }
                    })
                })
        }
    }

    saveuser = async(user) => {
        await AsyncStorage.setItem("user",JSON.stringify(user));
    }

    handleChange = (name,value) => {
        let data = this.state.data;
        data[name] = value;
        this.setState({data:data});
    }

    render()
    {
        return (
        <KeyboardAvoidingView behavior="padding" style={style.container} >
            <View        
                style={style.container}>
                    <ScrollView style={style.register_container}>
                        <Image source={require('../../img/logo.png')} style={style.logoimage}></Image>
                        <View style={style.content}>
                            <Text style={style.title}>
                                Faça seu Login
                            </Text>
                            <View style={{marginTop:hp('8%')}}>
                                <Text style={style.label}>Login</Text>
                                <TextInput autoCapitalize='none' ref="login" placeholder="" placeholderTextColor="#FFF" style={style.input} enablesReturnKeyAutomatically={true} onChangeText={(value)=>this.handleChange("email",value)}></TextInput>                                
                            </View>
                            <View style={style.inputcontainer}>
                                <Text style={style.label}>Senha</Text>
                                <TextInput autoCapitalize='none' ref="email" placeholder="" placeholderTextColor="#FFF" style={style.input} enablesReturnKeyAutomatically={true} secureTextEntry={true} onChangeText={(value)=>this.handleChange("password",value)}></TextInput>                                
                            </View>
                            <Text style={style.titlefacebook}>ou faça login por:</Text>
                            <View style={style.facebookbtncontainer}>
                                <TouchableOpacity style={style.socialbutton} onPress={this.loginwithgoogle}>
                                    <Image source={require('../../img/google.png')} style={style.socialbtnimage}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.socialbutton} onPress={this.loginwithFB}>
                                    <Image source={require('../../img/facebook.png')} style={style.socialbtnimage}></Image>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={style.continuebtn}>
                                <Text style={style.continuebtntext} onPress={this.login}>CONTINUAR</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>   
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center"
    },
    register_container:{
        flex:1,
        backgroundColor:"#5666F9",
        paddingLeft:wp('11%'),
        paddingRight:wp('11%')
    },
    logoimage:{
        width:wp('20%'),
        height:hp('6%'),
        marginTop:hp('8%')
    },
    content:{
        marginTop:hp('7%')
    },
    title:{
        alignSelf:'center',
        fontSize:hp('2.4%'),
        textAlign:"center",
        color:'#FFF',
        fontWeight:'500'
    },
    label:{
        flex:1,
        textAlign:"center",
        fontSize:hp('1.8%'),
        color:'#FFF',
        fontWeight:'500'
    },
    titlefacebook:{
        marginTop:hp('3%'),
        flex:1,
        textAlign:"center",
        fontSize:hp('2.4%'),
        fontWeight:"500",
        color:'#FFF'
    },
    input:{
        flex:1,
        marginTop:10,
        borderBottomColor:'#FFF',
        borderBottomWidth:1,
        color:'#FFF',
        textAlign:'center',
        paddingTop:hp('1.3%'),
        paddingBottom:hp('1.3%')
    },
    inputcontainer:{
        marginTop:hp('3%'),
        flex:1
    },
    facebookbtncontainer:{
        flex:1,
        alignSelf:'center',
        flexDirection:"row",
        marginTop:hp('2.6%')
    },
    socialbutton:{
        backgroundColor:'#FFF',
        width:49,
        height:49,
        marginLeft:10,
        borderRadius:25,
        padding:5,
        alignItems:'center',
        justifyContent:'center'
    },
    socialbtnimage:{
        height:39
    },  
    continuebtn:{
        paddingTop:17,
        paddingBottom:17,
        borderRadius:4,      
        height:hp('7%'),
        marginTop:hp('14%'),
        borderColor:'#FFF',
        borderWidth:1
    },
    continuebtntext:{
        alignSelf:"center",
        color:'#FFF',
        fontSize:hp('1.8%'),
        fontWeight:'bold'
    }
})

export default Login;
