import React from 'react'
import {View, Alert, TextInput, ScrollView, Switch} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import EssayService from "../services/EssayService"

class EssayQuestionEditor extends React.Component {
    static navigationOptions = { title: "Essay"}
    constructor(props) {
        super(props)
        this.state = {
            question:'',
            title: '',
            subtitle: '',
            points: 0,
            preview:false
        }
        this.updateQuestion=this.updateQuestion.bind(this);
        this.essayService=EssayService.instance;
    }

    componentDidMount() {
        const question = this.props.navigation.getParam("question");
        this.setState({
            question: question,
            title: question.title,
            subtitle: question.subtitle,
            points: question.points,
        })
    }
    updateForm(newState) {
        this.setState(newState)
    }
    updateQuestion(){
        //Alert.alert("In updateQuestion")
        let newQuestion={
            title: this.state.title,
            subtitle: this.state.subtitle,
            points: this.state.points
        }
        this.essayService.updateEssayQuestion(this.state.question.id, newQuestion)
            .then(Alert.alert("Essay Question Updated"))

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

                <FormLabel>Points</FormLabel>
                <FormInput value={this.state.points.toString()} onChangeText={
                    text => this.updateForm({points: text})
                }/>

                <Button	backgroundColor="green"
                           onPress={()=>this.updateQuestion()}
                           color="white"
                           title="Save"/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>
            </ScrollView>}
                <View>
                <Text h3>Preview</Text>
                <Text h2>{this.state.title}</Text>
                <Text>{this.state.subtitle}</Text>
                <Text>{this.state.points}</Text>
                <TextInput     multiline={true}
                               numberOfLines={5}
                               style={{ borderColor: 'gray', borderWidth: 1}}
                           value="Write Essay here!"/>
                    <Button	backgroundColor="red"
                               color="white"
                               title="Cancel"/>
                    <Button	backgroundColor="blue"
                               color="white"
                               title="Submit"/>

                </View>
            </ScrollView>
        )
    }
}

export default EssayQuestionEditor