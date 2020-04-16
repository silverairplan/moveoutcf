import React,{Component} from 'react';
import {View,StyleSheet,ScrollView,Text,Image,TouchableOpacity,AsyncStorage} from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SvgUri from 'react-native-svg-uri';
import MainLayout from './Component/MainLayout';

import cubic from '../../img/moveout/cubic.svg';
class Moveout extends Component
{
    constructor(props)
    {
        super(props);
    }    
    render()
    {
        return (
       <MainLayout {...this.props}  activetruck={true}> 
           <ScrollView style={style.container}>
                <View style={style.textcontainer}>
                    <Text style={style.text}>
                        Você não possui{'\n'}
                        registro de mudança
                    </Text>
                </View>
                <View style={style.cubicview}>
                    <Image source={require('../../img/moveout/cubic.png')} style={style.cubic}/>
                </View>
                <View style={style.action}>
                    <Text style={style.actiontitle}>O que acha de começar agora?</Text>
                </View>
                <TouchableOpacity style={style.changebtncontainer}>
                    <Text style={style.changebtntext}>PLANEJAR MINHA MUDANÇA</Text>
                </TouchableOpacity>
           </ScrollView>
       </MainLayout>)
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    textcontainer:{
        flex:1,
        justifyContent:'center',
        marginTop:hp('9%')
    },
    text:{
        fontSize:hp('2.2%'),
        lineHeight:hp('2.6%'),
        alignSelf:'center',
        textAlign:'center',
        color:'#9C9C9C'
    },
    cubicview:{
        marginTop:hp('9%')
    },
    cubic:{
        width:wp('35%'),
        height:wp('37%'),
        alignSelf:'center'
    },
    action:{
        flex:1,
        marginTop:hp('10%'),
        justifyContent:'center'
    },
    actiontitle:{
        fontSize:hp('2.2%'),
        textAlign:'center',
        color:'#9C9C9C'
    },
    changebtncontainer:{
        width:wp('78%'),
        height:hp('7%'),
        marginTop:hp('2.8%'),
        borderColor:'#5666F9',
        borderWidth:1,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4
    },
    changebtntext:{
        fontSize:hp('1.8%'),
        color:'#5666F9',
        fontWeight:'bold'
    }
})

export default Moveout;