interface IProject {
    link: string;
    name: string;
    auth: boolean;
    register: boolean;
    uploads: boolean;
    useremail: string;
    entities: { rows: any[], totalCount: number };
};

export default IProject;