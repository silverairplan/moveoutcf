import React,{Component} from 'react';

import {View,StyleSheet} from 'react-native';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import BottomNavigation from './Bottomnavigation';
import PageTop from './PageTop';

class PageLayout extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <View style={style.container}>
                <PageTop {...this.props}/>
                {this.props.children}
                {
                    !this.props.bottomdisabled && (
                        <BottomNavigation {...this.props}/>
                    )
                }
                
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
    }
})

export default PageLayout;
