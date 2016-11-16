var TaskService = (function () {
    function TaskService() {
        this.observerList = [];
        this.taskList = [];
        TaskService.count++;
        if (TaskService.count > 1) {
            throw 'singleton!';
        }
    }
    var d = __define,c=TaskService,p=c.prototype;
    TaskService.getInstance = function () {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    };
    p.accept = function (id) {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                this.taskList[i].status = TaskStatus.DURING;
            }
        }
        this.notify();
    };
    p.finish = function (id) {
        if (!id) {
            return ErrorCode.TASK_MISSING;
        }
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                this.taskList[i].status = TaskStatus.SUBMITTED;
            }
        }
        this.notify();
        return ErrorCode.SUCCEED;
    };
    p.getTaskByCustomRole = function (rule) {
        return rule(this.taskList);
    };
    p.notify = function () {
        for (var i = 0; i < this.taskList.length; i++) {
            for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
                var observer = _a[_i];
                observer.onChange(this.taskList[i]);
            }
        }
    };
    TaskService.count = 0;
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
//# sourceMappingURL=TaskService.js.map