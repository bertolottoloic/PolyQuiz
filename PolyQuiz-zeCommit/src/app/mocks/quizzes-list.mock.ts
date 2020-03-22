import { Quiz } from '../models/quiz.models';
import { Handicap } from '../models/handicap.models';

export const QUIZ_LIST: Quiz[] = [
    {
        name: 'football',
        theme: 'sport',
        id:'1',
        questions: [
            {
                text:"test ?",
                id:"1",
                answers:[{
                    id:"1",
                    text:"reponse 1",
                    isCorrect: true,
                },{
                    id:"2",
                    text:"reponse 2 fausse",
                    isCorrect: false,
                },
                ],
    


            },{
                text:"Ceci est une réelle question ?",
                id:"1",
                answers:[{
                    id:"1",
                    text:"reponse 1",
                    isCorrect: false,
                },{
                    id:"2",
                    text:"reponse 2",
                    isCorrect: true,
                },
                ]
            },
        ],
        trouble: Handicap.Memoire,
        image:"../../../assets/img/Papy-Brossard.jpg",
    },
]