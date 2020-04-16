import React,{Component} from 'react';

import {View,StyleSheet,Text,Image,TouchableOpacity} from 'react-native';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import ProfileLayout from './Component/Profilelayout';
import * as UserService from '../Service/UserService';

class PaymentSuccess extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            payment:{}
        }
    }

    componentDidMount()
    {
        this.getuser();
    }

    getuser = () => {
        let self = this;
        UserService.getuser().then(user=>{
            if(user.payment)
            {
                self.setState({
                    payment:user.payment
                })
            }
        })
    }

    render(){
        return(
            <ProfileLayout {...this.props} back={()=>this.props.navigation.navigate('profile')} activeprofile={true}>
                <View style={style.container}>
                    <View style={style.mastercard}>
                        <Text style={style.profiletext}>Formas de Pagamento</Text>
                        <TouchableOpacity style={style.fieldcontainer}>
                            <Image source={require('../../img/icon/mastercard.png')} style={style.mastercardimage}></Image>
                            <Text style={style.mastercardtext}>... 8899</Text>
                            {
                                this.state.payment.cardnumber && (
                                    <TouchableOpacity style={{marginLeft:'auto'}}>
                                        <Image source={require('../../img/icon/check-mark.png')}></Image>
                                    </TouchableOpacity>
                                )
                            }
                        </TouchableOpacity>
                        {
                            this.state.payment.cardnumber && (
                                <TouchableOpacity style={style.fieldcontainer}>
                                    <View style={style.mastercardimage}>
                                        <Image source={require('../../img/icon/visa.png')} style={{width:hp('3.94%'),height:hp('1.22%')}}></Image>
                                    </View>
                                    <Text style={style.mastercardtext}>... {this.state.payment.cardnumber.slice(this.state.payment.cardnumber.length - 4,this.state.payment.cardnumber.length)}</Text>
                                </TouchableOpacity>
                            )
                        }
                        
                        <View style={{marginTop:hp('7.337%')}}>
                            <TouchableOpacity style={style.fieldcontainer} onPress={()=>this.props.navigation.navigate('registercard')}>
                                <Text style={style.addcard}>Adicionar um novo cartão para pagamento</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ProfileLayout>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    profiletext:{
        color:'#939393',
        fontSize:hp('2.17%'),
        marginLeft:hp('4.61%'),
        marginTop:hp('4.61%'),
        marginBottom:hp('1.766%')
    },
    fieldcontainer:{
        width:wp('100%'),
        height:hp('6.8%'),
        backgroundColor:'#FFF',
        borderWidth:1,
        borderColor:'#E9E9E9',
        flexDirection:'row',
        alignItems:'center'
    },
    fieldimage:{
        width:hp('2.925%'),
        height:hp('3.315%'),
        marginLeft:wp('11.11%')
    },
    fieldtext:{
        marginLeft:wp('6.635%'),
        fontSize:hp('2.174%'),
        color:'#939393'
    },
    fieldright:{
        marginRight:wp('4.59%')
    },
    mastercard:{
        marginTop:hp('1.5%')
    },
    mastercardimage:{
        width:hp('5.3%'),
        height:hp('3.3%'),
        marginLeft:wp('11.11%'),
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor:'#E9E9E9'
    },
    mastercardtext:{
        fontSize:hp('2.174%'),
        color:'#939393',
        marginLeft:wp('4%')
    },
    addcard:{
        fontSize:hp('2.174%'),
        color:'#5666F9',
        marginLeft:wp('9.42%')
    }
})
export default PaymentSuccess;