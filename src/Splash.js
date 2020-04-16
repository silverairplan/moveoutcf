import React, {Component} from 'react';

import SvgUri from 'react-native-svg-uri';
import {StyleSheet,Image,View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {FirstPage,CheckoutPage,ConfirmPage,ConfirmPayment,ConfirmRequest,ConfirmSuccess,LocationConfirm,Login,Moveout,MoveoutConfirm,MoveoutSecond,MovooutFirst,Profile,Register,RegisterCard,UpdateProfile, PaymentSelect, UpdateInfo,MoveMovement,Rating} from './Pages';
//import FirstPage from './Pages/FirstPage';

console.disableYellowBox = false;
import * as UserService from './Service/UserService';

class Splash extends Component
{
    constructor(props)
    {
        super(props);
    }
    
    componentDidMount()
    {
        this.updateinfo();
    }

    updateinfo = () => {
        let self = this;
        setTimeout(async()=>{
            let user = await UserService.getuser();
            if(user)
            {
               self.props.navigation.navigate('firstpage');
            }
            else
            {
                self.props.navigation.navigate('firstpage');
            }
            
        },500);
    }

    componentWillReceiveProps()
    {
        this.updateinfo();
    }

    render()
    {
        return (
            <View
            style={styles.container}>
                <View style = {styles.logoContainer}>
                    <Image style={styles.logo} source={require('../img/logo.png')}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#5666F9'
    },
    logoContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    logo: {
        width:wp('41%'),
        height:wp('22%'),
        flexWrap: 'wrap'
    }
})

let RootStack = createStackNavigator({
   splash:{
        screen:Splash,
        navigationOptions:{
            header:null
        } 
   }, 
   firstpage:{
       screen:FirstPage,
       navigationOptions:{
           header:null
       }
   },
   checkout:{
       screen:CheckoutPage,
       navigationOptions:{
           header:null
       }
   },
   confirm:{
       screen:ConfirmPage,
       navigationOptions:{
           header:null
       }
   },
   confirmsuccess:{
        screen:ConfirmSuccess,
        navigationOptions:{
            header:null
        }
   },
   payment:{
       screen:ConfirmPayment,
       navigationOptions:{
           header:null
       }
   },
   request:{
    screen:ConfirmRequest,
    navigationOptions:{
        header:null
    }
   },
   login:{
       screen:Login,
       navigationOptions:{
        header:null
    }  
   },
   register:{
       screen:Register,
       navigationOptions:{
           header:null
       }
   },
   locationconfirm:{
       screen:LocationConfirm,
       navigationOptions:{
        header:null
    }
   },
   moveout:{
            screen:Moveout,
            navigationOptions:{
            header:null
        }
    },
    moveoutconfirm:{
            screen:MoveoutConfirm,
            navigationOptions:{
            header:null
        }
    },
    moveoutsecond:{
        screen:MoveoutSecond,
        navigationOptions:{
            header:null
        }
    },
    movooutfirst:{
        screen:MovooutFirst,
        navigationOptions:{
            header:null
        }
    },
    profile:{
        screen:Profile,
        navigationOptions:{
            header:null
        }
    },
    registercard:{
        screen:RegisterCard,
        navigationOptions:{
            header:null
        }
    },
    updateprofile:{
        screen:UpdateProfile,
        navigationOptions:{
            header:null
        }
    },
    paymentselect:{
        screen:PaymentSelect,
        navigationOptions:{
            header:null
        }
    },
    updateinfo:{
        screen:UpdateInfo,
        navigationOptions:{
            header:null
        }
    },
    movemovement:{
        screen:MoveMovement,
        navigationOptions:{
            header:null
        }
    },
    rating:{
        screen:Rating,
        navigationOptions:{
            header:null
        }
    },
})

const app = createAppContainer(RootStack);
export default app;