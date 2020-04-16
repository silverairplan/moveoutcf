import React,{Component} from 'react';

import {View,StyleSheet} from 'react-native';

import Top from './Top';
import Bottom from './Bottomnavigation';

class MainLayout extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <View style={style.container}>
                <Top {...this.props}/>
                {this.props.children}
                <Bottom {...this.props}></Bottom>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
    }
})

export default MainLayout;