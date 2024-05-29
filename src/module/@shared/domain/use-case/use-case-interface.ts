export default interface UserCaseInterface {
    execute(input: any): Promise<any>;
}