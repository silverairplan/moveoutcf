import React,{Component} from 'react';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {View,ScrollView,StyleSheet,Text,Image,TouchableOpacity} from 'react-native';

import SvgUri from 'react-native-svg-uri';
import RadioForm,{RadioButton,RadioButtonInput,RadioButtonLabel} from 'react-native-simple-radio-button';

import PageLayout from './Component/PageLayout';

import * as UserService from '../Service/UserService';

import * as OrderService from '../Service/OrderService';

class ConfirmRequest extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            selected:[]
        }
    }

    select = (value) => {
        let selected = this.state.selected;
        if(selected.indexOf(value) > -1)
        {
            selected.splice(selected.indexOf(value),1);
        }
        else
        {
            selected.push(value);
        }

        this.setState({
            selected:selected
        })
    }
    

    moveoutconfirm = async() => {
        let data = this.props.navigation.state.params.data;
        this.props.navigation.navigate('movemovement',{data:data})
    }

    render()
    {
        return (
            <PageLayout {...this.props} bottomdisabled={true}>
                <ScrollView style={style.container}>
                    <Text style={style.title}>
                        CONFIRME SUA MUDANÇA 
                    </Text>
                    <View style={style.paymentdesc}>
                        <Text style={style.paymenttitle}>{this.props.navigation.state.params.data.destination.address}</Text>
                        <Text style={style.paymentdate}>dia {this.props.navigation.state.params.data.moveoutdate}</Text>
                        <Text style={style.descriptiontitle}>{this.props.navigation.state.params.data.origin.address}</Text>
                        <Text style={style.descriptiondetail}>{this.props.navigation.state.params.data.origin.city}</Text>
                        <Text style={style.descriptiondetail}>{this.props.navigation.state.params.data.origin.state}</Text>
                        <Text style={style.price}>R$ {this.props.navigation.state.params.data.estimatedvalue}</Text>
                    </View>
                    <View style={style.alertcontainer}>
                        <View style={style.lightimagecontainer}>
                            <Image style={style.lightimage} source={require('../../img/icon/light.png')}></Image>
                            <Image style={{marginTop:10,alignSelf:'center'}} source={require('../../img/icon/lighttitle.png')}></Image>
                        </View>
                        <Text style={{marginTop:hp('2.44%'),color:'#939393',fontSize:hp('1.9%'),textAlign:'center'}}>
                            O pagamento será realizado 
                            após confirmação de uma transportadora
                            homologada por nós – Fique tranquilo 😉  
                        </Text>
                    </View>
                    <View style={style.radioform}>
                        <RadioForm animation={true}>
                            <RadioButton labelHorizontal={true} style={style.radiolabel}>
                                <RadioButtonInput
                                    obj={{label:'Estou ciente e de acordo com os Requistos\n para minha Mudança e com os Termos de uso ',value:0}}
                                    index={1}
                                    isSelected={this.state.selected.indexOf(0) > -1} 
                                    borderWidth={1} 
                                    onPress={()=>this.select(0)}
                                    buttonInnerColor={'#2F80ED'}
                                    ></RadioButtonInput>
                                <RadioButtonLabel 
                                index={1}
                                labelHorizontal={true}
                                onPress={()=>this.select(0)}
                                obj={{label:'Estou ciente e de acordo com os Requistos\n para minha Mudança e com os Termos de\n uso ',value:0}}
                                ></RadioButtonLabel>
                            </RadioButton>
                            <RadioButton labelHorizontal={true} style={style.radiolabel}>
                                <RadioButtonInput
                                    obj={{label:'Eu concordo em receber comunicados com\n novidades sobre a Moveout por e-mail e\n sms',value:1}}
                                    index={2}
                                    isSelected={this.state.selected.indexOf(1) > -1}
                                    borderWidth={1} 
                                    onPress={()=>this.select(1)}
                                    buttonInnerColor={'#2F80ED'}
                                    ></RadioButtonInput>
                                <RadioButtonLabel 
                                index={2}
                                labelHorizontal={true}
                                onPress={()=>this.select(1)}
                                obj={{label:'Eu concordo em receber comunicados com\n novidades sobre a Moveout por e-mail e\n sms',value:1}}
                                ></RadioButtonLabel>
                            </RadioButton>
                        </RadioForm>
                    </View>
                    
                    <TouchableOpacity style={style.confirmbtn} onPress={this.moveoutconfirm}>
                        <Text style={style.confirmtext}>CONFIRMAR SOLICITAÇÃO</Text>
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
    radiolabel:{
        borderTopColor:'#E5E5E5',
        borderTopWidth:1,
        borderStyle:'solid',
        paddingTop:hp('1.766%'),
        paddingBottom:hp('0.815%')
    },
    lightimage:{
        alignSelf:'center'
    },  
    lightimagecontainer:{
        marginTop:hp('2.92%')
    },
    paymentdesc:{
        width:wp('82.6%'),
        minHeight:hp('25.27%'),
        paddingLeft:wp('4.1%'),
        paddingRight:wp('4.1%'),
        paddingTop:hp('1.35%'),
        paddingBottom:hp('1.35%'),
        borderColor:'#5666F9',
        borderWidth:1,
        borderRadius:15,
        marginLeft:wp('8.7%'),
        marginTop:hp('5.5%')
    },
    paymenttitle:{
        fontSize:hp('2.445%'),
        fontWeight:'500'
    },
    paymentdate:{
        fontSize:hp('1.9%'),
        color:'#939393'
    },
    descriptiontitle:{
        fontWeight:'bold',
        fontSize:hp('1.9%'),
        color:'#939393'
    },
    descriptiondetail:{
        fontSize:hp('1.9%'),
        color:'#939393'
    },
    price:{
        fontSize:hp('4%'),
        fontWeight:'500',
        marginTop:hp('3%')
    },
    title:{
        fontSize:hp('2.445%'),
        fontWeight:'500',
        color:'#535353',
        marginTop:hp('10.4%'),
        textAlign:'center'
    },
    confirmbtn:{
        flexDirection:'row',
        marginTop:hp('33.8%'),
        width:wp('76.33%'),
        alignSelf:'center',
        paddingTop:hp('2.31%'),
        paddingBottom:hp('2.31%'),
        borderRadius:4,
        backgroundColor:'#5160E9',
        borderWidth:1,
        borderColor:'#5463F2',
        justifyContent:'center',
        marginBottom:hp('3%')
    },
    confirmtext:{
        color:'#FFF',
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        textAlign:'center'
    },
    alertcontainer:{
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#DEDEDE',
        marginLeft:wp('8.7%'),
        marginRight:wp('8.7%'),
        minHeight:hp('29.755%'),
        marginTop:hp('4.6875%')
    },
    radioform:{
        marginLeft:wp('8.7%'),
        marginRight:wp('8.7%'),
        marginTop:hp('5%')
    }
    
})
export default ConfirmRequest;