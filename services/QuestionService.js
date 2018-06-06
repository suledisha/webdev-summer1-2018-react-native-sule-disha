import 'es6-symbol/implement';
import TrueFalseService from "./TrueFalseService";
import EssayService from "./EssayService";
import MultipleChoiceService from "./MultipleChoiceService";
import FillInTheBlankService from "./FillInTheBlankService";
let _singleton=Symbol();
const QUESTION_API_URL = 'http://10.0.0.210:8080/api/exam/EID/question';
const QUESTION_URL2 = 'http://10.0.0.210:8080/api/question/QID';
export default class QuestionService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
        this.trueFalseService= TrueFalseService.instance;
        this.essayService=EssayService.instance;
        this.multipleChoiceService=MultipleChoiceService.instance;
        this.fillInTheBlankService=FillInTheBlankService.instance;
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new QuestionService(_singleton);
        return this[_singleton]
    }

    addQuestion(questionType,examId){
        if(questionType=="TrueFalse"){
            return this.trueFalseService.addTrueFalseQuestion(examId);
        }
        else if(questionType=="Essay"){
            return this.essayService.addEssayQuestion(examId);
        }
        else if(questionType=="MultipleChoice"){
            return this.multipleChoiceService.addMCQuestion(examId);
        }
        else if(questionType=="FillInBlanks"){
            return this.fillInTheBlankService.addFBQuestion(examId);
        }
    }

}
