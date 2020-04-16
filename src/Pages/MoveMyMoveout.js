import React,{Component} from 'react';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {View,ScrollView,StyleSheet,Text,Image,TouchableOpacity} from 'react-native';

import SvgUri from 'react-native-svg-uri';
import PageLayout from './Component/PageLayout';

import * as UserService from '../Service/UserService';

import * as OrderService from '../Service/OrderService';

class MoveMyMoveout extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            clicked:false
        }
    }

    getuser = async() => {
        let user = await UserService.getuser();
        return user;
    }

    confirm = async() => {
        let self = this;
        
        let data = this.props.navigation.state.params.data;
        if(!this.state.clicked)
        {
            this.getuser().then(user=>{
                let key = user.uid;
                data.userid = key;
                data.state = 'waiting';
                data.carrying = {
                    id:'ABC',
                    truckid:'addd',
                    additionalinfo:''
                }
                
                OrderService.createorder(data).then(result=>{
                    if(result.success)
                    {
                        data.orderid = result.orderid;
                        self.props.navigation.navigate('rating',{data:data});
                    }
                })
            })
        }
        
        this.setState({
            clicked:true
        })
    }
    render()
    {
        return (
            <PageLayout {...this.props} bottomdisabled={true} backdisable={true}>
                <ScrollView style={{flex:1}}>
                    <Text style={styles.title}>Agora é só aguardar ;)</Text>
                    <Image style={{marginTop:hp('10.10%'),alignSelf:'center'}} source={require('../../img/icon/foot.png')}></Image>
                    <TouchableOpacity style={styles.continuebtn} onPress={()=>this.confirm()}>
                        <Text style={!this.state.clicked?styles.continuebtnactive:styles.continuebtndeactive}>IR PARA MEUS MOVEOUTS</Text>
                    </TouchableOpacity>
                </ScrollView>
            </PageLayout>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        marginTop:hp('10.05%'),
        textAlign:'center',
        color:'#535353',
        fontWeight:'bold',
        lineHeight:hp('2.58%')
    },
    continuebtn:{
        marginTop:hp('34.34%'),
        marginLeft:wp('12%'),
        marginRight:wp('12%'),
        height:hp('6.8%'),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
        borderColor:'#5463F2',
        borderWidth:1
    },
    continuebtndeactive:{
        color:'#5666F9',
        fontWeight:'bold',
        fontSize:hp('1.9%')
    },
    continuebtnactive:{
        color:'#535353',
        fontWeight:'bold',
        fontSize:hp('1.9%')
    }
})
export default MoveMyMoveout;