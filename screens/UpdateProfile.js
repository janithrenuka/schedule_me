import React, {useState} from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { auth, db } from '../firebase';
import AsyncStorage from '@react-native-community/async-storage';

const homeName = 'home-outline';
const profileName = 'person-outline';
const settingName = 'settings-outline';

const UpdateProfile = ({navigation}) => {

    //get user id
    const [getValue, setGetValue] = useState('');

    AsyncStorage.getItem('userId').then(
        (value) =>
          setGetValue(value),
    );
    console.log(getValue);

    //get user details
    const [getemail, setgetEmail] = useState('');
    const [getname, setgetName] = useState('');

    AsyncStorage.getItem('useremail').then(
        (value) =>
          setgetEmail(value),
    );
    AsyncStorage.getItem('username').then(
        (value) =>
          setgetName(value),
    );
    console.log(getemail);
    console.log(getname);

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


    //update user

    const [newemail, setEmail] = useState('');
    const [newname, setName] = useState('');

    const updateUser = () => {
        const user = auth().currentUser;

        user.updateProfile({
          displayName: newname,
          email: newemail, 
        }).then(() => {
          // Update successful
          Alert.alert('Updated Succesfully');
        }).catch((error) => {
          // An error occurred
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
                    <Text style={styles.pageTitle}>Update Profile</Text>
                    <Image style={styles.pageLogo} source={require('../assets/images/man.png')} />

                    <TextInput
                            placeholder='Name'
                            label="Name"
                            style={styles.input}
                            autoFocus
                            autoCompleteType="name"
                            defaultValue={getname}
                            onChangeText={(name) => setName(name)}
                    />
                    <TextInput
                            placeholder='Email'
                            label="Email"
                            style={styles.input}
                            autoFocus
                            autoCompleteType="email"
                            value={getemail}
                            onChangeText={(email) => setEmail(email)}
                    />

                    <TouchableOpacity 
                        //onPress={updateUser}
                        style={styles.buttonUpdate}>
                        <Text style={styles.btnText}>Update   <AntDesign name="edit" size={24} color="green" /></Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


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
    input: {
        width: '50%',
        height: 40,
        margin: 12,
        marginBottom: 0,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    buttonUpdate: {
        width: '30%',
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
})

export default UpdateProfile;