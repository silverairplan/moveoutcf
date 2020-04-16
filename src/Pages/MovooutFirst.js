import React,{Component} from 'react';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {ScrollView,View,StyleSheet,Text,TouchableOpacity,Image,TextInput,KeyboardAvoidingView,Platform} from 'react-native';

import PageLayout from './Component/PageLayout';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permission from 'expo-permissions';
import * as UserService from '../Service/UserService';
import * as OrderService from '../Service/OrderService';
import CheckoutLayout from './Component/CheckoutLayout';
import SvgUri from 'react-native-svg-uri';
import Modal,{ModalContent} from 'react-native-modals';
class MovooutFirst extends React.Component
{
    locationservice = null;
    origin = false;
    destination = false;
    addressdata = {};
    constructor(props)
    {
        super(props);
        this.state = {
            selected:false,
            user:{},
            origin:{
                
            },
            destination:{

            },
            postcode:"",
            changeaddress:""
        }
    }

    back = () => {
        this.setState({
            selected:!this.state.selected,
            postcode:""
        })
    }

    
    componentWillMount()
    {
        // if(Platform.OS == 'android' && !Constants.isDevice)
        // {
        //     console.log('Oops, this will not work on Sketch in an Android emulator. Try it on your device!')
        // }
        // else{
        //     this._getLocationAsync();
        // }
        this.getlocation();
    }

    _getLocationAsync = async () => {
        let { status } = await Permission.askAsync(Permission.LOCATION);
        if (status !== 'granted') {
          console.log('permission denined');
        }
    
        let location = await Location.getCurrentPositionAsync({});
        if(location)
        {
            let locationinfo = await Location.reverseGeocodeAsync({latitude:location.coords.latitude,longitude:location.coords.longitude});
            return locationinfo;
        }
        
      };
    
      getlocation = async() =>{
        // let location = {};
                
        // let locationinfo = await this._getLocationAsync();
        // this.setState({
        //     origin:{
        //         postalcode:locationinfo[0].postalCode,
        //         complement:locationinfo[0].name,
        //         city:locationinfo[0].city,
        //         state:locationinfo[0].region,
        //         address:locationinfo[0].name,
        //         street:locationinfo[0].street,
        //         neighborhood:"",
        //         number:''
        //     },
        //     destination:{
        //         postalcode:locationinfo[0].postalCode,
        //         complement:locationinfo[0].name,
        //         city:locationinfo[0].city,
        //         state:locationinfo[0].region,
        //         address:locationinfo[0].name,
        //         street:locationinfo[0].street,
        //         neighborhood:"",
        //         number:''
        //     }
        // })

      }

      handleSep = (text) => {
        let self = this;
        text = text.split('-').join('');
        window.clearTimeout(this.locationservice);

        this.setState({
            postcode:text
        })
        this.locationservice = window.setTimeout(()=>{
            OrderService.getlocation(text).then(location=>{
                console.log(location);
                if(!location.erro)
                {
                    let locationdata = {
                        postalcode:location.cep,
                        complement:location.complemento,
                        city:location.localidade,
                        state:location.uf,
                        address:location.logradouro,
                        neighborhood:location.bairro,
                        number:location.gia
                    }
                    if(self.origin)
                    {
                        self.setState({
                            origin:locationdata
                        })
                    }
                    else if(self.destination)
                    {
                        self.setState({
                            destination:locationdata
                        })
                    }
                }
                self.origin = false; self.destination = false;
            })
        },500)
      }

      select = () => {
        // if(!this.state.selected)
        // {
        //     this.setState({
        //         from:this.state.location.street,
        //         to:'Avenida Paula Ferreira, 979'
        //     })    
        // }
        
        
        this.back();
      }

      nextlocation = () => {
          let passed = [];

          if(this.props.navigation.state.params && this.props.navigation.state.params.passed)
          {
            passed = this.props.navigation.state.params.passed;
          }

          if(passed.indexOf(1) == -1)
          {
              passed.push(1);
          }

          this.props.navigation.navigate('moveoutsecond',{data:{origin:this.state.origin,destination:this.state.destination},passed:passed})
      }
    
