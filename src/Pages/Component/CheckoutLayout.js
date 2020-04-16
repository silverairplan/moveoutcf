import React,{Component} from 'react';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {View,StyleSheet,ScrollView,KeyboardAvoidingView} from 'react-native';
import Step from './step';
import Top from './CheckoutTop';

class CheckoutLayout extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <KeyboardAvoidingView behavior="padding" style={style.container}>
                <View style={style.container}>
                    <Top {...this.props} backdisable={true}></Top>
                    <Step {...this.props}></Step>
                    <ScrollView style={style.scrollcontainer}>
                        {this.props.children}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    scrollcontainer:{
        flex:1
    }
})

export default CheckoutLayout;