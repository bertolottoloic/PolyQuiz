import { Profile, Handicap } from '../models/profile.model';

export const PROFILE_LIST: Profile[] = [
    {
        name: 'Dacosta',
        firstName: 'Pedro',
        id:'1',
        trouble: Handicap.Memoire,
        image:"../../../assets/img/Papy-Brossard.jpg",
    },
    {
        name: 'Meulle',
        firstName: 'Nathan',
        id:'2',
        trouble: Handicap.Moteur,
        image:"../../../assets/img/Papy-Brossard.jpg",
    },
    {
        name: 'Delm',
        firstName: 'Vinze',
        id:'3',
        trouble: Handicap.Vue,
        image:"../../../assets/img/Papy-Brossard.jpg",
    }
]