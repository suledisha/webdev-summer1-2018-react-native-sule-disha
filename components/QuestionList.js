import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class QuestionList extends Component {
    static navigationOptions = {title: 'Questions'}
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            examId: ''
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        fetch("http://10.0.0.210:8080/api/exam/"+examId+"/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
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
                                        .navigate("TrueFalseQuestionEditor", {question: question})
                                if(question.type === "MultipleChoice")
                                    this.props.navigation
                                        .navigate("MultipleChoiceQuestionEditor", {question: question})
                                if(question.type === "Essay")
                                    this.props.navigation
                                        .navigate("EssayQuestionEditor", {question: question})
                                if(question.type === "FillInBlanks")
                                    this.props.navigation
                                        .navigate("FillInTheBlanksQuestionEditor", {question: question})
                            }}
                            key={index}
                            subtitle={question.subtitle}
                            title={question.title}/>))}
            </View>
        )
    }
}
export default QuestionList