import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import {Button} from 'react-native-elements'
import { createStackNavigator } from 'react-navigation'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import ExamEditor from './elements/ExamEditor'
import QuestionList from './components/QuestionList'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import EssayQuestionEditor from './elements/EssayQuestionEditor'
import FillInTheBlanksQuestionEditor from './elements/FillInTheBlanksQuestionEditor'
import AssignmentEditor from './elements/AssignmentEditor'
class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <ScrollView>
                <StatusBar barStyle="light-content"/>
                <Text>Welcome</Text>
                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList') } />
            </ScrollView>
        )
    }
}

const App = createStackNavigator({
Home,
CourseList,
ModuleList,
LessonList,
WidgetList,
ExamEditor,
QuestionList,
TrueFalseQuestionEditor,
MultipleChoiceQuestionEditor,
EssayQuestionEditor,
FillInTheBlanksQuestionEditor,
AssignmentEditor
 });

export default App;