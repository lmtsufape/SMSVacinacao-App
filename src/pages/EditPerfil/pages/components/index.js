import React, { PureComponent } from "react";
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, TouchableHighlight, TextInput, ScrollView } from "react-native";
import { Color } from '@common';

export const SubTitle = (props) => (
    <View style={[{ flex: 0.1, alignItems: 'center' }, props.style]}>
        <Text style={[{ color: '#fff', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }, props.textStyle]}> {props.children} </Text>
    </View>
);

export const ErrorMessage = (props) => (
    props.show ? <Text style={{ color: '#FF4000', fontSize: 12 }} > {props.message} </Text > : null
);

export const ListItens = (props) => (
    <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
        style={{ flex: 0.7, marginTop: 10 }}
    >
        {props.children}
    </ScrollView>
);

export const ItemInput = (props) => (
    <View style={[{ marginBottom: 10 }, props.style]}>
        <Text style={[{ color: '#fff', fontSize: 22 }, props.textStyle]}>{props.name}</Text>
        {props.children}
    </View>
);

export const Footer = (props) => (
    <View style={[{ flex: 0.2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }, props.style]}>
        {props.children}
    </View>
);

export const Button = (props) => (
    <TouchableHighlight
        activeOpacity={0.3}
        underlayColor="#1111"
        style={[{ borderRadius: 10 }, props.contentStyle]}
        onPress={props.onPress}
    >
        <View style={[{
            flexDirection: 'row',
            height: 60,
            width: 100,
            backgroundColor: Color.primary,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            borderWidth: 2.5,
            borderColor: '#fff',
            elevation: 8
        }, props.style]}>
            {props.icon}
            <Text style={[{
                marginVertical: 10,
                fontWeight: 'bold',
                fontSize: 18,
                color: '#fff'
            }, props.textStyle]}>
                {props.text}
            </Text>
        </View>
    </TouchableHighlight>
);