import React,{Component} from 'react';
import {View,StyleSheet,Text,Image,TextInput,TouchableOpacity,ScrollView,KeyboardAvoidingView} from 'react-native';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import CheckoutLayout from './Component/CheckoutLayout';
import ServiceItem from './Component/ServiceItem';
import SvgUri from 'react-native-svg-uri';
import * as OrderService from '../Service/OrderService';
import furniture from '../../config/furniture.json';
class CheckoutPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            service:furniture,
            params:{},
            toggle:-1,
            data:[]
        }
    }

    save = (index,data) => {
        let service = this.state.service;
        service[index].data = data;
        this.setState({
            service:service
        })
    }

    // getdata = () => {
    //     let self = this;
    //     OrderService.getfurniture().then(res=>{
    //         console.log(res);
    //         self.setState({
    //             service:res
    //         })
    //     })
    // }

    componentDidMount()
    {
        console.log(this.props.navigation.state.params);
        //this.getdata();
        this.setState({
            params:this.props.navigation.state.params.data
        })   
    }
    
    toggle = (index) => {
        let toggle  = -1;
        if(this.state.toggle != index)
        {
            toggle = index;
        }
        this.setState({toggle:toggle});
    }

    continue = () => {
        let data = this.state.service;
        let value = [];
        for(let item in data)
        {
            if(data[item].data)
            {
                for(let index in data[item].data)
                {
                    if(data[item].data[index].count > 0)
                    {
                       value.push(data[item].data[index])
                    }
                }
            }
        }

        let params = this.state.params;
        params.itemstocarry = value;
        params.estimatedvalue = 1200;
        
        let passed = this.props.navigation.state.params.passed;
        passed.push(3);
        this.props.navigation.navigate('confirm',{data:params,passed:passed});
    }

    special = () => {
        this.props.navigation.navigate('confirm',{special:true,selectspecial:this.selectspecific,specialtext:this.state.params.specialdata})
    }

    selectspecific = (data) => {
        let params = this.state.params;
        params.additionalinfo = data;
        this.setState({
            params:params
        })
    }

    render()
    {
        let self = this;
        return (
            <CheckoutLayout {...this.props} selectedstep={3} title="o que irá levar?">
                <View style={style.container}>
                    <Text style={style.description}>o que irá levar?</Text>
                    <View style={style.servicelist}>
                        {
                            this.state.service.map((row,index)=>{
                                if(self.state.toggle == index){
                                    return (
                                        <ServiceItem key={index} data={row} save={(data)=>this.save(index,data)} toggle={()=>self.toggle(index)}></ServiceItem>
                                    ) 
                                }
                                else{
                                    return (
                                        <TouchableOpacity key={index} style={style.serviceitem} onPress={()=>self.toggle(index)}>
                                            <View style={style.iconcontainer}>
                                                <SvgUri source={{uri:row.small}} style={style.smallimage}></SvgUri>
                                            </View>
                                            <Text style={style.servicetitle}>{row.name}</Text>
                                            <Image source={require('../../img/icon/chevron-right-white.png')} style={style.righticon}></Image>
                                        </TouchableOpacity>
                                    )
                                }
                                
                            })
                        }
                    </View>
                    <TouchableOpacity style={style.continuebtn} onPress={this.continue}>
                        <Text style={style.continuetext}>CONTINUAR</Text>
                    </TouchableOpacity>
                </View>
                
            </CheckoutLayout>
        )
    }
}

const style = StyleSheet.create({
    container:{
        backgroundColor:'#5666F9',
        flex:1
    },
    title:{
        marginTop:hp('9.42%'),
        color:'#FFF',
        fontSize:hp('2.45%'),
        fontWeight:'500',
        textAlign:'center'
    },
    description:{
        fontSize:hp('1.9%'),
        color:'#FFF',
        marginTop:hp('7.74%'),
        textAlign:'center',
        textTransform:'uppercase',
        fontWeight:'bold'
    },
    servicelist:{
        flex:1,
        marginTop:hp('7.745%'),
        borderBottomColor:'#8995FF',
        borderBottomWidth:1
    },
    serviceitem:{
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:wp('4.83%'),
        height:hp('6.657%'),
        borderTopColor:'#8995FF',
        borderTopWidth:1
    },
    iconcontainer:{
        width:hp('3.076%')
    },
    servicetitle:{
        fontSize:hp('2.174%'),
        color:'#FFF',
        marginLeft:wp('3.14%')
    },
    righticon:{
        marginLeft:'auto',
        marginRight:wp('0.48%')
    },
    largelisttext:{
        fontSize:hp('1.9%'),
        fontWeight:'500',
        lineHeight:hp('2.174%'),
        textAlign:'center',
        marginTop:hp('10.87%'),
        color:'#FFF'
    },
    continuebtn:{
        flexDirection:'row',
        marginTop:hp('8.424%'),
        width:wp('76.33%'),
        alignSelf:'center',
        paddingTop:hp('2.31%'),
        paddingBottom:hp('2.31%'),
        borderRadius:4,
        borderWidth:1,
        borderColor:'#FFF',
        justifyContent:'center',
        marginBottom:hp('6.93%')
    },
    continuetext:{
        color:'#FFF',
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        textAlign:'center'
    },
    smallimage:{
        width:hp('3.4%'),
        height:hp('3.6%')
    }
})
export default CheckoutPage;