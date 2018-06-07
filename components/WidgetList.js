import React, {Component} from 'react'
import {ScrollView, View, Alert} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import ExamService from "../services/ExamService"
import AssignmentService from "../services/AssignmentService"

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
        this.examService = ExamService.instance;
        this.assignmentService=AssignmentService.instance;
    }

    addExam(){
        let newExam={
            title:"New Exam",
            name:"New Exam"
        }

        this.examService.createExam(this.state.lessonId,newExam)
            .then(response => (response.json()))
            .then(()=>(fetch("http://10.0.0.210:8080/api/lesson/"+this.state.lessonId+"/exam")
                .then(response => (response.json()).catch((function(error) {
                    console.log(error.message)})))
                .then(exams => this.setState({exams: exams}))))
    }

    addAssignment(){
        let newAssignment={
            title:"New Assignment",
            name:"New Assignment"
        }
        this.assignmentService.createAssignment(this.state.lessonId,newAssignment)
            .then(response => (response.json()))
            .then(()=>(fetch("http://10.0.0.210:8080/api/lesson/"+this.state.lessonId+"/assignment")
                .then(response => (response.json()).catch((function(error) {
                    console.log(error.message)})))
                .then(assignments => this.setState({assignments: assignments}))))

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
                                    .navigate("ExamEditor", {examId: exam.id, title:exam.title, name:exam.name})}
                            key={index}
                            title={exam.name}/>))}
                {this.state.assignments.map(
                    (assignment, index) => (
                        <ListItem
                            onPress={() =>
                                this.props.navigation
                                    .navigate("AssignmentEditor", {assignment : assignment})}
                            key={index}
                            title={assignment.title}/>))}
                <Button	backgroundColor="blue"
                           onPress={()=>this.addExam()}
                           color="white"
                           title="Add Exam"/>
                <Button	backgroundColor="blue"
                           onPress={()=>this.addAssignment()}
                           color="white"
                           title="Add Assignment"/>
                <Text>length:{this.state.exams.length}</Text>
                <Text>length:{this.state.assignments.length}</Text>
            </ScrollView>
        )
    }
}
export default WidgetList