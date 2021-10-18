import React, { Component } from "react";

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import HomePage from "../screens/Home";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Profile from "../screens/Profile";
import Setting from "../screens/Setting";
import Workout from "../screens/Workout";
import Reminder from "../screens/Reminder";
import AddReminder from "../screens/AddReminder";
import AddWorkout from "../screens/AddWorkout";
import UpdateProfile from "../screens/UpdateProfile";

const NavigationStack = createStackNavigator({
    Welcome: {
        screen: Welcome,
        navigationOptions: {headerShown: false}
    },
    Login: {
        screen: Login,
        navigationOptions: {headerShown: false}
    }, 
    Signup: {
        screen: Signup,
        navigationOptions: {headerShown: false}
    },
    HomePage: {
        screen: HomePage,
        navigationOptions: {headerShown: false}
    }, 
    Profile: {
        screen: Profile,
        navigationOptions: {headerShown: false}
    },
    Setting: {
        screen: Setting,
        navigationOptions: {headerShown: false}
    },
    Workout: {
        screen: Workout,
        navigationOptions: {headerShown: false}
    },
    Reminder: {
        screen: Reminder,
        navigationOptions: {headerShown: false}
    },
    AddReminder: {
        screen: AddReminder,
        navigationOptions: {headerShown: false}
    },
    AddWorkout: {
        screen: AddWorkout,
        navigationOptions: {headerShown: false}
    },
    UpdateProfile: {
        screen: UpdateProfile,
        navigationOptions: {headerShown: false}
    }
});

const Container = createAppContainer(NavigationStack);

export default Container;