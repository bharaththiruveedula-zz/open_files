/**
 * 
 */
$(function(){
var perPage = 5;
	var opened = 1;
	var onClass = 'on';
	var paginationSelector = '.pages';
	$('#enode_table').simplePagination(perPage, opened, onClass, paginationSelector);
	
});