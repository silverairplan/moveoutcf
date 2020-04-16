import * as firebase from 'firebase';
import '@firebase/firestore';
import {AsyncStorage} from 'react-native';
import 'firebase/functions';
import axios from 'axios';
import fetch from 'cross-fetch';
const APIURL = 'https://us-central1-moveout-ab6e5.cloudfunctions.net';

export const emailexist = async(email) => 
{
    return new Promise((resolve,reject)=>{
        try{
            axios.get(APIURL + "/getuserbyemail",{params:{email:email}}).then(result=>{
                console.log(result.data);
                if(result.data.success)
                {
                    resolve(true);
                }
                else
                {
                    resolve(false);
                }
            })
        }
        catch(e){
            resolve(false);
        }
    
    })
    
}

export const signup = async(data) => {
    return new Promise((resolve,reject)=>{
        axios.post(APIURL + '/createuser',{
            socialid:data.cpf,
            email:data.email,
            password:data.password,
            profileprofile:data.profile,
            mobilephone:data.mobilephone
        }).then(res=>{
                console.log(res.data);
                if(res.data.success)
                {
                    resolve({success:true})
                }
                else
                {
                    resolve({success:false,message:res.data.error.message})
                }
            })
            .catch(err=>{
                resolve({success:false,message:err})
            })
    })
}

export const createusergoogle = async(name,profilepicture,uid,email,callback) => {
    console.log('error');
    let exist = await emailexist(email);

    if(!exist)
    {
        axios.post(APIURL + "/adduser",{name:name,profileprofile:profilepicture,uid:uid,email:email}).then(function(res){
            console.log(res.data);
            callback({success:true});
        })
 
    }
    else
    {
        callback({success:false,message:"e-mail já existe"});
    }
}

export const getuserdatabaseid = (id,callback) => {
    if(!id === id === "")
    {
        callback("");
        return;
    }
    
    axios.get(APIURL + "/getuserdatabaseid",{params:{userid:id}}).then(function(result){
        console.log(result.data);
        if(result.data.success)
        {
            callback(result.data.user);
        }
        else
        {
            callback("");
        }
    })


    // let query = firebase.database().ref("user").orderByChild("uid").equalTo(id);
    // query.on('value',snapshot=>{
    //     if(snapshot.exists())
    //     {
    //         callback(snapshot.val());
    //     }
    //     else
    //     {
    //         callback("");
    //     }
    // })
}

export const getuser = async() => {
    let user = await AsyncStorage.getItem('user');
    if(user)
    {
        return JSON.parse(user);
    }
    else
    {
        return false;
    }
}

export const signout = async() => {
  let result = await AsyncStorage.removeItem('user');
  return result;
}

export const updateuserprofile = async(user,callback) => {
    axios.post(APIURL + "/updateprofile",user).then(async(result)=>{
        console.log(result.data);
        if(result.data.success)
        {
            await AsyncStorage.setItem("user",JSON.stringify(result.data.user))
            callback({success:true});
        }
        else
        {
            callback({success:false})
        }
    })
    // firebase.database().ref('/user/' + key).set(user).then(async(res)=>{
    //     let data = {};
    //     data[key] = user;
    //     await AsyncStorage.setItem("user",JSON.stringify(data));
    //     callback({success:true});
    // })
}

export const signinuser = async(email, password)=>
{
   return new Promise((resolve,reject)=>{
       axios.get(APIURL + "/signinuser",{params:{email:email,password:password}}).then(user=>{
           console.log(user.data);
           resolve(user.data)
       }).catch(err=>reject(err));
   })
}

 //validate if user exists by uid
 export const validadeUserExistsByFacebookId = (uid, callback) => 
 {
     if(!uid)
         return false;
     
    getuserdatabaseid(uid,function(result){
        if(result.data.success)
        {
            callback(true);
        }
        else
        {
            callback(false);
        }
    })
     
 }