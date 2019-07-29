export default floodFill
function floodFill(x, y,arr){
	if(arr[y] === undefined) return;
	if(arr[y][x] === undefined) return;
	if(alreadyFilled(x, y,arr)) return;
	fill(x, y,arr);

	floodFill(x,   y-1,arr);
	floodFill(x+1, y  ,arr);
	floodFill(x,   y+1,arr);
	floodFill(x-1, y  ,arr);
}

function fill(x, y,arr){
	arr[y][x] = 2;
}

function alreadyFilled(x, y,arr){

	return arr[y][x] == 2 || arr[y][x] == 1
}
