import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import MultipleChoiceService from '../services/MultipleChoiceService'


class MultipleChoiceQuestionEditor extends React.Component {
    static navigationOptions = { title: "Multiple Choice"}
    constructor(props) {
        super(props)
        this.state = {
            question:'',
            title: '',
            subtitle: '',
            points: 0,
            options: '',
            correctOption:''
        }
        this.updateQuestion=this.updateQuestion.bind(this);
        this.multipleChoiceService=MultipleChoiceService.instance;
    }

    componentDidMount() {
        const question = this.props.navigation.getParam("question");
        this.setState({
            question: question,
            title: question.title,
            subtitle: question.subtitle,
            points: question.points,
            options: question.options,
            correctOption:question.correctOption
        })
    }
    updateForm(newState) {
        this.setState(newState)
    }

    updateQuestion(){
        let newQuestion={
            title: this.state.title,
            subtitle: this.state.subtitle,
            points: this.state.points,
            options: this.state.options,
            correctOption: this.state.correctOption
        }
        this.multipleChoiceService.updateMCQuestion(this.state.question.id, newQuestion)

    }
    render() {
        return(
            <View>
                <FormLabel>Title</FormLabel>
                <FormInput value={this.state.title} onChangeText={
                    text => this.updateForm({title: text})
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput value={this.state.subtitle} onChangeText={
                    text => this.updateForm({subtitle: text})
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>


                <FormLabel>Choices</FormLabel>
                <FormInput value={this.state.choices} onChangeText={
                    text => this.updateForm({options: text})
                }/>

                <FormLabel>Correct Option</FormLabel>
                <FormInput value={this.state.correctOption} onChangeText={
                    text => this.updateForm({correctOption: text})
                }/>

                <Button	backgroundColor="green"
                           onPress={()=>this.updateQuestion()}
                           color="white"
                           title="Save"/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>

                <Text h3>Preview</Text>
                <Text h2>{this.state.title}</Text>
                <Text>{this.state.subtitle}</Text>


            </View>
        )
    }
}

export default MultipleChoiceQuestionEditor