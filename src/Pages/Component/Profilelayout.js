import React,{Component} from 'react';

import {View,StyleSheet,ScrollView,Image,TouchableOpacity,Text} from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {LinearGradient} from 'expo-linear-gradient';
import BottomNavigation from './Bottomnavigation';

import * as UserService from '../../Service/UserService';
class ProfileLayout extends Component
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
            
        });

        this.props.navigation.addListener('willFocus',function(){
            self.getuser().then(function(user){
                if(user)
                {
                    self.setState({user:user})
                }
            })
        })
        
    }
    componentWillReceiveProps(props)
    {
        console.log('update location');
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
    getuser = async() => {
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
    }
    render()
    {
        return (
            <View style={style.container}>
                <ScrollView style={{flex:1}}>
                    <LinearGradient
                    colors={['#90E6A8','#2E60F3']}
                    start={[0,0]}
                    end={[1,1]}
                    locations={[-0.73,105.97]}
                    style={style.topsidebar}
                    >
                        <View style={{flexDirection:'row',flex:1}}>
                            {
                                !this.props.backdisabled && (
                                    <TouchableOpacity onPress={()=>{if(this.props.back){this.props.back()}else{this.props.navigation.goBack()}}}>
                                        <Image source={require('../../../img/icon/back.png')} style={style.back}></Image>
                                    </TouchableOpacity>
                                )
                            }
                            <TouchableOpacity style={style.helpcontainer}>
                                <Text style={style.helptext}>?</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                    <TouchableOpacity style={style.profilecontainer} onPress={()=>this.props.navigation.navigate("updateprofile")}>
                        {
                            this.rendertitle()
                        }
                        <Text style={style.personname}>{this.state.user.name}</Text>
                    </TouchableOpacity>
                    
                    {this.props.children}
                </ScrollView>
                <BottomNavigation {...this.props}/>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    topsidebar:{
        height:hp('24%'),
        flexDirection:"row",
        paddingTop:hp('3.8%'),
        paddingLeft:wp('5.8%'),
        paddingRight:wp('5.8%'),
    },
    profileimage:{
        width:hp('20.245%'),
        height:hp('20.245%'),
        borderRadius:hp('10.12%')
    },
    profilecontainer:{
        justifyContent:'center',
        flexDirection:'row',
        marginTop:-hp('10.12%'),
        flexWrap:'wrap',
        width:hp('20.245%'),
        height:hp('20.245%'),
        borderRadius:hp('10.12%'),
        backgroundColor:'#5666F9',
        alignItems:'center',
        alignSelf:'center'
    },
    back:{
        height:hp('2.53%'),
        width:wp('7.24%')
    },
    personname:{
        fontSize:hp('2.17%'),
        color:'#5666F9',
        width:wp('100%'),
        textAlign:'center'
    },
    helpcontainer:{
        width:hp('3.4%'),
        height:hp('3.4%'),
        marginLeft:"auto",
        backgroundColor:'#FFF',
        borderRadius:hp('1.7%'),
        alignItems:'center',
        justifyContent:'center'
    },
    helptext:{
        fontSize:hp('1.9%'),
        color:'#4EB4FF'
    },
    profiletext : {
        fontSize:hp('10.6%'),
        color:"white"
    }
})

export default ProfileLayout;