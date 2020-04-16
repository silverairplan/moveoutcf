import React,{Component} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {StyleSheet,View,Image,ScrollView,Text,TouchableOpacity,TextInput,KeyboardAvoidingView,AsyncStorage} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import Toast from 'react-native-easy-toast';

import * as AppAuth from 'expo-app-auth';
import * as Facebook from 'expo-facebook';
import axios from 'axios';
import  * as UserService from '../Service/UserService';
import config from '../../config/google.json';

class Register extends Component
{
    error = {};
    constructor(props)
    {
        super(props);
        this.state = {
            data:{
                name:'',
                email:'',
                cpf:'',
                password:'',
                mobilephone:''
            },
            r_password:'',
            error:false
        }
    }
    
    googlesignup = async() => {
            
            const tokenResponse = await AppAuth.authAsync(config);
            if(tokenResponse)
            {
                let self = this;  
                
                axios.get('https://www.googleapis.com/userinfo/v2/me', {
                    headers: { Authorization: `Bearer ${tokenResponse.accessToken}` },
                }).then(res=>{
                    UserService.createusergoogle(res.data.name,res.data.picture,res.data.id,res.data.email,function(data){
                        if(self.props.navigation.state && self.props.navigation.state.params.data)
                        {
                            UserService.getuserdatabaseid(res.data.id,(user)=>{
                                if(user && user!="")
                                {
                                    self.saveuser(user);
                                    self.props.navigation.navigate('locationconfirm',{data:self.props.navigation.state.params.data,passed:self.props.navigation.state.params.passed});
                                }
                            })
                        }
                        else
                        {
                            self.props.navigation.navigate('login');
                        }
                    })
                }
                ).catch(e=>alert(e))
            }
    }
    singupwithFB = async()=> {
        const {type, token} = await Facebook.logInWithReadPermissionsAsync('729030900843428', {permissions: ['public_profile']})

        let self = this;
        if (type == 'success') {
            axios.get('https://graph.facebook.com/me?access_token=' + token + '&fields=id,name,picture,email').then(res=>{
                UserService.createusergoogle(res.data.name,res.data.picture,res.data.id,res.data.email,function(data){
                    if(self.props.navigation.state && self.props.navigation.state.params.data)
                    {
                        UserService.getuserdatabaseid(res.data.id,(user)=>{
                            if(user && user!="")
                            {
                                self.saveuser(user);
                                self.props.navigation.navigate('locationconfirm',{data:self.props.navigation.state.params.data,passed:self.props.navigation.state.params.passed});
                            }
                        })
                    }
                    else
                    {
                        self.props.navigation.navigate('login');
                    }
                })
            }).catch(e=>alert(e))
        }
    }

    handleChange = (name,value) => {
        let data = this.state.data;
        data[name] = value;
        this.validate(data,this.state.r_password);
        this.setState({data:data});
    }

    handleConfirmPassword = (value) => 
    {
        let data = this.state.data;
        
        this.validate(data,value);
        this.setState({
            r_password:value
        });
    }

    validate = (data,r_password) => {
        this.error = {};
        let enable = true;
        if(!r_password)
        {
            enable = false;
            this.error.r_password = "Este campo é obrigatório";
        }
        else
        {
            if(r_password != data.password)
            {
                enable = false;
                this.error.r_password = "Confirmar senha deve ser euqal para senha";
            }
        }

        for(let item in data)
        {
            if(!data[item])
            {
                enable = false;
                this.error[item] = "Este campo é obrigatório"
                continue;
            }
            
            if(item == 'email')
            {
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if(!reg.test(data[item]))
                {
                    enable = false;
                    this.error[item] = "email não está correto";
                    continue;
                }
            }
        }
        return enable;
    }

    saveuser = async(user) => {
        await AsyncStorage.setItem("user",JSON.stringify(user));
    }

