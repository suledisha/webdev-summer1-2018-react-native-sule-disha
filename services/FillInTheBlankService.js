import 'es6-symbol/implement';
let _singleton=Symbol();
const FBQUESTION_API_URL = 'http://10.0.0.210:8080/api/exam/EID/blanks';
const FBQUESTION_URL2 = 'http://10.0.0.210:8080/api/blanks/FBID';
export default class FillInTheBlankService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FillInTheBlankService(_singleton);
        return this[_singleton]
    }

    addFBQuestion(examId){
        let newFBQuestion={
            title: "New Fill In The Blanks Question",
            subtitle:"New Fill In The Blanks Question",
            points:'0',
            isTrue: false,
            type: "FillInBlanks",
            variables:""
        }

        return fetch(FBQUESTION_API_URL.replace('EID', examId),
            {
                body: JSON.stringify(newFBQuestion),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    updateFBQuestion(newFBQuestion, questionId){
        return fetch(FBQUESTION_URL2.replace('FBID',questionId), {
            method: 'PUT',
            body: JSON.stringify(newFBQuestion),
            headers: {
                'content-type': 'application/json'
            }

        })}

}