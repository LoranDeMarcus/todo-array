var tasks = [];
var i = 0;

function updateTasks() {
    $('#todo-list').find('li').remove();
    $(tasks).each(function(i) {
        $('#todo-list').append('<li class="completed">\
            <div class="todo-task">\
            <label class="text"><input class="toggle" type="checkbox" data-check="'+ i +'">'+ tasks[i].title +'</label>\
            <button class="destroy" data-id="'+ i +'"></button>\
            </div>\
            </li>');
    });
    tasksCount();
}

function tasksCount() {
    $('.count').text(tasks.length);
    if (tasks.length < 1) {
        $('#footer').hide();
    }
}

/* Добавление задач */

$('#new-todo').keyup(function (event) {
    if ((event.keyCode === 13)) {
        if ($(this).val() !== '') {
            $('#main').show();
            $('#footer').show();
            var $this = $(this);
            var newTask = $this.val();
            tasks.push({id: i++, title: newTask, status: 'active'});
            updateTasks();
            // Очистка Input
            $('#new-todo').val('');
        } else {
            return false;
        }
    }
});

/* Checkbox */

$('#todo-list').on('click', '.toggle', function(i) {
        if (tasks[i].status === "active") {
            tasks[i].status = "completed";
        }

})

/* Удаление */

$('#todo-list').on('click', 'button.destroy', function (e) {
    var id = parseInt(e.target.dataset.id);
    tasks.splice(id, 1);
    updateTasks();
    tasksCount();
});


function ShowTasks() {
    tasks.forEach(function (item, i, tasks) {
        console.log(tasks[i].id, tasks[i].title, tasks[i].status);
    });
}
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

/* События кнопки Clear Completed

$('#clear-completed').on('click', function () {
    $('input:checked').parents('li').remove();
    tasksCount();
});

*/