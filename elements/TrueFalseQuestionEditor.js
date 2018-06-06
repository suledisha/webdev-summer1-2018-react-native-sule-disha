import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'
import TrueFalseService from "../services/TrueFalseService"

class TrueFalseQuestionEditor extends React.Component {
  static navigationOptions = { title: "True False"}
  constructor(props) {
    super(props)
    this.state = {
      question:'',
      title: '',
      subtitle: '',
      points: 0,
      isTrue: false
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

        <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                  checked={this.state.isTrue} title='The answer is true'/>

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

export default TrueFalseQuestionEditor