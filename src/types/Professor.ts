import {User} from "./User";

export interface Professor {
    id: string,
    professorNumber: string,
    user: User
}

export interface ProfessorReduced {
    id: string;
    professorNumber: string;
}

export interface ExternalProfessor {
    id: string,
    professorNumber: number,
    user: User
}