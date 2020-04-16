import React,{Component} from 'react';
import {View,StyleSheet,Text,Image,TextInput,TouchableOpacity,ScrollView,KeyboardAvoidingView,Picker} from 'react-native';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import CheckoutLayout from './Component/CheckoutLayout';
import SvgUri from 'react-native-svg-uri';
import ServiceItem from './Component/ServiceItem';
import PageTop from './Component/PageTop';
import * as UserService from '../Service/UserService';
class ConfirmPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
           box:"",
           specialtext:""
        }
    }

//    back = () => {
//        this.setState({
//            box:!this.state.box
//        })
//    }
    getuser = async() => {
        let user = await UserService.getuser();
        return user;
    }

   continue = async() => {
        if(!this.props.navigation.state.params || !this.props.navigation.state.params.special)
        {
            if(this.props.navigation.state.params)
            {
                let data = this.props.navigation.state.params.data;
                data.box = 20;
                data.additionalinfo = this.state.specialtext;
                let passed = this.props.navigation.state.params.passed;

                let user = await this.getuser();
                console.log(user);
                if(!user || !user.genid)
                {
                    this.props.navigation.navigate('register',{data:data,passed:passed});
                }
                else
                {
                    this.props.navigation.navigate('locationconfirm',{data:data,passed:passed});
                }
                
            }
            
        }
        else
        {
            this.props.navigation.goBack();
            this.props.navigation.state.params.selectspecial(this.state.specialtext);
        }
   }

  
   componentWillReceiveProps(props)
   {
        if(props.navigation.state.params.specialtext)
        {
            this.setState({
                special:props.navigation.state.params.specialtext
            })
        }
   }

   handleChange = (text) => {

        const filteredText = text.replace(/\D/gm, '');

        if(filteredText !== text) {
        // set state text to the current TextInput value, to trigger
        // TextInput update.
        this.setState({ text: text });

        // buys us some time until the above setState finish execution
        setTimeout(() => {

            this.setState((previousState) => {
            return {
                ...previousState,
                box: previousState.text.replace(/\D/gm, '')
            };
            });

        }, 0);
        } else {
        this.setState({ box: filteredText });
        }
    }

    render()
    {
        return (
            <View style={{flex:1}}>
                <PageTop {...this.props}/>
                <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
                    <ScrollView style={style.container}>
                        <View>
                            <View style={style.lightimagecontainer}>
                                <Image style={style.lightimage} source={require('../../img/icon/light.png')}></Image>
                                <Image source={require('../../img/icon/title.png')} style={{alignSelf:'center',marginTop:5}}></Image>
                            </View>
                            <Text style={style.specialdesc}>
                                Você possui itens grandes, frágeis {'\n'}
                                ou faltou algo no inventário {'\n'}
                                para o transporte?
                            </Text>
                            <TextInput 
                            multiline={true} 
                            style={style.specialtextarea} 
                            placeholderTextColor="#91E6A7" 
                            placeholder="Digite aqui" 
                            onChangeText={(value)=>this.setState({specialtext:value})}
                            defaultValue={this.state.special}
                            ></TextInput>
                        </View>
                        <TouchableOpacity style={style.continuebtn} onPress={this.continue}>
                            <Text style={style.continuetext}>CONTINUAR</Text>
                        </TouchableOpacity>
                    </ScrollView>       
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#5666F9'
    },  
    lightimagecontainer:{
        marginTop:hp('13.5%')
    },
    lightimage:{
        width:hp('6.8%'),
        height:hp('6.8%'),
        alignSelf:'center'
    },
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
        marginTop:hp('1.9%')
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
        marginTop:hp('11.82%'),
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
export default ConfirmPage;