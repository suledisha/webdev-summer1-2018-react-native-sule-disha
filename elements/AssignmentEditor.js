import React from 'react'
import {View, Alert, TextInput, ScrollView, Switch} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import AssignmentService from "../services/AssignmentService"
import FilePickerManager from 'react-native-file-picker';


class AssignmentEditor extends React.Component {
    static navigationOptions = {title: "Assignment"}

    constructor(props) {
        super(props)

        this.state = {
            assignment: '',
            title: '',
            description: '',
            points: 0,
            widgetType:'Assignment',
            preview: false
        }
        this.updateAssignment=this.updateAssignment.bind(this);
        this.assignmentService=AssignmentService.instance;
    }

    componentDidMount() {
        const assignment = this.props.navigation.getParam("assignment");
        this.setState({
            assignment: assignment,
            title: assignment.title,
            description: assignment.description,
            points: assignment.points,
        })
    }

    updateForm(newState) {
        this.setState(newState)
    }

    updateAssignment(){
        //Alert.alert("In updateQuestion")
        let newAssignment={
            title: this.state.title,
            description: this.state.description,
            points: this.state.points
        }
        this.assignmentService.updateAssignment(this.state.assignment.id, newAssignment).catch(function(error) {
            console.log(error.message);
        }).then(Alert.alert("Assignment Updated"))
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
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>

                    <FormLabel>Description</FormLabel>
                    <FormInput value={this.state.description} onChangeText={
                        text => this.updateForm({description: text})
                    }/>
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>

                    <FormLabel>Points</FormLabel>
                    <FormInput value={this.state.points.toString()} onChangeText={
                        text => this.updateForm({points: text})
                    }/>

                    <Button	backgroundColor="green"
                               onPress={()=>this.updateAssignment()}
                               color="white"
                               title="Save"/>
                    <Text>{"\n"}</Text>
                    <Button	backgroundColor="red"
                               color="white"
                               title="Cancel"/>
                </ScrollView>}
                <View>
                    <Text>{"\n"}</Text>
                    <Text h3>Preview</Text>
                    <Text>{"\n"}</Text>
                    <Text h2>{this.state.title}</Text>
                    <Text>{"\n"}</Text>
                    <Text>{this.state.subtitle}</Text>
                    <Text>{"\n"}</Text>
                    <Text>Points {this.state.points}</Text>
                    <Text>{"\n"}</Text>
                    <TextInput     multiline={true}
                                   numberOfLines={5}
                                   style={{ borderColor: 'gray', borderWidth: 1}}
                                   value="Write Assignment here!"/>
                    <Text>{"\n"}</Text>
                    <TextInput value="Submit Link here!"/>
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

export default AssignmentEditor

