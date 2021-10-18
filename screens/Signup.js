import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Image, Text, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../firebase';


const Signup = ({navigation}) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, serErrorPassword] = useState("");
    
    const signup = async () => {

        //validation
        if (username.length == 0) {
            setErrorUsername("*Username field is empty");
            return;
        } else if( username.length < 4) {
            setErrorUsername("*Username must be minimum 4 characters");
            return;
        }
        else {
            setErrorUsername("");
        }

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (email.length == 0) {
            setErrorEmail("*Email feild is empty");
            return;
          } else {
            setErrorEmail("");
          }
        if (reg.test(email) === false) {
          setErrorEmail("*Invalid email address");
          return;
        } else {
          setErrorEmail("");
        }
        if (password.length == 0) {
            serErrorPassword("*Password field is empty");
            return;
        } else {
            serErrorPassword("");
        }


        //firebase
        auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
            var user = userCredential.user;
            user.updateProfile({
                displayName: username,
            }).then(() => {
                Alert.alert('Registered Succesfully');
                navigation.navigate('Login');

            }).catch((error) => {
                // An error occurred
                var errorMessage = error.message;
                alert(errorMessage);
            }); 
        })
        .catch((error) => {
          
          var errorMessage = error.message;
          alert(errorMessage);
        });

    

    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.styledCon}>
                    <View style={styles.styledCon}>
                        <Image style={styles.pageLogo} source={require('../assets/images/signup.png')} />

                        <Text style={styles.pageTitle}>Sign Up  <AntDesign name="login" size={24} color="black" /></Text>

                        <TextInput
                            placeholder='Username'
                            label="Username"
                            style={styles.input}
                            autoFocus
                            autoCompleteType="username"
                            value={username}
                            onChangeText={(username) => setUsername(username)}
                        />
                        {errorUsername.length != 0 && <Text style={styles.error}>{errorUsername}</Text>}

                        <TextInput
                            placeholder='Email'
                            label="Email"
                            style={styles.input}
                            autoFocus
                            autoCompleteType="email"
                            value={email}
                            onChangeText={(email) => setEmail(email)}
                        />
                        {errorEmail.length != 0 && <Text style={styles.error}>{errorEmail}</Text>}

                        <TextInput
                            placeholder='Password'
                            label="Password"
                            style={styles.input}
                            autoFocus
                            autoCompleteType="password"
                            secureTextEntry
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                        />
                        {errorPassword.length != 0 && <Text style={styles.error}>{errorPassword}</Text>}

                        <TouchableOpacity 
                            onPress={signup}
                            style={styles.button}>
                            <Text style={styles.btnText}>Sign Up  <AntDesign name="arrowright" size={23} color="black" /></Text>
                        </TouchableOpacity>

                        <View style={styles.row}>
                            <Text style={styles.forgot}>Already have an account? </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text style={styles.link}>Sign In</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.rowc}>
                            <Text style={styles.copyright}>scheduleMe © 2021</Text>
                        </View>

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
    styledCon: {
        flex: 1,
        padding: '25px',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerCon: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#ffffff',
    },
    pageLogo: {
        width: '200px',
        height: '250px',
    },
    pageTitle: {
        marginTop: '5%',
        fontSize: '35px',
        fontAlign: 'center',
        fontWeight: 'bolder',
        color: 'black',
        padding: '10px',
    },
    subTitle: {
        fontSize: '20px',
        fontAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        padding: '10px',
        justifyContent: 'center',
        textAlign: 'center',
    },
    button: {
        width: '70%',
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
    forgot: {
        justifyContent: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        margin: 12,
        marginBottom: 0,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    row: {
        fontSize: 20,
        fontWeight: 'bold',
        flexDirection: 'row',
        marginTop: '8%',
    },
    rowc: {
        fontSize: 20,
        fontWeight: 'bold',
        flexDirection: 'row',
        marginTop: '5%',
        bottom: 0,
    },
    link: {
        fontWeight: 'bold',
        color: 'blue',
    },
    error: {
        width: "100%",
        textAlign: "left",
        color: "red",
        fontSize: 12,
        fontWeight: '500',
        marginTop: 10,
    },
    copyright: {
        justifyContent: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        alignItems: 'center',
        marginTop: '5%'
    },
});

export default Signup;