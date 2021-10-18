import React, { useLayoutEffect, useState } from "react";
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, ScrollView, Image  } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import  { auth, db } from '../firebase';
import AsyncStorage from '@react-native-community/async-storage'
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const homeName = 'home-outline';
const profileName = 'person-outline';
const settingName = 'settings-outline';

const Workout = ({navigation}) => {

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

    //retrive data
    const [data, setData] = useState([]);

    useLayoutEffect( () => {

        db.collection('workout').onSnapshot(querySnapshot => {
            const data= [];

            querySnapshot.docs.forEach(doc => {

            const {id, cycling, running, pushup, dynamic, workoutDate} =doc.data()
            data.push({
                id:doc.id,
                running,
                cycling,
                pushup,
                dynamic,
                workoutDate,
            })
        });
        setData(data)

        });
    }, [])

    console.log(data);

    return(
        <SafeAreaView>
            <ScrollView>
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

                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => navigation.navigate('AddWorkout')} 
                >
                    <Feather name="plus-circle" size={50} color="blue" />
                </TouchableOpacity>

                
                    {
                        data.map(data => {
                            return(
                                <View style={styles.boxView}>
                                    <View style={styles.date}>
                                        <Fontisto name="date" size={20} color="green" />
                                        <Text style={styles.valText}>  Date : {data.workoutDate}</Text>
                                    </View>
                                    <View style={styles.valRow}>
                                        <View style={styles.row1}>
                                            <View style={styles.row3}>
                                                <FontAwesome5 name="running" size={20} color="black" />
                                                <Text style={styles.valText}>  Running : {data.running} KM</Text>
                                            </View>
                                            <View style={styles.row3}>
                                                <Ionicons name="bicycle" size={22} color="black" />
                                                <Text style={styles.valText}>  Cycling : {data.cycling} KM</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row2}>
                                            <View style={styles.row3}>
                                                <MaterialCommunityIcons name="weight-lifter" size={20} color="black" />
                                                <Text style={styles.valText}>  Pushups : {data.pushup}</Text>
                                            </View>
                                            <View style={styles.row3}>
                                                <MaterialCommunityIcons name="arm-flex" size={20} color="black" />
                                                <Text style={styles.valText}>   Dynamic : {data.dynamic} Min</Text>
                                            </View>
                                        </View>
                                    </View>
                                    
                                </View>
                            )
                        })
                    }
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
    addBtn: {
        marginTop: '2%',
    },
    boxView: {
        marginTop: '2%',
        justifyContent: 'center',
        flexDirection: 'column',
        //backgroundColor: 'blue',
        width: '80%',
        height: '90px',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 20,
        boxShadow: '5px 5px 5px #888888',
        alignItems: 'center',
    },
    date: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    row1: {
        flex: 2,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    row2: {
        flex: 2,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    valRow: {
        flex: 2,
        width: '100%',
    },
    valText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    row3: {
        flexDirection: 'row'
    }
});

export default Workout;