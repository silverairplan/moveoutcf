import React,{Component} from 'react';
import {View,StyleSheet,Image,TouchableOpacity,Text} from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as UserService from '../../Service/UserService';

class PageTop extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            user:{}
        }
    }

    componentDidMount()
    {
        let self = this;
        this.getuser().then(function(user){
            if(user)
            {
                self.setState({
                    user:user
                })
            }          
        })
    }

    getuser = async()=>{
        let user = await UserService.getuser();
        return user;
    }

    rendertitle = () => {
        if(this.state.user.profileprofile)
        {
            return (<Image source={{uri:this.state.user.profileprofile}} style={style.profileimage}></Image>);
        }
        else if((this.state.user.name || this.state.user.email) && !this.state.user.profileprofile)
        {
            return (<Text style={style.profiletext}>{this.state.user.name?this.state.user.name.charAt(0).toUpperCase():this.state.user.email.charAt(0).toUpperCase()}</Text>);
        }
        else
        {
            return (<Image source={require('../../../img/profile/profile.png')} style={style.profileimage}></Image>)
        }
    }

    render()
    {
        return(
            <View style={style.container}>
                {!this.props.backdisable && (
                    <TouchableOpacity onPress={()=>{if(this.props.back){this.props.back()} else{this.props.navigation.goBack();}}}>
                        <Image source={require('../../../img/icon/back.png')}></Image>
                    </TouchableOpacity>
                )}
                
                <Image source={require('../../../img/logo.png')} style={style.logoimage}></Image>
                <TouchableOpacity style={style.helpbtn} onPress={()=>this.props.navigation.navigate('profile')}>
                    {
                        this.rendertitle()
                    }
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        width:wp('100%'),
        height:hp('10.5%'),
        backgroundColor:'#5666F9',
        paddingLeft:wp('5%'),
        paddingRight:wp('5%'),
        paddingTop:hp('2%'),
        flexDirection:'row',
        alignItems:'center'
    },
    profileimage:{
        width:hp('5.8%'),
        height:hp('5.8%'),
        borderRadius:hp('2.9%')
    },
    logoimage:{
        width:hp('10.5%'),
        height:hp('5.2%'),
        marginLeft:wp('25%')
    },
    helpbtn:{
        marginLeft:'auto',
        width:hp('5.8%'),
        height:hp('5.8%'),
        borderRadius:hp('2.9%'),
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    helpbtntxt:{
        fontSize:hp('1.8%'),
        color:'#4EB4FF'       
    },
    backbtn:{
        width:hp('4.07%'),
        height:hp('4.07%')
    },
    profiletext:{
        fontSize:hp('2.9%'),
        color:'#4EB4FF' 
    }
})

export default PageTop;