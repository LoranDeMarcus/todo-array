describe("TestingAddTaskWithoutArguments", function () {

    it("CallWithoutArgumentsMustReturnFalse", function () {
        assert.equal(tasks.push(), false);
    });

});

describe("TestingDeleteTasks", function () {
    it("IfArrayEmptyMustReturnTrue", function () {
        tasks.push({
            id: i++,
            title: "testTask",
            status: 'active'
        });
        tasks.splice(1, 1);
        assert.equal(tasks);
    });
});