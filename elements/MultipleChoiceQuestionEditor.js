import React from 'react'
import {View, Alert, TextInput, ScrollView, Switch} from 'react-native'
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
            correctOption:'',
            preview:false
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
            options:question.options,
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
            .then(Alert.alert("Multiple Choice Question Updated"))
            .then(()=>this.props.navigation.state.params.refresh())
            .then(()=>this.props.navigation.goBack())


    }
    render() {
        return(
            <ScrollView style={{padding:20}}>
                <Text>Preview</Text>
                <Switch
                    onValueChange = {value => this.updateForm({preview: value})}
                    value = {this.state.preview}/>

                {!this.state.preview && <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput value={this.state.title} onChangeText={
                    text => this.updateForm({title: text})
                }/>
                    {this.state.title === "" &&
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>}

                <FormLabel>Description</FormLabel>
                <FormInput value={this.state.subtitle} onChangeText={
                    text => this.updateForm({subtitle: text})
                }/>
                    {this.state.subtitle === "" &&
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>}


                <FormLabel>Points</FormLabel>
                <FormInput value={this.state.points.toString()} onChangeText={
                    text => this.updateForm({points: text})
                }/>
                    {this.state.points === "" &&
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage>}

                    <FormLabel>Options</FormLabel>
                    <FormInput value={this.state.options} onChangeText={
                        text => this.updateForm({options: text})
                    }/>
                    {this.state.options === "" &&
                    <FormValidationMessage>
                        Options required
                    </FormValidationMessage>}

                    <FormLabel>Correct Option</FormLabel>
                    <FormInput value={this.state.correctOption} onChangeText={
                        text => this.updateForm({correctOption: text})
                    }/>
                    {this.state.correctOption === "" &&
                    <FormValidationMessage>
                        Correct Option is required
                    </FormValidationMessage>}


                    <Button	backgroundColor="green"
                           onPress={()=>this.updateQuestion()}
                           color="white"
                           title="Save"/>
                    <Text>{"\n"}</Text>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>
                </ScrollView>}
                <View>
                <Text h3>Preview</Text>
                <Text h2>{this.state.title}</Text>
                <Text>{this.state.subtitle}</Text>
                    <Text>{"\n"}</Text>
                    <Button	backgroundColor="red"
                               color="white"
                               title="Cancel"/>
                    <Text>{"\n"}</Text>
                    <Button	backgroundColor="blue"
                               color="white"
                               title="Submit"/>
                </View>
            </ScrollView>
        )
    }
}

export default MultipleChoiceQuestionEditor