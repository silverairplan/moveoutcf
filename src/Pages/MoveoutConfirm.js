import React,{Component} from 'react';

import {View,ScrollView,StyleSheet,Text,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import MainLayout from './Component/MainLayout';
import LocationComponent from './Component/LocationComponent';
import * as UserService from '../Service/UserService';
import * as OrderService from '../Service/OrderService';

import Modal,{ModalContent} from 'react-native-modals';

class MoveoutConfim extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            order:[],
            selected:false,
            visibility:false
        }
    }

    componentDidMount()
    {
        this.updateinfo();
    }

    componentWillReceiveProps()
    {
        this.updateinfo();
    }

    updateinfo = () => {
        let self = this;
        this.getuserid().then(user=>{
            let userid = user.uid;
            OrderService.getorder(userid).then(result=>{
                self.setState({
                    order:result,
                    visibility:false
                })
            })
        })
    }
    getuserid = async() => {
        let user = await UserService.getuser();
        return user;
    }

    active = async(orderid) => {
        let order = this.state.order;
        let self = this;
        for(let item in order)
        {
            if(order[item].guid == orderid)
            {
                if(order[item].state != 'accepted')
                {
                    OrderService.enableorder(orderid).then(result=>{
                        console.log(result);
                        let order = self.state.order;
                        for(let item in order)
                        {
                            if(order[item].guid == orderid)
                            {
                                order[item].state = 'accepted';
                            }
                            break;
                        }

                        self.setState({
                            order:order
                        })
                    })
                }
                else
                {
                    if(this.state.selected != orderid)
                    {
                        this.setState({selected:orderid});
                    }
                    else
                    {
                        this.setState({selected:false});
                    }
                }
                break;
            }
        }
    }

    cancelmove = () => {
        let self = this;
        this.setState({
            visibility:true
        })
        
    }

    cancelmovement = () => {
        let self = this;
        this.getuserid().then(user=>{
            let userid = user.uid;
            OrderService.cancelmove(userid).then(result=>{
                if(result.success)
                {
                    self.updateinfo();
                }
            })
        })
    }

    invisible = () => {
        this.setState({
            visibility:false
        })
    }
    render()
    {
        return (
            <MainLayout {...this.props} activetruck={true}>
                <ScrollView style={style.container}>
                    <View style={style.title}>
                        <Text style={style.titletext}>Moveouts</Text>
                    </View>
                    {
                        this.state.order.map((row,index)=>{
                            return <LocationComponent key={index} data={row} active={(orderid)=>this.active(orderid)} opened={this.state.selected}></LocationComponent>
                        })
                    }
                    {/* <LocationComponent></LocationComponent> */}
                </ScrollView>
                <Modal 
                visible={this.state.visibility}
                swipeDirection={['up', 'down']}
                >
                    <ModalContent>
                        <View style={style.modalcontent}>
                            <Image source={require('../../img/icon/light.png')} style={{alignSelf:'center',marginTop:hp('2.92%')}}></Image>
                            <Image source={require('../../img/icon/lighttitle.png')} style={{alignSelf:'center',marginTop:hp('1.42%')}}></Image>
                            <Text style={style.modaldescription}>Tem certeza que deseja cancelar a sua mudança?</Text>
                            <View style={{flexDirection:'row',marginTop:hp('3.34%')}}>
                                <Text style={style.modalbtn} onPress={this.cancelmovement}>SIM</Text>
                                <Text style={style.modalbtn} onPress={this.invisible}>NÃO</Text>
                            </View>
                        </View>
                    </ModalContent>
                </Modal>
                <View style={{marginTop:10,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity style={style.cancelbtn} onPress={this.cancelmove}>
                        <Text style={style.cancelbtntext}>CANCELAR MINHA MUDANÇA</Text>
                    </TouchableOpacity>
                </View>
            </MainLayout>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        flex:1,
        marginLeft:wp('10.5%'),
        marginTop:hp('4.9%')
    },
    titletext:{
        fontSize:hp('2.2%'),
        color:'#939393'
    },
    cancelbtn:{
        marginLeft:wp('11.835%'),
        marginRight:wp('11.835%'),
        height:hp('6.793%'),
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#5666F9',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:4,
        width:wp('76.32%')
    },
    cancelbtntext:{
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        lineHeight:hp('2.174%'),
        color:'#5666F9'
    },
    modalcontent:{
        width:wp('81.88%'),
        height:hp('29.755%')
    },
    modaldescription:{
        fontSize:hp('1.9%'),
        color:'#939393',
        textAlign:'center',
        lineHeight:hp('2.174%'),
        marginTop:hp('2.445%')
    },
    modalbtn:{
        fontSize:hp('1.9%'),
        color:'#000',
        textAlign:'center',
        flex:1
    }
})

export default MoveoutConfim;