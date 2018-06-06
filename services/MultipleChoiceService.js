import 'es6-symbol/implement';
let _singleton=Symbol();
const MCQUESTION_API_URL = 'http://10.0.0.210:8080/api/exam/EID/choice';
const MCQUESTION_URL2 = 'http://10.0.0.210:8080/api/choice/MCID';
export default class MultipleChoiceService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new MultipleChoiceService(_singleton);
        return this[_singleton]
    }

    addMCQuestion(examId){
        let newMCQuestion={
            title: "New Multiple Choice Question",
            type: "MultipleChoice",
        }

        return fetch(MCQUESTION_API_URL.replace('EID', examId),
            {
                body: JSON.stringify(newMCQuestion),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    updateMCQuestion(questionId, newMCQuestion){
        return fetch(MCQUESTION_URL2.replace('MCID',questionId), {
            method: 'PUT',
            body: JSON.stringify(newMCQuestion),
            headers: {
                'content-type': 'application/json'
            }

        })}

}
