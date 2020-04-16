import React,{Component} from 'react';

import {View,StyleSheet,Image,Text,TouchableOpacity} from 'react-native';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SvgUri from 'react-native-svg-uri';

class ServiceItem extends Component
{
    constructor(props)
    {
        super(props);
    }

    add = (index) => {
        let data = this.props.data.data;
        if(!data[index].count)
        {
            data[index].count = 0;
        }

        data[index].count ++;
        this.props.save(data);
    }

    minus = (index) => {
        let data = this.props.data.data;
        if(data[index].count && data[index].count > 0)
        {
            data[index].count --;
            this.props.save(data);
        }
    }
    render(){
        return (
            <View style={style.container}>
                <TouchableOpacity style={style.itemtitle} onPress={this.props.toggle}>
                    <SvgUri style={style.largeimage} source={{uri:this.props.data.large}}></SvgUri>
                    <View style={{marginLeft:'auto',flexDirection:'row',alignItems:'center'}}>
                        <Text style={style.title}>{this.props.data.name}</Text>
                        <Image source={require('../../../img/icon/chevron-right-green.png')}></Image>
                    </View>
                </TouchableOpacity>
               {
                   this.props.data.data && this.props.data.data.length > 0 && (
                       <View style={style.servicecontainer}>
                           {
                               this.props.data.data.map((row,index)=>{
                                   return (
                                       <View style={style.serviceitems} key={index}>
                                           <View style={style.serviceiconcontainer}>
                                               <SvgUri style={style.iconimage} source={{uri:row.picture}}></SvgUri>
                                           </View>
                                           <Text style={style.servicetitle}>{row.description}</Text>
                                           <View style={style.actions}>
                                               <TouchableOpacity onPress={()=>this.minus(index)}><Text style={style.minusbtn}>-</Text></TouchableOpacity>
                                               <TouchableOpacity style={style.count}>
                                                    <Text style={style.counttext}>{row.count?row.count:0}</Text>
                                               </TouchableOpacity>
                                               <TouchableOpacity onPress={()=>this.add(index)}><Text style={style.addbtn}>+</Text></TouchableOpacity>
                                           </View>
                                       </View>
                                   )
                               })
                           }
                       </View>
                   )
               }
            </View>
        )
    }
}


const style = StyleSheet.create({
    container:{
        backgroundColor:'#FFF',
        paddingLeft:wp('4.59%')
    },
    itemtitle:{
        flexDirection:'row',
        alignItems:'center',
        height:hp('6.8%'),
        borderBottomColor:'#8995FF',
        borderBottomWidth:1,
        paddingBottom:hp('1%')
    },
    titleimage:{
        marginLeft:wp('4.59%')
    },
    title:{
        fontSize:hp('2.17%'),
        color:'#5666F9',
        marginRight:wp('6.038%'),
        fontWeight:'500'
    },
    servicecontainer:{
        paddingTop:hp('3.668%'),
        paddingBottom:hp('3.558%')
    },
    serviceitems:{
        height:hp('6.657%'),
        alignItems:'center',
        flexDirection:'row'
    },
    serviceiconcontainer:{
        width:wp('10%')
    },
    servicetitle:{
        fontSize:hp('1.9%'),
        fontWeight:'500',
        color:'#939393'
    },
    actions:{
        marginLeft:'auto',
        flexDirection:'row',
        alignItems:'center'
    },
    addbtn:{
        marginLeft:wp('5.76%'),
        marginRight:wp('6.76%'),
        fontWeight:'500',
        fontSize:hp('3.26%'),
        color:'#5666F9'
    },
    minusbtn:{
        marginLeft:wp('6.76%'),
        fontWeight:'500',
        fontSize:hp('3.26%'),
        color:'#5666F9',
        marginRight:wp('4.59%')
    },
    count:{
        width:hp('2.717%'),
        height:hp('2.717%'),
        borderRadius:hp('1.35%'),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#5666F9'
    },
    counttext:{
        fontSize:hp('1.9%'),
        fontWeight:'500',
        color:'#FFF'
    },
    largeimage:{
        width:hp('6.6%'),
        height:hp('4%')
    },
    iconimage:{
        width:hp('3.4%'),
        height:hp('3.6%')
    }
})
export default ServiceItem;