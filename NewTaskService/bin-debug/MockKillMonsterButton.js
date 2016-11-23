var MockKillMonsterButton = (function (_super) {
    __extends(MockKillMonsterButton, _super);
    function MockKillMonsterButton() {
        var _this = this;
        _super.call(this);
        this.button = this.createBitmapByName("killMonsterButton_png");
        this.addChild(this.button);
        this.button.y = 50;
        this.button.touchEnabled = false;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onButtonClick();
        }, this);
    }
    var d = __define,c=MockKillMonsterButton,p=c.prototype;
    p.onButtonClick = function () {
        var sceneService = SceneService.getInstance();
        if (this.task.status == TaskStatus.ACCEPTABLE) {
            sceneService.accept(this.task.id);
        }
        else if (this.task.status == TaskStatus.DURING) {
            this.task.onDuring(this.task);
        }
        else if (this.task.status == TaskStatus.CAN_SUBMIT) {
            sceneService.finish(this.task.id);
        }
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    p.rule = function (taskList) {
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].status == TaskStatus.ACCEPTABLE || taskList[i].status == TaskStatus.DURING || taskList[i].status == TaskStatus.SUBMITTED) {
                return taskList[i];
            }
        }
    };
    return MockKillMonsterButton;
}(egret.DisplayObjectContainer));
egret.registerClass(MockKillMonsterButton,'MockKillMonsterButton');
//# sourceMappingURL=MockKillMonsterButton.js.map