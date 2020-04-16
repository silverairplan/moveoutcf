import React,{Component} from 'react';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {View,ScrollView,StyleSheet,Text,Image,TouchableOpacity,TextInput,KeyboardAvoidingView} from 'react-native';
import * as UserService from '../Service/UserService';
import * as OrderService from '../Service/OrderService';
class Rate extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            user:{},
            mark:0,
            description:"",
            clicked:false
        }
    }

    componentDidMount()
    {
        this.getuser().then(user=>{
            this.setState({
                user:user
            })
        })
    }

    getuser = async() => {
        let user = await UserService.getuser();
        return user;
    }

    getuserprofile = () => {
        if(this.state.user.profileprofile)
        {
            return (
                <Image source={{uri:this.state.user.profileprofile}} style={styles.profileimage}></Image>
            )
        }
        else if(this.state.user.name)
        {
            return (
                <Text style={styles.profiletext}>{this.state.user.name.charAt(0).toUppercase()}</Text>
            )
        }
    }

    setmark = (mark) => {
        this.setState({
            mark:mark
        })
    }

    handleChange = (value) => {
        this.setState({
            description:value
        })
    }

    postrate = () => {
        if(!this.state.clicked)
        {
            this.setState({
                clicked:true
            })

            let rate = {
                mark:this.state.mark,
                description:this.state.description,
                userid:this.state.user.guid,
                orderid:this.props.navigation.state.params.data.orderid
            }    

            let self = this;
            OrderService.postrate(rate).then(res=>{
                if(res.success)
                {
                    self.props.navigation.navigate('moveoutconfirm');
                }
            })
        }
        
    }

    render()
    {
        return (
            <View style={{flex:1}}>
                <View style={styles.titlecontainer}>
                    <View style={styles.topbar}>
                        <Image source={require('../../img/logo.png')} style={styles.logoimage}></Image>
                    </View>
                    <Text style={styles.title}>rating</Text>
                </View>
                <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
                    <ScrollView style={styles.content}>
                        <TouchableOpacity style={styles.location}>
                            <View>
                                <Text style={styles.address}>{this.props.navigation.state.params.data.destination.address}</Text>
                                <Text style={styles.other}>dia {this.props.navigation.state.params.data.moveoutdate}</Text>
                            </View>
                            <View style={styles.destination}>
                                <View>
                                    <Text style={styles.destinationaddress}>{this.props.navigation.state.params.data.origin.address}</Text>
                                    <Text style={styles.other}>{this.props.navigation.state.params.data.origin.city}</Text>
                                    <Text style={styles.other}>{this.props.navigation.state.params.data.origin.state}</Text>
                                    <Text style={styles.price}>RS {this.props.navigation.state.params.data.estimatedvalue}</Text>
                                </View>
                                <View style={{flex:1}}>
                                    <TouchableOpacity  style={styles.profileimagecontainer}>
                                        {
                                            this.getuserprofile()
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.reviewarea}>
                            <Text style={styles.reviewtitle}>Avalie a sua mudança</Text>
                            <View style={{justifyContent:'center',marginTop:hp('1.087%')}}>
                                <View style={{flexDirection:'row',alignSelf:'center'}}>
                                    <TouchableOpacity style={styles.star} onPress={()=>this.setmark(1)}>
                                        <Image source={this.state.mark >= 1?require('../../img/icon/star_full.png'):require('../../img/icon/star_empty.png')} style={{width:hp('4.076%'),height:hp('4.076%')}}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.star} onPress={()=>this.setmark(2)}>
                                        <Image source={this.state.mark >= 2?require('../../img/icon/star_full.png'):require('../../img/icon/star_empty.png')} style={{width:hp('4.076%'),height:hp('4.076%')}}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.star}  onPress={()=>this.setmark(3)}>
                                        <Image source={this.state.mark >=3?require('../../img/icon/star_full.png'):require('../../img/icon/star_empty.png')} style={{width:hp('4.076%'),height:hp('4.076%')}}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.star}  onPress={()=>this.setmark(4)}>
                                        <Image source={this.state.mark >= 4?require('../../img/icon/star_full.png'):require('../../img/icon/star_empty.png')} style={{width:hp('4.076%'),height:hp('4.076%')}}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.star}  onPress={()=>this.setmark(5)}>
                                        <Image source={this.state.mark >= 5?require('../../img/icon/star_full.png'):require('../../img/icon/star_empty.png')} style={{width:hp('4.076%'),height:hp('4.076%')}}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{marginTop:hp('1.5%')}}>
                                <Text style={styles.reviewtitle}>Deixe o seu comentário</Text>
                                <TextInput multiline={true} style={styles.reviewdescription} onChangeText={(text)=>this.handleChange(text)} defaultValue={this.state.description}></TextInput>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.continuebtn} onPress={()=>this.postrate()} disabled={this.state.clicked}>
                            <Text style={styles.continuebtntext}>ENVIAR</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titlecontainer:{
        paddingTop:hp('3.85%'),
        backgroundColor:'#5666F9'
    },
    topbar:{
        flexDirection:'row',
        paddingLeft:wp('4.1%'),
        alignItems:'center',
        alignSelf:'center'
    },
    logoimage:{
        marginLeft:'auto',
        marginRight:'auto',
        width:hp('10.46%'),
        height:hp('5.43%')
    },
    title:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:hp('1.9%'),
        color:'white',
        textTransform:'uppercase',
        marginTop:hp('3.125%'),
        marginBottom:hp('1.35%')
    },
    content:{
        paddingLeft:wp('12.07%'),
        paddingRight:wp('12.07%'),
        paddingTop:hp('2.71%')
    },
    location:{
        borderColor:'#5666F9',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:15,
        paddingLeft:wp('4.1%'),
        paddingRight:wp('4.1%'),
        paddingTop:hp('1.35%'),
        shadowColor:'#000',
        shadowOffset:{width:0,height:hp('1.54%')},
        minHeight:hp('25.27%'),
        shadowRadius:hp('1.54%'),
        shadowOpacity:0.25,
        marginTop:hp('2.31%')
    },
    reviewarea:{
        borderColor:'#5666F9',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:15,
        paddingLeft:wp('4.1%'),
        paddingRight:wp('4.1%'),
        paddingTop:hp('1.35%'),
        shadowColor:'#000',
        shadowOffset:{width:0,height:hp('1.54%')},
        minHeight:hp('29.755%'),
        shadowRadius:hp('1.54%'),
        shadowOpacity:0.25,
        marginTop:hp('2.31%')
    },
    address:{
        color:'#000',
        fontWeight:'500',
        fontSize:hp('2.45%'),
        lineHeight:hp('2.85%')
    },
    other:{
        fontSize:hp('1.9%'),
        lineHeight:hp('2.174%'),
        color:'#939393'
    },
    destination:{
        marginTop:hp('1.63%'),
        flexDirection:'row'
    },
    destinationaddress:{
        fontSize:hp('1.9%'),
        lineHeight:hp('2.174%'),
        color:'#939393',
        fontWeight:'bold'
    },
    price:{
        marginTop:hp('2.99%'),
        color:'#000',
        fontWeight:'bold',
        fontSize:hp('4.076%')
    },
    profileimagecontainer:{
        width:hp('8.56%'),
        height:hp('8.56%'),
        borderRadius:hp('4.28%'),
        backgroundColor:'#5666F9',
        justifyContent:'center',
        alignSelf:'center'
    },
    profileimage:{
        width:hp('8.56%'),
        height:hp('8.56%'),
        borderRadius:hp('4.28%')
    },
    profiletext:{
        fontSize:hp('4.28%'),
        color:'white',
        fontWeight:'bold'
    },
    reviewtitle:{
        textAlign:'center',
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        color:'#535353',
        lineHeight:hp('2.174%')
    },
    star:{
        width:hp('4.076%'),
        height:hp('4.076%'),
        marginLeft:wp('1.207%')
    },
    reviewdescription:{
        borderColor:'#DEDEDE',
        borderWidth:1,
        borderStyle:'solid',
        minHeight:hp('14.26%'),
        textAlign:'center'
    },
    continuebtn:{
        marginTop:hp('8.424%'),
        height:hp('6.79%'),
        borderColor:'#5463F2',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center'
    },
    continuebtntext:{
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        color:'#5666F9'
    },
    continuebtntextdeactive:{
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        color:'#535353'
    }
})
export default Rate;