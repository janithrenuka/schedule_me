import React, {useState} from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../firebase';
import AsyncStorage from '@react-native-community/async-storage'
import { Entypo } from '@expo/vector-icons';

const homeName = 'home-outline';
const profileName = 'person-outline';
const settingName = 'settings-outline';

const Profile = ({navigation}) => {

    //get user details
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    AsyncStorage.getItem('useremail').then(
        (value) =>
          setEmail(value),
    );
    AsyncStorage.getItem('username').then(
        (value) =>
          setName(value),
    );
    console.log(email);
    console.log(name);

    //signout function
    const signout = () => {
        auth.signOut().then(() => {
            AsyncStorage.removeItem('userId');
            AsyncStorage.removeItem('useremail');
            AsyncStorage.removeItem('username');
            navigation.replace('Login');

        }).catch((error) => {
            // An error happened.
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.innerCon}>
                
                    <View style={styles.TabBarMainContainer} >

                        <TouchableOpacity 
                            onPress={() => navigation.navigate('HomePage')}
                            activeOpacity={0.6} 
                            style={styles.leftbtn} 
                        >
                            <Ionicons name={homeName} size={23} color={'black'} />
                            <Text style={styles.TextStyle} > Home </Text>
                            
                        </TouchableOpacity>

                        <View style={{height: 50, backgroundColor: '#fff', width: 2}} />

                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Profile')} 
                            activeOpacity={0.6} 
                            style={styles.button} 
                        >
                            <Ionicons style={styles.activeicon}  name={profileName} size={23} color={'black'} />
                            <Text style={styles.TextStyle}> Profile </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Setting')} 
                            activeOpacity={0.6} 
                            style={styles.button} 
                        >
                            <Ionicons name={settingName} size={23} color={'black'} />
                            <Text style={styles.TextStyle}> Settings </Text>
                        </TouchableOpacity>

                        <View style={{height: 50, backgroundColor: '#fff', width: 2}} />

                        <TouchableOpacity 
                            onPress={signout} 
                            activeOpacity={0.6} 
                            style={styles.rigthBtn} 
                        >
                            <AntDesign name="logout" size={23} color="black" />
                            <Text style={styles.TextStyle}>Logout </Text>
                        </TouchableOpacity>

                    </View>

                    <Image style={styles.pageLogo} source={require('../assets/images/man.png')} />

                    <Text style={styles.pageTitle}><AntDesign name="user" size={30} color="green" />  {name}</Text>
                    <Text style={styles.pageTitle}><Entypo name="email" size={30} color="red" /> {email}</Text>

                    <TouchableOpacity 
                        onPress={() => navigation.navigate('UpdateProfile')} 
                        style={styles.buttonUpdate}>
                        <Text style={styles.btnText}>Update Profile  <AntDesign name="edit" size={24} color="green" /></Text>
                    </TouchableOpacity>

                    <View style={styles.rowc}>
                        <Text style={styles.copyright}>scheduleMe © 2021</Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f8Fa',
    },
    scrollView: {
        backgroundColor: '#f7f8Fa',
    },
    innerCon: {
        alignItems: 'center',
    },
    TabBarMainContainer :{
        justifyContent: 'space-around', 
        height: 50, 
        flexDirection: 'row',
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: '15%',
        marginTop: '2%',
    },   
    button: {
        height: 50,
        paddingTop:10,
        paddingBottom:5,
        backgroundColor: '#C8C8C8',
        justifyContent: 'center', 
        alignItems: 'center', 
        flexGrow: 1,
        marginRight: '1px',
        boxShadow: '5px 5px 5px 1px #888888',
    }, 
    TextStyle:{
        color:'#fff',
        textAlign:'center',
        fontSize: 10,
        color: 'black',
        fontWeight: 'bold',
    },
    pageTitle: {
        fontSize: '35px',
        fontAlign: 'center',
        fontWeight: 'bolder',
        color: 'black',
        padding: '10px',
    },
    leftbtn: {
        height: 50,
        paddingTop:10,
        paddingBottom:5,
        backgroundColor: '#C8C8C8',
        justifyContent: 'center', 
        alignItems: 'center', 
        flexGrow: 1,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        boxShadow: '5px 5px 5px 1px #888888',
    },
    rigthBtn: {
        height: 50,
        paddingTop:10,
        paddingBottom:5,
        backgroundColor: '#C8C8C8',
        justifyContent: 'center', 
        alignItems: 'center', 
        flexGrow: 1,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        margin: 0,
        boxShadow: '5px 5px 5px 1px #888888',
    },
    activeicon: {
        color: 'blue',
        margin: 0,
    },
    pageLogo: {
        width: '150px',
        height: '150px',
        marginTop: '5%',
        marginBottom: '5%',
    },
    rowc: {
        fontSize: 20,
        fontWeight: 'bold',
        flexDirection: 'row',
        marginTop: '5%',
        bottom: 0,
    },
    copyright: {
        justifyContent: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        alignItems: 'center',
        marginTop: '90%'
    },
    buttonUpdate: {
        width: '40%',
        height: '40px',
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderColor: 'grey',
        borderWidth: 2,
        boxShadow: '5px 5px 5px #888888',
        marginTop: '5%'
    },
    btnText: {
        fontSize: '20px',
        fontAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        padding: '10px',
        justifyContent: 'center',
        textAlign: 'center',
    },
});


export default Profile;