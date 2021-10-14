import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Button, Alert, TouchableOpacity, SafeAreaView, TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, serErrorPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    const login = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (email.length == 0) {
            setErrorEmail("*Email feild is empty");
            return;
          } else {
            setErrorEmail("");
          }
        if (reg.test(email) === false) {
          setErrorEmail("*Not valid email address");
          return;
        } else {
          setErrorEmail("");
        }
        if (password.length == 0) {
          serErrorPassword("*Password feild is empty");
          return;
        } else {
          serErrorPassword("");
        }
    
        // firebase
        //   .auth()
        //   .signInWithEmailAndPassword(email, password)
        //   .then(() => {
        //     console.log("SUCESS");
        //     Alert.alert("Successfully Log In");
        //   })
        //   .catch((error) => {
        //     //console.log(error);
        //     Alert.alert(error.message);
        //   });
    };

    return(
        <SafeAreaView>
            <View style={styles.styledCon}>
                <View style={styles.styledCon}>
                    <Image style={styles.pageLogo} source={require('../assets/images/home1.jpg')} />

                    <Text style={styles.pageTitle}>Log In  <MaterialIcons name="lock-outline" size={28} color="black" /></Text>

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
                        label="Email"
                        style={styles.input}
                        autoFocus
                        autoCompleteType="password"
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                    />
                    {errorPassword.length != 0 && (<Text style={styles.error}>{errorPassword}</Text>)}

                    <View style={styles.forgotPassword}>
                        <TouchableOpacity
                        >
                        <Text style={styles.forgot}>Forgot your password?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                        onPress={login}
                        style={styles.button}>
                        <Text style={styles.btnText}>Log In  <AntDesign name="arrowright" size={23} color="black" /></Text>
                    </TouchableOpacity>

                    <View style={styles.row}>
                        <Text style={styles.forgot}>Don’t have an account? </Text>
                        <TouchableOpacity>
                        <Text style={styles.link}>Sign up</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.copyright}>scheduleMe © 2021</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
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
    input: {
        width: '100%',
        height: 40,
        margin: 12,
        marginBottom: 0,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 5,
    },
    forgot: {
        justifyContent: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        alignItems: 'center',
    },
    row: {
        fontSize: 20,
        fontWeight: 'bold',
        flexDirection: 'row',
        marginTop: 8,
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
})

export default Login;