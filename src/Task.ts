class Task {
    public id: string;
    public name: string;
    public desc: string;
    public status: TaskStatus;
    public fromNpcId: string;
    public toNpcId: string;

    constructor(id: string, name: string, desc: string, status: TaskStatus, fromNpcId: string, toNpcId: string) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.status = status;
        this.fromNpcId = fromNpcId;
        this.toNpcId = toNpcId;
    }

}