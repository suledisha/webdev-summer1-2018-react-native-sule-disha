import 'es6-symbol/implement';
let _singleton=Symbol();
const TFQUESTION_API_URL = 'http://10.0.0.210:8080/api/exam/EID/truefalse';
const TFQUESTION_URL2 = 'http://10.0.0.210:8080/api/truefalse/TFID';
export default class TrueFalseService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TrueFalseService(_singleton);
        return this[_singleton]
    }

    addTrueFalseQuestion(examId){
        let newTrueFalseQuestion={
            title: "New TrueFalse Question",
            type: "TrueFalse",
            isTrue: false}

        return fetch(TFQUESTION_API_URL.replace('EID', examId),
            {
                body: JSON.stringify(newTrueFalseQuestion),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    updateTrueFalseQuestion(newTFQuestion, questionId){
        return fetch(TFQUESTION_URL2.replace('TFID',questionId), {
            method: 'PUT',
            body: JSON.stringify(newTFQuestion),
            headers: {
                'content-type': 'application/json'
            }

        })}

}
