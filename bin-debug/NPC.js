var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(picture, emoji, id, dialoguePanel) {
        var _this = this;
        _super.call(this);
        this.touchEnabled = true;
        this.dialoguePanel = dialoguePanel;
        this.picture = picture;
        this.emoji = emoji;
        this.emoji.alpha = 0;
        this.picture.y = 100;
        this.id = id;
        this.addChild(this.picture);
        this.addChild(this.emoji);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onNPCClick();
        }, this);
    }
    var d = __define,c=NPC,p=c.prototype;
    p.onNPCClick = function () {
        this.dialoguePanel.alpha = 1;
        this.dialoguePanel.touchEnabled = true;
        var task;
        var taskService = TaskService.getInstance();
        this.dialoguePanel.task = taskService.getTaskByCustomRole(this.rule);
    };
    p.onChange = function (task) {
        if (task.status == TaskStatus.ACCEPTABLE) {
            if (this.id == task.fromNpcId) {
                this.emoji.alpha = 1;
            }
            if (this.id == task.toNpcId) {
                this.emoji.alpha = 0;
                this.touchEnabled = false;
            }
            this.dialoguePanel.getTextField().$setText("请点击另一个NPC");
        }
        else if (task.status == TaskStatus.DURING) {
            if (this.id == task.fromNpcId) {
                this.emoji.alpha = 0;
                this.touchEnabled = false;
            }
            if (this.id == task.toNpcId) {
                this.emoji.alpha = 1;
                this.touchEnabled = true;
            }
            this.dialoguePanel.getTextField().$setText("任务完成");
        }
        else if (task.status == TaskStatus.SUBMITTED) {
            this.emoji.alpha = 0;
            this.touchEnabled = false;
        }
    };
    p.rule = function (taskList) {
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].status == TaskStatus.ACCEPTABLE || taskList[i].status == TaskStatus.DURING || taskList[i].status == TaskStatus.SUBMITTED) {
                return taskList[i];
            }
        }
    };
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=NPC.js.map