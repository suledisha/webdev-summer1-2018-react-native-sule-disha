import 'es6-symbol/implement';
let _singleton=Symbol();
const ASSIGN_API_URL = 'http://10.0.0.210:8080/api/lesson/LID/assignment';
const ASSIGN_URL2 = 'http://10.0.0.210:8080/api/assignment/AID';
export default class AssignmentService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new AssignmentService(_singleton);
        return this[_singleton]
    }

    createAssignment(lessonId, assignment) {
        return fetch(ASSIGN_API_URL.replace('LID', lessonId),
            {
                body: JSON.stringify(assignment),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    updateAssignment(aId, assignment){
        return fetch(ASSIGN_URL2.replace('AID',aId), {
            method: 'PUT',
            body: JSON.stringify(assignment),
            headers: {
                'content-type': 'application/json'
            }

        })}

        deleteAssignment(aId) {
            return fetch(ASSIGN_URL2.replace('AID',aId), {
                method: 'delete'
            })
        }
}
