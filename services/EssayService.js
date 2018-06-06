import 'es6-symbol/implement';
let _singleton=Symbol();
const EQUESTION_API_URL = 'http://10.0.0.210:8080/api/exam/EID/essay';
const EQUESTION_URL2 = 'http://10.0.0.210:8080/api/essay/essayID';
export default class EssayService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new EssayService(_singleton);
        return this[_singleton]
    }

    addEssayQuestion(examId){
        let newEssayQuestion={
            title: "New Essay Question",
            subtitle: "New Essay Question",
            points:"0",
            type: "Essay",
            }

        return fetch(EQUESTION_API_URL.replace('EID', examId),
            {
                body: JSON.stringify(newEssayQuestion),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    updateEssayQuestion(newEQuestion, questionId){
        return fetch(EQUESTION_URL2.replace('essayID',questionId), {
            method: 'PUT',
            body: JSON.stringify(newEQuestion),
            headers: {
                'content-type': 'application/json'
            }

        })}

}
