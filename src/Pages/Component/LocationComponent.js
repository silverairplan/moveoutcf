import React,{Component} from 'react';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {View,StyleSheet,Text,TouchableOpacity,Image} from 'react-native';

class LocationComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            accepted:false,
            selected:false
        }
    }

    

    gettitle = (value) => {
        let itemarray = [];
        for(let item in value)
        {
            itemarray.push(value[item].count + " " + value[item].description);
        }

        return itemarray.join(', ');
    }

    render()
    {
        
        return(
            <View style={style.flex}>
                <TouchableOpacity style={style.container} onPress={()=>this.props.active(this.props.data.guid)}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={style.title}>{this.props.data.destination.address} </Text>
                        <View style={style.state}>
                            <TouchableOpacity style={this.props.data.state != 'accepted'?style.accepticon:style.acceptedicon}></TouchableOpacity>
                            <Text style={this.props.data.state != 'accepted'?style.accepttext:style.acceptedtext}>{this.props.data.state != 'accepted'?'Em andamento':'Concluída'}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={style.datetext}>dia {this.props.data.moveoutdate} </Text>
                    </View>
                    <View style={{marginTop:hp('1%'),flexDirection:'row',alignItems:'center'}}>
                        <Text style={style.locationtitle}>{this.props.data.origin.address}</Text>
                        <Image source={require('../../../img/icon/placeholder.png')} style={{marginLeft:wp('2.8%'),width:hp('2.03%'),height:hp('2.03%')}}></Image>
                    </View>
                    <View>
                        <Text style={style.datetext}>{this.props.data.origin.city}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={style.datetext}>{this.props.data.origin.state}</Text>
                        <TouchableOpacity style={{marginLeft:'auto'}}>
                            <Image source={require('../../../img/icon/download.png')} style={{width:hp('2.7%'),height:hp('2.7%')}}></Image>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                {
                    this.props.opened == this.props.data.guid && (
                        <View style={style.movecontainer}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Image source={require('../../../img/icon/truck_success.png')} style={{width:hp('4.9%'),height:hp('3.71%')}}></Image>
                                <View style={{marginLeft:'auto',flexDirection:'row'}}>
                                    <Text style={style.money}>R$</Text>
                                    <Text style={style.amount}>{this.props.data.estimatedvalue}</Text>
                                </View>
                            </View>
                            <View style={{marginTop:hp('3%')}}>
                                <Text style={style.title}>{this.props.data.destination.address}</Text>
                            </View>
                            <View>
                                <Text style={style.datetext}>dia {this.props.data.moveoutdate} </Text>
                            </View>
                            <View style={{marginTop:hp('1%'),flexDirection:'row',alignItems:'center'}}>
                                <Text style={style.locationtitle}>{this.props.data.origin.address}</Text>
                                <Image source={require('../../../img/icon/placeholder.png')} style={{marginLeft:wp('2.8%'),width:hp('2.03%'),height:hp('2.03%')}}></Image>
                            </View>
                            <View>
                                <Text style={style.datetext}>{this.props.data.origin.city}</Text>
                            </View>
                            <View style={{flexDirection:'row',borderBottomColor:'#DEDEDE',borderBottomWidth:1,paddingBottom:13}}>
                                <Text style={style.datetext}>{this.props.data.origin.state}</Text>
                            </View>
                            <View style={{marginTop:13}}>
                                <Text style={{fontSize:hp('1.9%'),color:'#000'}}>Com os itens:</Text>
                                <Text style={{fontSize:hp('1.9%'),color:'#5666F9'}}>
                                   {
                                       this.gettitle(this.props.data.itemstocarry)
                                   }
                                </Text>
                            </View>
                            <View style={{marginTop:11}}>
                                <Text style={{fontSize:hp('1.9%'),color:'#000'}}>Solicitado:</Text>
                                <Text style={{fontSize:hp('1.9%'),color:'#5666F9'}}>
                                    {this.props.data.box} caixas  
                                </Text>
                            </View>
                            <View style={{marginTop:11}}>
                                <Text style={{fontSize:hp('1.9%'),color:'#000'}}>Itens Frágeis</Text>
                                <Text style={{fontSize:hp('1.9%'),color:'#5666F9'}}>
                                    {this.props.data.additionalinfo}
                                </Text>
                            </View>
                            <TouchableOpacity style={{backgroundColor:'#5160E9',paddingTop:hp('2.3%'),paddingBottom:hp('2.3%'),borderRadius:hp('0.54%'),marginTop:20}}>
                                <Text style={{fontSize:hp('1.9%'),color:'#FFF',fontWeight:'bold',textAlign:'center'}}>REUTILIZAR ESSE MOVEOUT</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                
            </View>
        )
    }
}

const style = StyleSheet.create({
    flex:{
        marginTop:15
    },
    container:{
        minHeight:hp('16%'),
        borderColor:'#338AF0',
        borderWidth:1,
        borderRadius:hp('1%'),
        paddingTop:hp('1.7%'),
        paddingBottom:hp('1.7%'),
        paddingLeft:wp('1.9%'),
        paddingRight:wp('1.9%'),
        marginLeft:wp('5.5%'),
        marginRight:wp('5.5%')
    },
    title:{
        fontSize:hp('2.4%'),
        fontWeight:'500',
        lineHeight:hp('2.8%')
    },
    state:{
        marginLeft:"auto",
        flexDirection:"row",
        alignItems:'center'
    },
    accepticon:{
        width:hp('1.38%'),
        height:hp('1.38%'),
        backgroundColor:'#FF8A00',
        borderRadius:hp('0.69%')
    },
    acceptedicon:{
        width:hp('1.38%'),
        height:hp('1.38%'),
        backgroundColor:'#329E07',
        borderRadius:hp('0.69%')
    },
    accepttext:{
        color:'#FF8A00',
        fontSize:hp('1.6%'),
        marginLeft:wp('1.2%')
    },
    acceptedtext:{
        color:'#329E07',
        fontSize:hp('1.6%'),
        marginLeft:wp('1.2%')
    },
    datetext:{
        color:'#939393',
        fontSize:hp('1.9%')
    },
    locationtitle:{
        color:'#939393',
        fontSize:hp('1.9%'),
        fontWeight:'bold'
    },
    movecontainer:{
        shadowColor:'#000',
        shadowOffset:{width:wp('2.4%'),height:hp('3.4%')},
        borderTopLeftRadius:wp('3.62%'),
        borderTopRightRadius:wp('3.6%'),
        paddingLeft:wp('5.8%'),
        paddingRight:wp('5.8%'),
        paddingTop:hp('2.7%'),
        paddingBottom:hp('2.7%'),
        backgroundColor:'#FFF',
        marginTop:6,
        shadowOpacity:0.2,
        shadowRadius:wp('6.3%'),
        elevation:wp('6.3%'),
        borderWidth:1,
        borderColor:'#e2e2e2',
        marginLeft:wp('5.5%'),
        marginRight:wp('5.5%'),
        marginBottom:hp('2.41%')
    },
    money:{
        fontWeight:'500',
        fontSize:hp('1.63%'),
        lineHeight:hp('1.9%'),
        color:'#5666F9'
    },
    amount:{
        fontWeight:'500',
        fontSize:hp('2.99%'),
        lineHeight:hp('3.53%'),
        color:'#5666F9'
    }
})

export default LocationComponent;