import React,{Component} from 'react';

import {View,ScrollView,StyleSheet,Text,TextInput,Image,TouchableOpacity,Picker,KeyboardAvoidingView} from 'react-native';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PageLayout from './Component/PageLayout';
import {Dropdown} from 'react-native-material-dropdown';
import * as UserService from '../Service/UserService';
import * as Util from '../Service/Utils';


class UpdateInfo extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            user:{},
            key:null
        }
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

    getuser = async() => {
        let user = await UserService.getuser();
        return user;
    }

    changeaddress = (name,value) => {
        console.log(value);
        let user = this.state.user;
        if(!user.address)
        {
            user.address = {};
        }

        user.address[name] = value;
        this.setState({
            user:user
        })
    }

    validate = () => {
        if(this.state.user.email)
        {
            if(Util.checkemail(this.state.user.email))
            {
                return true;
            }
        }
        return false;
    }

    registeraddress = () => {
        let user = this.state.user;
        let id = this.state.key;
        let self = this;
        if(!this.validate())
        {
            alert('Email is not correct');
        }
        else
        {
            console.log(user);
            UserService.updateuserprofile(user,function(data){
                self.props.navigation.navigate('profile');
            })
        }
    }

    changeemail = (email) => {
        let user = this.state.user;
        user.email = email;

        this.setState({
            user:user
        })
    }

    render()
    {
        let country = [{value:'Brasil',icon:require('../../img/country/brazil.png')}];

        let dropdownvalue = false;
        if(this.state.user.address)
        {
            for(let item in country)
            {
                if(country[item].value == this.state.user.address.country)
                {
                    dropdownvalue = country[item];
                }
            }
        }
        
        return (
            <PageLayout {...this.props} activeprofile={true}>
                <KeyboardAvoidingView style={{flex:1}}>
                    <ScrollView style={style.container}>
                        <Text style={style.title}>Alterar informações de contato</Text>
                        <View style={style.form}>
                            <View style={{flex:1}}>
                                <Text style={style.label}>Endereço</Text>
                                <View style={style.input}>
                                    <TextInput  
                                        style={style.textinput}
                                        placeholder="número do cartão"
                                        underlineColorAndroid="transparent"
                                        defaultValue={this.state.user.address && this.state.user.address.name}
                                        onChangeText={(value)=>this.changeaddress('name',value)}
                                        ></TextInput>
                                </View>
                            </View>
                            <View style={{flex:1,marginTop:hp('3.94%'),flexDirection:"row"}}>
                                <View style={{width:wp('41.06%')}}>
                                    <Text style={style.label}>Número</Text>
                                    <View style={style.labelinput}>
                                        <TextInput 
                                        style={style.textinput} 
                                        placeholder="Número" 
                                        defaultValue={this.state.user.address && this.state.user.address.number}
                                        onChangeText={(value)=>this.changeaddress('number',value)}
                                        ></TextInput>
                                    </View>
                                </View>
                                <View style={{width:wp('41.06%'),marginLeft:'auto'}}>
                                    <Text style={style.label}>CVV</Text>
                                    <View style={style.labelinput}>
                                        <TextInput style={style.textinput} placeholder="CVV" defaultValue={this.state.user.address && this.state.user.address.cvv} onChangeText={(value)=>this.changeaddress('cvv',value)}></TextInput>
                                        <TouchableOpacity style={style.iconinfo}>
                                            <Text style={{fontSize:hp('1.34%'),color:'#939393'}}>?</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:1,marginTop:hp('3.94%')}}>
                                <Text style={style.label}>País</Text>
                                <Dropdown
                                        label="Selecione o pais"
                                        data={country}
                                        value={dropdownvalue}
                                        onChangeText={(text,index)=>this.changeaddress("country",country[index].value)}
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
                            <View style={{marginTop:hp('3.94%')}}>
                                <Text style={style.label}>E-mail</Text>
                                <View style={style.labelinput}>
                                    <TextInput style={style.textinput} placeholder="E-mail" defaultValue={this.state.user.email} onChangeText={(email)=>this.changeemail(email)}></TextInput>
                                    <TouchableOpacity style={style.iconinfo}>
                                        <Text style={{fontSize:hp('1.34%'),color:'#939393'}}>?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flex:1,flexDirection:'row',marginTop:hp('13.86%'),justifyContent:'center'}}>
                                <TouchableOpacity style={style.buttonstyle} onPress={()=>this.registeraddress()}>
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
        paddingRight:wp('4.1%'),
        paddingBottom:hp('6.25%')
    },
    title:{
        fontSize:hp('2.17%'),
        color:'#939393',
        marginTop:hp('6%'),
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
        borderBottomWidth:1,
        marginTop:hp('2.174%')
    },
    labelinput:{
        backgroundColor:'#FFF',
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor:'#8B8B8B',
        borderBottomWidth:1,
        marginTop:hp('2.038%')
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

export default UpdateInfo;