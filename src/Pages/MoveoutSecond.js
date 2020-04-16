import React,{Component} from 'react';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {View,KeyboardAvoidingView,ScrollView,StyleSheet,Text,TouchableOpacity,TextInput} from 'react-native';

import PageLayout from './Component/PageLayout';

import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import CheckoutLayout from './Component/CheckoutLayout';
class MoveoutSecond extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data:{
                moveoutdate:Moment(new Date()).format('DD/MM/YYYY'),
                preferedperiod:'',
                flex:''
            }
        }
    }

    handleChange = (name,value) => {
        let data = this.state.data;
        data[name] = value;
        this.setState({
            data:data
        });
    }
    
    next = () => {
        let data = this.state.data;
        let locationinfo = this.props.navigation.state.params.data;

        for(let item in locationinfo)
        {
            data[item] = locationinfo[item];
            
        }

        let passed = this.props.navigation.state.params.passed;
        if(passed)
        {
            passed.push(2);
        }
        this.props.navigation.navigate('checkout',{data:data,passed:passed})
    }
    render(){
        return (
            <CheckoutLayout {...this.props} selectedstep={2} title="qual é a data da MUDANÇA?">
                <View style={style.titlecontainer}>
                    <Text style={style.maintitle}>qual é a data da MUDANÇA?</Text>
                </View>
                <View style={style.containerview}>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <DatePicker format="DD/MM/YYYY" style={style.dateinputcontainer} placeholder="selecione a data" showIcon={false} customStyles={{
                            dateInput:{
                                paddingTop:hp('1.22%'),
                                paddingBottom:hp('1.22%'),
                                backgroundColor:'#FFF',
                                borderColor:'white',
                                borderBottomColor:'#5666F9',
                                borderBottomWidth:1,
                                textAlign:'center'
                            },
                            dateText:{
                                color:'#5666F9',
                                fontSize:hp('1.9%')
                            }
                        }} onDateChange={(date)=>this.handleChange('moveoutdate',date)} date={this.state.data.moveoutdate}></DatePicker>
                        {/* <TextInput style={style.dateinput} placeholder="selecione a data"></TextInput> */}
                    </View>
                    <View style={style.form}>
                        <Text style={style.titledescription}>Qual o Período?</Text>
                        <View style={style.buttoncontainer}>
                            <TouchableOpacity style={this.state.data.preferedperiod == 'morning'?style.buttonactive:style.button} onPress={()=>this.handleChange('preferedperiod','morning')}>
                                <Text style={this.state.data.preferedperiod=='morning'?style.buttonactivetext:style.buttontext}>Manhã</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.data.preferedperiod == 'evening'?style.buttonactive:style.button}  onPress={()=>this.handleChange('preferedperiod','evening')}>
                                <Text style={this.state.data.preferedperiod=='evening'?style.buttonactivetext:style.buttontext}>Tarde</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={style.continue} onPress={this.next}>
                        <Text style={style.continuebtn}>CONTINUAR</Text>
                    </TouchableOpacity>
                </View>
                    
            </CheckoutLayout>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    containerview:{
        paddingLeft:wp('11.835%'),
        paddingRight:wp('11.835%'),
        paddingTop:hp('8.8%')
    },
    title:{
        fontSize:hp('2.17%'),
        textAlign:'center',
        color:'#9C9C9C'
    },
    titlecontainer:{
        backgroundColor:'#E9E9E9',
        height:hp('5.16%'),
        justifyContent:'center',
        alignItems:'center'
    },
    maintitle:{
        textTransform:'uppercase',
        color:'#535353',
        fontWeight:'300',
        fontSize:hp('1.9%')
    },
    dateinput:{
        paddingTop:hp('1.22%'),
        paddingBottom:hp('1.22%'),
        backgroundColor:'#FFF',
        borderColor:'white',
        borderBottomColor:'#5666F9',
        borderBottomWidth:1,
        color:'#5666F9',
        fontSize:hp('1.9%'),
        textAlign:'center',
        
    },
    dateinputcontainer:{
        width:wp('69.8%'),
        backgroundColor:'#FFF'
    },
    form:{
        marginTop:hp('5.3%')
    },
    titledescription:{
        fontSize:hp('1.9%'),
        textAlign:'center',
        color:'#5666F9',
        fontWeight:'500',
        textTransform:'uppercase'
    },
    buttoncontainer:{
        marginTop:hp('4.62%'),
        flexDirection:'row',
        paddingRight:wp('1.207%')
    },
    button:{
        marginLeft:wp('4.59%'),
        flex:1,
        borderColor:'#5666F9',
        borderWidth:1,
        borderRadius:4,
        paddingLeft:wp('1.207%'),
        paddingRight:wp('1.207%'),
        paddingTop:hp('2.31%'),
        paddingBottom:hp('2.31%')
    },
    buttonactive:{
        marginLeft:wp('4.59%'),
        flex:1,
        borderColor:'#5666F9',
        borderWidth:1,
        borderRadius:4,
        backgroundColor:'#5666F9',
        paddingLeft:wp('1.207%'),
        paddingRight:wp('1.207%'),
        paddingTop:hp('2.31%'),
        paddingBottom:hp('2.31%')
    },
    buttonactivetext:{
        color:'white',
        fontSize:hp('1.9%'),
        textAlign:'center'
    },
    buttontext:{
        color:'#5666F9',
        fontSize:hp('1.9%'),
        textAlign:'center'
    },
    continue:{
        paddingTop:hp('2.31%'),
        paddingBottom:hp('2.31%'),
        marginTop:hp('31.25%'),
        borderColor:'#5666F9',
        borderWidth:1,
        borderRadius:4
    },
    continuebtn:{
        color:'#5666F9',
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        textAlign:'center'
    }   
})

export default MoveoutSecond;