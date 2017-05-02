void core(uint *matrix, uint *new, uint *count, uint *all){
	int id = getWorkerNumber(0);
	int rows = 10;
	int cols = 10;
	int neig = 0;
	
	
	if (matrix[id] == 1){
		if ((id+1)<100){
			if (matrix[id+1] == 1){
				neig++;
			}
		}
		if ((id+rows-1)<100){
			if (matrix[id+rows-1] == 1){
				neig++;
			}
		}
		if((id+rows+1)<100){
			if (matrix[id+rows+1] == 1){
				neig++;
			}
		}
		if((id+rows)<100){
			if (matrix[id+rows] == 1){
				neig++;
			}
		}
		if((id-1)>=0){
			if (matrix[id-1] == 1){
				neig++;
			}
		}
		if((id-rows-1)>=0){
			if (matrix[id-rows-1] == 1){
				neig++;
			}
		}
		if((id-rows)>=0){
			if (matrix[id-rows] == 1){
				neig++;
			}
		}
		if((id-rows+1)>=0){
			if (matrix[id-rows+1] == 1){
				neig++;
			}
		}
		if (neig > 2){
			new[id] = 0;
			all[id+(*count*100)] = 0;
		}
		else{
			new[id] = matrix[id];
			all[id+(*count*100)] = matrix[id];	
		}		
	}
	else if (matrix[id] == 0){
		if ((id+1)<100){
			if (matrix[id+1] == 1){
				neig++;
			}
		}
		if ((id+rows-1)<100){
			if (matrix[id+rows-1] == 1){
				neig++;
			}
		}
		if((id+rows+1)<100){
			if (matrix[id+rows+1] == 1){
				neig++;
			}
		}
		if((id+rows)<100){
			if (matrix[id+rows] == 1){
				neig++;
			}
		}
		if((id-1)>=0){
			if (matrix[id-1] == 1){
				neig++;
			}
		}
		if((id-rows-1)>=0){
			if (matrix[id-rows-1] == 1){
				neig++;
			}
		}
		if((id-rows)>=0){
			if (matrix[id-rows] == 1){
				neig++;
			}
		}
		if((id-rows+1)>=0){
			if (matrix[id-rows+1] == 1){
				neig++;
			}
		}
		if (neig == 3){
			new[id] = 1;
			all[id+(*count*100)] = 1;
		}
		else{
			new[id] = matrix[id];
			all[id+(*count*100)] = matrix[id];	
		}
	}
}

