import React,{Component} from 'react';
import SvgUri from 'react-native-svg-uri';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {View,StyleSheet,Image,TouchableOpacity,Text} from 'react-native';

class Bottomnavigation extends Component
{
    constructor(props)
    {
        super(props);
    }

    render(){
        return (
            <View style={style.container}>
                <View style={style.navigationcontainer}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('moveoutconfirm')}>
                        {
                            this.props.activetruck && (
                                <Image source={require('../../../img/icon/truck.png')} style={style.navimage}></Image>        
                            )
                        }
                        {
                            !this.props.activetruck && (
                                <Image source={require('../../../img/icon/truck-deactive.png')} style={style.navimage}></Image>        
                            )
                        }
                    </TouchableOpacity>
                </View>                
                <View style={style.navigationcontainer}>
                    <View style={style.addbtncontainer}>
                        
                        <TouchableOpacity style={style.addbtnflex} onPress={()=>this.props.navigation.navigate('movooutfirst')}>
                            <Image source={require('../../../img/icon/plus.png')} style={{width:hp('1.9%'),height:hp('1.9%')}}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={style.navigationcontainer}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('profile')}>
                        {
                            this.props.activeprofile && (
                                <Image source={require('../../../img/icon/profile-active.png')} style={style.profileimage}></Image>        
                            )
                        }
                        {
                            !this.props.activeprofile && (
                                <Image source={require('../../../img/icon/profile.png')} style={style.profileimage}></Image>        
                            )
                        }
                    </TouchableOpacity>
                </View>                
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        position:'relative',
        bottom:0,
        width:wp('100%'),
        height:hp('8%'),
        flexDirection:'row',
        borderTopColor:'#E7E7E7',
        backgroundColor:'#FFF',
        borderTopWidth:1,
        marginTop:hp('4.9%')
    },
    navigationcontainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    navimage:{
        width:hp('4.9%')
    },
    profileimage:{
        width:hp('2.8%')
    },
    addbtncontainer:{
        position:'absolute',
        zIndex:100,
        width:hp('10.2%'),
        height:hp('10%'),
        borderColor:'#E7E7E7',
        borderWidth:1,
        borderTopWidth:0,
        borderRadius:hp('5.1%'),
        padding:hp('1.1%'),
        bottom:hp('1.2%'),
        backgroundColor:'#F9F9F9'
    },
    addbtnflex:{
        backgroundColor:'#5666F9',
        justifyContent:'center',
        alignItems:'center',
        width:hp('8%'),
        height:hp('7.8%'),
        borderRadius:hp('4%')
    }
})

export default Bottomnavigation;