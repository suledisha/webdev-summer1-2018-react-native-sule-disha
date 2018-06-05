import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}
    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            courseId: '',
            moduleId: ''
        }
        this.addWidget=this.addWidget.bind(this)
    }

    addExam(){
        let newExam={
            title:"New Exam"
        }



    }
    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
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
                                .navigate("ExamEditor", {widgetId: widget.id})}
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