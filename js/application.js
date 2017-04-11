var tasks = [];
var i = 0;

function updateTasks () {
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
    if ((e.keyCode === 13)) {
        if ($(this).val() !== '') {
            $('#main').show();
            $('#footer').show();
            var $this = $(this);
            var newTask = $this.val();
            tasks.push({id: i++, title: newTask, status: 'active'});
            updateTasks();
            // Очистка Input
            $('#new-todo').val('');
        }
        else {
            return false;
        }
    }
});

/* Checkbox */

$('#todo-list').on('click', '.toggle', function (e) {
    var id = parseInt(e.target.dataset.id);
    tasks[id].status = "completed";
    if (!$(this).prop("checked")) {
        tasks[id].status = "active";
    }

    updateTasks();
});

$('#toggle-all').on('click', function () {
    $(tasks).each(function (i) {
        if ($('#toggle-all').prop("checked")) {
            tasks[i].status = "completed";
        } else {
            tasks[i].status = "active";
        }
    });
    updateTasks();
});



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

$('#todo-list').on('click', 'button.destroy', function (e) {
    var id = parseInt(e.target.dataset.id);
    tasks.splice(id, 1);
    updateTasks();
});

function ShowTasks () {
    tasks.forEach(function (item, i, tasks) {
        console.log(tasks[i].id, tasks[i].title, tasks[i].status);
    });
}

/* События кнопки Clear Completed */

$('#clear-completed').on('click', function () {
    $('input:checked').parents('li').remove();
    $(tasks).each(function (i) {
        if (tasks[i].status === "completed") {
            tasks.splice(i, 1);
        }
    });
    updateTasks();
});

/*
 Checkbox

 $('#todo-list').on('click', '.toggle', function() {
 $(this).parents('li').toggleClass('checked');
 if( $('#todo-list .toggle:checked').length == $('#todo-list .toggle').length ){
 $('#toggle-all').prop('checked', true);
 } else {
 $('#toggle-all').prop('checked', false);
 }
 if ($('li.complete').hasClass('checked')) {
 $('#clear-completed').show();
 }
 if (!$('li.complete').hasClass('checked')) {
 $('#clear-completed').hide();
 };
 tasksCount();
 });

 $('#toggle-all').on('click', function () {
 if ($('#todo-list .toggle:checked').length == $('#todo-list .toggle').length) {
 $('#todo-list .toggle').prop('checked', false);
 $('#todo-list li').removeClass('checked');
 } else {
 $('#todo-list .toggle').prop('checked', true);
 $('#todo-list li').addClass('checked');
 }
 if ($('li.complete').hasClass('checked')) {
 $('#clear-completed').show();
 }
 if (!$('li.complete').hasClass('checked')) {
 $('#clear-completed').hide();
 };
 tasksCount();
 });

 События отображения задач

 $('.show-all-tasks').on('click', function() {
 $('li.complete').each(function () {
 $(this).show();
 });
 $(this).toggleClass('active');
 $('.show-active-tasks').removeClass('active');
 $('.show-completed-tasks').removeClass('active');
 });
 $('.show-active-tasks').on('click', function() {
 $('input:not(:checked)').parents('li').show();
 $('input:checked').parents('li').hide();
 $(this).toggleClass('active');
 $('.show-all-tasks').removeClass('active');
 $('.show-completed-tasks').removeClass('active');
 });

 $('.show-completed-tasks').on('click', function() {
 $('input:not(:checked)').parents('li').hide();
 $('input:checked').parents('li').show();
 $(this).toggleClass('active');
 $('.show-all-tasks').removeClass('active');
 $('.show-active-tasks').removeClass('active');
 });

 События кнопки Clear Completed

 $('#clear-completed').on('click', function () {
 $('input:checked').parents('li').remove();
 tasksCount();
 });
 */