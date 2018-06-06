import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import ExamService from "../services/ExamService"

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}
    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            courseId: '',
            moduleId: '',
            lessonId: ''
        }
        this.addExam=this.addExam.bind(this)
        this.examService = ExamService.instance;
    }

    addExam(){
        let newExam={
            title:"New Exam",
            name:"New Exam"
        }

        this.examService.createExam(this.state.lessonId,newExam)
            .then(response => (response.json()))
            .then(()=>(fetch("http://10.0.0.210:8080/api/lesson/"+this.state.lessonId+"/widgets")
                .then(response => (response.json()).catch((function(error) {
                    console.log(error.message)})))
                .then(widgets => this.setState({widgets: widgets}))))
    }
    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        this.setState({lessonId:lessonId})
        fetch("http://10.0.0.210:8080/api/lesson/"+lessonId+"/widgets")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }

    render() {
        return(
            <View style={{padding: 15}}>
                {this.state.widgets.map(
                    (widget, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("ExamEditor", {examId: widget.id, title:widget.title, name:widget.name})}
                            key={index}
                            title={widget.name}/>))}
                <Button	backgroundColor="blue"
                           onPress={()=>this.addExam()}
                           color="white"
                           title="Add Exam"/>
            </View>
        )
    }
}
export default WidgetList