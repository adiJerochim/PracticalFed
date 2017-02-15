
$(function parseContacts() {

    var $ul = $('<ul>');

    var contacts = [
        {
            id: 1,
            name: "Friends",
            type: "Group",
            contacts: [
                {id: 2, name: "Udi", type: "Contact"},
                {id: 3, name: "Tommy", type: "Contact"},
                {
                    id: 6,
                    name: "Old Friends",
                    type: "Group",
                    contacts: [
                        {id: 7, name: "Itay", type: "Contact"}
                    ]
                }
            ]
        },
        {
            id: 4,
            name: "Family",
            type: "Group",
            contacts: [
                {id: 5, name: "Roni", type: "Contact"}
            ]
        },
        {id: 8, name: "Ori", type: "Contact"}
    ];

    getList(contacts, $ul);
    $ul.append('</ul>');
    $ul.appendTo('body');

});

function getList(item, $list) {

    if ($.isArray(item)) {
        $.each(item, function (key, value) {
            getList(value, $list);
        });
        return;
    }

    if (item) {
        var $li = $('<li>');
        if (item.name) {
            $li.append(item.name);
            $li.append('</li>');
        }
        if (item.contacts && item.contacts.length) {
            $li.addClass('expand');
            $li.on('click', function (event) {
                if (event.target !== this) {
                    return;
                }
                if ($li.hasClass('expand')) {
                    $(this).addClass('collaps').removeClass('expand');
                    var $group = $('<ul>');
                    getList(item.contacts, $group);
                    $group.append('</ul>');
                    $li.append($group);
                } else if ($li.hasClass('collaps')) {
                    $(this).addClass('expand').removeClass('collaps');
                    $(this).children(":last").remove();
                }
            });
        }
        $li.mouseover(function (e)
            {
                e.stopPropagation();
                $(this).addClass('hover');
            });

            $li.mouseout(function ()
            {
                $(this).removeClass('hover');
            });
            
        $list.append($li);
    }
}