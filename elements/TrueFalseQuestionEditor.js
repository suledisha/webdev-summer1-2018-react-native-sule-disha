import React from 'react'
import {View, Alert, TextInput, ScrollView, Switch} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'
import TrueFalseService from "../services/TrueFalseService"
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class TrueFalseQuestionEditor extends React.Component {
  static navigationOptions = { title: "True False"}
  constructor(props) {
    super(props)
    this.state = {
      question:'',
      title: '',
      subtitle: '',
      points: 0,
      isTrue: false,
      preview:false,
      radio_props : [
        {label: 'True', value: 0 },
        {label: 'False', value: 1 }
      ]
    }
     this.updateQuestion=this.updateQuestion.bind(this);
     this.TrueFalseService=TrueFalseService.instance;
  }

  componentDidMount() {
          const question = this.props.navigation.getParam("question");
          this.setState({
                      question: question,
                      title: question.title,
                      subtitle: question.subtitle,
                      points: question.points,
                      isTrue: question.isTrue
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
                isTrue: this.state.isTrue,
    }
    this.TrueFalseService.updateTrueFalseQuestion(this.state.question.id, newQuestion)
                           .then(Alert.alert("TrueFalse Question Updated"))

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

        <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                  checked={this.state.isTrue} title='The answer is true'/>

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
         <RadioForm
                  radio_props={this.state.radio_props}
                  initial={0}
                />
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

export default TrueFalseQuestionEditor