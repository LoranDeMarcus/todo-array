describe("TestingAddTask", function () {

    it("CallWithoutArgumentsMustReturnFalse", function () {
        assert.equal(tasks.push(), false);
    });

    it("CallWithArgumentsMustReturnTrue", function () {
        tasks.push({
            id: 1,
            title: "testTask",
            status: 'active'
        });
        assert.equal(tasks.length === 1, true);
    });

});

describe("TestingTasksByTogglingStatus", function () {

    it("ToggleTaskStatusToCompletedMustReturnTrue", function () {
        const prevValue = tasks[0].status;
        tasks[0].status = "completed";
        const currentValue = tasks[0].status;
        assert.notEqual(prevValue, currentValue);
    });

});

describe("TestingTasksByDeletingObj", function () {

    it("IfArrayEmptyMustReturnTrue", function () {

        tasks.splice(0, 1);
        assert.equal(tasks.length === 0, true);
    });

});