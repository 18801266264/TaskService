class NPC extends egret.DisplayObjectContainer implements Observer {
    private picture: egret.Bitmap;
    private emoji: egret.Bitmap;
    private id: string;
    private dialoguePanel: DialoguePanel;

    constructor(picture: egret.Bitmap, emoji: egret.Bitmap, id: string, dialoguePanel: DialoguePanel) {
        super();
        this.touchEnabled = true;
        this.dialoguePanel = dialoguePanel;
        this.picture = picture;
        this.emoji = emoji;
        this.emoji.alpha = 0;
        this.picture.y = 100;
        this.id = id;
        this.addChild(this.picture);
        this.addChild(this.emoji);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.onNPCClick();
        }, this);
    }

    private onNPCClick() {

        this.dialoguePanel.alpha = 1;
        this.dialoguePanel.touchEnabled = true;
        var task: Task;
        var taskService: TaskService = TaskService.getInstance();
        this.dialoguePanel.task = taskService.getTaskByCustomRole(this.rule);
    }

    public onChange(task: Task) {

        if (task.status == TaskStatus.ACCEPTABLE) {
            if (this.id == task.fromNpcId) {
                this.emoji.alpha = 1;
            }
            if (this.id == task.toNpcId) {
                this.emoji.alpha = 0;
                this.touchEnabled = false;
            }
            this.dialoguePanel.getTextField().$setText("请点击另一个NPC");

        } else if (task.status == TaskStatus.DURING) {
            if (this.id == task.fromNpcId) {
                this.emoji.alpha = 0;
                this.touchEnabled = false;
            }
            if (this.id == task.toNpcId) {
                this.emoji.alpha = 1;
                this.touchEnabled = true;
            }
            this.dialoguePanel.getTextField().$setText("任务完成");

        } else if (task.status == TaskStatus.SUBMITTED) {
            this.emoji.alpha = 0;
            this.touchEnabled = false;
        }
    }

    public rule(taskList: any) {

        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].status == TaskStatus.ACCEPTABLE || taskList[i].status == TaskStatus.DURING || taskList[i].status == TaskStatus.SUBMITTED) {
                return taskList[i];
            }
        }
    }
}