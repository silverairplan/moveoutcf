import React,{Component} from 'react';
import {View,StyleSheet,Image,TouchableOpacity,Text,AsyncStorage} from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SvgUri from 'react-native-svg-uri';

class Step extends Component
{
    constructor(props)
    {
        super(props);
    }

    selectstep = (number) => {
        let passed = [];
        if(this.props.navigation.state.params && this.props.navigation.state.params.passed)
        {
            passed = this.props.navigation.state.params.passed;
        }

        if(passed.indexOf(number) > -1 && this.props.selectedstep != number)
        {
            if(passed.indexOf(this.props.selectedstep) == -1)
            {
                passed.push(this.props.selectedstep);
            }

            switch(number)
            {
                case 1:
                    this.props.navigation.navigate('movooutfirst',{data:this.props.navigation.state.params.data,passed:this.props.navigation.state.params.passed});
                    break;
                case 2:
                    this.props.navigation.navigate('moveoutsecond',{data:this.props.navigation.state.params.data,passed:this.props.navigation.state.params.passed});
                    break;
                case 3:
                    this.props.navigation.navigate('checkout',{data:this.props.navigation.state.params.data,passed:this.props.navigation.state.params.passed});
                    break;
                case 3:
                    this.props.navigation.navigate('checkout',{data:this.props.navigation.state.params.data,passed:this.props.navigation.state.params.passed});
                    break;
            }
        }
    }
    render()
    {
        let passed = [];
        if(this.props.navigation.state.params && this.props.navigation.state.params.passed)
        {
            passed = this.props.navigation.state.params.passed;
        }
        
        
        return (
            <View style={styles.container}>
                <View style={styles.titlecontainer}></View>
                <View style={styles.stepcontainer}>
                    <TouchableOpacity style={{marginRight:wp('3%')}} onPress={()=>this.props.navigation.goBack()}>
                        <Image style={styles.backimg} source={require('../../../img/icon/back_checkout.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={(!this.props.selectedstep || this.props.selectedstep == 1)?styles.stepselected:passed.indexOf(1)>-1?styles.steppassed:styles.step} onPress={()=>this.selectstep(1)}>
                        <View style={styles.stepinner}>
                            <Text style={styles.steptext}>1</Text>
                            {
                                this.props.selectedstep == 1 && (
                                    <Image source={require('../../../img/checkouticon/location.png')} style={styles.stepimage}></Image>
                                )
                            }
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={(this.props.selectedstep && this.props.selectedstep == 2)?styles.stepselected:passed.indexOf(2)>-1?styles.steppassed:styles.step}  onPress={()=>this.selectstep(2)}>
                        <View style={styles.stepinner}>
                            <Text style={styles.steptext}>2</Text>
                            {
                                this.props.selectedstep == 2 && (
                                    <Image source={require('../../../img/checkouticon/calendar.png')} style={styles.stepimage}></Image>
                                )
                            }
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={(this.props.selectedstep && this.props.selectedstep == 3)?styles.stepselected:passed.indexOf(3)>-1?styles.steppassed:styles.step}  onPress={()=>this.selectstep(3)}>
                        <View style={styles.stepinner}>
                            <Text style={styles.steptext}>3</Text>
                            {
                                this.props.selectedstep == 3 && (
                                    <Image source={require('../../../img/checkouticon/step3.png')} style={styles.stepimage}></Image>
                                )
                            }
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={(this.props.selectedstep && this.props.selectedstep == 4)?styles.stepselected:passed.indexOf(4)>-1?styles.steppassed:styles.step} onPress={()=>this.selectstep(4)}>
                        <View style={styles.stepinner}>
                            <Text style={styles.steptext}>4</Text>
                            {
                                this.props.selectedstep == 4 && (
                                    <Image source={require('../../../img/checkouticon/step4.png')} style={styles.stepimage}></Image>
                                )
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container:{
        backgroundColor:'#5666F9',
        height:hp('10.62%'),
        paddingBottom:hp('3%')
    },
    backimg:{
        marginLeft:wp('0.48%'),
        width:hp('2.7%'),
        height:hp('2.33%')
    },
    stepcontainer:{
        flex:1,
        flexDirection:'row',
        paddingLeft:wp('11%'),
        alignItems:'center'
    },
    stepselected:{
        width:wp('15%'),
        height:wp('8.2%'),
        backgroundColor:'#535353',
        borderRadius:wp('4.8%'),
        marginLeft:wp('4.8%'),
        justifyContent:'center'
    },
    steppassed:{
        width:wp('8.2%'),
        height:wp('8.2%'),
        marginLeft:wp('4.8%'),
        backgroundColor:'#27AE60',
        borderStyle:'solid',
        borderWidth:2,
        borderColor:'#FFFFFF',
        justifyContent:'center',
        borderRadius:wp('4.1%')
    },
    step:{
        width:wp('8.2%'),
        height:wp('8.2%'),
        marginLeft:wp('4.8%'),
        borderStyle:'solid',
        borderWidth:2,
        borderColor:'#FFFFFF',
        justifyContent:'center',
        borderRadius:wp('4.1%')
    },
    stepinner:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    steptext:{
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        color:'#FFF'
    },
    stepimage:{
        width:hp('2.445%'),
        height:hp('2.717%'),
        marginLeft:wp('1.93%')
    }
})

export default Step;