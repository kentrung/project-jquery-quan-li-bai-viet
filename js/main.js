$(function() {
	
	renderListItem(data);

	renderCategoryFormAdd();

	// click đóng mở form
	$(document).on('click', '#toggle-form-button', function(){
		toggleForm();
	});

	// tìm bài viết
	$(document).on('input', '#search-name', function() {
		search_text = this.value.toLowerCase();
		$('#data-body tr').each(function(index, el) {
			const name = $(el).find('td.name').text().toLowerCase();
			if(name.indexOf(search_text) > -1) {
				$(this).css('display', 'table-row');
			} else {
				$(this).css('display', 'none');
			}
		});
	});

	// click nút xóa bài viết
	$(document).on('click', '.btn-delete', function() {
		const id = $(this).parent().parent('tr').attr('data-id');
		let name = '';
		for(let [index, item] of data.entries()) {
			if(item.id == id) {
				name = item.name;
				break;
			}
		}	
		swal({
			title: "Xóa bài viết?",
			text: name,
			icon: "warning",
			buttons: ["Hủy", "Xóa"]
		})
		.then(willDelete => {
			if (willDelete) {
				// lấy ra id bài viết
				const id = $(this).parent().parent('tr').attr('data-id');
				// xóa bài viết trong data
				for(let [index, item] of data.entries()) {
					if(id == item.id) {
						data.splice(index, 1);
						break;
					}
				}
				renderListItem(data);
			}
		});
	});

	// click nút sửa bài viết
	$(document).on('click', '.btn-edit', function() {
		const id = $(this).parent().parent('tr').attr('data-id');
		for(let [index, item] of data.entries()) {
			if(item.id == id) {
				$(this).parent().parent('tr').empty().append(renderItemEdit(index + 1, item));
				break;
			}
		}	
	});
	
	// click hủy sửa bài viết
	$(document).on('click', '.btn-edit-cancel', function() {
		const id = $(this).parent().parent('tr').attr('data-id');
		let html = '';
		for(let [index, item] of data.entries()) {
			if(item.id == id) {
				$(this).parent().parent('tr').empty().append(renderItem(index + 1, item));
				break;
			}
		}
	})

	// click update bài viết
	$(document).on('click', '.btn-edit-update', function() {
		const id = $(this).parent().parent('tr').attr('data-id');
		let index = $(this).parent().parent('td.index').text();
		let name = $(this).parent().siblings('td.name').find('input').val();
		let level = $(this).parent().siblings('td.category').find('select').val();
		let new_data = {
			id,
			name,
			level
		}
		$(this).parent().parent('tr').empty().append(renderItem(index + 1, new_data));
		for(let [index, item] of data.entries()) {
			if(item.id == id) {
				item.name = name;
				item.level = level;
				break;
			}
		}
	});

	// click hủy thêm bài viết
	$(document).on('click', '#btn-add-cancel', function() {
		toggleForm();
	})

	// click submit thêm bài viết
	$(document).on('click', '#btn-add-submit', function() {
		let name = $(this).parent().siblings('.name').find('input').val();
		if(name.length > 0) {
			let level = $(this).parent().siblings('.category').find('select').val();
			let new_item = {
				id: uuidv4(),
				name,
				level
			}
			// lưu vào data ban đầu
			data.push(new_item);
			// render bài viết mới
			let html = `<tr data-id="${new_item.id}">`;
			html += renderItem(data.length, new_item);
			html += `</tr>`;
			$('#data-body').append(html);
			// đóng form
			toggleForm();
			// làm trống các ô đã nhập
			$(this).parent().siblings('.name').find('input').val('');
			$(this).parent().siblings('.category').find('select').val(0);
		} else {
			swal({
				title: "Tên bài viết không được để trống!",
				icon: "warning"
			})
		}
	})

	// click sắp xếp bài viết
	$(document).on('click', '#sort-item li a', function() {
		let name = $(this).text();
		$('#sort-item-value').text(name);
		let value = $(this).attr('data-value');
		console.log(value);
		switch(value) {
			case "name-asc":
				renderListItem(data.sort(compareValues('name')));
				break;
			case "name-desc":
				renderListItem(data.sort(compareValues('name', 'desc')));
				break;
			case "cate-desc":
				renderListItem(data.sort(compareValues('level')));
				break;
			case "cate-asc":
				renderListItem(data.sort(compareValues('level', 'desc')));
				break;
			default:
				break;
		}
	});
});




