import React,{Component} from 'react';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {View,ScrollView,StyleSheet,Text,Image,TouchableOpacity} from 'react-native';

import PageLayout from './Component/PageLayout';
class ConfirmSuccess extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <PageLayout {...this.props}>
                <ScrollView style={style.container}>
                    <Text style={style.title}>
                        Sua solicitação foi enviada a um{'\n'}
                        dos nossos prestadores de serviço
                    </Text>
                    <Text style={style.description}>
                        o pagamento será realizado somente{'\n'}
                        após um dos nossos colaboradores{'\n'}
                        confirmar o serviço
                    </Text>
                    <View style={style.image}>
                        <Image source={require('../../img/shipping-package-monochrome.png')} style={style.imagecontainer}></Image>
                    </View>
                    <TouchableOpacity style={style.confirmbtn}>
                        <Text style={style.confirmtext}>IR PARA MEUS MOVEOUTS</Text>
                    </TouchableOpacity>
                </ScrollView>
            </PageLayout>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        fontSize:hp('2.445%'),
        fontWeight:'500',
        color:'#939393',
        marginTop:hp('7.6%'),
        textAlign:'center'
    },
    description:{
        marginTop:hp('3.668%'),
        textAlign:'center',
        lineHeight:hp('2.174%'),
        color:'#939393'
    },
    image:{
        marginTop:hp('5.3%'),
        flexDirection:'row',
        justifyContent:'center'
    },
    imagecontainer:{
        width:hp('23.23%'),
        height:hp('27.58%')
    },
    confirmbtn:{
        flexDirection:'row',
        marginTop:hp('7.88%'),
        width:wp('76.33%'),
        alignSelf:'center',
        paddingTop:hp('2.31%'),
        paddingBottom:hp('2.31%'),
        borderRadius:4,
        backgroundColor:'#FFF',
        borderWidth:1,
        borderColor:'#5463F2',
        justifyContent:'center',
        marginBottom:hp('3%')
    },
    confirmtext:{
        color:'#5666F9',
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        textAlign:'center'
    },
    
})
export default ConfirmSuccess;