var tasks = [];

function UpdateTasks () {
    $('#todo-list').find('li').remove();
    $(tasks).each(function (i, t) {
        $('#todo-list').append('<li class="' + t.status + '">\
            <div class="todo-task">\
            <input class="toggle" type="checkbox" data-id="' + t.id + '" ' + (t.status === 'completed' ? ' checked ' : '' ) + '><label class="text">' + t.title + '</label>\
            <button class="destroy"></button>\
            </div>\
            </li>');
        if ($('#todo-list li').hasClass('completed')) {
            $('#clear-completed').show();
        }
        if (!$('#todo-list li').hasClass('completed')) {
            $('#clear-completed').hide();
        }
    });
    ShowTasksCounter();
}

function ShowTasksCounter() {
    $('.count').text(tasks.length);
    if (tasks.length < 1) {
        $('#footer').hide();
    }
}

/* Добавление задач */

$('#new-todo').keyup(function (e) {
    const newId = GetNewUserId();
    if ((e.keyCode === 13)) {
        if ($(this).val() !== '') {
            $('#main').show();
            $('#footer').show();
            var $this = $(this);
            var newTask = $this.val();
            tasks.push({
                id: newId,
                title: newTask,
                status: 'active'});
            UpdateTasks();
            // Очистка Input
            $('#new-todo').val('');
        }
        else {
            return false;
        }
    }
});

/* Генерация id */

function GetNewUserId () {
    var maxId = tasks.reduce((max, item) => item.id > max ? item.id : max, 0);
    return maxId + 1;
}

/* Checkbox */

$('#todo-list').on('click', '.toggle', function () {
    var id = parseInt($(this).closest(".todo-task").find(".toggle").data("id"));
    var index = tasks.findIndex(function(item){
        return id === item.id;
    });
    tasks[index].status='completed' ;
    if (!$(this).prop("checked")) {
        tasks[index].status = "active";
    }
    UpdateTasks();
});

$('#toggle-all').on('click', function () {
    $(tasks).each(function (i) {
        if ($('#toggle-all').prop("checked")) {
            tasks[i].status = "completed";
        } else {
            tasks[i].status = "active";
        }
    });
    UpdateTasks();
});

/* Отображение выбранных задач */

$('.show-all-tasks').on('click', function() {
    $('li.active').show();
    $('li.completed').show();
    $(this).toggleClass('activated');
    $('.show-active-tasks').removeClass('activated');
    $('.show-completed-tasks').removeClass('activated');
});

$('.show-active-tasks').on('click', function() {
    $('li.active').show();
    $('li.completed').hide();
    $(this).toggleClass('activated');
    $('.show-all-tasks').removeClass('activated');
    $('.show-completed-tasks').removeClass('activated');
});

$('.show-completed-tasks').on('click', function() {
    $('li.active').hide();
    $('li.completed').show();
    $(this).toggleClass('activated');
    $('.show-all-tasks').removeClass('activated');
    $('.show-active-tasks').removeClass('activated');
});

/* Удаление */

$('#todo-list').on('click', 'button.destroy', function() {
    var id = parseInt($(this).closest(".todo-task").find(".toggle").data("id"));
    var index = tasks.findIndex(function(item){
        return id === item.id;
    });
    tasks.splice(index, 1);
    UpdateTasks();
});

function ShowTasks () {
    tasks.forEach(function (item, i, tasks) {
        console.log(tasks[i].id, tasks[i].title, tasks[i].status);
    });
}

/* События кнопки Clear Completed */

$('#clear-completed').on('click', function () {
    $('input:checked').parents('li').remove(); $(tasks).each(function (i,r) {
        if (r.status === "completed") {
            tasks.splice(tasks.indexOf(r), 1); }
    });
    UpdateTasks();
});