      changeaddress = (addresstype) => {
        this.addressdata = JSON.parse(JSON.stringify(this.state[addresstype]));
        this.setState({
            changeaddress:addresstype
        })
      }

      handleChangeAddress = (name,value) => {
          this.addressdata[name] = value;
      }

      cancel = () =>{
          this.addressdata = {};
          this.setState({
              changeaddress:""
          })
      }

      saveaddress = () => {
        let data = JSON.parse(JSON.stringify(this.state));
        data[this.state.changeaddress] = this.addressdata;
        data.changeaddress = "";
        this.setState(data);
        this.addressdata= {};
      }

    render()
    {
        return(
            <CheckoutLayout {...this.props} back={this.back} title="DE ONDE PARA CODE?" selectedstep={1}>
                <View style={style.titlecontainer}>
                    <Text style={style.maintitle}>de onde para onde?</Text>
                </View>
                <Text style={style.title}>Digite o CEP atual</Text>
                <View style={style.placeholdercontainer}>
                    <View style={style.zipcode}>
                        <TextInput keyboardType="numeric" style={{flex:1,textAlign:'center'}} onChangeText={(value)=>{this.origin = true; this.handleSep(value)}}></TextInput>
                        <Image style={style.rightzipicon} source={require('../../img/icon/right.png')}></Image>
                    </View>
                    <View style={style.locationcontainer}>
                        <View style={{flex:1}}>
                            <Text style={style.address}>{this.state.origin.address}</Text>
                            <Text style={style.city}>{this.state.origin.city}</Text>
                            <Text style={style.city}>{this.state.origin.state}</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'column'}}>
                            <View style={{flex:1}}>
                                <TouchableOpacity onPress={()=>this.changeaddress("origin")}>
                                    <Image source={require('../../img/icon/location_origin.png')} style={style.placehoder}></Image>
                                </TouchableOpacity>
                            </View>
                            <Text style={style.changeaddress}>Altere o endereço</Text>
                        </View>
                    </View>
                </View>
                <Text style={style.title}>Digite o cep destino</Text>
                <View style={style.placeholdercontainer}>
                    <View style={style.zipcode}>
                        <TextInput keyboardType="numeric" style={{flex:1,textAlign:'center'}} onChangeText={(value)=>{this.destination = true; this.handleSep(value);}}></TextInput>
                        <Image style={style.rightzipicon} source={require('../../img/icon/right.png')}></Image>
                    </View>
                    <View style={style.locationcontainer}>
                        <View style={{flex:1}}>
                            <Text style={style.address}>{this.state.destination.address}</Text>
                            <Text style={style.city}>{this.state.destination.city}</Text>
                            <Text style={style.city}>{this.state.destination.state}</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'column'}}>
                            <View style={{flex:1}}>
                                <TouchableOpacity onPress={()=>this.changeaddress('destination')}>
                                    <Image source={require('../../img/icon/location_destination.png')} style={style.placehoder}></Image>
                                </TouchableOpacity>
                            </View>
                            <Text style={style.changeaddress}>Altere o endereço</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={style.continue} onPress={this.nextlocation}>
                    <Text style={style.continuetext}>CONTINUAR</Text>
                </TouchableOpacity>

                <Modal 
                    visible={this.state.changeaddress?true:false}
                    swipeDirection={['up', 'down']}
                >
                    <ModalContent>
                        <View style={{width:wp('80%')}}>
                            <View>
                                <Text style={{textAlign:'center'}}>Address</Text>
                                <TextInput style={style.textinput} defaultValue={this.addressdata.address} onChangeText={(text)=>this.handleChangeAddress('address',text)}></TextInput>
                            </View>
                            <View style={{marginTop:20}}>
                                <Text style={{textAlign:'center'}}>State</Text>
                                <TextInput style={style.textinput} defaultValue={this.addressdata.state} onChangeText={(text)=>this.handleChangeAddress('state',text)}></TextInput>
                            </View>
                            <View style={{marginTop:20}}>
                                <Text style={{textAlign:'center'}}>City</Text>
                                <TextInput style={style.textinput} defaultValue={this.addressdata.city} onChangeText={(text)=>this.handleChangeAddress('city',text)}></TextInput>
                            </View>
                            <View style={{marginTop:20}}>
                                <Text style={{textAlign:'center'}}>Complement</Text>
                                <TextInput style={style.textinput} defaultValue={this.addressdata.complement} onChangeText={(text)=>this.handleChangeAddress('complement',text)}></TextInput>
                            </View>
                            <View style={{marginTop:20}}>
                                <Text style={{textAlign:'center'}}>PostalCode</Text>
                                <TextInput style={style.textinput} defaultValue={this.addressdata.postalcode} onChangeText={(text)=>this.handleChangeAddress('postalcode',text)}></TextInput>
                            </View>
                            <View style={{marginTop:20}}>
                                <Text style={{textAlign:'center'}}>Neighborhood</Text>
                                <TextInput style={style.textinput} defaultValue={this.addressdata.neighborhood} onChangeText={(text)=>this.handleChangeAddress('neighborhood',text)}></TextInput>
                            </View>
                            <View style={{marginTop:20}}>
                                <Text style={{textAlign:'center'}}>Number</Text>
                                <TextInput style={style.textinput} defaultValue={this.addressdata.number} onChangeText={(text)=>this.handleChangeAddress('number',text)}></TextInput>
                            </View>
                            <View style={{marginTop:20}}>
                                <Text style={{textAlign:'center'}}>Street</Text>
                                <TextInput style={style.textinput} defaultValue={this.addressdata.street} onChangeText={(text)=>this.handleChangeAddress('street',text)}></TextInput>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',marginTop:20}}>
                            <TouchableOpacity style={style.btn}>
                                <Text style={style.btntext} onPress={this.cancel}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.btn}>
                                <Text style={style.btntext} onPress={this.saveaddress}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </ModalContent>
                </Modal>  
            </CheckoutLayout>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
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
    title:{
        fontSize:hp('2.038%'),
        textAlign:'center',
        color:'#535353',
        marginTop:hp('3.261%'),
        textTransform:'uppercase',
        fontWeight:'500'
    },
    placeholdercontainer:{
        flex:1,
        backgroundColor:'#FFF',
        paddingLeft:wp('7.488%'),
        paddingRight:wp('7.488%'),
        paddingTop:hp('2.038%'),
        paddingBottom:hp('2.038%')
    },
    zipcode:{
        height:hp('6.521%'),
        borderColor:'#5666F9',
        borderWidth:1,
        borderStyle:'solid',
        flexDirection:'row',
        alignItems:'center'
    },
    rightzipicon:{
        width:hp('1.08%'),
        height:hp('2.16%'),
        marginRight:wp('15%')
    },
    locationcontainer:{
        paddingTop:hp('2%'),
        paddingLeft:wp('4.34%'),
        paddingBottom:hp('2%'),
        paddingRight:wp('4.34%'),
        minHeight:hp('11.68%'),
        borderColor:'#5666F9',
        borderWidth:1,
        borderTopWidth:0,
        flexDirection:'row'
    },
    address:{
        fontWeight:'bold',
        fontSize:hp('1.9%'),
        color:'#5666F9'
    },
    city:{
        fontSize:hp('1.9%'),
        color:'#5666F9'
    },
    placehoder:{
        alignSelf:'center',
        marginTop:hp('1.08%')
    },
    changeaddress:{
        textAlign:'center',
        fontSize:hp('1.9%'),
        color:'#939393'
    },
    continue:{
        marginTop:hp('10%'),
        marginLeft:wp('11.8%'),
        marginRight:wp('11.8%'),
        height:hp('6.8%'),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
        borderColor:'#5666F9',
        borderWidth:1,
        borderStyle:'solid'
    },
    continuetext:{
        fontWeight:'bold',
        color:'#5666F9',
        fontSize:hp('1.9%')
    },
    textinput:{
        borderColor:'lightgrey',
        borderBottomWidth:1,
        borderStyle:'solid',
        marginTop:10,
        textAlign:'center'
    },
    btn:{
        width:wp('38%'),
        height:hp('6.7%'),
        borderColor:'#5666F9',
        borderWidth:1,
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:wp('1%'),
        marginRight:wp('1%')
    },
    btntext:{
        color:'#5666F9',
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        textAlign:'center'
    }
})

export default MovooutFirst;