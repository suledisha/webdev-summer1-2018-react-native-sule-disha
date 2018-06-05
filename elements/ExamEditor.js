import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import LessonList from "../components/LessonList";

class ExamEditor extends React.Component {
    static navigationOptions = {title: "Exam Editor"}

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: ''
        }
    }

    updateForm(newState) {
        this.setState(newState)
    }

    render() {
        return (
            <View>
            <Text>Add Questions</Text>
            </View>)
    }
}
export default ExamEditor