    signup = async() => {
        let data = this.state.data;
        let self = this;
        if(this.validate(data,this.state.r_password))
        {
            let exist = false;//await UserService.emailexist(data.email);
            if(!exist)
            {
                let result = await UserService.signup(data);
                if(result.success)
                {
                    if(self.props.navigation.state && self.props.navigation.state.params.data)
                    {
                        UserService.signinuser(data.email,data.password).then(res=>{
                            if(res.success)
                            {
                                self.saveuser(res.user);
                                self.props.navigation.navigate('locationconfirm',{data:self.props.navigation.state.params.data,passed:self.props.navigation.state.params.passed});
                            }
                        })
                    }
                    else
                    {
                        self.props.navigation.navigate('login');
                    }                   
                }
                else
                {
                    alert(result.message);
                }
            }
            else
            {
                this.error.email = "e-mail já existe";
                this.refs.toast.show("e-mail já existe",1200,()=>{});
                this.setState({error:false});
            }
        }
        else
        {
            this.refs.toast.show("corrija erros",1200,()=>{});
            this.setState({error:true})
        }
    }

    render()
    {
        return (
        <KeyboardAvoidingView behavior="padding" style={style.container} >
            <View   
                style={style.container}>
                    <ScrollView style={{flex:1}}>
                        <View style={style.top}>
                            <Toast ref="toast" position="top"></Toast>
                            <Image source={require('../../img/logo.png')} style={style.logoimage}></Image>
                            <Text style={style.title}>
                                Nos informe seus dados{'\n'}
                                para cadastro
                            </Text>
                        </View>
                        <View style={style.register_container}>
                            <View style={style.content}>
                                <View>
                                    <Text style={style.label}>Nome</Text>
                                    <TextInput 
                                        autoCapitalize='none'
                                        ref="name" 
                                        placeholder="" 
                                        placeholderTextColor="#939393" 
                                        style={style.input} 
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text)=>this.handleChange('name',text)}
                                        ></TextInput>
                                    {this.state.error && this.error.name && (
                                        <Text style={style.errortext}>{this.error.name}</Text>                                
                                    )}
                                </View>
                                <View style={style.inputcontainer}>
                                    <Text style={style.label}>Email</Text>
                                    <TextInput
                                    autoCapitalize='none'
                                    ref="email" 
                                    placeholder="" 
                                    placeholderTextColor="#939393" 
                                    style={style.input} 
                                    enablesReturnKeyAutomatically={true}
                                    onChangeText={(text)=>this.handleChange('email',text)}
                                    ></TextInput>
                                    {
                                        this.state.error && this.error.email && (
                                            <Text style={style.errortext}>{this.error.email}</Text>
                                        )
                                    }
                                    
                                </View>
                                <View style={style.inputcontainer}>
                                    <Text style={style.label}>Senha</Text>
                                    <TextInput
                                    type
                                    autoCapitalize='none'
                                    ref="password"
                                    secureTextEntry={true} 
                                    placeholder="" 
                                    placeholderTextColor="#939393" 
                                    style={style.input} 
                                    enablesReturnKeyAutomatically={true}
                                    onChangeText={(text)=>this.handleChange('password',text)}
                                    ></TextInput>
                                    {
                                        this.state.error && this.error.password && (
                                            <Text style={style.errortext}>{this.error.password}</Text>
                                        )
                                    }
                                    
                                </View>
                                <View style={style.inputcontainer}>
                                    <Text style={style.label}>Confirme a Senha</Text>
                                    <TextInput
                                    autoCapitalize='none'
                                    ref="r_password" 
                                    placeholder="" 
                                    placeholderTextColor="#939393" 
                                    style={style.input} 
                                    enablesReturnKeyAutomatically={true}
                                    onChangeText={(text)=>this.handleConfirmPassword(text)}
                                    ></TextInput>
                                    {
                                        this.state.error && this.error.r_password && (
                                            <Text style={style.errortext}>{this.error.r_password}</Text>
                                        )
                                    }
                                    
