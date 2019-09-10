// console.log(Items);
var data = Items;
var arr_level = [];
var show_form = false;
var search_text = '';

// tạo mảng level chuyên mục không bị lặp lại các phần tử
for(let item of data) {
	if(arr_level.indexOf(item.level) === -1) {
		arr_level.push(item.level);
	} 
}
// sắp xếp mảng level theo thứ tự tăng dần
arr_level.sort((a, b) => {
	return a - b;
});

// render select option ở form thêm bài viết
function renderCategoryFormAdd() {
	let html = '';
	for(let item of arr_level) {
		html += renderCategory('select', item);
	}
	$('#select-add-item').append(html);
}

// Render các bài viết
function renderListItem(list) {
	// hiện ra loading trước
	renderLoading();
	// render data
	let html = '';
	if(list.length > 0) {
		for(let [index,item] of list.entries()) {
			html += `<tr data-id="${item.id}">`;
			html += renderItem(index + 1, item);
			html += `</tr>`;
		}
	} else {
		html = `<tr>
					<td class="text-center" colspan="4">Không có bài viết</td>
				</tr>`;

	}
	$('#data-body').empty().append(html);	
}

// render loading 
function renderLoading() {
	var html = `<tr>
					<td class="text-center" colspan="4">
						<span class="fa fa-spinner fa-pulse fa-fw"></span>
						<span> Loading data...</span>
					</td>
				</tr>`;
	$('#data-body').empty().append(html);
}

// render từng bài viết
function renderItem(index, item) {
	let item_html = `
        <td class="index text-center">${index}</td>
        <td class="name">${item.name}</td>
        <td class="category">
        	${renderCategory('label', item.level)}
        </td>
        <td>
            <button type="button" class="btn btn-default btn-sm btn-edit">Sửa</button>
            <button type="button" class="btn btn-danger btn-sm btn-delete">Xóa</button>
        </td>
	`;
	return item_html;
}

// render sửa bài viết
function renderItemEdit(index, item) {
	return html = ` 
		<td class="index text-center">${index}</td>
        <td class="name">
        	<input class="form-control" placeholder="Nhập tên" value="${item.name}" />
        </td>
        <td class="category text-center">
        	${renderCategoryEdit(item.level)}
        </td>
        <td>
            <button type="button" class="btn btn-default btn-sm btn-edit-cancel">Hủy</button>
            <button type="button" class="btn btn-success btn-sm btn-edit-update">Update</button>
        </td>
	`;
}

// đóng mở form thêm bài viết
function toggleForm() {
	show_form = !show_form;
	if(show_form) {
		$('#toggle-form-button').text('Đóng');
		$('#toggle-form-content').addClass('show');
	} else {
		$('#toggle-form-button').text('Thêm bài viết');
		$('#toggle-form-content').removeClass('show');
	}
}

// render tên chuyên mục
function categoryName(level) {
	var level = parseInt(level);
	var name = '';
	switch(level) {
		case 1:
			name = 'Công nghệ';
			break;
		case 2:
			name = 'Thể thao';
			break;
		default: // 0
			name = 'Kinh doanh'; 
	}
	return name;
}

// render loại chuyên mục
function renderCategory(type, level) {
	level = parseInt(level, 20);
	if(type == 'label') {
		let html = '';
		switch(level) {
			case 1:  // công nghệ
				html = `<span class="label label-default">${categoryName(level)}</span>`;
				break;
			case 2: // thể thao
				html = `<span class="label label-info">${categoryName(level)}</span>`;
				break;
			default: // 0 kinh doanh
				html = `<span class="label label-success">${categoryName(level)}</span>`; 
		}
		return html;
	} else if(type == 'select') {
		let html = '';
		switch(level) {
			case 1: // công nghệ
				html = `<option value="${level}">${categoryName(level)}</option>`;
				break;
			case 2: // thể thao
				html = `<option value="${level}">${categoryName(level)}</option>`;
				break;
			default: // 0 kinh doanh
				html = `<option value="${level}">${categoryName(level)}</span>`; 
		}
		return html;
	}
}

function renderCategoryEdit(level) {
	level = parseInt(level, 20);
	let option = `<select class="form-control">`;
	for(let item of arr_level) {
		if(item == level) {
			option += `<option value="${item}" selected>${categoryName(item)}</option>`;
		} else {
			option += `<option value="${item}">${categoryName(item)}</option>`;
		}
	}
	option += `</option>`;
	return option;
}

// hàm cho sắp xếp động
function compareValues(key, order='asc') {
	return function(a, b) {
		if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
			// không tồn tại tính chất trên cả hai object
			return 0; 	
		}
		const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
		const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
		let comparison = 0;
		if (varA > varB) {
		comparison = 1;
		} else if (varA < varB) {
			comparison = -1;
		}
		return (
			(order == 'desc') ? (comparison * -1) : comparison
		);
	};
}




