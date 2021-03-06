import React, { useLayoutEffect, useState } from "react";
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../firebase';
import AsyncStorage from '@react-native-community/async-storage'

const homeName = 'home-outline';
const profileName = 'person-outline';
const settingName = 'settings-outline';

const HomePage = ({navigation}) => {

    //get user id
    const [getValue, setGetValue] = useState('');

    AsyncStorage.getItem('userId').then(
        (value) =>
          setGetValue(value),
    );
    console.log(getValue);

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
                            <Ionicons style={styles.activeicon} name={homeName} size={23} color={'black'} />
                            <Text style={styles.TextStyle} > Home </Text>
                            
                        </TouchableOpacity>

                        <View style={{height: 50, backgroundColor: '#fff', width: 2}} />

                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Profile')} 
                            activeOpacity={0.6} 
                            style={styles.button} 
                        >
                            <Ionicons name={profileName} size={23} color={'black'} />
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

                    <Image style={styles.pageLogo} source={require('../assets/images/homepage.png')} />

                    <View style={styles.boxView}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Workout')}  
                            style={styles.tile}
                        >
                                <Image style={styles.image} source={require('../assets/images/workout.png')} />
                                <Text style={styles.tileText}>Workout</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Reminder')}  
                            style={styles.tile}
                        >
                            <Image style={styles.image} source={require('../assets/images/reminder.png')} />
                            <Text style={styles.tileText}>Reminder</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.subTitle}>Schedule Your Reminder, Workout and Everything in One Place...</Text>

                </View>
            </ScrollView>
        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f8Fa',
        justifyContent: 'center',
        
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
    subTitle: {
        marginTop: '2%',
        fontSize: '20px',
        fontAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        padding: '25px',
        justifyContent: 'center',
        textAlign: 'center',
    },
    TextStyle:{
        color:'#fff',
        textAlign:'center',
        fontSize: 10,
        color: 'black',
        fontWeight: 'bold',
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
        boxShadow: '5px 5px 5px 1px #888888',
        margin: 0,
    },
    activeicon: {
        color: 'blue',
        margin: 0,
    },
    pageLogo: {
        width: '250px',
        height: '250px',
        marginTop: '5%',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    boxView: {
        marginTop: '2%',
        justifyContent: 'center',
        flexDirection: 'row',
        //backgroundColor: 'blue',
        width: '80%',
        height: '40%',
    },
    tile: {
        width: '43%',
        height: '100%',
        //backgroundColor: 'grey',
        marginRight: '2%',
        padding: '1%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 20,
        boxShadow: '5px 5px 5px #888888',
    },
    image: {
        width: '85%',
        height: '80%',
    },
    tileText: {
        fontSize: '20px',
        fontAlign: 'center',
        fontWeight: 'bolder',
        color: 'black',
        padding: '10px',
    },
});

export default HomePage;

