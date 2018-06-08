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
            widgetType:'Exam',
            questionType: 'Essay'
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
        this.examService.updateExam(this.state.examId,newExam).catch(function(error) {
            console.log(error.message);}).
            then(Alert.alert("Exam Updated"))
            .then(()=>this.props.navigation.state.params.refresh())
            .then(()=>this.props.navigation.goBack())
    }

    addQuestion(questionType){
        this.questionService.addQuestion(questionType, this.state.examId).catch(function(error) {
            console.log(error.message);}).
        then(Alert.alert("New Question Added in Question List"))
            .then(()=>this.props.navigation.state.params.refresh())
            //.then(()=>this.props.navigation.navigate("QuestionList", {examId: this.state.examId}))
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
                <FormLabel>Name</FormLabel>
                <FormInput  onChangeText={
                    text => this.updateForm({name: text})
                } value={this.state.name}/>
                <Text>{"\n"}</Text>
                <Button	backgroundColor="green"
                           onPress={()=>this.updateExam()}
                           color="white"
                           title="Save"/>
                <Text>{"\n"}</Text>
                <Button	backgroundColor="blue"
                           onPress={() => this.props.navigation
                               .navigate("QuestionList", {examId: this.state.examId})}
                           color="white"
                           title="Question List"/>
                <Text>{"\n"}</Text>
                <Text h3>Select Question Type and add a new question</Text>
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