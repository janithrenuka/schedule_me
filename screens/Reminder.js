import React, { useState , useLayoutEffect} from "react";
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, ScrollView, Image  } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { Button } from "react-native-elements";
import  { auth, db } from '../firebase';
import AsyncStorage from '@react-native-community/async-storage'

const homeName = 'home-outline';
const profileName = 'person-outline';
const settingName = 'settings-outline';

const Reminder = ({navigation}) => {

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

    //delete reminder

    // const deleteRem = (id) => {
    //     db.collection('reminder').doc(id)
    //         .delete().then(() => {

    //             alert('Deleted successful');
    //             navigation.replace('Reminder');

    //         }).catch((error) => {
    //             // An error happened.
    //             var errorMessage = error.message;
    //             alert(errorMessage);
    //         });
    // }

    // const doneRem = (id) => {
    //     db.collection('reminder').doc(id)
    //         .delete().then(() => {

    //             alert('Deleted successful');
    //             navigation.replace('Reminder');

    //         }).catch((error) => {
    //             // An error happened.
    //             var errorMessage = error.message;
    //             alert(errorMessage);
    //         });
    // }


    //retrive data
    const [data, setData] = useState([]);

    useLayoutEffect( () => {

        db.collection('reminder').onSnapshot(querySnapshot => {
            const data= [];

            querySnapshot.docs.forEach(doc => {

            const {id, reminder} =doc.data()
            data.push({
                id: doc.id,
                reminder,
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
                    onPress={() => navigation.navigate('AddReminder')} 
                >
                    <Feather name="plus-circle" size={50} color="blue" />
                </TouchableOpacity>

                    {
                        data.map(data => {
                            return(
                                <View style={styles.reminder}>
                                    <Text style={styles.remText}>{data.reminder}</Text>
                                    <TouchableOpacity
                                        //onPress={doneRem(data.id)}
                                    >
                                        <Ionicons style={styles.actionBtn} name="checkmark-done-circle-outline" size={50} color="green" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        //onPress={deleteRem(data.id)}
                                    >
                                        <AntDesign style={styles.actionBtn} name="delete" size={45} color="red" />
                                    </TouchableOpacity>
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
    reminder: {
        width: '80%',
        height: '100px',
        //backgroundColor: 'grey',
        marginTop: '8px',
        marginBottom: '8px',
        paddingLeft: '8px',
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 20,
        boxShadow: '5px 5px 5px #888888',
    },
    remText: {
        width: '70%',
        alignItems: 'center',
        //backgroundColor: 'pink',
        marginRight: '2%',
        fontSize: 20,
        fontWeight: 'bold',
    },
    actionBtn: {
        margin: '2px'
    }
});

export default Reminder;