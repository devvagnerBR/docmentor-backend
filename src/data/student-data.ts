import { PRISMA_CLIENT } from "../database/prisma";
import { StudentModel } from "../models/student-model";

export class StudentData {


    registerStudent = async ( student: StudentModel, teacher_id: string, school_id: string ) => {

        try {

            await PRISMA_CLIENT.student.create( {
                data: {
                    id: student.getId()!,
                    name: student.getName()!,
                    birthday: student.getBirthday()!,
                    school_grade: student.getSchoolGrade()!,
                    service_days: student.getServiceDays()!,
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
                select: {
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

    updateStudent = async ( id: string, student: StudentModel ) => {

        try {

            await PRISMA_CLIENT.student.update( {
                where: {
                    id
                },
                data: {
                    name: student.getName() || undefined,
                    birthday: student.getBirthday() || undefined,
                    school_grade: student.getSchoolGrade() || undefined,
                    service_days: student.getServiceDays() || undefined,
                }
            } );

        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }

    deleteStudent = async ( studentId: string ) => {

        try {

            await PRISMA_CLIENT.student.update( {
                where: {
                    id: studentId
                },
                data: {
                    status: false
                }
            } );

        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }


    getStudentByParentId = async ( parentId: string ) => {

        try {

            const student = await PRISMA_CLIENT.student.findFirst( {
                where: {
                    parents: {
                        some: {
                            id: parentId
                        }
                    }
                }
            } );

            return student;

        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }

    searchStudent = async ( id: string, name: string, take: number, skip: number ) => {

        try {

            const search = await PRISMA_CLIENT.student.findMany( {
                where: {
                    teacher_id: id,
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                },
                take: take || 5, 
                skip: skip || 0 

            } );

            return search;

        } catch ( error: any ) {
            throw new Error( error.message );
        }

    }
}