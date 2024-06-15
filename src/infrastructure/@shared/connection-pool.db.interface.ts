export default interface ConnectionDb {
    instance(): Promise<void> ;
    close(): Promise<void>;
}