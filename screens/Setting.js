import React from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../firebase';
import AsyncStorage from '@react-native-community/async-storage'

const homeName = 'home-outline';
const profileName = 'person-outline';
const settingName = 'settings-outline';

const Setting = ({navigation}) => {

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
                {/* <Text>Settings</Text> */}
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
                            <Ionicons name={profileName} size={23} color={'black'} />
                            <Text style={styles.TextStyle}> Profile </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Setting')} 
                            activeOpacity={0.6} 
                            style={styles.button} 
                        >
                            <Ionicons style={styles.activeicon}  name={settingName} size={23} color={'black'} />
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

                    <Image style={styles.pageLogo} source={require('../assets/images/loading.gif')} />
                    <Text style={styles.pageTitle}>Coming Soon...</Text>
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
        backgroundColor: '#ffffff',
    },
    scrollView: {
        backgroundColor: '#ffffff',
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
    pageTitle: {
        marginTop: '5%',
        fontSize: '35px',
        fontAlign: 'center',
        fontWeight: 'bolder',
        color: 'black',
        padding: '10px',
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
        width: '250px',
        height: '250px',
        marginTop: '5%',
    },
});

export default Setting;