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
                    text:"reponse 1"
                },{
                    id:"2",
                    text:"reponse 2 fausse"
                },
                ],
                rightAnswer:{
                    id:"1",
                    text:"reponse 1"
                }


            },{
                text:"Ceci est une réelle question ?",
                id:"1",
                answers:[{
                    id:"1",
                    text:"reponse 1"
                },{
                    id:"2",
                    text:"reponse 2"
                },
                ],
                rightAnswer:{
                    id:"1",
                    text:"reponse 1"
                }


            },
        ],
        trouble: Handicap.Memoire,
        image:"../../../assets/img/Papy-Brossard.jpg",
    },
]