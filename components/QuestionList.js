import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Icon} from 'react-native-elements'
import QuestionService from "../services/QuestionService";

class QuestionList extends Component {
    static navigationOptions = {title: 'Questions'}
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            examId: ''
        }
        this.questionService=QuestionService.instance;
        this.deleteQuestion=this.deleteQuestion.bind(this);
        this.refreshFunction=this.refreshFunction.bind(this);
    }

    refreshFunction(){
        const examId = this.state.examId
        fetch("http://10.0.0.210:8080/api/exam/"+examId+"/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
    }


    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        this.setState({examId:examId})
        fetch("http://10.0.0.210:8080/api/exam/"+examId+"/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
    }

    deleteQuestion(questionId){
        this.questionService.deleteQuestion(questionId)
            .then(response => (response.json()))
            .catch(function(error) {
                console.log(error.message);
            }).then(Alert.alert("Question deleted"))
            .then(()=>this.refreshFunction())
    }
    render() {
        return(
            <View style={{padding: 15}}>
                {this.state.questions.map(
                    (question, index) => (
                        <ListItem
                            onPress={() => {
                                if(question.type === "TrueFalse")
                                    this.props.navigation
                                        .navigate("TrueFalseQuestionEditor", {question: question, refresh:this.refreshFunction})
                                if(question.type === "MultipleChoice")
                                    this.props.navigation
                                        .navigate("MultipleChoiceQuestionEditor", {question: question, refresh:this.refreshFunction})
                                if(question.type === "Essay")
                                    this.props.navigation
                                        .navigate("EssayQuestionEditor", {question: question, refresh:this.refreshFunction})
                                if(question.type === "FillInBlanks")
                                    this.props.navigation
                                        .navigate("FillInTheBlanksQuestionEditor", {question: question, refresh:this.refreshFunction})
                            }}
                            leftIcon={<Icon name='question-answer'/>}
                            rightIcon={<Icon name='delete'
                                             onPress={() => this.deleteQuestion(question.id)}/>}
                            key={index}
                            subtitle={question.subtitle}
                            title={question.title}/>))}
            </View>
        )
    }
}
export default QuestionList