import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, ScrollView, Image, TextInput  } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import  { auth, db } from '../firebase';
import AsyncStorage from '@react-native-community/async-storage'

const homeName = 'home-outline';
const profileName = 'person-outline';
const settingName = 'settings-outline';

const AddWorkout = ({navigation}) => {

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

    var date = new Date().getDate(); //To get the Current Date
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear();
    console.log(date);
    console.log(month);
    console.log(year);

    let curDate = year + '-' + month + '-' + date;
    console.log(curDate);

        const [state, setState] = useState({

            running: "",
            cycling: "",
            pushup: "",
            dynamic: "",
            id: getValue,
            workoutDate: curDate,
        });
      
        const handleChangeText = (running, value) => {
      
            setState({...state, [running]: value});
        };

        const workout = async () => {

            if(state.running == '' | state.cycling == '' | state.dynamic == '' | state.pushup == '') {
                alert('Please enter values')
            }
            else {
                await db.collection('workout').add({
                    running: state.running,
                    cycling: state.cycling,
                    pushup: state.pushup,
                    dynamic: state.dynamic,
                    id: getValue,
                    workoutDate: curDate,
                })

                alert('Added successful');
                navigation.navigate('Workout');
            }
        }
    
    
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
    
                        <Image style={styles.pageLogo} source={require('../assets/images/addworkout.png')} />
    
                        <TextInput
                            placeholder='Running Distance (KM)'
                            label="Running"
                            style={styles.input}
                            autoFocus
                            //value={reminder}
                            onChangeText={(value) => handleChangeText('running',value)}
                        />
                        <TextInput
                            placeholder='Cycling Distance (KM)'
                            label="Cycling"
                            style={styles.input}
                            autoFocus
                            //value={reminder}
                            onChangeText={(value) => handleChangeText('cycling',value)}
                        />
                        <TextInput
                            placeholder='Pushups'
                            label="Pushups"
                            style={styles.input}
                            autoFocus
                            //value={reminder}
                            onChangeText={(value) => handleChangeText('pushup',value)}
                        />
                        <TextInput
                            placeholder='Dynamics (mins)'
                            label="Dynamic"
                            style={styles.input}
                            autoFocus
                            //value={reminder}
                            onChangeText={(value) => handleChangeText('dynamic',value)}
                        />
    
                        <TouchableOpacity 
                            onPress={() => workout()}
                            style={styles.addbutton}>
                            <Text style={styles.btnText}>Add  <Ionicons name="add-outline" size={24} color="black" /></Text>
                        </TouchableOpacity>
    
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
        height: '100%',
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
    pageLogo: {
        width: '250px',
        height: '250px',
        marginTop: '5%',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    input: {
        width: '50%',
        height: 40,
        margin: 12,
        marginBottom: 0,
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
    },
    addbutton: {
        width: '25%',
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        textAlign: 'center',
        borderColor: 'grey',
        borderWidth: 2,
        boxShadow: '3px 3px 3px #888888',
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

export default AddWorkout;