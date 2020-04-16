import React,{Component} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {StyleSheet,View,Image,ImageBackground,Text,TouchableOpacity} from 'react-native';

import * as UserService from '../Service/UserService';

class FirstPage extends Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        // UserService.signout().then(res=>{
        //     console.log('signout');
        // })
    }

    render()
    {
        return (
            <ImageBackground style={{width:"100%",height:"100%"}} source={require('../../img/login/background.png')}>
                <LinearGradient 
                colors={['rgba(145, 230, 168, 0.5)','rgba(79, 117, 239, 0.5)']}
                start={[0,0]}
                end={[1,1]}
                locations={[0.031,0.4323]}           
                style={style.container}>
                    <View style={style.login}>
                        <Image source={require('../../img/logo.png')} style={style.logoimage}></Image>
                        <View style={style.content}>
                            <Text style={style.textcontainer}>
                                Descomplique{'\n'}
                                na hora de fazer{'\n'}
                                a sua mudança,{'\n'}
                                assim é com{'\n'}
                                Moveout
                            </Text>
                        </View>
                        <View style={style.actionbtn}>
                            <TouchableOpacity style={style.loginbtn} onPress={()=>this.props.navigation.navigate('movooutfirst')}>
                                <Text style={style.loginbtntext}>QUERO ME MUDAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.registerbtn} onPress={()=>this.props.navigation.navigate('login')}>
                                <Text style={style.registerbtntext}>FAZER LOGIN</Text>
                            </TouchableOpacity>
                            <Text style={style.bottomtitle}>Como Funciona</Text>
                        </View>
                    </View>   
                </LinearGradient>
            </ImageBackground>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center"
    },
    login:{
        flex:1,
        backgroundColor:"rgba(11, 85, 197, 0.5)",
        paddingLeft:wp('11%'),
        paddingRight:wp('11%')
    },
    content:{
        flex:1,
        marginTop:hp('25%')
    },
    textcontainer:{
        fontSize:hp("5%"),
        lineHeight:hp("6%"),
        fontWeight:"bold",
        color:"#FFF"
    },
    logoimage:{
        width:wp('20%'),
        height:hp('6%'),
        marginTop:hp('8%')
    },
    actionbtn:{
        marginTop:hp('9%'),
        flex:1
    },
    loginbtn:{
        paddingTop:17,
        paddingBottom:17,
        borderRadius:4,
        backgroundColor:'#FFF',
        height:hp('7%')
    },
    loginbtntext:{
        alignSelf:"center",
        color:'#5666F9',
        fontSize:hp('1.8%'),
        fontWeight:'bold'
    },
    registerbtn:{
        paddingTop:17,
        paddingBottom:17,
        borderRadius:4,      
        height:hp('7%'),
        marginTop:8,
        borderColor:'#FFF',
        borderWidth:1
    },
    registerbtntext:{
        alignSelf:"center",
        color:'#FFF',
        fontSize:hp('1.8%'),
        fontWeight:'bold'
    },
    bottomtitle:{
        marginTop:hp('3.3%'),
        alignSelf:"center",
        color:"#FFF",
        fontSize:hp('1.8%'),
        textDecorationLine:"underline",
        textDecorationColor:"#FFF"
    }
})

export default FirstPage;
