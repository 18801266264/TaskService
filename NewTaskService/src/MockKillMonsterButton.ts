class MockKillMonsterButton extends egret.DisplayObjectContainer {
    public button: egret.Bitmap;
    public task: Task;

    constructor() {

        super();

        this.button = this.createBitmapByName("killMonsterButton_png");
        this.addChild(this.button);
        this.button.y = 50;
        this.button.touchEnabled = false;

        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.onButtonClick();
        }, this)
    }

    public onButtonClick(): void {

        var sceneService = SceneService.getInstance();
        if (this.task.status == TaskStatus.ACCEPTABLE) {

            sceneService.accept(this.task.id);


        } else if (this.task.status == TaskStatus.DURING) {

            this.task.onDuring(this.task);

        } else if (this.task.status == TaskStatus.CAN_SUBMIT) {

            sceneService.finish(this.task.id);

        } 

    }

    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public rule(taskList: any) {

        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].status == TaskStatus.ACCEPTABLE || taskList[i].status == TaskStatus.DURING || taskList[i].status == TaskStatus.SUBMITTED) {
                return taskList[i];
            }
        }
    }
}