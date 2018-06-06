import 'es6-symbol/implement';
let _singleton=Symbol();
const EXAM_API_URL = 'http://10.0.0.210:8080/api/lesson/LID/exam';
const EXAM_API_URL2 = 'http://10.0.0.210:8080/api/exam/EID';
//const EXAM_API_URL2 = 'http://localhost:8080/api/module/MODULE_ID';

//const MODULE_API_URL = 'https://disha-sule-webdev-summer1-2018.herokuapp.com/api/course/CID/module';
//const MODULE_API_URL2 = 'https://disha-sule-webdev-summer1-2018.herokuapp.com/api/module/MODULE_ID';

export default class ExamService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }

    createExam(lessonId, exam) {
        return fetch(EXAM_API_URL.replace('LID', lessonId),
            {
                body: JSON.stringify(exam),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    updateExam(examId, exam){
        return fetch(EXAM_API_URL2.replace('EID',examId), {
            method: 'PUT',
            body: JSON.stringify(exam),
            headers: {
                'content-type': 'application/json'
            }

        })}

    /**
    deleteModule(moduleId) {
        return fetch(MODULE_API_URL2.replace
        ('MODULE_ID', moduleId), {
            method: 'delete'
        })
    }


    findAllModulesForCourse(courseId) {
        return fetch(
            MODULE_API_URL.replace('CID', courseId)).then(function (response) {
            return response.json();
        })
    }**/


}
