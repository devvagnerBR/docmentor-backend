import { PRISMA_CLIENT } from "../database/prisma";
import { StudentModel } from "../models/student-model";

export class StudentData {


    registerStudent = async ( student: StudentModel, teacher_id: string, school_id: string ) => {

        try {

            await PRISMA_CLIENT.student.create( {
                data: {
                    id: student.getId(),
                    name: student.getName(),
                    birthday: student.getBirthday(),
                    school_grade: student.getSchoolGrade(),
                    service_days: student.getServiceDays(),
                    teacher: {
                        connect: {
                            id: teacher_id
                        }
                    },
                    school: {
                        connect: {
                            id: school_id
                        }
                    }
                }
            } )

        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }

    getStudentByName = async ( name: string ) => {


        try {

            const student = await PRISMA_CLIENT.student.findFirst( {
                where: {
                    name
                }
            } );

            return student;


        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }

    getStudentById = async ( id: string ) => {


        try {

            const student = await PRISMA_CLIENT.student.findUnique( {
                where: {
                    id
                },
                select:{
                    id: true,
                    name: true,
                    birthday: true,
                    school_grade: true,
                    service_days: true,
                    parents: true,
                    teacher: true,
                    school: true,
                    reports: true,
                    status: true,
                    created_at: true,
                    updated_at: true,
                    teacher_id: true,
                    
                }
            } );

            return student;

        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }

    getStudentParents = async ( id: string ) => {


        try {

            const parents = await PRISMA_CLIENT.student.findUnique( {
                where: {
                    id
                },
                select: {
                    parents: true,
                }
            } );

            return parents!['parents'];
        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }

}