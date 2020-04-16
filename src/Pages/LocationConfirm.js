import React,{Component} from 'react';
import {View,StyleSheet,Text,Image,TextInput,TouchableOpacity,ScrollView,KeyboardAvoidingView} from 'react-native';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import CheckoutLayout from './Component/CheckoutLayout';
import LocationConfirmComponent from './Component/LocationConfirmComponent';
class LocationConfirm extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
           box:false
        }
    }

   

    render()
    {
        let self = this;
        return (
            <CheckoutLayout {...this.props} selectedstep={4} title="Tudo pronto">
                <View style={{flex:1,backgroundColor:'#5666F9'}}>
                    <Text style={style.title}>Terminamos o seu planejamento</Text>
                    <View style={{marginTop:hp('3.94%')}}>
                        <LocationConfirmComponent {...this.props} data={this.props.navigation.state.params.data}></LocationConfirmComponent>
                    </View>
                </View>
            </CheckoutLayout>
        )
    }
}

const style = StyleSheet.create({
    title:{
        marginTop:hp('9.42%'),
        color:'#FFF',
        fontSize:hp('2.45%'),
        fontWeight:'500',
        textAlign:'center'
    },
    description:{
        fontSize:hp('2.17%'),
        color:'#FFF',
        marginTop:hp('7.74%'),
        textAlign:'center'
    },
    boxtext:{
        fontSize:hp('2.17%'),
        color:'#FFF',
        textAlign:'center',
        marginTop:hp('15.625%')
    },
    specialdesc:{
        fontSize:hp('2.17%'),
        color:'#FFF',
        textAlign:'center',
        marginTop:hp('11.82%')
    },
    specialexam:{
        fontSize:hp('1.9%'),
        color:'#90E6A8',
        textAlign:'center',
        marginTop:hp('1.4945%')
    },
    boxinput:{
        width:wp('69.8%'),
        paddingBottom:hp('1.3587%'),
        paddingTop:hp('1.3587%'),
        marginTop:hp('1.766%'),
        color:'#91E6A7',
        fontSize:hp('1.9%'),
        fontWeight:'500',
        textAlign:'center',
        alignSelf:'center',
        borderBottomColor:'#FFF',
        borderBottomWidth:1
    },
    continuebtn:{
        flexDirection:'row',
        marginTop:hp('4.62%'),
        width:wp('76.33%'),
        alignSelf:'center',
        paddingTop:hp('2.31%'),
        paddingBottom:hp('2.31%'),
        borderRadius:4,
        borderWidth:1,
        borderColor:'#FFF',
        justifyContent:'center',
        marginBottom:hp('3%')
    },
    continuetext:{
        color:'#FFF',
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        textAlign:'center'
    },
    specialtextarea:{
        width:wp('76.3285%'),
        height:hp('25.815%'),
        borderRadius:15,
        borderWidth:1,
        borderColor:'#FFF',
        marginTop:hp('3.26%'),
        alignSelf:'center',
        textAlign:'center',
        color:'#91E6A7',
        fontSize:hp('1.9%')
    }
})
export default LocationConfirm;