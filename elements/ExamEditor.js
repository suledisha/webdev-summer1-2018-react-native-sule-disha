import React, {Component} from 'react'
import {View, Alert, Picker} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import LessonList from "../components/LessonList";
import ExamService from "../services/ExamService"
import QuestionService from "../services/QuestionService"
import QuestionList from "../components/QuestionList";

class ExamEditor extends React.Component {
    static navigationOptions = {title: "Exam Editor"}

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            name:'',
            examId:'',
            questionType: 0
        }
        this.examService = ExamService.instance;
        this.questionService=QuestionService.instance;
        this.updateExam=this.updateExam.bind(this);
        this.addQuestion=this.addQuestion.bind(this);
    }

    updateForm(newState) {
        this.setState(newState)
    }

    updateExam(){
        let newExam={
            name:this.state.name
        }
        this.examService.updateExam(this.state.examId,newExam)
    }

    addQuestion(questionType){
        this.questionService.addQuestion(questionType, this.state.examId);

    }

    componentDidMount() {
        const examId = this.props.navigation.getParam("examId");
        const title = this.props.navigation.getParam("title");
        const name = this.props.navigation.getParam("name");
        this.setState({
            examId: examId,
            title: title,
            name:name
        })
    }

    render() {
        return (
            <View>
                <Text>{this.state.examId}</Text>

                <FormLabel>Name</FormLabel>
                <FormInput  onChangeText={
                    text => this.updateForm({name: text})
                } value={this.state.name}/>

                <Button	backgroundColor="green"
                           onPress={()=>this.updateExam()}
                           color="white"
                           title="Save"/>

                <Button	backgroundColor="blue"
                           onPress={() => this.props.navigation
                               .navigate("QuestionList", {examId: this.state.examId})}
                           color="white"
                           title="Question List"/>
                <Text>Add New Question</Text>
                <Picker
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({questionType: itemValue})}
                    selectedValue={this.state.questionType}>
                    <Picker.Item value="MultipleChoice" label="Multiple choice" />
                    <Picker.Item value="Essay" label="Essay" />
                    <Picker.Item value="TrueFalse" label="True or false" />
                    <Picker.Item value="FillInBlanks" label="Fill in the blanks" />
                </Picker>

                <Button	backgroundColor="blue"
                           onPress={()=>{this.addQuestion(this.state.questionType)}}
                           color="white"
                           title="Add Question"/>


            </View>)
    }
}
export default ExamEditor