                                </View>
                                <View style={style.inputcontainer}>
                                    <Text style={style.label}>CPF</Text>
                                    <TextInput 
                                    autoCapitalize='none'
                                    keyboardType="numeric" 
                                    ref="cpf" 
                                    placeholder="" 
                                    placeholderTextColor="#939393" 
                                    style={style.input} 
                                    enablesReturnKeyAutomatically={true}
                                    onChangeText={(text)=>this.handleChange('cpf',text)}
                                    ></TextInput>
                                    {
                                        this.state.error && this.error.cpf && (
                                            <Text style={style.errortext}>{this.error.cpf}</Text>
                                        )
                                    }                                
                                </View>
                                <View style={style.inputcontainer}>
                                    <Text style={style.label}>Telefone</Text>
                                    <TextInput 
                                    autoCapitalize='none'
                                    keyboardType="numeric" 
                                    ref="cpf" 
                                    placeholder="" 
                                    placeholderTextColor="#939393" 
                                    style={style.input} 
                                    enablesReturnKeyAutomatically={true}
                                    onChangeText={(text)=>this.handleChange('mobilephone',text)}
                                    ></TextInput>
                                    {
                                        this.state.error && this.error.mobilephone && (
                                            <Text style={style.errortext}>{this.error.mobilephone}</Text>
                                        )
                                    }                                
                                </View>
                                <Text style={style.titlefacebook}>ou faça login por:</Text>
                                <View style={style.facebookbtncontainer}>
                                    <View style={{flexDirection:'row',margin:'auto'}}>
                                        <TouchableOpacity style={style.socialbutton} onPress={this.googlesignup}>
                                            <Image source={require('../../img/google-white.png')}></Image>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.socialbuttonfacebook} onPress={this.singupwithFB}>
                                            <Image source={require('../../img/facebook-white.png')}></Image>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity style={style.continuebtn} onPress={this.signup}   >
                                    <Text style={style.continuebtntext}>CONTINUAR</Text>
                                </TouchableOpacity>
                            </View>
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
    top:{
        backgroundColor:'#5666F9',
        paddingBottom:hp('3.35%')
    },
    register_container:{
        paddingLeft:wp('11%'),
        paddingRight:wp('11%')
    },
    logoimage:{
        width:wp('20%'),
        height:hp('6%'),
        marginTop:hp('8%'),
        marginLeft:wp('11%')
    },
    content:{
        marginTop:hp('6.79%')
    },
    title:{
        alignSelf:'center',
        fontSize:hp('2.4%'),
        textAlign:"center",
        color:'#FFF',
        fontWeight:'500',
        marginTop:hp('3.125%')
    },
    label:{
        flex:1,
        textAlign:"center",
        fontSize:hp('1.8%'),
        color:'#939393',
        fontWeight:'500'
    },
    titlefacebook:{
        marginTop:hp('3%'),
        flex:1,
        textAlign:"center",
        fontSize:hp('2.4%'),
        fontWeight:"500",
        color:'#535353'
    },
    input:{
        flex:1,
        marginTop:hp('1.64%'),
        borderBottomColor:'#8B8B8B',
        borderBottomWidth:1,
        color:'#939393',
        textAlign:'center',
        paddingTop:hp('0.784%'),
        paddingBottom:hp('0.784%')
    },
    inputcontainer:{
        marginTop:hp('5.7%'),
        flex:1
    },
    facebookbtncontainer:{
        flex:1,
        alignSelf:'center',
        flexDirection:"row",
        marginTop:hp('2.6%')
    },
    socialbutton:{
        backgroundColor:'#CA0030',
        width:hp('6.65%'),
        height:hp('6.65%'),
        borderRadius:hp('3.325%'),
        padding:5,
        alignItems:'center',
        justifyContent:'center'
    },
    socialbuttonfacebook:{
        backgroundColor:'#5666F9',
        width:hp('6.65%'),
        height:hp('6.65%'),
        marginLeft:10,
        borderRadius:hp('3.325%'),
        padding:5,
        alignItems:'center',
        justifyContent:'center'
    },
    continuebtn:{
        paddingTop:17,
        paddingBottom:17,
        borderRadius:4,      
        height:hp('7%'),
        marginTop:hp('4%'),
        borderColor:'#5666F9',
        borderWidth:1,
        marginBottom:hp('4%')
    },
    continuebtntext:{
        alignSelf:"center",
        color:'#5666F9',
        fontSize:hp('1.8%'),
        fontWeight:'bold'
    },
    errortext:{
        color:'#FF0000',
        fontSize:hp('1.63%')
    }
})

export default Register;
