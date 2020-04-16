import React,{Component} from 'react';

import {View,ScrollView,StyleSheet,Text,TextInput,Image,TouchableOpacity,Picker,KeyboardAvoidingView} from 'react-native';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PageLayout from './Component/PageLayout';
import {Dropdown} from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';

import * as UserService from '../Service/UserService';

class RegisterCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            card:{
                transactiondate:new Date(),
                nsu:"",
                cardnumber:"",
                country:""
            }
        }
    }

    componentDidMount = () => {
        let self = this;
        this.getuser().then(user=>{
            let payment = user.payment;
            let card = self.state.card;
            for(let item in payment)
            {   
                card[item] = payment[item];
            }

            self.setState({card:card})
        })
    }

    getuser = async() => {
        let user = await UserService.getuser();
        return user;
    }

    changeaddress = (value) => {
        let card = this.state.card;
        card.country = value;
        this.setState({
            card:card
        })
    }

    handleChange = (name,value) => {
        let card = this.state.card;
        card[name] = value;
        this.setState({
            card:card
        })
    }

    validate = () => {
        let card = this.state.card;
        for(let item in card)
        {
            if(!card[item])
            {
                return false;
            }
        }

        return true;
    }

    registercard = () => {
        if(!this.validate())
        {
            alert("Please Correct All fields");
            return;
        }

        let self = this;
        this.getuser().then(user=>{
            if(!user.payment)
            {
                user.payment = {};
            }

            let payment = self.state.card;

            user.payment = payment;

            UserService.updateuserprofile(user,function(data){
                if(data.success)
                {
                    self.props.navigation.navigate('profile');
                }
            })
        })
    }

    render()
    {
        let country = [{value:'Brasil',icon:require('../../img/country/brazil.png')}];

        let dropdownvalue = false;
        if(this.state.card.country)
        {
            for(let item in country)
            {
                if(country[item].value == this.state.card.country)
                {
                    dropdownvalue = country[item];
                }
            }
        }

        return (
            <PageLayout {...this.props} back={()=>this.props.navigation.navigate('paymentselect')} activeprofile={true} bottomdisabled={true}>
                <KeyboardAvoidingView behavior="padding" style={style.container} >
                    <ScrollView style={style.container}>
                        <Text style={style.title}>FORMA DE PAGAMENTO</Text>
                        <View style={style.form}>
                            <View style={{flex:1}}>
                                <View style={style.input}>
                                    <Image source={require('../../img/icon/card.png')} style={style.icon}></Image>
                                    <TextInput  
                                        style={style.textinput}
                                        placeholder="número do cartão"
                                        underlineColorAndroid="transparent"
                                        onChangeText={(value)=>this.handleChange('cardnumber',value)}
                                        defaultValue={this.state.card.cardnumber}
                                        ></TextInput>
                                </View>
                            </View>
                            <View style={{flex:1,marginTop:hp('4.076%'),flexDirection:"row"}}>
                                <View style={{width:wp('41.06%')}}>
                                    <Text style={style.label}>Data de venc.</Text>
                                    <View style={style.labelinput}>
                                        <DatePicker style={style.textinput} placeholder="MM/AA" format="MM/DD" showIcon={false} date={this.state.card.transactiondate} onDateChange={(date)=>{this.handleChange('transactiondate',date)}}></DatePicker>
                                        {/* <TextInput style={style.textinput} placeholder="MM/AA"></TextInput> */}
                                    </View>
                                </View>
                                <View style={{width:wp('41.06%'),marginLeft:'auto'}}>
                                    <Text style={style.label}>CVV</Text>
                                    <View style={style.labelinput}>
                                        <TextInput style={style.textinput} placeholder="CVV" onChangeText={(value)=>this.handleChange('nsu',value)} defaultValue={this.state.card.nsu}></TextInput>
                                        <TouchableOpacity style={style.iconinfo}>
                                            <Text style={{fontSize:hp('1.34%'),color:'#939393'}}>?</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:1,marginTop:hp('4.076%')}}>
                                <Text style={style.label}>País</Text>
                                <Dropdown
                                        label="Selecione o pais"
                                        data={country}
                                        value={dropdownvalue}
                                        onChangeText={(text,index)=>this.changeaddress(country[index].value)}
                                        containerStyle={{
                                            backgroundColor: '#FFFFFF',
                                            height:hp('4.755%'),
                                            alignItems:'center',
                                            flex:1,
                                            flexDirection:'row',
                                            paddingLeft:wp('4.59%'),
                                            marginTop:hp('2.174%'),
                                            paddingRight:wp('0.73%'),
                                            borderBottomColor:'#8B8B8B',
                                            borderBottomWidth:1
                                        }}
                                        
                                        renderBase={({value, icon}) => {
                                            return (
                                            <View style={{flexDirection:'row',alignItems:'center',width:'100%',height:30}}>                                          
                                            <View>{value?value.value?(<Text style={{fontSize:hp('1.9%'),color:'#939393'}}>
                                                    <Image
                                                        style={{marginRight:wp('2%')}}
                                                        source={value.icon} />
                                                    <Text>  {value.value}</Text>
                                                </Text>):value:(<Text style={{fontSize:hp('1.9%'),color:'#939393'}}>Selecione o pais</Text>)}</View>
                                            <Image style={{marginLeft:"auto"}} source={require('../../img/icon/chevron-bottom.png')}></Image>
                                            </View>
                                        )}} 
                                        valueExtractor={({value, icon}) => {
                                            return (
                                                <Text style={{fontSize:hp('1.9%'),color:'#939393'}}>
                                                    <Image
                                                        style={{marginRight:wp('2%')}}
                                                        source={icon} />
                                                    <Text>  {value}</Text>
                                                </Text>
                                            )
                                        }}
                                        ></Dropdown>
                            </View>
                            <View style={{flex:1,flexDirection:'row',marginTop:hp('13.86%'),justifyContent:'center'}}>
                                <TouchableOpacity style={style.buttonstyle} onPress={this.registercard}>
                                    <Text style={style.buttontext}>SALVAR</Text>
                                </TouchableOpacity>
                            </View>
                            
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
        paddingRight:wp('4.1%')
    },
    title:{
        fontSize:hp('2.17%'),
        color:'#535353',
        fontWeight:'500',
        textAlign:'center',
        marginTop:hp('10.19%'),
        marginLeft:wp('4.1%')
    },
    form:{
        marginTop:hp('8.83%'),
        flex:1
    },
    label:{
        fontSize:hp('1.9%'),
        color:'#939393',
        marginLeft:wp('4.1%')
    },
    input:{
        backgroundColor:'#FFF',
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor:'#5666F9',
        borderBottomWidth:1
    },
    labelinput:{
        backgroundColor:'#FFF',
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor:'#8B8B8B',
        borderBottomWidth:1,
        marginTop:hp('2.174%')
    },
    icon:{
        marginLeft:wp('4.1%'),
        marginTop:hp('0.68%'),
        marginBottom:hp('0.68%'),
        marginRight:wp('3.14%'),
        width:hp('5.3%'),
        height:hp('3.26%')
    },
    textinput:{
        flex:1,
        padding:10,
        backgroundColor:'#FFF',
        color:'#5666F9',
        fontSize:hp('1.9%')
    },
    iconinfo:{
        width:hp('2.038%'),
        height:hp('2.038%'),
        borderColor:'#939393',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:hp('1.019%'),
        marginRight:wp('1.2%')
    },
    buttonstyle:{
        width:wp('76.328%'),
        paddingTop:hp('2.301%'),
        paddingBottom:hp('2.301%'),
        borderColor:'#5666F9',
        borderWidth:1,
        borderRadius:4
    },
    buttontext:{
        fontSize:hp('1.9%'),
        color:'#5666F9',
        fontWeight:'bold',
        textAlign:'center'
    }
})
export default RegisterCard;