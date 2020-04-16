import React,{Component} from 'react';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {View,ScrollView,StyleSheet,Text,Image,TouchableOpacity} from 'react-native';

import PageLayout from './Component/PageLayout';

import Moment from 'moment';
class ConfirmPayment extends Component
{
    constructor(props)
    {
        super(props);
    }
    
    request = () => {
        let data = this.props.navigation.state.params.data;
        data.payment = {
            nsu:'11111',
            value:1200,
            type:'creditcard',
            transactiondate:Moment(new Date()).format('YYYY-MM-DD')
        }

        this.props.navigation.navigate('request',{data:data});
    }

    render()
    {
        return (
            <PageLayout {...this.props}>
                <ScrollView style={style.container}>
                    <Text style={style.title}>Escolha sua forma de pagamento</Text>
                    <View style={{flexDirection:'row',marginTop:hp('1.9%'),marginLeft:wp('6.52%'),alignItems:'center'}}>
                        <Text style={style.unit}>R$</Text>
                        <Text style={style.price}>{this.props.navigation.state.params.data.estimatedvalue}</Text>
                    </View>
                    <View style={style.mastercard}>
                        <Text style={style.profiletext}>Formas de Pagamento</Text>
                        <View style={style.fieldcontainer}>
                            <Image source={require('../../img/icon/mastercard.png')} style={style.mastercardimage}></Image>
                            <Text style={style.mastercardtext}>... 8899</Text>
                            <TouchableOpacity style={{marginLeft:'auto'}}>
                                <Image source={require('../../img/icon/chevron-right.png')} style={style.fieldright}></Image>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={style.fieldcontainer}>
                            <Text style={style.addcard}>Adicionar um novo cartão para pagamento</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={style.paymentdescription}>
                        o pagamento será realizado somente{'\n'}
                        após confirmação de uma transportadora{'\n'}
                        homologada pela gente – Fique tranquilo 😉  
                    </Text>
                    <TouchableOpacity style={style.continuebtn} onPress={this.request}>
                        <Text style={style.continuetext}>CONTINUAR</Text>
                    </TouchableOpacity>
                </ScrollView>
            </PageLayout>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        fontSize:hp('2.445%'),
        fontWeight:'500',
        color:'#939393',
        marginTop:hp('10.87%'),
        marginLeft:wp('6.52%')
    },
    unit:{
        fontSize:hp('2.717%'),
        color:'#5666F9',
        fontWeight:'500'
    },
    price:{
        fontSize:hp('4.62%'),
        color:'#5666F9',
        fontWeight:'500',
        marginLeft:wp('1.45%')
    },
    mastercard:{
        marginTop:hp('1.5%')
    },
    mastercardimage:{
        width:hp('5.3%'),
        height:hp('5.3%'),
        marginLeft:wp('11.11%')
    },
    mastercardtext:{
        fontSize:hp('2.174%'),
        color:'#939393',
        marginLeft:wp('4%')
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
    fieldright:{
        width:wp('3.26%'),
        height:hp('3.26%'),
        marginRight:wp('4.59%')
    },
    profiletext:{
        color:'#939393',
        fontSize:hp('2.17%'),
        marginLeft:wp('6.52%'),
        marginTop:hp('4.61%'),
        marginBottom:hp('1.766%')
    },
    addcard:{
        fontSize:hp('2.174%'),
        color:'#5666F9',
        marginLeft:wp('9.42%')
    },
    paymentdescription:{
        fontSize:hp('1.9%'),
        color:'#939393',
        marginLeft:wp('6.52%'),
        lineHeight:hp('2.174%'),
        marginTop:hp('6.25%')
    },
    continuebtn:{
        flexDirection:'row',
        marginTop:hp('7.88%'),
        width:wp('76.33%'),
        alignSelf:'center',
        paddingTop:hp('2.31%'),
        paddingBottom:hp('2.31%'),
        borderRadius:4,
        borderWidth:1,
        borderColor:'#5463F2',
        justifyContent:'center',
        marginBottom:hp('3%')
    },
    continuetext:{
        color:'#5666F9',
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        textAlign:'center'
    },
    
})
export default ConfirmPayment;