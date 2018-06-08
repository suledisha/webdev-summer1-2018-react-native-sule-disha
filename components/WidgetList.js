import React, {Component} from 'react'
import {ScrollView, View, Alert} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import ExamService from "../services/ExamService"
import AssignmentService from "../services/AssignmentService"
import { Icon } from 'react-native-elements'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}
    constructor(props) {
        super(props)
        this.state = {
            exams: [],
            assignments:[],
            courseId: '',
            moduleId: '',
            lessonId: ''
        }
        this.addExam=this.addExam.bind(this)
        this.addAssignment=this.addAssignment.bind(this)
        this.deleteExam=this.deleteExam.bind(this)
        this.deleteAssignment=this.deleteAssignment.bind(this)
        this.refreshFunction=this.refreshFunction.bind(this)
        this.examService = ExamService.instance;
        this.assignmentService=AssignmentService.instance;
    }

    refreshFunction(){
        const lessonId = this.state.lessonId
        fetch("http://10.0.0.210:8080/api/lesson/"+lessonId+"/exam")
            .then(response => (response.json()))
            .then(exams => this.setState({exams}))

        fetch("http://10.0.0.210:8080/api/lesson/"+lessonId+"/assignment")
            .then(response => (response.json()))
            .then(assignments => this.setState({assignments}))
    }

    addExam(){
        let newExam={
            title:"New Exam",
            name:"New Exam",
            widgetType:"Exam"
        }

        this.examService.createExam(this.state.lessonId,newExam)
            .then(response => (response.json()))
            .catch(function(error) {
                console.log(error.message);
            }).then(Alert.alert("New Exam added"))
            .then(()=>this.refreshFunction())
    }

    deleteExam(examId){
        this.examService.deleteExam(examId)
            .then(response => (response.json()))
            .catch(function(error) {
                console.log(error.message);
            }).then(Alert.alert("Exam deleted"))
            .then(()=>this.refreshFunction())
    }

    addAssignment(){
        let newAssignment={
            title:"New Assignment",
            name:"New Assignment",
            widgetType:"Assignment"
        }
        this.assignmentService.createAssignment(this.state.lessonId,newAssignment)
            .then(response => (response.json()))
            .catch(function(error) {
                console.log(error.message);
            }).then(Alert.alert("New Assignment added"))
            .then(()=>this.refreshFunction())

    }

    deleteAssignment(assignmentId){
        this.assignmentService.deleteAssignment(assignmentId)
            .then(response => (response.json()))
            .catch(function(error) {
                console.log(error.message);
            }).then(Alert.alert("Assignment deleted"))
            .then(()=>this.refreshFunction())

    }
    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        this.setState({lessonId:lessonId})

        fetch("http://10.0.0.210:8080/api/lesson/"+lessonId+"/exam")
            .then(response => (response.json()))
            .then(exams => this.setState({exams}))

        fetch("http://10.0.0.210:8080/api/lesson/"+lessonId+"/assignment")
            .then(response => (response.json()))
            .then(assignments => this.setState({assignments}))
    }

    render() {
        return(
            <ScrollView style={{padding: 15}}>
                {this.state.exams.map(
                    (exam, index) => (
                        <ListItem
                            onPress={() =>
                                this.props.navigation
                                    .navigate("ExamEditor", {examId: exam.id, title:exam.title, name:exam.name, refresh:this.refreshFunction})}
                            key={index}
                            title={exam.name}
                            rightIcon={<Icon name='delete'
                                onPress={() => this.deleteExam(exam.id)}/>}/>))}
                {this.state.assignments.map(
                    (assignment, index) => (
                        <ListItem
                            onPress={() =>
                                this.props.navigation
                                    .navigate("AssignmentEditor", {assignment : assignment, refresh:this.refreshFunction})}
                            key={index}
                            title={assignment.title}
                            rightIcon={<Icon name='delete'
                                             onPress={() => this.deleteAssignment(assignment.id)}/>}/>))}
                <Text>{"\n"}</Text>
                <Button	backgroundColor="blue"
                           onPress={()=>this.addExam()}
                           color="white"
                           title="Add Exam"/>
                <Text>{"\n"}</Text>
                <Button	backgroundColor="blue"
                           onPress={()=>this.addAssignment()}
                           color="white"
                           title="Add Assignment"/>
            </ScrollView>
        )
    }
}
export default WidgetList