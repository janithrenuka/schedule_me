import styled from "styled-components/native";
import { View, Image, Text } from "react-native";
import {Constants} from 'expo-constants';


//colors
export const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7E8",
    tertiary: "#1F2937",
    darkLight: "#9CS3AF",
    brand: "#6D28D9",
    green: "#10B981",
    red: "#EF4444",
}

const { primary, secondary, tertiary, darkLight, brand, green, red} = Colors;

export const StyledContainer = styled.view`
    flex: 1;
    padding: 25px;
    background-color: ${primary};
`

export const InnerContainer = styled.view`
    flex: 1;
    width: 100%;
    align-items: center;
`

export const PageLogo = styled.Image`
    width: 250px;
    height: 200px;
`

export const PageTitle = styled.Text`
    font-size: 30px;
    font-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;
`